import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.contact-content > *', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="portfolio-section contact-section" id="contact" ref={sectionRef}>
      <div className="section-number-bg key-text">04</div>
      
      <div className="section-container">
        <div className="contact-content">
          <h2 className="section-title key-text text-white" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Let's Connect</h2>
          <p className="contact-text">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <a href="mailto:hello@shelvaaathithyan.com" className="contact-email key-text">
            HELLO@SHELVAAATHITHYAN.COM
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
