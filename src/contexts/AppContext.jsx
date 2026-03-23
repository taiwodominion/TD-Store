import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
        console.error("Error fetching products:", error);
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
          setFavorites(userData.favoriteIds || []);
        }
      } else {
        setIsAdmin(false);
        setFavorites([]);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
        { favoriteIds: updatedFavorites },
        { merge: true },
      );
      showToast(isLiked ? "Removed from Favorites" : "Added to Favorites!");
    } catch (error) {
      showToast("Failed to sync favorites", "error");
    }
  };

  const addToCart = (product, quantityToAdd = 1) => {
    setCartItems((prevCart) => {
      const amount = parseInt(quantityToAdd, 10) || 1;
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty || 0) + amount }
            : item,
        );
      }
      return [...prevCart, { ...product, qty: amount, cartId: Date.now() }];
    });
    showToast("Added to cart!");
  };

  const value = {
    user,
    authLoading,
    allProducts,
    productsLoading,
    favorites,
    isAdmin,
    cartItems,
    toast,
    isTransitioning,
    setIsTransitioning,
    showToast,
    toggleFavorite,
    addToCart,
    setToast,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
