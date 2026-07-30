const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

/**
 * Register a new user
 */
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (user) {
                return res.status(400).json({ error: 'User already exists with this email' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS));

            // Insert new user
            db.run(
                'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
                [email, hashedPassword, name],
                function(err) {
                    if (err) {
                        return res.status(500).json({ error: 'Failed to create user' });
                    }

                    // Generate JWT token
                    const token = jwt.sign(
                        { id: this.lastID, email },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRES_IN }
                    );

                    res.status(201).json({
                        message: 'User registered successfully',
                        user: {
                            id: this.lastID,
                            email,
                            name
                        },
                        token
                    });
                }
            );
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Login user
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Verify password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                },
                token
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get current user profile
 */
const getProfile = (req, res) => {
    try {
        db.get(
            'SELECT id, email, name, created_at FROM users WHERE id = ?',
            [req.user.id],
            (err, user) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.json({ user });
            }
        );
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { register, login, getProfile };
