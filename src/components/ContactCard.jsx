import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import "../css/ContactCard.css";

const ContactCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-glass-card", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
      });

      gsap.from(".sidebar-item", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      );
    }, 10);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "general", message: "" });
      },
    });
  };

  return (
    <div className="contact-page-wrapper" ref={containerRef}>
      <div className="contact-glass-card">
        <div className="contact-grid">
          <div className="contact-info-panel">
            <div className="panel-header sidebar-item">
              <span className="eyebrow">Connect</span>
              <h2 className="panel-title">
                Elevate the <span className="serif-italic">Dialogue</span>
              </h2>
              <p className="panel-subtitle">
                Direct access to the desk of Taiwo Dominion for inquiries,
                partnerships, and support.
              </p>
            </div>

            <div className="contact-methods">
              <div className="method-card sidebar-item">
                <div className="method-icon">
                  <MapPin size={20} />
                </div>
                <div className="method-details">
                  <label>Archive HQ</label>
                  <p>27 TD-Store St, Lagos, Nigeria</p>
                </div>
              </div>

              <div className="method-card sidebar-item">
                <div className="method-icon">
                  <Mail size={20} />
                </div>
                <div className="method-details">
                  <label>Digital Correspondence</label>
                  <p>support@td-store.com</p>
                </div>
              </div>

              <div className="method-card sidebar-item">
                <div className="method-icon">
                  <Phone size={20} />
                </div>
                <div className="method-details">
                  <label>Direct Line</label>
                  <p>+234 788 455 654 9870</p>
                </div>
              </div>
            </div>

            <div className="social-dock sidebar-item">
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>

          <div className="contact-form-panel">
            <form onSubmit={handleSubmit} className="modern-form">
              <div className="floating-input-group">
                <div className="input-box">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label>Full Identity</label>
                  <div className="focus-line"></div>
                </div>

                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                  />
                  <label>Email Address</label>
                  <div className="focus-line"></div>
                </div>
              </div>

              <div className="input-box">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Tracking</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="feedback">Creative Feedback</option>
                </select>
                <label className="select-label">Category of Interest</label>
              </div>

              <div className="input-box">
                <textarea
                  name="message"
                  rows="4"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                ></textarea>
                <label>How can we assist?</label>
                <div className="focus-line"></div>
              </div>

              <button type="submit" className="minimal-submit-btn">
                <span className="btn-text">Dispatch Message</span>
                <span className="btn-icon">
                  <ArrowRight size={18} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {isSubmitted && (
        <div className="success-overlay">
          <div className="success-modal" ref={modalRef}>
            <div className="modal-icon">
              <CheckCircle2 size={60} strokeWidth={1} />
            </div>
            <h3>Transmission Successful</h3>
            <p>
              Your message has been logged into the TD-Store archives. Expect a
              response within 24 business hours.
            </p>
            <button onClick={closeModal} className="modal-close-btn">
              Return to Store
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
