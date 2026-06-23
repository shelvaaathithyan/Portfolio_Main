import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';
import { FiDownload, FiMail, FiMapPin, FiBriefcase, FiCheckCircle } from 'react-icons/fi';
import './Hero.css';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const profileCardRef = useRef(null);

  const titles = [
    "AI/ML Engineer",
    "Full Stack Developer",
    "Intelligent Systems Builder",
    "Problem Solver"
  ];

  useGSAP(() => {
    // Page Load Sequence Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 1. Navbar slides from top (already handled in Navbar component independently, but we can delay hero)
    
    // 2. Hero titles and content reveal
    tl.from('.hero-left > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      delay: 0.5 // Wait for navbar
    })
    // 3. Profile card floats in
    .from('.hero-right', {
      x: 50,
      opacity: 0,
      duration: 1
    }, "-=0.5");

    // Continuous floating animation for the profile card container
    gsap.to(profileCardRef.current, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Typing Animation Sequence
    const masterTextTl = gsap.timeline({ repeat: -1 });
    
    titles.forEach((title) => {
      // Type out
      masterTextTl.to(textRef.current, {
        duration: Math.max(1, title.length * 0.05), // speed based on length
        text: title,
        ease: "none"
      })
      // Pause
      .to({}, {duration: 2})
      // Erase
      .to(textRef.current, {
        duration: Math.max(0.5, title.length * 0.03),
        text: "",
        ease: "none"
      });
    });

  }, { scope: heroRef });

  // Mouse tilt effect for profile card
  const handleMouseMove = (e) => {
    if (!profileCardRef.current) return;
    const card = profileCardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.5
    });
  };

  const handleMouseLeave = () => {
    if (!profileCardRef.current) return;
    gsap.to(profileCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      ease: "power3.out",
      duration: 0.8
    });
  };

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-container">
        
        {/* Left Content */}
        <div className="hero-left">
          <div className="hero-greeting key-text">Hello there.</div>
          <h1 className="hero-title key-text text-white">
            I'm Shelvaaathithyan VK
          </h1>
          <div className="hero-typing-container">
            <span className="hero-typing-text text-blue key-text" ref={textRef}></span>
            <span className="cursor">|</span>
          </div>

          <p className="hero-description">
            I'm a Computer Science student specializing in AI/ML at PSG College of Technology, passionate about building intelligent systems, modern web applications, and impactful digital experiences.
          </p>

          {/* Status Indicators */}
          <div className="hero-status-list">
            <div className="status-item">
              <FiMapPin className="status-icon" /> Tamil Nadu, India
            </div>
            <div className="status-item">
              <FiBriefcase className="status-icon" /> Available for opportunities
            </div>
            <div className="status-item status-green">
              <FiCheckCircle className="status-icon" /> Open to Work
            </div>
          </div>

          {/* Stats Row */}
          <div className="hero-stats-row">
            <div className="stats-divider"></div>
            <div className="stats-content">
              <div className="stat">10+ Projects</div>
              <div className="stat">3+ Technologies</div>
              <div className="stat">AI/ML Enthusiast</div>
              <div className="stat">Open To Work</div>
            </div>
            <div className="stats-divider"></div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button className="cta-btn primary-btn">
              <FiDownload /> Download Resume
            </button>
            <button className="cta-btn secondary-btn">
              <FiMail /> Get In Touch
            </button>
          </div>
        </div>

        {/* Right Content - Profile Orbit Container */}
        <div className="hero-right">
          <div 
            className="profile-orbit-container" 
            ref={profileCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Center Photo Area */}
            <div className="profile-photo-wrapper">
              <div className="profile-photo-placeholder">
                <span>PHOTO</span>
              </div>
            </div>

            {/* Orbiting Badges */}
            <div className="orbit-badge badge-1">React</div>
            <div className="orbit-badge badge-2">Node.js</div>
            <div className="orbit-badge badge-3">MongoDB</div>
            <div className="orbit-badge badge-4">AI/ML</div>
            <div className="orbit-badge badge-5">Python</div>
            <div className="orbit-badge badge-6">Firebase</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
