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
        { y: 50, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, [isLoading]);

  const handleClose = () => {
    gsap.to('.project-modal-content', { y: 50, opacity: 0, scale: 0.98, duration: 0.3, ease: 'power3.in' });
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
            
            <div className="arch-viz-container">
              {project.title === 'VisionBite' ? (
                <svg className="arch-svg" viewBox="0 0 600 200">
                  <path className="arch-path" d="M 50 100 L 150 100 L 250 50 L 350 50 L 450 100 L 550 100" fill="none" stroke="var(--theme-glow)" strokeWidth="3" strokeDasharray="5,5" />
                  <circle cx="50" cy="100" r="10" fill="var(--accent-color)" />
                  <text x="50" y="130" fill="#fff" fontSize="12" textAnchor="middle">Camera</text>
                  <circle cx="150" cy="100" r="10" fill="var(--accent-color)" />
                  <text x="150" y="130" fill="#fff" fontSize="12" textAnchor="middle">Face Rec.</text>
                  <circle cx="300" cy="50" r="10" fill="var(--accent-color)" />
                  <text x="300" y="30" fill="#fff" fontSize="12" textAnchor="middle">Emotion Engine</text>
                  <circle cx="450" cy="100" r="10" fill="var(--accent-color)" />
                  <text x="450" y="130" fill="#fff" fontSize="12" textAnchor="middle">Rec. Engine</text>
                  <circle cx="550" cy="100" r="10" fill="var(--accent-color)" />
                  <text x="550" y="130" fill="#fff" fontSize="12" textAnchor="middle">Customer</text>
                </svg>
              ) : (
                <svg className="arch-svg" viewBox="0 0 600 150">
                  <path className="arch-path" d="M 50 75 L 200 75 L 350 75 L 500 75" fill="none" stroke="var(--theme-glow)" strokeWidth="3" />
                  <circle cx="50" cy="75" r="10" fill="var(--accent-color)" />
                  <text x="50" y="105" fill="#fff" fontSize="12" textAnchor="middle">CR Request</text>
                  <circle cx="200" cy="75" r="10" fill="var(--accent-color)" />
                  <text x="200" y="105" fill="#fff" fontSize="12" textAnchor="middle">Booking System</text>
                  <circle cx="350" cy="75" r="10" fill="var(--accent-color)" />
                  <text x="350" y="105" fill="#fff" fontSize="12" textAnchor="middle">Approval Flow</text>
                  <circle cx="500" cy="75" r="10" fill="var(--accent-color)" />
                  <text x="500" y="105" fill="#fff" fontSize="12" textAnchor="middle">Allocation</text>
                </svg>
              )}
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
