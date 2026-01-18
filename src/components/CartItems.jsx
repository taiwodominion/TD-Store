import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../css/CartItems.css";

const CartItems = ({ cartItems, onUpdateItem, onRemoveItem }) => {
  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
      0
    );
  }, [cartItems]);

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  }, [cartItems]);

  const handleQuantityChange = (cartId, newQuantity) => {
    const val = parseInt(newQuantity, 10);
    if (isNaN(val) || val < 1) return;
    onUpdateItem(cartId, val);
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
            {/* UPDATED: Shows total pieces instead of just product count */}
            {totalItemCount} item{totalItemCount !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.cartId || item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-content">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${Number(item.price).toFixed(2)}</p>
                
                <div className="cart-item-controls">
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.cartId, (item.qty || 1) - 1)}
                      disabled={(item.qty || 1) <= 1}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      className="quantity-input"
                      value={item.qty || 1}
                      onChange={(e) => handleQuantityChange(item.cartId, e.target.value)}
                      min="1"
                    />

                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.cartId, (item.qty || 1) + 1)}
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
            <span className="cart-total-amount">${totalAmount.toFixed(2)}</span>
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