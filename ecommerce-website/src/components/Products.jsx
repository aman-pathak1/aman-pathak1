import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import './Products.css';

const Products = ({ products, onAddToCart, selectedCategory }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2 className="products-title">
            {selectedCategory === 'all' ? 'All Products' : `${selectedCategory} Products`}
          </h2>
          <p className="products-subtitle">
            {filteredProducts.length} Products Available
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="products-grid"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
