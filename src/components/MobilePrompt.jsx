import React, { useState, useEffect } from 'react';
import './MobilePrompt.css';

const MobilePrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768;
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      const isAlreadyForced = viewportMeta && viewportMeta.content.includes('width=1280');

      if (isMobile && !isAlreadyForced) {
        setShowPrompt(true);
      } else {
        setShowPrompt(false);
      }
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOkClick = () => {
    setShowPrompt(false);
    
    // Force desktop view by manipulating the viewport meta tag
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=1280, initial-scale=0.3, maximum-scale=2.0, user-scalable=yes';
  };

  if (!showPrompt) return null;

  return (
    <div className="mobile-prompt-overlay">
      <div className="mobile-prompt-box">
        <h2>Optimal Experience</h2>
        <p>
          For the best experience, please switch to <strong>Desktop View</strong> in your browser settings or rotate your phone to landscape mode.
        </p>
        <button className="mobile-prompt-button" onClick={handleOkClick}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default MobilePrompt;
