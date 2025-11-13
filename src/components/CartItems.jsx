import React from "react";
import { Link } from "react-router-dom";
import "../css/CartItems.css";

const CartItems = ({ cartItems, onUpdateItem, onRemoveItem }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateItem(cartId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-checkout">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-subtitle">
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={item.cartId} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-content">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.cartId, Number(e.target.value))}
                      min="1"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="cart-item-remove"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <span className="cart-total-label">Total Amount:</span>
            <span className="cart-total-amount">${total.toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <Link to="/products" className="btn btn-continue">
              ← Continue Shopping
            </Link>
            <Link to="/checkout" className="btn btn-checkout">
              Proceed to Checkout →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;