import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <section id="about-me" className="elias-about-section">
      <div className="section-header">
        <h2 className="section-title"><span className="hash">#</span>about-me</h2>
        <div className="section-line"></div>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>Hello, i'm Elias!</p>
          <p>
            I'm a self-taught front-end developer based in Kyiv, Ukraine. I can develop responsive websites from scratch and raise them into modern user-friendly web experiences.
          </p>
          <p>
            Transforming my creativity and knowledge into a websites has been my passion for over a year. I have been helping various clients to establish their presence online. I always strive to learn about the newest technologies and frameworks.
          </p>
          <Link to="/about" className="contact-btn" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>Read more -&gt;</Link>
        </div>
        
        <div className="about-visual">
          <div className="visual-background-dots">
            {/* Dots */}
            <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="#abb2bf"/>
              <circle cx="2" cy="22" r="2" fill="#abb2bf"/>
              <circle cx="2" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="2" cy="62" r="2" fill="#abb2bf"/>
              <circle cx="2" cy="82" r="2" fill="#abb2bf"/>
              
              <circle cx="22" cy="2" r="2" fill="#abb2bf"/>
              <circle cx="22" cy="22" r="2" fill="#abb2bf"/>
              <circle cx="22" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="22" cy="62" r="2" fill="#abb2bf"/>
              <circle cx="22" cy="82" r="2" fill="#abb2bf"/>
              
              <circle cx="42" cy="2" r="2" fill="#abb2bf"/>
              <circle cx="42" cy="22" r="2" fill="#abb2bf"/>
              <circle cx="42" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="42" cy="62" r="2" fill="#abb2bf"/>
              <circle cx="42" cy="82" r="2" fill="#abb2bf"/>
              
              <circle cx="62" cy="2" r="2" fill="#abb2bf"/>
              <circle cx="62" cy="22" r="2" fill="#abb2bf"/>
              <circle cx="62" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="62" cy="62" r="2" fill="#abb2bf"/>
              <circle cx="62" cy="82" r="2" fill="#abb2bf"/>
              
              <circle cx="82" cy="2" r="2" fill="#abb2bf"/>
              <circle cx="82" cy="22" r="2" fill="#abb2bf"/>
              <circle cx="82" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="82" cy="62" r="2" fill="#abb2bf"/>
              <circle cx="82" cy="82" r="2" fill="#abb2bf"/>
            </svg>
          </div>
          
          <img src="https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=500&q=80" alt="Elias About" className="about-image" />
          <div className="about-image-line"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
