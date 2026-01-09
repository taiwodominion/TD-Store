import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import heroImage1 from '../assets/rafaella.jpg';
import heroImage2 from '../assets/freestocks.jpg';
import heroImage3 from '../assets/clark-street.jpg';
import '../css/Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "DISCOVER THE TRENDS",
      description: "Shop our curated collection of summer essentials for the modern wardrobe.",
      image: heroImage1,
      buttonText: "Shop Now",
      buttonLink: "/products"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "FRESH STYLES JUST IN",
      description: "Be the first to get your hands on our newest high-quality products.",
      image: heroImage2,
      buttonText: "Explore",
      buttonLink: "/products"
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "LIMITED TIME ONLY",
      description: "Up to 50% off on selected items. Limited time deals on your favorites.",
      image: heroImage3,
      buttonText: "Shop Sale",
      buttonLink: "/products"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div className="home">
      {/* Preload images to prevent flicker */}
      <div style={{ display: 'none' }}>
        {heroSlides.map(s => <img key={s.id} src={s.image} alt="" />)}
      </div>

      <section 
        className="hero"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div 
                className="hero-image-bg" 
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="hero-overlay">
                <div className="container">
                  <div className="hero-content">
                    <span className="hero-top-subtitle animate-item">{slide.subtitle}</span>
                    <h1 className="hero-title animate-item">
                      {slide.title}
                    </h1>
                    <p className="hero-description animate-item">
                      {slide.description}
                    </p>
                    <div className="animate-item">
                      <Link to={slide.buttonLink} className="hero-btn">
                        <span>{slide.buttonText}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;