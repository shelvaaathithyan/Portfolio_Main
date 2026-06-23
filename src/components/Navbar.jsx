import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const mobileLinksRef = useRef([]);

  useGSAP(() => {
    // Initial desktop navbar animation
    gsap.from('.navbar-container', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('.nav-link', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.5
    });

    // Scroll trigger for shrinking navbar
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: {className: 'navbar-scrolled', targets: '.navbar-container'}
    });
  }, { scope: containerRef });

  useGSAP(() => {
    if (isMobileMenuOpen) {
      // Animate drawer opening
      gsap.to(mobileDrawerRef.current, {
        clipPath: 'circle(150% at calc(100% - 3rem) 3rem)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      // Animate mobile links appearing
      gsap.fromTo(mobileLinksRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
      );
    } else {
      // Animate drawer closing
      gsap.to(mobileDrawerRef.current, {
        clipPath: 'circle(0px at calc(100% - 3rem) 3rem)',
        duration: 0.6,
        ease: 'power3.inOut'
      });
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div ref={containerRef} className="navbar-wrapper">
      <div className="navbar-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="navbar-video-bg"
        >
          <source src="/black-hole.3840x2160.mp4" type="video/mp4" />
        </video>

        <Link to="/" className="navbar-logo-container">
          <span className="navbar-logo">Shelvaaathithyan VK</span>
          <span className="navbar-subtitle">AI Engineer</span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navItems.map((item, index) => (
            <Link key={index} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div ref={mobileDrawerRef} className="mobile-drawer">
        <div className="mobile-nav-links">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
              ref={el => mobileLinksRef.current[index] = el}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
