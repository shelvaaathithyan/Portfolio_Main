import React, { useState, useEffect } from 'react';
import MobileJourney from './MobileJourney';
import DesktopJourneyGraph from './DesktopJourneyGraph';

const Journey = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? <MobileJourney /> : <DesktopJourneyGraph />;
};

export default Journey;
