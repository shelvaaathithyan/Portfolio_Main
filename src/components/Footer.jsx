import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <section className="cta-section">
        <h2 className="cta-title">Got a Vision? Let's Bring It to Life!</h2>
        <p className="cta-desc">
          I'm always excited to collaborate on new and innovative projects. Whether you're starting from scratch or refining an existing idea.
        </p>
        <a href="#contact" className="book-call-link">Book A Call <FiArrowUpRight /></a>
      </section>
      
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-nav">
            <a href="#home" className="footer-link home-btn">Home</a>
            <a href="#about" className="footer-link">About Me</a>
            <a href="#portfolio" className="footer-link">Portfolio</a>
            <a href="#services" className="footer-link">Services</a>
            <a href="#blog" className="footer-link">Blog</a>
          </div>
          <div className="footer-email">
            hello@shelvaaathithyan.com
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
