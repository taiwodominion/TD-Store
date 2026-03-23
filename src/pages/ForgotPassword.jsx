import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  return (
    <div className="auth-page-layout">
      <main className="auth-centered-view">
        <ForgotPasswordForm />
      </main>

      <div className="auth-background-decor">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <footer>
        <Footer />
      </footer>

      <style jsx>{`
        .auth-page-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          background: #ffffff;
          overflow: hidden;
        }

        .auth-centered-view {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px;
          z-index: 2;
        }

        .auth-background-decor {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.05;
        }

        .blob-1 {
          width: 400px;
          height: 400px;
          background: #d4a373;
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          width: 300px;
          height: 300px;
          background: #0a0a0a;
          bottom: 100px;
          left: -50px;
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
