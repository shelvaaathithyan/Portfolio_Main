import React, { useEffect } from 'react';
import gsap from 'gsap';
import { FiX } from 'react-icons/fi';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    // Body scroll lock
    document.body.style.overflow = 'hidden';
    
    // Entrance animation
    gsap.fromTo('.project-modal-overlay', 
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    
    gsap.fromTo('.project-modal-content',
      { y: 100, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
    );

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // Exit animation
    gsap.to('.project-modal-content', { y: 100, opacity: 0, scale: 0.95, duration: 0.4, ease: 'power3.in' });
    gsap.to('.project-modal-overlay', { opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: onClose });
  };

  if (!project) return null;

  return (
    <div className="project-modal-overlay">
      <div className="project-modal-content">
        <button className="modal-close-btn" onClick={handleClose}>
          <FiX />
        </button>

        <div className="modal-header">
          <h2 className="modal-title key-text">{project.title}</h2>
          <p className="modal-context text-blue">{project.context}</p>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3 className="modal-section-title">The Problem</h3>
            <p>Cafés struggle with long checkout lines, inefficient customer flow tracking, and lack of personalized upselling opportunities during peak hours.</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">The Solution</h3>
            <p>An integrated computer vision system that identifies items on trays instantly, coupled with a recommendation engine that suggests add-ons based on current orders and historical data.</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Architecture</h3>
            <p>Built using a microservices pattern. Edge devices process video feeds via OpenCV/TensorFlow, sending structured data to a Node.js backend. The frontend dashboard is built in React, providing real-time analytics.</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Results</h3>
            <ul className="modal-results-list">
              <li>Reduced average checkout time by 45%.</li>
              <li>Increased average order value by 15% through smart recommendations.</li>
              <li>Successfully deployed prototype in 2 local pilot locations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
