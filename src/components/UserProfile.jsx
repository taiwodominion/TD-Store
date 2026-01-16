// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faEnvelope,
//   faCalendarAlt,
//   faShoppingBag,
// } from "@fortawesome/free-solid-svg-icons";
// import "../css/UserProfile.css";

// const UserProfile = ({ user }) => {
//   const [extraData, setExtraData] = useState(null);
//   const [fetchingFirestore, setFetchingFirestore] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (user && !fetchingFirestore) {
//         setFetchingFirestore(true);
//         try {
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setExtraData(docSnap.data());
//           }
//         } catch (error) {
//           console.error("Firestore error:", error);
//         }
//       }
//     };
//     fetchUserData();
//   }, [user, fetchingFirestore]);

//   // If App.jsx is still loading auth, UserProfile shouldn't show anything yet
//   if (!user) {
//     return (
//       <div className="profile-container">
//         <div className="profile-card">
//           <h2>Access Denied</h2>
//           <p>Please log in to view your profile.</p>
//           <Link to="/login" className="login-btn-link">Go to Login</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-avatar">
//             {user.photoURL ? (
//               <img src={user.photoURL} alt="Profile" />
//             ) : (
//               <FontAwesomeIcon icon={faUser} />
//             )}
//           </div>
//           <h2>{extraData?.name || user.displayName || "User Account"}</h2>
//           <span className="badge">{extraData?.role || "Customer"}</span>
//         </div>

//         <div className="profile-details">
//           <div className="detail-item">
//             <FontAwesomeIcon icon={faEnvelope} />
//             <div>
//               <label>Email Address</label>
//               <p>{user.email}</p>
//             </div>
//           </div>

//           <div className="detail-item">
//             <FontAwesomeIcon icon={faCalendarAlt} />
//             <div>
//               <label>Member Since</label>
//               <p>
//                 {user.metadata?.creationTime
//                   ? new Date(user.metadata.creationTime).toLocaleDateString()
//                   : "N/A"}
//               </p>
//             </div>
//           </div>

//           {extraData?.phone && (
//             <div className="detail-item">
//               <label>Phone Number</label>
//               <p>{extraData.phone}</p>
//             </div>
//           )}
//         </div>

//         <div className="profile-actions">
//           <button className="edit-btn">Edit Profile</button>
//           <button className="orders-btn">
//             <FontAwesomeIcon icon={faShoppingBag} /> View Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendarAlt,
  faShoppingBag,
  faSave,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "../css/UserProfile.css";

const UserProfile = ({ user }) => {
  const [extraData, setExtraData] = useState({ name: "", phone: "" });
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // Fetch User Profile Data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setExtraData(docSnap.data());
          }
        } catch (error) {
          console.error("Firestore error:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  // Fetch Order History
  const fetchOrders = async () => {
    setShowOrders(true);
    if (orders.length > 0) return; // Don't refetch if already loaded
    setLoadingOrders(true);
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), extraData, { merge: true });
      setIsEditing(false);
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  if (!user) {
    return (
      <div className="profile-container"><div className="profile-card"><h2>Access Denied</h2><Link to="/login">Go to Login</Link></div></div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.photoURL ? <img src={user.photoURL} alt="Profile" /> : <FontAwesomeIcon icon={faUser} />}
          </div>
          {isEditing ? (
            <input 
              className="edit-input-name"
              value={extraData.name} 
              onChange={(e) => setExtraData({...extraData, name: e.target.value})}
              placeholder="Enter your name"
            />
          ) : (
            <h2>{extraData?.name || user.displayName || "User Account"}</h2>
          )}
          <span className="badge">{extraData?.role || "Customer"}</span>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FontAwesomeIcon icon={faEnvelope} />
            <div>
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="detail-item">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <div>
              <label>Phone Number</label>
              {isEditing ? (
                <input 
                  value={extraData.phone} 
                  onChange={(e) => setExtraData({...extraData, phone: e.target.value})}
                  placeholder="Phone number"
                />
              ) : (
                <p>{extraData?.phone || "Not set"}</p>
              )}
            </div>
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleUpdateProfile}><FontAwesomeIcon icon={faSave} /> Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}><FontAwesomeIcon icon={faTimes} /> Cancel</button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
          <button className="orders-btn" onClick={fetchOrders}>
            <FontAwesomeIcon icon={faShoppingBag} /> {showOrders ? "Hide Orders" : "View Orders"}
          </button>
        </div>

        {/* Order History Section */}
        {showOrders && (
          <div className="order-history">
            <h3>Order History</h3>
            {loadingOrders ? <p>Loading orders...</p> : (
              orders.length === 0 ? <p>No orders found.</p> : (
                orders.map(order => (
                  <div key={order.id} className="order-item">
                    <p><strong>Order ID:</strong> {order.id.slice(0,8)}...</p>
                    <p><strong>Total:</strong> ${order.totalAmount?.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.status || "Processing"}</p>
                  </div>
                ))
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;