import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import gsap from "gsap";
import { Lock, ShieldCheck, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import "../css/ForgotPasswordForm.css";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  
  const formRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const oobCode = query.get("oobCode");

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or expired password reset link.");
      return;
    }

    verifyPasswordResetCode(auth, oobCode)
      .then((email) => setEmail(email))
      .catch((err) => setError("This link has expired or has already been used."));

    gsap.from(formRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [oobCode]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-viewport">
        <div className="auth-card success-state" ref={formRef}>
          <div className="auth-icon-wrapper">
            <ShieldCheck size={40} style={{ color: "#10b981" }} />
          </div>
          <h2 className="auth-title">Password Updated</h2>
          <p className="auth-subtitle">
            Your password has been reset successfully. Redirecting you to login...
          </p>
          <button className="btn-primary full-width" onClick={() => navigate("/login")}>
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-viewport">
      <div className="auth-card" ref={formRef}>
        <div className="auth-icon-wrapper">
          <Lock size={40} strokeWidth={1.5} />
        </div>
        <h2 className="auth-title">New Password</h2>
        <p className="auth-subtitle">
          Resetting password for <strong>{email || "your account"}</strong>. Choose a strong new password.
        </p>

        {error && <div className="auth-error-chip" style={{ color: "#ef4444", marginBottom: "20px", fontWeight: "600" }}>{error}</div>}

        <form onSubmit={handleReset} className="auth-form">
          <div className="input-field-group">
            <label>New Password</label>
            <div className="input-with-icon">
              <Lock className="field-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading || !!error} className="btn-primary full-width">
            {loading ? <Loader2 className="spinner" size={18} /> : <span>Update Password</span>}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;