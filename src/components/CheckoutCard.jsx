import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import "../css/CheckoutCard.css";

const CheckoutCard = ({ cartItems = [], onPlaceOrder }) => {
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      const quantity = Number(item.qty || 0);
      const price = Number(item.price || 0);
      return sum + price * quantity;
    }, 0);
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.0;
    const tax = subtotal * 0.08;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-card empty-card">
        <ShoppingBag size={40} strokeWidth={1} />
        <p>No items found in your bag.</p>
        <Link to="/products" className="btn-return">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-card">
      <h3 className="checkout-card-title">Order Ledger</h3>

      <div className="checkout-summary-list">
        {cartItems.map((item) => (
          <div key={item.cartId || item.id} className="summary-item">
            <div className="summary-item-left">
              <span className="item-qty-circle">{item.qty}</span>
              <span className="summary-item-info">{item.name}</span>
            </div>
            <span className="summary-item-price">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="checkout-math">
        <div className="math-row">
          <span>Subtotal</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="math-row">
          <span>Shipping</span>
          <span className={totals.shipping === 0 ? "free-text" : ""}>
            {totals.shipping === 0
              ? "Complimentary"
              : `$${totals.shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="math-row">
          <span>Estimated Tax</span>
          <span>${totals.tax.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <div className="total-label-box">
            <span className="total-main-label">Grand Total</span>
            <span className="currency-type">USD</span>
          </div>
          <span className="total-price-value">${totals.total.toFixed(2)}</span>
        </div>
      </div>

      <button className="btn-place-order" onClick={onPlaceOrder}>
        <span>Complete Purchase</span>
        <ArrowRight size={20} />
      </button>

      <p className="checkout-legal">
        By placing your order, you agree to the TD-Store Terms of Service and
        Privacy Policy.
      </p>
    </div>
  );
};

export default CheckoutCard;
