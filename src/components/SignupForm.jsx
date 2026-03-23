import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import '../css/SignupForm.css';

const SignupForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                email: email,
                role: "customer",
                createdAt: new Date()
            });

            navigate('/');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("This email is already registered.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-viewport">
            <div className="auth-split-side visual-side">
                <img 
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
                    alt="Aesthetic Fashion" 
                />
                <div className="visual-overlay">
                    <h1 className="visual-logo">TD<span className="italic-serif">.</span></h1>
                    <p className="visual-quote">"Design is not just what it looks like, it's how it <span className="italic-serif">works</span>."</p>
                </div>
            </div>

            <div className="auth-split-side form-side">
                <div className="form-container">
                    <header className="auth-header">
                        <h2 className="auth-title">Create <span className="italic-serif">Account</span></h2>
                        <p className="auth-subtitle">Join the community for a curated shopping experience.</p>
                    </header>

                    {error && <div className="auth-error-chip">{error}</div>}

                    <form onSubmit={handleSignup} className="auth-main-form">
                        <div className="auth-input-wrapper">
                            <label>Full Name</label>
                            <div className="input-field">
                                <User size={18} className="input-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Enter your name" 
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="auth-input-wrapper">
                            <label>Email Address</label>
                            <div className="input-field">
                                <Mail size={18} className="input-icon" />
                                <input 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="auth-input-wrapper">
                            <label>Password</label>
                            <div className="input-field">
                                <Lock size={18} className="input-icon" />
                                <input 
                                    type="password" 
                                    placeholder="Create a password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="auth-submit-btn">
                            {loading ? "Creating..." : "Sign Up"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;