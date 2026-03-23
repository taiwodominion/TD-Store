import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-statement span", {
        y: 100,
        skewY: 7,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      }).from(
        ".hero-credo, .action-stack, .pre-title",
        {
          opacity: 0,
          y: 30,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=1",
      );

      const isMobile = window.innerWidth < 1100;

      gsap.to(imageRef.current, {
        yPercent: isMobile ? 10 : 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(textRef.current, {
        yPercent: isMobile ? -5 : -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(badgeRef.current, {
        rotation: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-viewport" ref={sectionRef}>
      <div className="hero-content-grid">
        <div className="editorial-side" ref={textRef}>
          <span className="pre-title">EST. 2026 — VOL. 01</span>

          <h1 className="hero-statement">
            <div className="overflow-hide">
              <span>The Art of</span>
            </div>
            <div className="overflow-hide">
              <span className="outline-text">Intentional</span>
            </div>
            <div className="overflow-hide">
              <span>Living.</span>
            </div>
          </h1>

          <p className="hero-credo">
            We don't do fast fashion. We do forever pieces. Designed in Lagos,
            sourced globally, and built for those who value the story behind the
            stitch.
          </p>

          <div className="action-stack">
            <Link to="/products" className="magnetic-btn">
              <span>View Collection</span>
              <MoveRight size={20} />
            </Link>
            <Link to="/categories" className="ghost-link">
              Our Philosophy
            </Link>
          </div>
        </div>

        <div className="hero-visual-side">
          <div className="image-stack">
            <div className="main-frame">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2040"
                alt="Editorial"
                className="parallax-img"
              />
            </div>

            <div className="overlay-badge" ref={badgeRef}>
              <p>PREMIUM • QUALITY • DESIGN • </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-number">01</div>
    </section>
  );
};

export default Hero;
