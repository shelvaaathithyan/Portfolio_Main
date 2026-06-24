import React, { useEffect } from 'react';
import gsap from 'gsap';
import './MultiverseDatabase.css';

const TIMELINES = [
  { id: 'EARTH-616', role: 'AI Engineer', status: 'Active Reality', mission: 'Build intelligent systems.', isPrime: true },
  { id: 'EARTH-205', role: 'Cyber Security Researcher', status: 'Alternate Timeline', mission: 'Protect critical infrastructure.', isPrime: false },
  { id: 'EARTH-101', role: 'Game Developer', status: 'Alternate Timeline', mission: 'Build immersive virtual worlds.', isPrime: false },
  { id: 'EARTH-308', role: 'Movie Director', status: 'Alternate Timeline', mission: 'Create cinematic universes.', isPrime: false },
  { id: 'EARTH-512', role: 'Professional Cricketer', status: 'Alternate Timeline', mission: 'Win championships for CSK.', isPrime: false }
];

const MultiverseDatabase = ({ onClose }) => {
  useEffect(() => {
    gsap.fromTo('.mv-card', 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power3.out" }
    );
    gsap.fromTo('.mv-header, .mv-analysis',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay: 0.3 }
    );
  }, []);

  const handleClose = () => {
    gsap.to('.mv-container', {
      opacity: 0, scale: 0.98, duration: 0.4, ease: "power2.inOut",
      onComplete: onClose
    });
  };

  return (
    <div className="mv-container">
      <div className="mv-header">
        <h2 className="mv-title">MULTIVERSE DATABASE</h2>
        <div className="mv-subtitle">5 TIMELINES DETECTED</div>
      </div>

      <div className="mv-cards-grid">
        {TIMELINES.map(t => (
          <div 
            key={t.id} 
            className={`mv-card ${t.isPrime ? 'prime-card' : ''}`}
          >
            <div className="mv-card-header">
              <div className="mv-card-id">{t.id}</div>
              {t.isPrime && <div className="mv-badge">ACTIVE TIMELINE</div>}
            </div>
            <div className="mv-card-role">{t.role}</div>
            
            <div className="mv-card-details">
              <div className="mv-detail-group">
                <span className="mv-label">Status:</span> <span style={{ color: '#fff' }}>{t.status}</span>
              </div>
              <div className="mv-detail-group">
                <span className="mv-label">Mission:</span> <span style={{ color: '#fff' }}>{t.mission}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mv-analysis">
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
          <div style={{ color: '#10b981', fontWeight: 'bold' }}>MULTIVERSE ANALYSIS COMPLETE</div>
        </div>
        
        <div className="mv-analysis-grid">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="mv-label">Probability of Success:</div>
            <div style={{ fontSize: '1.2rem', color: '#fff' }}>Earth-616 <span style={{ color: '#3b82f6' }}>97.4%</span></div>
            
            <button className="mv-close-btn" onClick={handleClose}>
              ◀ EXIT MULTIVERSE
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="mv-label">Recommendation:</div>
            <div style={{ color: '#fff', marginBottom: '4px' }}>Stay on Earth-616.</div>
            <div style={{ color: '#adb5bd', fontSize: '0.85rem' }}>Reason: AI Engineering offers the highest impact trajectory.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiverseDatabase;
