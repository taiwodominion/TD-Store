import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, setDoc, doc, getDoc, addDoc } from "firebase/firestore";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetail from "./components/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Toast from "./components/Toast";
import OrderSuccess from "./components/OrderSuccess";

import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";

import "./css/App.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [allProducts, setAllProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const toggleFavorite = async (productId) => {
    if (!user) {
      showToast("Please login to save favorites!", "error");
      return;
    }

    const isLiked = favorites.includes(productId);
    const updatedFavorites = isLiked
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updatedFavorites);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          favoriteIds: updatedFavorites,
        },
        { merge: true },
      );

      if (!isLiked) {
        showToast("Added to Favorites!");
      } else {
        showToast("Removed from Favorites", "success");
      }
    } catch (error) {
      console.error("Error syncing favorites:", error);
      showToast("Failed to sync favorites", "error");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === "admin");
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's saved favorites from Firestore on login
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            // Update state with what is actually in the database
            setFavorites(docSnap.data().favoriteIds || []);
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      } else {
        setFavorites([]);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, quantityToAdd) => {
    setCartItems((prevCart) => {
      const amount = parseInt(quantityToAdd, 10) || 1;
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id.toString() === product.id.toString(),
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        // Use 'qty' consistently
        const currentQty =
          parseInt(updatedCart[existingItemIndex].qty, 10) || 0;
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          qty: currentQty + amount,
        };
        return updatedCart;
      }

      // New item: Add a cartId so handleUpdateItem can find it later
      return [
        ...prevCart,
        { ...product, qty: amount, cartId: Date.now() + Math.random() },
      ];
    });
  };

  // 2. Updated handleUpdateItem: Must use 'qty' to match addToCart
  const handleUpdateItem = (cartId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.cartId === cartId ? { ...item, qty: parseInt(newQty, 10) } : item,
      ),
    );
  };

  const handleRemoveItem = (cartId) => {
    setCartItems(cartItems.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCartItems([]);

  if (authLoading || productsLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div></div> <div></div> <div></div> <div></div> <div></div>
          <div></div> <div></div> <div></div> <div></div> <div></div>
        </div>
        <p>TDStore</p>
      </div>
    );
  }

  const ProtectedAdmin = ({ isAdmin, children }) => {
    if (!isAdmin) {
      return (
        <div style={{ marginTop: "100px", textAlign: "center" }}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view this page.</p>
        </div>
      );
    }
    return children;
  };

  // const handlePlaceOrder = async (customerData) => {
  //   if (cartItems.length === 0) {
  //     alert("Your cart is empty");
  //     return;
  //   }

  //   try {
  //     console.log("Saving order for:", customerData);

  //     setCartItems([]);

  //     navigate("/order-success", {
  //       state: { orderId: "TD-" + Math.random().toString(36).substr(2, 9) },
  //     });
  //   } catch (error) {
  //     console.error("Order Error:", error);
  //   }
  // };

  const handlePlaceOrder = async (customerData) => {
    if (cartItems.length === 0) return;

    try {
      // 1. Calculate the final total (same logic as your checkout card)
      const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
      );
      const tax = subtotal * 0.08;
      const shipping = subtotal > 100 ? 0 : 15;
      const finalTotal = subtotal + tax + shipping;

      // 2. Save the order to Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        customer: customerData,
        items: cartItems,
        totalAmount: finalTotal,
        status: "Pending", // Default status for Admin to see
        createdAt: new Date(),
        orderNumber: "TD-" + Math.floor(Math.random() * 1000000),
      });

      // 3. Clear the Cart
      setCartItems([]);
      localStorage.removeItem("cart");

      // 4. Navigate to Success Page with the Order ID from Firebase
      navigate("/order-success", {
        state: { orderId: orderRef.id },
      });
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + (item.qty || 0), 0)}
        cartItems={cartItems}
        user={user}
        favorites={favorites}
        onLogout={handleLogout}
        products={allProducts}
      />

      <Routes>
        {/* 6. PASS PRODUCTS TO PAGES */}
        <Route
          path="/"
          element={
            <Home
              onAddToCart={addToCart}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              products={allProducts}
            />
          }
        />

        <Route
          path="/products"
          element={
            <Products
              onAddToCart={addToCart}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              products={allProducts}
            />
          }
        />

        <Route
          path="/product/:productId"
          element={
            <ProductDetail
              onAddToCart={addToCart}
              favorites={favorites} // Add this
              onToggleFavorite={toggleFavorite}
              products={allProducts}
            />
          }
        />

        <Route
          path="/categories"
          element={
            <Categories
              onAddToCart={addToCart}
              favorites={favorites} // The baton!
              onToggleFavorite={toggleFavorite}
              products={allProducts}
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
              onClearCart={clearCart}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              user={user}
              allProducts={allProducts}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              cartItems={cartItems}
              onLogout={handleLogout}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route
          path="/checkout"
          element={
            <Checkout cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />
          }
        />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <AdminDashboard products={allProducts} showToast={showToast} />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <AdminOrders />
            </ProtectedAdmin>
          }
        />
      </Routes>
    </>
  );
};

export default App;
