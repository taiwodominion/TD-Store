import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
// import '../css/SignupForm.css'

const SignupForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
  e.preventDefault();
  
  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Immediately create the 'users' collection & document
    // We use user.uid to make sure the Document ID matches the Auth ID
    await setDoc(doc(db, "users", user.uid), {
      fullName: fullName,
      email: email,
      role: "customer", // Change to 'student' for the university project later
      createdAt: new Date()
    });

    console.log("Success! Collection created and user saved.");
    // Redirect to home or login
  } catch (error) {
    console.error("Error during signup:", error.message);
  }
};


    return (
        <div className="login-container">
            <form onSubmit={handleSignup} className="login-form">
                <h2>Create Account</h2>
                {error && <p className="error-message">{error}</p>}
                
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                />
                
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <button type="submit">Sign Up</button>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
            </form>
        </div>
    );
};

export default SignupForm;