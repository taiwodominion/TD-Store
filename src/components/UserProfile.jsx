import React, { useEffect, useState, useRef } from "react";
import { db, storage } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Heart,
  Edit3,
  Save,
  X,
  ChevronRight,
  Package,
  Star,
  Loader2,
  Camera,
} from "lucide-react";
import ProductCard from "../components/ProductCard"; // Import your existing card
import "../css/UserProfile.css";

const UserProfile = ({
  user,
  allProducts,
  favorites,
  toggleFavorite,
  onAddToCart,
}) => {
  const [extraData, setExtraData] = useState({
    name: "",
    phone: "",
    address: "",
    role: "Customer",
    photoURL: "",
  });
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const cardRef = useRef(null);
  const navigate = useNavigate();

  // Filter products based on the favorites array passed via props
  const favoriteProducts =
    Array.isArray(allProducts) && Array.isArray(favorites)
      ? allProducts.filter((product) => favorites.includes(product.id))
      : [];

  useEffect(() => {
    if (user) {
      fetchUserData();

      // GSAP Animation with clearProps to fix blurriness
      gsap.from(cardRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(cardRef.current, { clearProps: "all" });
        },
      });
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setExtraData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchOrders = async () => {
    if (orders.length > 0) return;
    setLoadingOrders(true);
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Max 2MB.");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await setDoc(doc(db, "users", user.uid), { photoURL }, { merge: true });
      setExtraData((prev) => ({ ...prev, photoURL }));
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), extraData, { merge: true });
      setIsEditing(false);
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-card">
          <User size={48} />
          <h2>Access Denied</h2>
          <p>Please sign in to view your profile settings.</p>
          <Link to="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-grid" ref={cardRef}>
        <div className="profile-sidebar">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-main">
              {uploading ? (
                <Loader2 className="spinner" size={24} />
              ) : (
                <img
                  src={
                    extraData?.photoURL ||
                    user.photoURL ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=" +
                      user.uid
                  }
                  alt="User"
                />
              )}
              <label className="avatar-edit-label">
                <Camera size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </label>
            </div>
            <span className="role-badge">{extraData?.role || "Member"}</span>
          </div>

          <h2 className="user-display-name">
            {extraData?.name || "User Account"}
          </h2>
          <p className="user-email-text">{user.email}</p>

          <div className="profile-nav-tabs">
            <button
              className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              <User size={18} /> Account Info
            </button>
            <button
              className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("orders");
                fetchOrders();
              }}
            >
              <ShoppingBag size={18} /> Order History
            </button>
            <button
              className={`tab-btn ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              <Heart size={18} /> My Favorites ({favoriteProducts.length})
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="profile-main-content">
          {activeTab === "details" && (
            <div className="content-section">
              <div className="section-header">
                <h3>Personal Information</h3>
                {!isEditing ? (
                  <button
                    className="icon-edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 size={18} /> Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button
                      className="save-mini-btn"
                      onClick={handleUpdateProfile}
                    >
                      <Save size={16} /> Save
                    </button>
                    <button
                      className="cancel-mini-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="details-form-grid">
                <div className="form-item">
                  <label>
                    <User size={14} /> Full Name
                  </label>
                  {isEditing ? (
                    <input
                      value={extraData.name}
                      onChange={(e) =>
                        setExtraData({ ...extraData, name: e.target.value })
                      }
                    />
                  ) : (
                    <p>{extraData.name || "Add your name"}</p>
                  )}
                </div>

                <div className="form-item">
                  <label>
                    <Phone size={14} /> Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      value={extraData.phone}
                      onChange={(e) =>
                        setExtraData({ ...extraData, phone: e.target.value })
                      }
                    />
                  ) : (
                    <p>{extraData.phone || "Add phone number"}</p>
                  )}
                </div>

                <div className="form-item full-width">
                  <label>
                    <MapPin size={14} /> Delivery Address
                  </label>
                  {isEditing ? (
                    <textarea
                      value={extraData.address}
                      onChange={(e) =>
                        setExtraData({ ...extraData, address: e.target.value })
                      }
                    />
                  ) : (
                    <p>{extraData.address || "No address saved"}</p>
                  )}
                </div>

                <div className="form-item">
                  <label>
                    <Calendar size={14} /> Member Since
                  </label>
                  <p>
                    {user.metadata.creationTime
                      ? new Date(
                          user.metadata.creationTime,
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="content-section">
              <h3>Recent Orders</h3>
              {loadingOrders ? (
                <div className="loading-state">
                  <Loader2 className="spinner" /> Loading orders...
                </div>
              ) : orders.length === 0 ? (
                <div className="empty-state">
                  <Package size={40} />
                  <p>No orders yet.</p>
                  <Link to="/products" className="btn-shop">
                    Explore Collection
                  </Link>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card-item">
                      <div className="order-info">
                        <span className="order-id">
                          #{order.id.slice(-6).toUpperCase()}
                        </span>
                        <span className="order-date">
                          {new Date(
                            order.createdAt?.seconds * 1000,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="order-meta">
                        <span className="order-total">
                          ${order.totalAmount?.toFixed(2)}
                        </span>
                        <span
                          className={`order-status ${order.status?.toLowerCase()}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </div>
                      <ChevronRight size={18} className="arrow" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="content-section">
              <h3>Your Wishlist</h3>
              {favoriteProducts.length === 0 ? (
                <div className="empty-state">
                  <Heart size={40} />
                  <p>Your wishlist is currently empty.</p>
                  <Link to="/products" className="btn-shop">
                    Find something you love
                  </Link>
                </div>
              ) : (
                <div className="products-grid">
                  {favoriteProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      favorites={favorites}
                      onToggleFavorite={toggleFavorite}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
