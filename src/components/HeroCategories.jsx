import React from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import "../css/HeroCategories.css";

const HeroCategories = () => {
  const categories = [
    {
      name: "The Atelier",
      sub: "Clothing",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop",
      link: "/categories?filter=clothes",
      label: "120+ Pieces",
    },
    {
      name: "Step Forward",
      sub: "Footwear",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop",
      link: "/categories?filter=shoes",
      label: "80+ Pieces",
    },
    {
      name: "Essential Carry",
      sub: "Handbags",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      link: "/categories?filter=bags",
      label: "45+ Pieces",
    },
    {
      name: "Finishing Touches",
      sub: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
      link: "/categories?filter=accessories",
      label: "200+ Pieces",
    },
  ];

  return (
    <section className="cat-section">
      <div className="cat-wrapper">
        <div className="cat-intro">
          <div className="cat-title-area">
            <span className="cat-pre">CURATED SELECTIONS</span>
            <h2 className="cat-main-title">
              Shop by <span className="italic-serif">Category</span>
            </h2>
          </div>
          <Link to="/categories" className="cat-master-link">
            Explore Full Catalog <MoveRight size={20} />
          </Link>
        </div>

        <div className="cat-grid">
          {categories.map((cat, index) => (
            <Link
              to={cat.link}
              key={cat.name}
              className={`cat-item item-${index}`}
            >
              <div className="cat-img-box">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <div className="cat-label-tag">{cat.label}</div>
              </div>
              <div className="cat-meta">
                <span className="cat-subtext">{cat.sub}</span>
                <h3 className="cat-display-name">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCategories;
