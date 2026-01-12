import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import '../css/ContactCard.css';

const ContactCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Message sent to td-store!');
  };

  return (
    <div className="contact-card-wrapper">
      <div className="contact-card-main">
        <div className="contact-card-sidebar">
          <h2>Contact Us</h2>
          <p>We are here to help with your td-store orders.</p>
          
          <div className="contact-details-list">
            <div className="detail-row">
              <span className="icon">📍</span>
              <p> 27 tdstore St, lagos</p>
            </div>
            <div className="detail-row">
              <span className="icon">📞</span>
              <p> +234 788 455 654 9870</p>
            </div>
            <div className="detail-row">
              <span className="icon">✉️</span>
              <p>support@td-store.com</p>
            </div>
          </div>

          <div className="social-links-container">
            <a href="#facebook">
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#instagram"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#twitter">
                <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </div>
        </div>

        <div className="contact-card-form-section">
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-field">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-field">
              <label>Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange}>
                <option value="general">General Inquiry</option>
                <option value="order">Order Support</option>
                <option value="returns">Returns & Refunds</option>
              </select>
            </div>

            <div className="form-field">
              <label>Message</label>
              <textarea 
                name="message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;