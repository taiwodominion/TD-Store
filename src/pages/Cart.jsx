import React from "react";
import CartItems from "../components/CartItems";
import Footer from "../components/Footer";

const Cart = ({ cartItems, onUpdateItem, onRemoveItem, onClearCart }) => {
  return (
    <>
      <main>
        <CartItems
          cartItems={cartItems}
          onUpdateItem={onUpdateItem}
          onRemoveItem={onRemoveItem}
        />
      </main>

      {cartItems.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={onClearCart}
            className="btn btn-secondary"
            style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}
          >
            Clear Cart
          </button>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Cart;
