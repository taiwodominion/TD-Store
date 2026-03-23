import React from "react";
import { Quote } from "lucide-react";
import "../css/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Lagos, Nigeria",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "The attention to detail in the stitching and fabric choice is unlike anything I've found locally. It’s truly quiet luxury at its finest.",
  },
  {
    id: 2,
    name: "Michael Brown",
    location: "London, UK",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "Navigating the collection was seamless. The pieces arrived beautifully packaged, reflecting the same minimalism found on the site.",
  },
  {
    id: 3,
    name: "Emily Davis",
    location: "New York, USA",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    text: "I appreciate the philosophy of quality over quantity. Each piece I’ve bought feels intentional and built to last through seasons.",
  },
];

const Testimonials = () => {
  return (
    <section className="reviews-viewport">
      <div className="reviews-wrapper">
        <div className="reviews-header">
          <span className="reviews-pre">COMMUNITY VOICES</span>
          <h2 className="reviews-main-title">
            The <span className="italic-serif">TD</span> Experience
          </h2>
        </div>

        <div className="reviews-grid">
          {testimonials.map((t) => (
            <div className="review-card" key={t.id}>
              <div className="review-quote-icon">
                <Quote size={30} fill="#f0f0f0" stroke="none" />
              </div>
              <p className="review-body">“{t.text}”</p>
              <div className="review-author">
                <div className="author-img-frame">
                  <img src={t.image} alt={t.name} className="author-img" />
                </div>
                <div className="author-meta">
                  <h3 className="author-name">{t.name}</h3>
                  <span className="author-loc">{t.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
