import React, { useState, useEffect, useRef } from "react";
import { auth } from '../firebase';
import { sendPasswordResetEmail } from "firebase/auth"; 
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import "../css/ForgotPasswordForm.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="auth-card success-state" ref={formRef}>
        <div className="auth-icon-wrapper">
          <ShieldCheck size={40} className="success-icon" />
        </div>
        <h2 className="auth-title">Check your email</h2>
        <p className="auth-subtitle">
          We've sent a password reset link to <strong>{email}</strong>.
        </p>
        <button 
          className="btn-primary full-width" 
          onClick={() => setIsSubmitted(false)}
        >
          Try another email
        </button>
        <Link to="/login" className="back-to-login">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-card" ref={formRef}>
      <div className="auth-icon-wrapper">
        <KeyRound size={40} strokeWidth={1.5} />
      </div>
      <h2 className="auth-title">Forgot Password?</h2>
      
      {error && <div className="auth-error-chip" style={{color: 'red', marginBottom: '15px'}}>{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-field-group">
          <div className="input-with-icon">
            <Mail className="field-icon" size={18} />
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary full-width">
          <span>{loading ? "Sending..." : "Send Reset Link"}</span>
          {!loading && <ArrowRight size={18} />}
        </button>
      </form>

      <div className="auth-footer">
        <Link to="/login" className="back-to-login">
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;