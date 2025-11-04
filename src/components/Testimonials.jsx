import React from "react";
import "../css/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "TD Store has completely changed my shopping experience! The products are top-notch, and delivery is always super fast."
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Verified Buyer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "I love how easy it is to navigate the site. The product quality is exactly as described, and customer service is fantastic!"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Happy Customer",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    text: "I’ve bought several items from TD Store, and I’m always impressed by the quality and attention to detail. Highly recommended!"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <div className="testimonial-top">
                <img src={t.image} alt={t.name} className="testimonial-img" />
                <div className="testimonial-info">
                  <h3>{t.name}</h3>
                  <p>{t.role}</p>
                </div>
              </div>
              <p className="testimonial-text">“{t.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
