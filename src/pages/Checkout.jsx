import React, { useState } from 'react';
import CheckoutCard from '../components/CheckoutCard';
import Footer from '../components/Footer';
import "../css/Admin.css"; // Re-using your clean admin form styles

const Checkout = ({ cartItems, onPlaceOrder }) => {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd validate the card here
    onPlaceOrder(customerInfo);
  };

  return (
    <div className="checkout-page-wrapper">
      <main className="admin-main" style={{ marginLeft: 0, padding: '40px' }}>
        <div className="form-row" style={{ alignItems: 'flex-start', gap: '40px' }}>
          
          <div className="content-card" style={{ flex: 1, margin: 0 }}>
            <form id="checkout-form" onSubmit={handleSubmit} className="admin-form">
              <h2>Shipping Details</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" required onChange={(e) => setCustomerInfo({...customerInfo, fullName: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Shipping Address</label>
                <input type="text" required onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} />
              </div>

              <h2 style={{ marginTop: '30px' }}>Payment</h2>
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="xxxx xxxx xxxx xxxx" maxLength="16" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT: The Summary Card */}
          <div style={{ width: '380px', position: 'sticky', top: '20px' }}>
            <CheckoutCard 
              cartItems={cartItems} 
              onPlaceOrder={() => document.getElementById('checkout-form').requestSubmit()} 
            />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;