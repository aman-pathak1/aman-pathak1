const { db } = require('../config/database');

/**
 * Get all products with optional filtering
 */
const getAllProducts = (req, res) => {
    try {
        const { category, search, sort = 'id', order = 'ASC' } = req.query;
        
        let query = 'SELECT * FROM products WHERE 1=1';
        const params = [];

        // Filter by category
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        // Search by name or description
        if (search) {
            query += ' AND (name LIKE ? OR description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        // Sorting (whitelist allowed columns)
        const allowedSortFields = ['id', 'name', 'price', 'rating', 'created_at'];
        const sortField = allowedSortFields.includes(sort) ? sort : 'id';
        const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        
        query += ` ORDER BY ${sortField} ${sortOrder}`;

        db.all(query, params, (err, products) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to fetch products' });
            }

            res.json({ products, count: products.length });
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get single product by ID
 */
const getProductById = (req, res) => {
    try {
        const { id } = req.params;

        db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to fetch product' });
            }

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json({ product });
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get products by category
 */
const getProductsByCategory = (req, res) => {
    try {
        const { category } = req.params;

        db.all('SELECT * FROM products WHERE category = ?', [category], (err, products) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to fetch products' });
            }

            res.json({ products, count: products.length });
        });
    } catch (error) {
        console.error('Get products by category error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Create a new product (admin only - for demo purposes, no admin check)
 */
const createProduct = (req, res) => {
    try {
        const { name, description, price, category, image, rating = 0, stock = 0 } = req.body;

        db.run(
            `INSERT INTO products (name, description, price, category, image, rating, stock)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, description, price, category, image, rating, stock],
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Failed to create product' });
                }

                res.status(201).json({
                    message: 'Product created successfully',
                    product: {
                        id: this.lastID,
                        name,
                        description,
                        price,
                        category,
                        image,
                        rating,
                        stock
                    }
                });
            }
        );
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update a product
 */
const updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, image, rating, stock } = req.body;

        // Build dynamic update query
        const updates = [];
        const params = [];

        if (name !== undefined) { updates.push('name = ?'); params.push(name); }
        if (description !== undefined) { updates.push('description = ?'); params.push(description); }
        if (price !== undefined) { updates.push('price = ?'); params.push(price); }
        if (category !== undefined) { updates.push('category = ?'); params.push(category); }
        if (image !== undefined) { updates.push('image = ?'); params.push(image); }
        if (rating !== undefined) { updates.push('rating = ?'); params.push(rating); }
        if (stock !== undefined) { updates.push('stock = ?'); params.push(stock); }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        updates.push('updated_at = CURRENT_TIMESTAMP');
        params.push(id);

        const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`;

        db.run(query, params, function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to update product' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json({ message: 'Product updated successfully' });
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete a product
 */
const deleteProduct = (req, res) => {
    try {
        const { id } = req.params;

        db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to delete product' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json({ message: 'Product deleted successfully' });
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
};
