const express = require('express');
const { body } = require('express-validator');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// All cart routes require authentication
router.use(authenticateToken);

// Validation rules
const addToCartValidation = [
    body('productId').isInt({ min: 1 }).withMessage('Valid product ID is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

const updateCartValidation = [
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
];

// Routes
router.get('/', getCart);
router.post('/', addToCartValidation, validate, addToCart);
router.put('/:cartId', updateCartValidation, validate, updateCartItem);
router.delete('/:cartId', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
