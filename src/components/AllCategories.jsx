import React from "react";
import ProductCard from "../components/ProductCard";
import "../css/AllCategories.css";

const AllCategories = ({
  products,
  onAddToCart,
  favorites = [],
  onToggleFavorite,
}) => {
  const categories = ["clothes", "shoes", "bags", "electronics"];

  return (
    <div className="all-categories-page">
      <div className="container" style={{ marginTop: "100px" }}>
        <h1 className="all-categories-title">Shop by Category</h1>

        {categories.map((category) => {
          const categoryProducts = products.filter(
            (p) => p.category === category,
          );

          return (
            <div key={category} className="category-section">
              <h2
                className="category-title"
                style={{ textTransform: "capitalize" }}
              >
                {category}
              </h2>

              <div className="category-grid">
                {categoryProducts.length > 0 ? (
                  categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                      favorites={favorites} // Pass to card
                      onToggleFavorite={onToggleFavorite} // Pass to card
                    />
                  ))
                ) : (
                  <p className="no-products">
                    No products found in this category.
                  </p>
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
