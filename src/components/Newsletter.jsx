import React from "react";
import { Send } from "lucide-react";
import "../css/Newsletter.css";

const Newsletter = () => {
  return (
    <section className="news-viewport">
      <div className="news-wrapper">
        <div className="news-content">
          <span className="news-pre">STAY CONNECTED</span>
          <h2 className="news-main-title">
            Join the <span className="italic-serif">Inner Circle</span>
          </h2>
          <p className="news-description">
            Subscribers receive early access to seasonal drops, private
            editorial content, and invitations to our studio events.
          </p>

          <form className="news-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Your email address"
                required
                className="news-input"
              />
              <button type="submit" className="news-submit-btn">
                <span>Subscribe</span>
                <Send size={18} />
              </button>
            </div>
            <p className="news-legal">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at
              any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
