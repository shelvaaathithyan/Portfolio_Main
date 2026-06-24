import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: 'HOME', subtitle: 'Main Dashboard', path: '#home' },
  { name: 'ABOUT', subtitle: 'Personal Profile', path: '#about' },
  { name: 'PROJECTS', subtitle: 'Build Archive', path: '#projects' },
  { name: 'JOURNEY', subtitle: 'Career Timeline', path: '#journey' },
  { name: 'CONTACT', subtitle: 'Communication Hub', path: '#contact' }
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
      gsap.set(mobileDrawerRef.current, { visibility: 'visible' });
      gsap.to(mobileDrawerRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out'
      });
      
      gsap.fromTo('.mobile-drawer-divider',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
      
      gsap.fromTo(mobileLinksRef.current, 
        { x: 30, y: 30, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: 'power3.out' }
      );
    } else {
      gsap.to(mobileDrawerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(mobileDrawerRef.current, { visibility: 'hidden' });
        }
      });
    }
  }, { dependencies: [isMobileMenuOpen] });

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
              {item.name === 'HOME' ? 'Home' : item.name === 'ABOUT' ? 'About' : item.name === 'PROJECTS' ? 'Projects' : item.name === 'JOURNEY' ? 'Journey' : 'Contact'}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        ref={mobileDrawerRef} 
        className="mobile-drawer"
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-divider"></div>

          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a 
                key={index} 
                href={item.path} 
                className="mobile-nav-card"
                onClick={(e) => handleLinkClick(e, item.path)}
                ref={el => mobileLinksRef.current[index] = el}
              >
                <div className="mobile-card-title">{item.name}</div>
                <div className="mobile-card-subtitle">{item.subtitle}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
