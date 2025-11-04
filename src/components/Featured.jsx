import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../css/Featured.css'

const Featured = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setFeaturedProducts(products.slice(0, 7));
  }, []);

  return (
        <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="section-link">
              View All Products →
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        </div>
      </section>
  )
}

export default Featured