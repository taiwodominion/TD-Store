import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  ChevronLeft,
  Lock,
  MapPin,
  User,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import CheckoutCard from "../components/CheckoutCard";
import Footer from "../components/Footer";
import "../css/CheckoutCard.css";

const Checkout = ({ cartItems, onPlaceOrder }) => {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(".checkout-anim", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlaceOrder(customerInfo);
  };

  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-nav-mini">
        <Link to="/cart" className="back-link">
          <ChevronLeft size={18} />
          <span>Return to Bag</span>
        </Link>
        <div className="secure-badge">
          <Lock size={14} />
          <span>Secure Checkout</span>
        </div>
      </div>

      <main className="checkout-main-content">
        <div className="checkout-flex-container">
          <div className="checkout-form-column checkout-anim">
            <header className="checkout-header">
              <h1 className="checkout-main-title">Shipping & Payment</h1>
              <p className="checkout-subtitle">
                Complete your order by providing your delivery and payment
                details.
              </p>
            </header>

            <form
              id="checkout-form"
              onSubmit={handleSubmit}
              className="checkout-modern-form"
            >
              <section className="form-section">
                <div className="section-title-group">
                  <div className="section-icon">
                    <Truck size={20} />
                  </div>
                  <h2 className="section-heading">Delivery Information</h2>
                </div>

                <div className="input-grid">
                  <div className="modern-input-group">
                    <User className="input-icon" size={18} />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={customerInfo.fullName}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="modern-input-group">
                    <Mail className="input-icon" size={18} />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="modern-input-group full-width">
                    <MapPin className="input-icon" size={18} />
                    <input
                      type="text"
                      placeholder="Street Address"
                      required
                      value={customerInfo.address}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="checkout-form-split">
                    <div className="modern-input-group">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={customerInfo.city}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="modern-input-group">
                      <input
                        type="text"
                        placeholder="Zip Code"
                        required
                        value={customerInfo.zipCode}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            zipCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="form-section">
                <div className="section-title-group">
                  <div className="section-icon">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="section-heading">Payment Method</h2>
                </div>

                <div className="input-grid">
                  <div className="modern-input-group full-width">
                    <CreditCard className="input-icon" size={18} />
                    <input
                      type="text"
                      placeholder="Card Number"
                      maxLength="16"
                    />
                  </div>

                  <div className="checkout-form-split">
                    <div className="modern-input-group">
                      <input type="text" placeholder="MM / YY" />
                    </div>
                    <div className="modern-input-group">
                      <input type="password" placeholder="CVV" maxLength="3" />
                    </div>
                  </div>
                </div>

                <div className="security-notice">
                  <ShieldCheck size={16} />
                  <span>
                    Your transaction is encrypted with 256-bit SSL security
                  </span>
                </div>
              </section>
            </form>
          </div>

          <aside className="checkout-summary-column checkout-anim">
            <CheckoutCard
              cartItems={cartItems}
              onPlaceOrder={() =>
                document.getElementById("checkout-form").requestSubmit()
              }
            />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
