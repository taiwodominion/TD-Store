import React, { useState } from 'react';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Lock, Mail } from 'lucide-react';
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
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.");
            } else if (err.code === 'auth/wrong-password') {
                setError("Incorrect password.");
            } else {
                setError("An error occurred. Please try again.");
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
                    <p className="visual-quote">"Simplicity is the keynote of all true elegance."</p>
                </div>
            </div>

            <div className="auth-split-side form-side">
                <div className="form-container">
                    <header className="auth-header">
                        <h2 className="auth-title">Welcome <span className="italic-serif">Back</span></h2>
                        <p className="auth-subtitle">Enter your credentials to access your account.</p>
                    </header>

                    {error && <div className="auth-error-chip">{error}</div>}

                    <form onSubmit={handleLogin} className="auth-main-form">
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
                                    placeholder="••••••••"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="auth-options">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                        <button type="submit" disabled={loading} className="auth-submit-btn">
                            {loading ? "Verifying..." : "Sign In"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>New to TD Store? <Link to="/signup">Create an account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;