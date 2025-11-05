import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../css/AllCategories.css';

const AllCategories = ({ onAddToCart }) => {
  const categories = ['clothes', 'shoes', 'bags', 'electronics'];

  return (
    <div className="all-categories-page">
      <div className="container">
        <h1 className="all-categories-title">Shop by Category</h1>

        {categories.map((category) => {
          const categoryProducts = products.filter((p) => p.category === category);

          return (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>

              <div className="category-grid">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategories;
