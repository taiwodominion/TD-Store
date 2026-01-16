import React from 'react';
import ProductCard from '../components/ProductCard';
// REMOVED: import { products } from '../data/products';
import '../css/AllCategories.css';

// Add 'products' to the props list here
const AllCategories = ({ products, onAddToCart }) => {
  const categories = ['clothes', 'shoes', 'bags', 'electronics'];

  return (
    <div className="all-categories-page">
      <div className="container">
        <h1 className="all-categories-title">Shop by Category</h1>

        {categories.map((category) => {
          // Now filtering the live 'products' passed from App.jsx
          const categoryProducts = products.filter((p) => p.category === category);

          return (
            <div key={category} className="category-section">
              <h2 className="category-title" style={{ textTransform: 'capitalize' }}>
                {category}
              </h2>

              <div className="category-grid">
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                  ))
                ) : (
                  <p className="no-products">No products found in this category.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategories;