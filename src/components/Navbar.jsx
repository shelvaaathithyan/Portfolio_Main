import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Projects', path: '#projects' },
  { name: 'Journey', path: '#journey' },
  { name: 'Contact', path: '#contact' }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const navbarRef = useRef(null);
  const mobileDrawerRef = useRef(null);
  const mobileLinksRef = useRef([]);

  useGSAP(() => {
    // Entrance Animation
    gsap.fromTo(containerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );

    // Scroll trigger for shrinking navbar width and height
    ScrollTrigger.create({
      start: 'top -50',
      end: 99999,
      toggleClass: { className: 'navbar-scrolled', targets: navbarRef.current }
    });
  }, { scope: containerRef });

  useGSAP(() => {
    if (isMobileMenuOpen) {
      // Animate mobile drawer opening with fade + slide
      gsap.to(mobileDrawerRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      });
      // Animate links
      gsap.fromTo(mobileLinksRef.current, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      // Animate drawer closing with fade + slide
      gsap.to(mobileDrawerRef.current, {
        y: '-100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  }, [isMobileMenuOpen]);

  // Accessibility: Handle ESC key and body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (path === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(path);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="navbar-wrapper">
      <div ref={navbarRef} className="navbar-container">
        
        <div className="navbar-logo-container" onClick={(e) => handleLinkClick(e, '#home')} style={{ cursor: 'pointer' }}>
          <span className="navbar-logo">SHELVAAATHITHYAN VK</span>
          <span className="navbar-subtitle">Developer</span>
        </div>

        {/* Desktop Links */}
        <div className="navbar-links">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.path} 
              className="navbar-link"
              onClick={(e) => handleLinkClick(e, item.path)}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer (Slides from top) */}
      <div 
        ref={mobileDrawerRef} 
        className="mobile-drawer"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
        }}
      >
        <div className="mobile-nav-links">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.path} 
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, item.path)}
              ref={el => mobileLinksRef.current[index] = el}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
