import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../css/NewArrivals.css";

const newArrivals = [
  {
    id: 1,
    name: "Minimalist Sneakers",
    price: 89.99,
    image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Soft Cotton Hoodie",
    price: 49.99,
    image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Modern Backpack",
    price: 64.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Stylish Sunglasses",
    price: 39.99,
    image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
},
  {
    id: 5,
    name: "Leather Wallet",
    price: 59.99,
    image:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Casual Denim Jacket",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?w=400&h=400&fit=crop",
  },
];

const NewArrivals = () => {
  const [likedItems, setLikedItems] = useState([]);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="new-arrivals-section">
      <div className="new-arrivals-header">
        <h2>🆕 New Arrivals</h2>
        <p>Check out the latest additions to TD Store</p>
      </div>

      <div className="products-container">
        {newArrivals.map((item) => (
          <div className="product-card" key={item.id}>
            <FontAwesomeIcon icon={faHeart}
              className={`like-icon ${
                likedItems.includes(item.id) ? "liked" : ""
              }`}
              onClick={() => toggleLike(item.id)}
            />
            <img src={item.image} alt={item.name} />
            <h3 className="product-title">{item.name}</h3>
            <div className="product-bottom">
              <span className="product-price">${item.price}</span>
              <button className="add-btn">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;