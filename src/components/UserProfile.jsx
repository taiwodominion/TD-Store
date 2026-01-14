// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
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
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // If user exists, fetch their Firestore data
//     const fetchUserData = async () => {
//       if (user) {
//         try {
//           const docRef = doc(db, "users", user.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setExtraData(docSnap.data());
//           }
//         } catch (error) {
//           console.error("Firestore error:", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         // If after a short delay there is still no user, stop loading
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [user]);

//   // 1. If we are still waiting on Firebase/Firestore
//   if (loading) return <div className="profile-container">Loading Profile...</div>;

//   // 2. If loading finished and there is DEFINITELY no user
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

//   // 3. If user exists, show the profile
//   return (
//     <div className="profile-container">
//        {/* ... your profile UI code ... */}
//     </div>
//   );


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
//                 {user.metadata.creationTime
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
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendarAlt,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import "../css/UserProfile.css";

const UserProfile = ({ user }) => {
  const [extraData, setExtraData] = useState(null);
  const [fetchingFirestore, setFetchingFirestore] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && !fetchingFirestore) {
        setFetchingFirestore(true);
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
  }, [user, fetchingFirestore]);

  // If App.jsx is still loading auth, UserProfile shouldn't show anything yet
  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Access Denied</h2>
          <p>Please log in to view your profile.</p>
          <Link to="/login" className="login-btn-link">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" />
            ) : (
              <FontAwesomeIcon icon={faUser} />
            )}
          </div>
          <h2>{extraData?.name || user.displayName || "User Account"}</h2>
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
              <label>Member Since</label>
              <p>
                {user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {extraData?.phone && (
            <div className="detail-item">
              <label>Phone Number</label>
              <p>{extraData.phone}</p>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="orders-btn">
            <FontAwesomeIcon icon={faShoppingBag} /> View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;