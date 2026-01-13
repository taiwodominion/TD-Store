import React, { useState } from 'react';
import { auth } from '../firebase'; // Path to your firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import "../css/LoginForm.css"; 

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // This line triggers the onAuthStateChanged in App.jsx
            await signInWithEmailAndPassword(auth, email, password);
            
            console.log("Login successful!");
            navigate('/'); // Redirect to homepage after login
        } catch (err) {
            // Professional error handling
            if (err.code === 'auth/user-not-found') {
                setError("No account found with this email.");
            } else if (err.code === 'auth/wrong-password') {
                setError("Incorrect password.");
            } else {
                setError("Failed to login. Please check your credentials.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Welcome Back</h2>
                <p>Login to manage your orders and profile</p>

                {error && <div className="error-alert">{error}</div>}

                <div className="input-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="e.g. name@example.com"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" disabled={loading} className="login-btn">
                    {loading ? "Signing in..." : "Login"}
                </button>

                <div className="login-footer">
                    <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;