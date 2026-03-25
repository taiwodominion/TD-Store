// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Linkedin, Twitter, ArrowRight } from "lucide-react";
// import "../css/AboutContent.css";

// gsap.registerPlugin(ScrollTrigger);

// const AboutContent = () => {
//   const containerRef = useRef(null);

//   const stats = [
//     { label: "Founded", value: "2024" },
//     { label: "Community", value: "10k+" },
//     { label: "Global Shipping", value: "50+" },
//   ];

//   const founders = [
//     {
//       name: "Taiwo Dominion",
//       role: "Founder / Creative Director",
//       bio: "A visionary committed to rewriting the retail narrative, focused on intentional consumption and ethical craftsmanship.",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//       linkedin: "#",
//       twitter: "#",
//     },
//     {
//       name: "Alex Thompson",
//       role: "Co-Founder / Head of Ops",
//       bio: "An operations maestro streamlining logistics and sourcing to ensure sustainable practices at every level.",
//       image:
//         "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400&q=80",
//       linkedin: "#",
//       twitter: "#",
//     },
//   ];

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       gsap.from(".reveal-text", {
//         y: 100,
//         opacity: 0,
//         duration: 1.2,
//         stagger: 0.2,
//         ease: "power4.out",
//       });

//       gsap.from(".main-img", {
//         scale: 1.3,
//         duration: 2,
//         ease: "power2.out",
//       });

//       gsap.from(".floating-card", {
//         x: -80,
//         opacity: 0,
//         duration: 1.2,
//         delay: 0.8,
//         ease: "elastic.out(1, 0.5)",
//       });

//       gsap.from(".stat-pill", {
//         y: 40,
//         opacity: 0,
//         stagger: 0.15,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".about-stats-row",
//           start: "top 90%",
//         },
//       });

//       gsap.from(".bento-item", {
//         y: 70,
//         opacity: 0,
//         duration: 0.9,
//         stagger: 0.2,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".bento-grid",
//           start: "top 80%",
//         },
//       });

//       gsap.from(".founder-card", {
//         y: 80,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.3,
//         ease: "power3.out",
//         scrollTrigger: {
//           trigger: ".founders-grid",
//           start: "top 75%",
//         },
//       });
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div className="about-container" ref={containerRef}>
//       <div className="about-split-header">
//         <div className="about-text-side">
//           <div className="overflow-hide">
//             <span className="subtitle reveal-text">OUR PHILOSOPHY</span>
//           </div>
//           <div className="overflow-hide">
//             <h1 className="reveal-text">
//               Minimalism <br /> meets <span className="highlight">Quality</span>
//               .
//             </h1>
//           </div>
//           <div className="overflow-hide">
//             <p className="reveal-text">
//               At TD-Store, we believe that true luxury lies in simplicity. Under
//               the creative direction of{" "}
//               <span className="dominion-highlight">Taiwo Dominion</span>, our
//               journey started with a mission to eliminate the noise of fast
//               fashion and focus on essentials that last a lifetime.
//             </p>
//           </div>

//           <div className="about-stats-row">
//             {stats.map((stat, index) => (
//               <div key={index} className="stat-pill">
//                 <span className="stat-val">{stat.value}</span>
//                 <span className="stat-lab">{stat.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="about-image-side">
//           <div className="image-wrapper">
//             <div className="image-inner">
//               <img
//                 src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
//                 alt="Store Aesthetic"
//                 className="main-img"
//               />
//             </div>
//             <div className="floating-card">
//               <div className="quote-icon">“</div>
//               <p>Quality is not an act, it is a habit.</p>
//               <span>— TD Store Ethos</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bento-section">
//         <div className="section-intro">
//           <h2 className="bento-title">The Blueprint</h2>
//           <p>The operational excellence that defines our promise.</p>
//         </div>
//         <div className="bento-grid">
//           <div className="bento-item main">
//             <div className="bento-icon">🌿</div>
//             <h3>Sustainable Sourcing</h3>
//             <p>
//               Every material is hand-picked from ethical suppliers globally. We
//               prioritize organic cotton, recycled fibers, and low-impact dyes.
//             </p>
//           </div>
//           <div className="bento-item accent">
//             <div className="bento-icon">✈️</div>
//             <h3>Fast Shipping</h3>
//             <p>
//               Priority logistics ensuring your essentials reach you in 3-5
//               business days.
//             </p>
//           </div>
//           <div className="bento-item accent">
//             <div className="bento-icon">🤝</div>
//             <h3>24/7 Support</h3>
//             <p>
//               Real humans based in our HQ, ready to assist with any inquiry or
//               styling advice.
//             </p>
//           </div>
//           <div className="bento-item dark">
//             <div className="dark-content">
//               <h3>Elevate your everyday.</h3>
//               <p>Join the 10,000+ members who trust our vision.</p>
//               <button className="cta-outline">
//                 Explore Collection <ArrowRight size={16} />
//               </button>
//             </div>
//             <div className="abstract-shape"></div>
//           </div>
//         </div>
//       </div>

//       <div className="team-section">
//         <div className="section-intro text-center">
//           <h2 className="bento-title">Architects of Vision</h2>
//           <p>Meet the minds curating your intentional lifestyle.</p>
//         </div>

//         <div className="founders-grid">
//           {founders.map((founder, index) => (
//             <div key={index} className="founder-card">
//               <div className="founder-image-wrapper">
//                 <img
//                   src={founder.image}
//                   alt={founder.name}
//                   className="founder-img"
//                 />
//                 <div className="founder-hover-info">
//                   <div className="social-links">
//                     <a
//                       href={founder.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Linkedin size={20} />
//                     </a>
//                     <a
//                       href={founder.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <Twitter size={20} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//               <div className="founder-details">
//                 <h3 className="founder-name">{founder.name}</h3>
//                 <span className="founder-role">{founder.role}</span>
//                 <p className="founder-bio">{founder.bio}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="vision-marquee">
//         <div className="marquee-content">
//           <span>INTENTIONAL LIVING • TIMELESS DESIGN • ETHICAL CRAFT • </span>
//           <span>INTENTIONAL LIVING • TIMELESS DESIGN • ETHICAL CRAFT • </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutContent;


import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Twitter, ArrowRight } from "lucide-react";
import "../css/AboutContent.css";

gsap.registerPlugin(ScrollTrigger);

const AboutContent = () => {
  const containerRef = useRef(null);

  const stats = [
    { label: "Founded", value: "2024" },
    { label: "Community", value: "10k+" },
    { label: "Global Shipping", value: "50+" },
  ];

  const founders = [
    {
      name: "Taiwo Dominion",
      role: "Founder / Creative Director",
      bio: "A visionary committed to rewriting the retail narrative, focused on intentional consumption and ethical craftsmanship.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Alex Thompson",
      role: "Co-Founder / Head of Ops",
      bio: "An operations maestro streamlining logistics and sourcing to ensure sustainable practices at every level.",
      image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400&q=80",
      linkedin: "#",
      twitter: "#",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Text Reveal
      gsap.from(".reveal-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
      });

      // Image Scale
      gsap.from(".main-img", {
        scale: 1.2,
        duration: 2,
        ease: "power2.out",
      });

      // Stats Animation
      gsap.from(".stat-pill", {
        scrollTrigger: {
          trigger: ".about-stats-row",
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Bento Grid items
      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });

      // Founders
      gsap.from(".founder-card", {
        scrollTrigger: {
          trigger: ".founders-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    // Critical for single page apps: Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <div className="about-split-header">
        <div className="about-text-side">
          <div className="overflow-hide">
            <span className="subtitle reveal-text">OUR PHILOSOPHY</span>
          </div>
          <div className="overflow-hide">
            <h1 className="reveal-text">
              Minimalism <br /> meets <span className="highlight">Quality</span>.
            </h1>
          </div>
          <div className="overflow-hide">
            <p className="reveal-text">
              At TD-Store, we believe that true luxury lies in simplicity. Under
              the creative direction of{" "}
              <span className="dominion-highlight">Taiwo Dominion</span>, our
              journey started with a mission to focus on essentials that last a lifetime.
            </p>
          </div>

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
            <div className="image-inner">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Store Aesthetic"
                className="main-img"
              />
            </div>
            <div className="floating-card">
              <div className="quote-icon">“</div>
              <p>Quality is not an act, it is a habit.</p>
              <span>— TD Store Ethos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bento-section">
        <div className="section-intro">
          <h2 className="bento-title">The Blueprint</h2>
          <p>The operational excellence that defines our promise.</p>
        </div>
        <div className="bento-grid">
          <div className="bento-item main">
            <div className="bento-icon">🌿</div>
            <h3>Sustainable Sourcing</h3>
            <p>
              Every material is hand-picked from ethical suppliers globally. We
              prioritize organic cotton and recycled fibers.
            </p>
          </div>
          <div className="bento-item accent">
            <div className="bento-icon">✈️</div>
            <h3>Fast Shipping</h3>
            <p>Priority logistics ensuring your essentials reach you in 3-5 days.</p>
          </div>
          <div className="bento-item accent">
            <div className="bento-icon">🤝</div>
            <h3>24/7 Support</h3>
            <p>Real humans based in our HQ, ready to assist with any inquiry.</p>
          </div>
          <div className="bento-item dark">
            <div className="dark-content">
              <h3>Elevate your everyday.</h3>
              <p>Join the 10,000+ members who trust our vision.</p>
              <button className="cta-outline">
                Explore Collection <ArrowRight size={16} />
              </button>
            </div>
            <div className="abstract-shape"></div>
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="section-intro text-center">
          <h2 className="bento-title">Architects of Vision</h2>
          <p>Meet the minds curating your intentional lifestyle.</p>
        </div>

        <div className="founders-grid">
          {founders.map((founder, index) => (
            <div key={index} className="founder-card">
              <div className="founder-image-wrapper">
                <img src={founder.image} alt={founder.name} className="founder-img" />
                <div className="founder-hover-info">
                  <div className="social-links">
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                    </a>
                    <a href={founder.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="founder-details">
                <h3 className="founder-name">{founder.name}</h3>
                <span className="founder-role">{founder.role}</span>
                <p className="founder-bio">{founder.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="vision-marquee">
        <div className="marquee-content">
          <span>INTENTIONAL LIVING • TIMELESS DESIGN • ETHICAL CRAFT • </span>
          <span>INTENTIONAL LIVING • TIMELESS DESIGN • ETHICAL CRAFT • </span>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;