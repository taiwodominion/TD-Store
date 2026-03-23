import React, { useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import gsap from "gsap";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  PackageCheck,
} from "lucide-react";
import "../css/CartItems.css";

const CartItems = () => {
  const { cartItems, updateCartQty, removeFromCart } = useApp();

  const totalAmount = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
      0,
    );
  }, [cartItems]);

  const totalItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  }, [cartItems]);

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cart-item-anim", {
        x: -30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".cart-summary-sticky", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "expo.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, [cartItems.length]);

  const handleQuantityChange = (cartId, newQuantity) => {
    const val = parseInt(newQuantity, 10);
    if (isNaN(val) || val < 1) return;
    updateCartQty(cartId, val);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state">
        <div className="empty-content">
          <div className="empty-icon-wrapper">
            <ShoppingBag size={60} strokeWidth={1} />
          </div>
          <h2>Your bag is empty</h2>
          <p>
            The pieces you love are waiting for you. Under the direction of
            Taiwo Dominion, our latest collection is live.
          </p>
          <Link to="/products" className="shop-now-link">
            Start Exploring <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-view-container" ref={containerRef}>
      <div className="cart-grid-layout">
        <div className="cart-items-section">
          <div className="section-header">
            <h1 className="main-title">Shopping Bag</h1>
            <span className="count-badge">{totalItemCount} Items</span>
          </div>

          <div className="cart-list">
            {cartItems.map((item) => (
              <div
                key={item.cartId || item.id}
                className="cart-item-card cart-item-anim"
              >
                <div className="item-img-container">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-info">
                  <div className="item-info-top">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-sku">
                      SKU: TD-{Math.floor(1000 + Math.random() * 9000)}
                    </p>
                  </div>

                  <div className="item-actions-row">
                    <div className="qty-stepper">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.cartId, (item.qty || 1) - 1)
                        }
                        disabled={(item.qty || 1) <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <input type="number" value={item.qty || 1} readOnly />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.cartId, (item.qty || 1) + 1)
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      className="remove-link"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      <Trash2 size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="item-price-column">
                  <p className="unit-price">${Number(item.price).toFixed(2)}</p>
                  <p className="subtotal-price">
                    ${(Number(item.price) * (item.qty || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/products" className="back-to-shop">
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="cart-summary-section">
          <div className="cart-summary-sticky">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-tag">Calculated at checkout</span>
              </div>
              <div className="summary-row">
                <span>Estimated Tax</span>
                <span>$0.00</span>
              </div>

              <div className="summary-total">
                <div className="total-label-group">
                  <span className="total-label">Total</span>
                  <span className="tax-note">Including VAT</span>
                </div>
                <span className="total-price">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="trust-badges">
              <div className="badge">
                <PackageCheck size={16} />
                <span>Fast Global Shipping</span>
              </div>
              <div className="badge">
                <CreditCard size={16} />
                <span>Secure Payment</span>
              </div>
            </div>

            <Link to="/checkout" className="checkout-btn-main">
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
