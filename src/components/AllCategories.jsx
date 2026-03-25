import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useApp } from "../contexts/AppContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCard from "../components/ProductCard";
import "../css/AllCategories.css";

gsap.registerPlugin(ScrollTrigger);

const AllCategories = () => {
  const { allProducts, favorites, toggleFavorite, addToCart } = useApp();

  const categories = ["clothes", "shoes", "bags", "electronics"];
  const [activeTab, setActiveTab] = useState("all");
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".editorial-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      categories.forEach((_, i) => {
        gsap.from(`.section-${i} .product-card-wrapper`, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.section-${i}`,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, [allProducts]);

  const scrollToCategory = (cat) => {
    setActiveTab(cat);
    const el = document.getElementById(cat);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="all-categories-page" ref={pageRef}>
      <div className="categories-viewport">
        <header className="minimal-header">
          <div className="header-main">
            <h1 className="editorial-title">
              <span>The</span>
              <span className="accent-serif">Genre</span>
              <span>Vault</span>
            </h1>
            <div className="header-meta">
              <span className="count-badge">{categories.length}</span>
              <p className="subtitle">
                Sorted archives for efficient discovery.
              </p>
            </div>
          </div>

          <div className="utility-bar">
            <div className="filter-group">
              <button
                className={`filter-pill ${activeTab === "all" ? "active" : ""}`}
                onClick={() => {
                  setActiveTab("all");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeTab === cat ? "active" : ""}`}
                  onClick={() => scrollToCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {categories.map((category, index) => {
          const categoryProducts = allProducts.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase(),
          );

          return (
            <section
              key={category}
              id={category}
              className={`category-section section-${index}`}
            >
              <div className="category-header">
                <h2 className="category-title">{category}</h2>
                <span className="category-count">
                  {categoryProducts.length} Items
                </span>
              </div>

              <div className="category-grid grid-3col">
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <div key={product.id} className="product-card-wrapper">
                      <ProductCard
                        product={product}
                        onAddToCart={addToCart}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                      />
                    </div>
                  ))
                ) : (
                  <div className="empty-category">
                    <p>Archive currently empty.</p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategories;