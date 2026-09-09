const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token
 */
const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.' 
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ 
                    error: 'Invalid or expired token.' 
                });
            }
            
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Internal server error during authentication.' 
        });
    }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
            req.user = user;
        }
        next();
    });
};

module.exports = { authenticateToken, optionalAuth };
