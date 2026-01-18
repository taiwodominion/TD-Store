import React from "react";
import "../css/AboutContent.css";

const AboutContent = () => {
  const stats = [
    { label: "Founded", value: "2024" },
    { label: "Community", value: "10k+" },
    { label: "Global Shipping", value: "50+" },
  ];

  return (
    <div className="about-container">
      {/* SECTION 1: OVERLAPPING HERO */}
      <div className="about-split-header">
        <div className="about-text-side">
          <span className="subtitle">OUR PHILOSOPHY</span>
          <h1>Minimalism <br /> meets <span className="highlight">Quality</span>.</h1>
          <p>
            At TD-Store, we believe that true luxury lies in simplicity. Our journey 
            started with a mission to eliminate the noise of fast fashion and focus 
            on essentials that last a lifetime.
          </p>
          <div className="about-stats-row">
            {stats.map((stat, index) => (
              <div key={index} className="stat-pill">
                <span className="stat-val">{stat.value}</span>
                <span className="stat-lab">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-image-side">
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" 
              alt="Store Aesthetic" 
              className="main-img"
            />
            <div className="floating-card">
              <p>"Quality is not an act, it is a habit."</p>
              <span>— TD Store Ethos</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE "WHY US" BENTO BOX */}
      <div className="bento-section">
        <div className="bento-grid">
          <div className="bento-item main">
            <h3>Sustainable Sourcing</h3>
            <p>Every material is hand-picked from ethical suppliers globally.</p>
          </div>
          <div className="bento-item accent">
            <h3>Fast Shipping</h3>
            <p>Delivery in 3-5 days.</p>
          </div>
          <div className="bento-item accent">
            <h3>Support</h3>
            <p>Real humans, 24/7.</p>
          </div>
          <div className="bento-item dark">
            <h3>Join the 10,000+ members who trust our vision.</h3>
            <button className="cta-outline">Explore Collection</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;