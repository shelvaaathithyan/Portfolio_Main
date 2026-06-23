import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.about-content > *', {
      y: 50,
      opacity: 0,
      filter: 'blur(10px)',
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
    <section className="portfolio-section about-section" id="about" ref={sectionRef}>
      
      <div className="section-container about-container">
        <h2 className="section-title key-text text-white">About Me</h2>
        
        <div className="about-content">
          <h3 className="about-subtitle text-blue">Who I Am</h3>
          <p className="about-text">
            I am an AI/ML student at PSG College of Technology, passionate about intelligent systems, web applications and real-world problem solving.
          </p>
          <p className="about-text">
            I specialize in bridging the gap between complex machine learning models and intuitive user interfaces. My goal is to build digital experiences that are not just highly performant, but genuinely useful.
          </p>

          <div className="about-stats">
            <div className="about-stat-item">
              <span className="stat-number key-text text-blue">10+</span>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="about-stat-item">
              <span className="stat-number key-text text-blue">15+</span>
              <span className="stat-label">Technologies Used</span>
            </div>
            <div className="about-stat-item">
              <span className="stat-number key-text text-blue">3+</span>
              <span className="stat-label">Years Learning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
