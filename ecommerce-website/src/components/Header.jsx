import { motion } from 'framer-motion';
import { FaShoppingCart, FaSearch, FaShoppingBag } from 'react-icons/fa';
import './Header.css';

const Header = ({ cartCount, onCartClick, onSearch }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="header"
    >
      <div className="header-container">
        <div className="header-logo">
          <FaShoppingBag className="logo-icon" />
          <span className="logo-text">ShopHub</span>
          <span className="logo-tagline">Plus</span>
        </div>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            onChange={(e) => onSearch(e.target.value)}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="header-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cart-button"
            onClick={onCartClick}
          >
            <FaShoppingCart />
            <span>Cart</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="cart-count"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
