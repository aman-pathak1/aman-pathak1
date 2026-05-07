const { db } = require('../config/database');

/**
 * Create a new order from cart
 */
const createOrder = (req, res) => {
    try {
        const userId = req.user.id;

        // Get cart items
        const cartQuery = `
            SELECT 
                c.id as cart_id,
                c.quantity,
                c.product_id,
                p.price,
                p.stock,
                p.name
            FROM cart c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = ?
        `;

        db.all(cartQuery, [userId], (err, cartItems) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (cartItems.length === 0) {
                return res.status(400).json({ error: 'Cart is empty' });
            }

            // Verify stock availability
            for (const item of cartItems) {
                if (item.stock < item.quantity) {
                    return res.status(400).json({ 
                        error: `Insufficient stock for ${item.name}` 
                    });
                }
            }

            // Calculate total
            const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            // Create order
            db.run(
                'INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)',
                [userId, total, 'pending'],
                function(err) {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ error: 'Failed to create order' });
                    }

                    const orderId = this.lastID;

                    // Insert order items and update stock
                    const insertOrderItem = db.prepare(
                        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
                    );

                    const updateStock = db.prepare(
                        'UPDATE products SET stock = stock - ? WHERE id = ?'
                    );

                    cartItems.forEach(item => {
                        insertOrderItem.run([orderId, item.product_id, item.quantity, item.price]);
                        updateStock.run([item.quantity, item.product_id]);
                    });

                    insertOrderItem.finalize();
                    updateStock.finalize();

                    // Clear cart
                    db.run('DELETE FROM cart WHERE user_id = ?', [userId], (err) => {
                        if (err) {
                            console.error('Error clearing cart:', err);
                        }

                        res.status(201).json({
                            message: 'Order placed successfully',
                            order: {
                                id: orderId,
                                total: parseFloat(total.toFixed(2)),
                                status: 'pending'
                            }
                        });
                    });
                }
            );
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get user's orders
 */
const getOrders = (req, res) => {
    try {
        const userId = req.user.id;

        db.all(
            'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
            [userId],
            (err, orders) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Failed to fetch orders' });
                }

                res.json({ orders, count: orders.length });
            }
        );
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get order by ID with items
 */
const getOrderById = (req, res) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.params;

        // Get order
        db.get(
            'SELECT * FROM orders WHERE id = ? AND user_id = ?',
            [orderId, userId],
            (err, order) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                if (!order) {
                    return res.status(404).json({ error: 'Order not found' });
                }

                // Get order items
                const itemsQuery = `
                    SELECT 
                        oi.id,
                        oi.quantity,
                        oi.price,
                        p.id as product_id,
                        p.name,
                        p.image,
                        p.category
                    FROM order_items oi
                    JOIN products p ON oi.product_id = p.id
                    WHERE oi.order_id = ?
                `;

                db.all(itemsQuery, [orderId], (err, items) => {
                    if (err) {
                        console.error('Database error:', err);
                        return res.status(500).json({ error: 'Database error' });
                    }

                    res.json({
                        order: {
                            ...order,
                            items
                        }
                    });
                });
            }
        );
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Update order status (admin only - for demo, no admin check)
 */
const updateOrderStatus = (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        db.run(
            'UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [status, orderId],
            function(err) {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ error: 'Failed to update order status' });
                }

                if (this.changes === 0) {
                    return res.status(404).json({ error: 'Order not found' });
                }

                res.json({ message: 'Order status updated successfully' });
            }
        );
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
};
