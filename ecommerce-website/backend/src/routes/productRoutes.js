const express = require('express');
const { body } = require('express-validator');
const {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { validate } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const productValidation = [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('description').optional().trim(),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('image').optional().isURL().withMessage('Image must be a valid URL'),
    body('rating').optional().isFloat({ min: 0, max: 5 }).withMessage('Rating must be between 0 and 5'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
];

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);
router.post('/', productValidation, validate, createProduct);
router.put('/:id', validate, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
