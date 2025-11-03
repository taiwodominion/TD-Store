import React from "react";
import { Link } from "react-router-dom";
import "../css/HeroCategories.css";

const HeroCategories = () => {
  const categories = [
    {
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop",
      link: "/categories?filter=clothes",
    },
    {
      name: "Shoes",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      link: "/categories?filter=shoes",
    },
    {
      name: "Bags",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      link: "/categories?filter=bags",
    },
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      link: "/categories?filter=electronics",
    },
  ];

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={category.link} key={category.name} className="card">
              <div className="image_container">
                <img src={category.image} alt={category.name} className="image" />
              </div>
              <div className="title">
                <span>{category.name}</span>
              </div>
              <button className="cart-button">
                <span>Explore</span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCategories;
