import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useApp } from "./contexts/AppContext";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
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
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Toast from "./components/Toast";
import OrderSuccess from "./components/OrderSuccess";
import PageTransition from "./components/PageTransition";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";

import { ShieldAlert, ArrowLeft } from "lucide-react";
import "./css/App.css";

const App = () => {
  const { 
    user, 
    authLoading, 
    productsLoading, 
    isAdmin, 
    isTransitioning, 
    setIsTransitioning 
  } = useApp();

  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
  }, [location.pathname, setIsTransitioning]);

  if (authLoading || productsLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div><div></div>
        </div>
        <p className="loading-logo">TDStore</p>
      </div>
    );
  }

  const ProtectedAdmin = ({ isAdmin, children }) => {
    if (!isAdmin) {
      return (
        <div className="access-denied-container">
          <div className="access-denied-card">
            <ShieldAlert size={48} color="#e63946" />
            <h2>Restricted Access</h2>
            <p>This area is reserved for administrators only. If you believe this is an error, please contact support.</p>
            <button onClick={() => window.history.back()} className="btn-back">
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </div>
      );
    }
    return children;
  };

  return (
    <>
      {isTransitioning && (
        <PageTransition onComplete={() => setIsTransitioning(false)} />
      )}

      <Navbar />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Admin Routes */}
        <Route
          path="/xP6ONBgj/admin"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />
        <Route
          path="/xP6ONBgj/admin/orders"
          element={
            <ProtectedAdmin isAdmin={isAdmin}>
              <AdminOrders />
            </ProtectedAdmin>
          }
        />
      </Routes>

      <BottomNav />
      <Toast />
    </>
  );
};

export default App;