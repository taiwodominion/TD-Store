import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../css/PageTransition.css";

const PageTransition = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const brandRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      const chars = headingRef.current.textContent.split("");
      headingRef.current.textContent = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        headingRef.current.appendChild(span);
      });
      tl.set(overlayRef.current, { visibility: "visible" })
        .to(overlayRef.current, {
          scaleY: 1,
          duration: 0.4,
          ease: "expo.inOut",
          transformOrigin: "bottom center",
        })
        .to(
          brandRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.1",
        )
        .to(
          headingRef.current.childNodes,
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.02,
            ease: "expo.out",
          },
          "-=0.2",
        )
        .to([brandRef.current, headingRef.current.childNodes], {
          opacity: 0,
          y: -10,
          duration: 0.2,
          stagger: 0.01,
          delay: 0.2,
        })
        .to(
          overlayRef.current,
          {
            scaleY: 0,
            duration: 0.4,
            ease: "expo.inOut",
            transformOrigin: "top center",
          },
          "-=0.1",
        );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="transition-overlay" ref={overlayRef}>
      <div className="transition-content" ref={textRef}>
        <span
          className="transition-brand"
          ref={brandRef}
          style={{ opacity: 0, transform: "translateY(10px)" }}
        >
          EST. 2026
        </span>
        <h2 className="transition-text" ref={headingRef} style={{ opacity: 1 }}>
          CURATING...
        </h2>
      </div>
    </div>
  );
};

export default PageTransition;
