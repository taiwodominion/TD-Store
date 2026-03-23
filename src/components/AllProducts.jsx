import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import gsap from "gsap";
import ProductCard from "../components/ProductCard";
import "../css/AllProducts.css";

const AllProducts = () => {
  const { allProducts, favorites, toggleFavorite, addToCart } = useApp();

  const [displayProducts, setDisplayProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const gridRef = useRef(null);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: "Default", value: "name" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Top Rated", value: "rating" },
  ];

  useEffect(() => {
    let result = [...allProducts];

    if (filter === "new") {
      result = result.filter((p) => p.isNew);
    } else if (filter === "sale") {
      result = result.filter((p) => p.onSale);
    } else if (filter !== "all") {
      result = result.filter((p) => p.category === filter);
    }

    result.sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return a.name.localeCompare(b.name);
    });

    setDisplayProducts(result);
  }, [allProducts, filter, sortBy]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card-anim",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
      );
    }, gridRef);
    return () => ctx.revert();
  }, [displayProducts]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSortLabel = sortOptions.find(
    (opt) => opt.value === sortBy,
  )?.label;

  return (
    <div className="all-products-page" ref={gridRef}>
      <div className="products-viewport">
        <header className="minimal-header">
          <div className="header-main">
            <h1 className="editorial-title">
              <span>The</span>
              <span className="accent-serif">Full</span>
              <span>Index</span>
            </h1>
            <div className="header-meta">
              <span className="count-badge">{displayProducts.length}</span>
              <p className="subtitle">
                Curated essentials for the intentional home.
              </p>
            </div>
          </div>

          <div className="utility-bar">
            <div className="filter-group">
              <button
                className={`filter-pill ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All Items
              </button>
              <button
                className={`filter-pill ${filter === "new" ? "active" : ""}`}
                onClick={() => setFilter("new")}
              >
                New
              </button>
              <button
                className={`filter-pill ${filter === "sale" ? "active" : ""}`}
                onClick={() => setFilter("sale")}
              >
                Sale
              </button>
            </div>

            <div className="custom-dropdown-container" ref={dropdownRef}>
              <button
                className={`dropdown-trigger ${isSortOpen ? "active" : ""}`}
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <span>{currentSortLabel}</span>
                <ChevronDown size={16} className={isSortOpen ? "rotate" : ""} />
              </button>

              {isSortOpen && (
                <div className="dropdown-menu">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`dropdown-item ${sortBy === option.value ? "selected" : ""}`}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="all-products-grid">
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => (
              <div key={product.id} className="product-card-anim">
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
