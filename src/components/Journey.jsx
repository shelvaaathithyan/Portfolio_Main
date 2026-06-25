import React, { useRef, useState, useEffect } from 'react';
import MobileJourney from './MobileJourney';
import DesktopJourneyGraph from './DesktopJourneyGraph';
import './SectionStyles.css';

const Journey = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="portfolio-section journey-section" id="journey" data-section="journey" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title key-text text-white" style={{ textAlign: 'center', marginBottom: '2rem' }}>The Journey</h2>
        
        {isMobile ? (
          <MobileJourney />
        ) : (
          <DesktopJourneyGraph />
        )}
      </div>
    </section>
  );
};

export default Journey;
