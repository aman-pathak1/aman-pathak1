const express = require('express');
const { body } = require('express-validator');
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// All order routes require authentication
router.use(authenticateToken);

// Validation rules
const updateStatusValidation = [
    body('status')
        .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Invalid status value')
];

// Routes
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:orderId', getOrderById);
router.patch('/:orderId/status', updateStatusValidation, validate, updateOrderStatus);

module.exports = router;
