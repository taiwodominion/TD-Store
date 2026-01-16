import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
// REMOVED: import { products } from '../data/products';
import '../css/AllProducts.css';

// 1. Receive 'products' as a prop
const AllProducts = ({ products, onAddToCart }) => {
  // Use products prop as the initial state
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('name');

  // 2. Synchronize the local state with the props from Firebase
  useEffect(() => {
    // When the app first loads, products might be empty for a split second.
    // This effect runs again as soon as the data arrives from App.jsx.
    setFilteredProducts(products);
  }, [products]);

  const handleSort = (value) => {
    setSortBy(value);
    const sorted = [...filteredProducts].sort((a, b) => {
      if (value === 'price-low') return a.price - b.price;
      if (value === 'price-high') return b.price - a.price;
      if (value === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
    setFilteredProducts(sorted);
  };

  return (
    <div className="all-products-page">
      <div className="container">
        <div className="all-products-header">
          <h1>All Products ({filteredProducts.length})</h1>
          <select 
            value={sortBy} 
            onChange={(e) => handleSort(e.target.value)}
            className="sort-input"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="all-products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="loading-state">
              <p>No products found...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;