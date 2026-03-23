import React from "react";
import { useApp } from "../contexts/AppContext";
import CartItems from "../components/CartItems";

const Cart = () => {
  const { cartItems } = useApp();

  return (
    <div className="cart-page">
      <div className="cart-container">
        {cartItems && cartItems.length > 0 ? (
          <CartItems />
        ) : (
          <div className="cart-empty-state">
            <div className="empty-content">
              <h2>Your bag is empty</h2>
              <p>Looks like you haven't added anything to your collection yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;