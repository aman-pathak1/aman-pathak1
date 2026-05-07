const { db } = require('../config/database');

/**
 * Get user's cart
 */
const getCart = (req, res) => {
    try {
        const userId = req.user.id;

        const query = `
            SELECT 
                c.id as cart_id,
                c.quantity,
                p.id,
                p.name,
                p.description,
                p.price,
                p.category,
                p.image,
                p.rating
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        `;

        db.all(query, [userId], (err, items) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to fetch cart' });
            }

            const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            res.json({
                items,
                count: items.length,
                total: parseFloat(total.toFixed(2))
            });
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Add item to cart
 */
const addToCart = (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity = 1 } = req.body;

        // Validate product exists and has stock
        db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            if (product.stock < quantity) {
                return res.status(400).json({ error: 'Insufficient stock' });
            }

            // Check if item already in cart
            db.get(
                'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
                [userId, productId],
                (err, existingItem) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ error: 'Database error' });
                    }

                    if (existingItem) {
                        // Update quantity
                        const newQuantity = existingItem.quantity + quantity;
                        
                        if (product.stock < newQuantity) {
                            return res.status(400).json({ error: 'Insufficient stock' });
                        }

                        db.run(
                            'UPDATE cart SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                            [newQuantity, existingItem.id],
                            (err) => {
                                if (err) {
                                    console.error('Database error:', err);
                                    return res.status(500).json({ error: 'Failed to update cart' });
                                }

                                res.json({ message: 'Cart updated successfully' });
                            }
                        );
                    } else {
                        // Insert new item
                        db.run(
                            'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
                            [userId, productId, quantity],
                            function(err) {
                                if (err) {
                                    console.error('Database error:', err);
                                    return res.status(500).json({ error: 'Failed to add to cart' });
                                }

                                res.status(201).json({ 
                                    message: 'Item added to cart successfully',
                                    cartId: this.lastID
                                });
                            }
                        );
                    }
                }
            );
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update cart item quantity
 */
const updateCartItem = (req, res) => {
    try {
        const userId = req.user.id;
        const { cartId } = req.params;
        const { quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ error: 'Quantity must be at least 1' });
        }

        // Get cart item and verify ownership
        db.get('SELECT * FROM cart WHERE id = ? AND user_id = ?', [cartId, userId], (err, cartItem) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (!cartItem) {
                return res.status(404).json({ error: 'Cart item not found' });
            }

            // Check product stock
            db.get('SELECT stock FROM products WHERE id = ?', [cartItem.product_id], (err, product) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (product.stock < quantity) {
                    return res.status(400).json({ error: 'Insufficient stock' });
                }

                db.run(
                    'UPDATE cart SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                    [quantity, cartId],
                    (err) => {
                        if (err) {
                            console.error('Database error:', err);
                            return res.status(500).json({ error: 'Failed to update cart item' });
                        }

                        res.json({ message: 'Cart item updated successfully' });
                    }
                );
            });
        });
    } catch (error) {
        console.error('Update cart item error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Remove item from cart
 */
const removeFromCart = (req, res) => {
    try {
        const userId = req.user.id;
        const { cartId } = req.params;

        db.run(
            'DELETE FROM cart WHERE id = ? AND user_id = ?',
            [cartId, userId],
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Failed to remove item from cart' });
                }

                if (this.changes === 0) {
                    return res.status(404).json({ error: 'Cart item not found' });
                }

                res.json({ message: 'Item removed from cart successfully' });
            }
        );
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Clear entire cart
 */
const clearCart = (req, res) => {
    try {
        const userId = req.user.id;

        db.run('DELETE FROM cart WHERE user_id = ?', [userId], (err) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Failed to clear cart' });
            }

            res.json({ message: 'Cart cleared successfully' });
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
