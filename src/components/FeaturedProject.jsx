import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import ProjectModal from './ProjectModal';
import './FeaturedProject.css';

gsap.registerPlugin(ScrollTrigger);

const FeaturedProject = () => {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectData = {
    title: "VisionBite",
    context: "AI-Powered Smart Café Platform"
  };

  useGSAP(() => {
    // Reveal animation
    gsap.from('.fp-content-wrapper', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    // Parallax image effect
    gsap.to('.fp-image', {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="portfolio-section fp-section" id="featured" ref={sectionRef}>
      <div className="section-number-bg key-text">01</div>
      
      <div className="section-container fp-container">
        <div className="fp-header">
          <h3 className="text-blue key-text">Featured Project</h3>
        </div>

        <div className="fp-content-wrapper">
          <div className="fp-image-container">
            <div className="fp-image" />
            <div className="fp-overlay">
              <button className="fp-view-btn" onClick={() => setIsModalOpen(true)}>
                Open Case Study <FiArrowRight />
              </button>
            </div>
          </div>
          
          <div className="fp-details">
            <h2 className="fp-title key-text text-white">VisionBite</h2>
            <h4 className="fp-subtitle">AI-Powered Smart Café Platform</h4>
            
            <div className="fp-description">
              <p>
                VisionBite revolutionizes the café experience by integrating computer vision and machine learning to automate checkout, analyze customer flow, and provide personalized recommendations. Built to scale with a robust microservices architecture.
              </p>
            </div>
            
            <div className="fp-tech-list">
              <span>React</span>
              <span>Python</span>
              <span>TensorFlow</span>
              <span>OpenCV</span>
              <span>Node.js</span>
            </div>
            
            <div className="fp-links">
              <a href="#" className="fp-link"><FiGithub /> Source Code</a>
              <a href="#" className="fp-link"><FiExternalLink /> Live Demo</a>
            </div>
          </div>
        </div>
      </div>
      
      {isModalOpen && <ProjectModal project={projectData} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default FeaturedProject;
