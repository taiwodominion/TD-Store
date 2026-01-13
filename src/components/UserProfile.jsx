import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase'; 
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Listen for the logged-in user
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // 2. User exists, now fetch their specific 'nook and cranny' from Firestore
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("No such document in Firestore!");
                }
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p>Loading td-store profile...</p>;

    return (
        <div className="profile-display">
            {userData ? (
                <div>
                    <h1>Welcome, {userData.fullName}!</h1>
                    <p>Email: {userData.email}</p>
                    <p>Account Type: {userData.role}</p>
                </div>
            ) : (
                <p>Please log in to see your profile.</p>
            )}
        </div>
    );
};

export default UserProfile;
