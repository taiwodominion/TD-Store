import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../css/CheckoutCard.css";

const CheckoutCard = ({ cartItems = [], onPlaceOrder }) => {
  console.log("Data at CheckoutCard:", cartItems);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      const quantity = Number(item.qty || item.quantity || 0);
      const price = Number(item.price || 0);
      return sum + (price * quantity);
    }, 0);
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.0;
    const tax = subtotal * 0.08;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  }, [cartItems]);

  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty || 0), 0);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-card">
        <h3 className="checkout-card-title">Order Summary</h3>
        <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>Your cart is empty.</p>
        <Link to="/products" className="btn-place-order" style={{ textDecoration: "none", textAlign: "center" }}>
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-card">
      <h3 className="checkout-card-title">Order Summary</h3>
      <div className="checkout-summary-list">
        {cartItems.map((item) => (
          <div key={item.cartId || item.id} className="summary-item">
            <span className="summary-item-info">{item.qty}x {item.name}</span>
            <span className="summary-item-price">${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr className="checkout-divider" />
      <div className="checkout-math">
        <div className="math-row">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="math-row">
          <span>Shipping</span>
          <span>{totals.shipping === 0 ? "FREE" : `$${totals.shipping.toFixed(2)}`}</span>
        </div>
        <div className="math-row">
          <span>Tax</span>
          <span>${totals.tax.toFixed(2)}</span>
        </div>
        <div className="math-row total-row">
          <span>Total</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>
      </div>
      <button className="btn-place-order" onClick={onPlaceOrder}>Place Order</button>
    </div>
  );
};

export default CheckoutCard;