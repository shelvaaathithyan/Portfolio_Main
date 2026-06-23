import React from 'react';
import './AboutPage.css';
import Skills from './Skills';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1 className="page-title"><span className="hash">/</span>about-me</h1>
        <p className="page-subtitle">Who am i?</p>
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
        </div>
        
        <div className="about-visual">
          <div className="visual-background-dots">
            <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Dots */}
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

      <Skills />

      <section className="fun-facts-section">
        <div className="section-header">
          <h2 className="section-title"><span className="hash">#</span>my-fun-facts</h2>
          <div className="section-line"></div>
        </div>

        <div className="fun-facts-content">
          <div className="facts-container">
            <div className="fact-box">I like winter more than summer</div>
            <div className="fact-box">I often bike with my friends</div>
            <div className="fact-box">I like <span className="highlight-text">pizza</span> and <span className="highlight-text">pasta</span></div>
            <div className="fact-box">I was in <span className="highlight-text">Egypt, Poland</span> and <span className="highlight-text">Turkey</span></div>
            <div className="fact-box">My favorite movie is <span className="highlight-text">The Green Mile</span></div>
            <div className="fact-box">I am still in school</div>
            <div className="fact-box">I don't have any siblings</div>
          </div>
          
          <div className="facts-visual">
            <svg width="178" height="169" viewBox="0 0 178 169" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="73.5" y="80.5" width="52" height="52" stroke="#abb2bf"/>
              <rect x="0.5" y="116.5" width="52" height="52" stroke="#c778dd"/>
              
              <circle cx="21" cy="21" r="2" fill="#abb2bf"/>
              <circle cx="21" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="21" cy="63" r="2" fill="#abb2bf"/>
              <circle cx="42" cy="21" r="2" fill="#abb2bf"/>
              <circle cx="42" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="42" cy="63" r="2" fill="#abb2bf"/>
              <circle cx="63" cy="21" r="2" fill="#abb2bf"/>
              <circle cx="63" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="63" cy="63" r="2" fill="#abb2bf"/>
              <circle cx="84" cy="21" r="2" fill="#abb2bf"/>
              <circle cx="84" cy="42" r="2" fill="#abb2bf"/>
              <circle cx="84" cy="63" r="2" fill="#abb2bf"/>
              
              <rect x="29.5" y="99.5" width="70" height="70" stroke="#c778dd"/>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
