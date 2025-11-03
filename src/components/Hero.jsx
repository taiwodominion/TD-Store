import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import heroImage1 from '../assets/rafaella.jpg';
import heroImage2 from '../assets/freestocks.jpg'
import heroImage3 from '../assets/clark-street.jpg'
import '../css/Hero.css';

const Hero = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setFeaturedProducts(products.slice(0, 4));
  }, []);

  const heroSlides = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Discover the latest trends",
      description: "Shop our curated collection of summer essentials",
      image: heroImage1,
      buttonText: "Shop Now",
      buttonLink: "/products"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh styles just in",
      description: "Be the first to get your hands on our newest products",
      image: heroImage2,
      buttonText: "Explore",
      buttonLink: "/products"
    },
    {
      id: 3,
      title: "Special Offers",
      subtitle: "Up to 50% off",
      description: "Limited time deals on your favorite items",
      image: heroImage3,
      buttonText: "Shop Sale",
      buttonLink: "/products"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-overlay">
                <div className="container">
                  <div className="hero-content">
                    <h1 className="hero-title animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="hero-subtitle animate-fade-in">
                      {slide.subtitle}
                    </p>
                    <p className="hero-description animate-fade-in">
                      {slide.description}
                    </p>
                    <Link 
                      to={slide.buttonLink} 
                      className="btn btn-primary btn-lg hero-btn animate-fade-in"
                    >
                      {slide.buttonText}
                    </Link>
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
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;