import React, { useState, useEffect } from 'react';
import './StickySectionNumbers.css';

const SECTION_REGISTRY = [
  { id: 'hero', hidden: true },
  { id: 'about', num: '01', title: 'ABOUT' },
  { id: 'journey', num: '02', title: 'JOURNEY' },
  { id: 'terminal', num: '03', title: 'TERMINAL' },
  { id: 'capabilities', num: '04', title: 'CAPABILITIES' },
  { id: 'projects', num: '05', title: 'PROJECTS' },
  { id: 'contact', num: '06', title: 'CONTACT' }
];

const StickySectionNumbers = () => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    let animationFrameId = null;
    let lastScrollY = window.scrollY;

    const calculateClosestSection = () => {
      // Find all DOM elements matching our registered sections
      const sectionElements = Array.from(document.querySelectorAll('[data-section]'))
        .filter(el => SECTION_REGISTRY.some(sec => sec.id === el.getAttribute('data-section')));

      if (sectionElements.length === 0) return;

      const viewportCenter = window.innerHeight / 2;
      
      let closestDistance = Infinity;
      let closestSectionId = null;
      
      // Temporary debug array
      const debugDistances = [];

      sectionElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + (rect.height / 2);
        const distance = Math.abs(sectionCenter - viewportCenter);
        const id = el.getAttribute('data-section');
        
        debugDistances.push({ id, distance: Math.round(distance), height: Math.round(rect.height) });

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSectionId = id;
        }
      });

      if (closestSectionId && closestSectionId !== activeSection) {
        setActiveSection(closestSectionId);
      }
      
      // Temporary debug output as requested
      console.table(debugDistances);
    };

    const handleScroll = () => {
      // Throttle calculation via requestAnimationFrame
      if (Math.abs(window.scrollY - lastScrollY) > 10) {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          calculateClosestSection();
          lastScrollY = window.scrollY;
        });
      }
    };

    // Calculate once on mount
    calculateClosestSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateClosestSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateClosestSection);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection]);

  return (
    <div className="sticky-section-numbers">
      {SECTION_REGISTRY.filter(sec => !sec.hidden).map((sec) => (
        <div 
          key={sec.id} 
          className={`sticky-number-container ${activeSection === sec.id ? 'active' : ''}`}
        >
          <div className="sticky-number">{sec.num}</div>
          <div className="sticky-label">{sec.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StickySectionNumbers;
