import React, { useEffect } from 'react';
import gsap from 'gsap';
import { FiX } from 'react-icons/fi';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingText, setLoadingText] = React.useState("Initializing Model...");

  useEffect(() => {
    // Body scroll lock
    document.body.style.overflow = 'hidden';
    
    // Entrance animation for overlay
    gsap.fromTo('.project-modal-overlay', 
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    
    // AI Loading sequence
    setTimeout(() => setLoadingText("Loading Project Data..."), 600);
    setTimeout(() => setLoadingText("Rendering Experience..."), 1200);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo('.project-modal-content',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power4.out' }
      );
    }
  }, [isLoading]);

  const handleClose = () => {
    gsap.to('.project-modal-content', { y: 40, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power3.in' });
    gsap.to('.project-modal-overlay', { opacity: 0, duration: 0.4, ease: 'power2.in', onComplete: onClose });
  };

  if (!project) return null;

  return (
    <div className="project-modal-overlay">
      {isLoading ? (
        <div className="modal-ai-loader">
          <span className="ai-loader-text key-text">{loadingText}</span>
          <span className="term-cursor">_</span>
        </div>
      ) : (
        <div className="project-modal-content">
        <button className="modal-close-btn" onClick={handleClose}>
          <FiX />
        </button>

        <div className="modal-header" style={{ paddingTop: '40px' }}>
          <h2 className="modal-title key-text">{project.title}</h2>
          <p className="modal-context text-blue">{project.context}</p>
          {project.title === 'VisionBite' && (
            <div style={{ marginTop: '1rem', color: '#adb5bd', fontSize: '1rem', letterSpacing: '0.5px' }}>
              Computer Vision • Recommendation Engine • Full Stack
            </div>
          )}
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
            
            <div className="arch-flow">
              <div className="arch-node">Camera</div>
              <div className="arch-connector"></div>
              <div className="arch-node">Recognition</div>
              <div className="arch-connector"></div>
              <div className="arch-node">Recommendation</div>
              <div className="arch-connector"></div>
              <div className="arch-node">Dashboard</div>
            </div>
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
      )}
    </div>
  );
};

export default ProjectModal;
