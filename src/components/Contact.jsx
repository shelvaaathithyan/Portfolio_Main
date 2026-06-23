import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import './Contact.css';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.contact-header > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.contact-btn', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.contact-buttons',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="portfolio-section contact-section" id="contact" ref={sectionRef}>
      
      <div className="section-container contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-mega-title key-text text-white">
              Let's Build Something Great Together
            </h2>
            <p className="contact-subtitle">
              Ready to collaborate on intelligent systems and impactful digital experiences?
            </p>
          </div>
          
          <div className="contact-buttons">
            <a href="mailto:hello@shelvaaathithyan.com" className="contact-btn email-btn">
              <FiMail className="contact-icon" /> Email Me
            </a>
            <a href="#" className="contact-btn linkedin-btn">
              <FiLinkedin className="contact-icon" /> LinkedIn
            </a>
            <a href="#" className="contact-btn github-btn">
              <FiGithub className="contact-icon" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
