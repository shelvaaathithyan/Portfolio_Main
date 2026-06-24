import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiDownload, FiMail, FiX } from 'react-icons/fi';
import './CollaborationSimulation.css';

const STAGES = [
  'INITIALIZATION',
  'DAY_1',
  'WEEK_1',
  'MONTH_1',
  'MONTH_6',
  'RESULT'
];

const CollaborationSimulation = ({ isOpen, onClose }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Handle Open/Close animation
  useGSAP(() => {
    if (isOpen) {
      setCurrentStage(0);
      gsap.to(modalRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        display: 'flex'
      });
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
        }
      });
    }
  }, { scope: modalRef, dependencies: [isOpen] });

  // Handle stage transitions
  useGSAP(() => {
    if (!isOpen) return;
    
    const stageName = STAGES[currentStage];
    
    // Clear previous
    gsap.set('.sim-stage-content', { opacity: 0, x: 50, y: 0 });
    gsap.set('.sim-checklist-item', { opacity: 0, x: -20 });
    gsap.set('.sim-continue-btn', { opacity: 0, y: 20 });
    
    // Animate in
    const tl = gsap.timeline();
    
    if (stageName === 'RESULT') {
      gsap.set('.sim-stage-content', { opacity: 0, x: 0, y: 20 });
      gsap.set('.sim-btn', { opacity: 0, y: 10 });
      tl.to('.sim-stage-content', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      tl.to('.sim-btn', { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, "-=0.2");
    } else {
      tl.to('.sim-stage-content', { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' });
      if (stageName !== 'INITIALIZATION') {
        tl.to('.sim-checklist-item', {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }
      tl.to('.sim-continue-btn', { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '+=0.2');
    }

  }, { scope: contentRef, dependencies: [currentStage, isOpen] });

  if (!isOpen && currentStage === 0) return null;

  const nextStage = () => {
    if (currentStage < STAGES.length - 1) {
      // Fade out current content to left
      gsap.to('.sim-stage-content', {
        opacity: 0,
        x: -50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setCurrentStage(prev => prev + 1)
      });
    }
  };

  const handleClose = () => {
    onClose();
  };

  const stage = STAGES[currentStage];

  return (
    <div className="sim-modal-overlay" ref={modalRef}>
      <button className="sim-close-icon" onClick={handleClose}>
        <FiX size={24} />
      </button>
      
      <div className="sim-content-container" ref={contentRef}>
        
        {stage === 'INITIALIZATION' && (
          <div className="sim-stage-content">
            <h2 className="sim-title">MISSION BRIEFING</h2>
            <div className="sim-scenario">
              <span className="sim-label">Scenario:</span>
              <p>Your team is building the next generation<br/>of intelligent software systems.</p>
            </div>
            <div className="sim-candidate">
              <span className="sim-label">Candidate Assigned:</span>
              <p className="text-blue" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Shelvaaathithyan VK</p>
            </div>
            <div className="sim-status">
              Simulation Ready.
            </div>
            <button className="sim-continue-btn sim-primary-btn" onClick={nextStage}>
              START SIMULATION
            </button>
          </div>
        )}

        {stage === 'DAY_1' && (
          <div className="sim-stage-content">
            <h2 className="sim-title">DAY 1</h2>
            <div className="sim-checklist">
              <div className="sim-checklist-item">✓ Understanding Requirements</div>
              <div className="sim-checklist-item">✓ Exploring Existing Systems</div>
              <div className="sim-checklist-item">✓ Reviewing Documentation</div>
              <div className="sim-checklist-item">✓ Mapping Architecture</div>
            </div>
            <div className="sim-progress-container">
              <div className="sim-progress-bar" style={{ width: '10%' }}></div>
              <span className="sim-progress-text">10%</span>
            </div>
            <button className="sim-continue-btn sim-primary-btn" onClick={nextStage}>
              DAY 1 COMPLETE &rarr;
            </button>
          </div>
        )}

        {stage === 'WEEK_1' && (
          <div className="sim-stage-content">
            <h2 className="sim-title">WEEK 1</h2>
            <div className="sim-checklist">
              <div className="sim-checklist-item">✓ Fixing Bugs</div>
              <div className="sim-checklist-item">✓ Contributing Features</div>
              <div className="sim-checklist-item">✓ Participating in Reviews</div>
              <div className="sim-checklist-item">✓ Learning Team Workflow</div>
            </div>
            <div className="sim-progress-container">
              <div className="sim-progress-bar" style={{ width: '35%' }}></div>
              <span className="sim-progress-text">35%</span>
            </div>
            <button className="sim-continue-btn sim-primary-btn" onClick={nextStage}>
              WEEK 1 COMPLETE &rarr;
            </button>
          </div>
        )}

        {stage === 'MONTH_1' && (
          <div className="sim-stage-content">
            <h2 className="sim-title">MONTH 1</h2>
            <div className="sim-checklist">
              <div className="sim-checklist-item">✓ Building Production Features</div>
              <div className="sim-checklist-item">✓ Improving Existing Systems</div>
              <div className="sim-checklist-item">✓ Collaborating Across Teams</div>
              <div className="sim-checklist-item">✓ Delivering Independent Tasks</div>
            </div>
            <div className="sim-progress-container">
              <div className="sim-progress-bar" style={{ width: '65%', filter: 'brightness(1.2)' }}></div>
              <span className="sim-progress-text">65%</span>
            </div>
            <button className="sim-continue-btn sim-primary-btn" onClick={nextStage}>
              MONTH 1 COMPLETE &rarr;
            </button>
          </div>
        )}

        {stage === 'MONTH_6' && (
          <div className="sim-stage-content">
            <h2 className="sim-title">MONTH 6</h2>
            <div className="sim-checklist">
              <div className="sim-checklist-item">✓ Leading Development Efforts</div>
              <div className="sim-checklist-item">✓ Designing Solutions</div>
              <div className="sim-checklist-item">✓ Optimizing Performance</div>
              <div className="sim-checklist-item">✓ Mentoring Team Members</div>
              <div className="sim-checklist-item">✓ Driving Innovation</div>
            </div>
            <div className="sim-progress-container">
              <div className="sim-progress-bar" style={{ width: '100%', filter: 'brightness(1.5)', background: '#3b82f6' }}></div>
              <span className="sim-progress-text" style={{ color: '#3b82f6' }}>100%</span>
            </div>
            <button className="sim-continue-btn sim-primary-btn" onClick={nextStage}>
              MONTH 6 COMPLETE &rarr;
            </button>
          </div>
        )}

        {stage === 'RESULT' && (
          <div className="sim-stage-content sim-result-content">
            <h2 className="sim-title sim-result-title">Simulation Complete</h2>
            
            <div className="sim-result-stack">
              <div className="sim-result-section">
                <span className="sim-label">Current State</span>
                <p className="sim-text-primary">AI & Full Stack Developer</p>
              </div>

              <div className="sim-result-section">
                <span className="sim-label">Mission</span>
                <p className="sim-text-secondary">Building impactful AI-driven products.</p>
              </div>

              <div className="sim-result-section">
                <span className="sim-label">Strengths Observed</span>
                <div className="sim-strengths-grid">
                  <div className="sim-strength-card">
                    <span className="sim-strength-icon">✓</span> Adaptability
                  </div>
                  <div className="sim-strength-card">
                    <span className="sim-strength-icon">✓</span> Curiosity
                  </div>
                  <div className="sim-strength-card">
                    <span className="sim-strength-icon">✓</span> System Thinking
                  </div>
                  <div className="sim-strength-card">
                    <span className="sim-strength-icon">✓</span> Continuous Learning
                  </div>
                </div>
              </div>
            </div>

            <div className="sim-disclaimer">
              This is not a prediction.<br/>It is the direction I work towards every day.
            </div>

            <div className="sim-action-group">
              <button className="sim-btn sim-btn-outline" onClick={() => window.open('/Shelvaaathithyan_Resume.pdf', '_blank')}>
                <FiDownload /> Download Resume
              </button>
              <button className="sim-btn sim-btn-outline" onClick={() => { handleClose(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                <FiMail /> Contact Me
              </button>
              <button className="sim-btn sim-btn-close" onClick={handleClose}>
                Close Simulation
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CollaborationSimulation;
