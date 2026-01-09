import React from "react";
import { Link } from "react-router-dom";
import "../css/HeroCategories.css";

const HeroCategories = () => {
  const categories = [
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop",
      link: "/categories?filter=clothes",
      count: "120+ Items"
    },
    {
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop",
      link: "/categories?filter=shoes",
      count: "80+ Items"
    },
    {
      name: "Bags",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      link: "/categories?filter=bags",
      count: "45+ Items"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
      link: "/categories?filter=accessories",
      count: "200+ Items"
    }
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <div className="categories-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/categories" className="view-all-link">View All Categories →</Link>
        </div>
        
        <div className="categories-container">
          {categories.map((category) => (
            <Link to={category.link} key={category.name} className="category-card">
              <div className="cat-image-wrapper">
                <img src={category.image} alt={category.name} loading="lazy" />
                <div className="cat-overlay">
                  <div className="cat-info">
                    <span className="cat-count">{category.count}</span>
                    <h3 className="cat-name">{category.name}</h3>
                    <span className="cat-btn">Explore Now</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCategories;