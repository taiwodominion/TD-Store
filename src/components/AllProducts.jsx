import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import '../css/AllProducts.css';

const AllProducts = ({ onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('name');

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
          <h1>All Products</h1>
          <select 
            value={sortBy} 
            onChange={(e) => handleSort(e.target.value)}
            className="sort-input"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="all-products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
