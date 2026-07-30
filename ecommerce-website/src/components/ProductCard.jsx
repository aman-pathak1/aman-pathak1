import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="product-card"
    >
      {product.discount > 0 && (
        <div className="discount-badge">{product.discount}% OFF</div>
      )}

      <div className="product-image">
        <span className="product-icon">{product.icon}</span>
      </div>

      <div className="product-details">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <span className="rating-value">
            {product.rating} <FaStar className="star-icon" />
          </span>
        </div>

        <div className="product-pricing">
          <div className="price-section">
            <span className="current-price">${product.price.toFixed(2)}</span>
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          <FaShoppingCart /> Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
