import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StickySectionNumbers.css';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: 'about', num: '01', title: 'ABOUT' },
  { id: 'journey', num: '02', title: 'JOURNEY' },
  { id: 'terminal', num: '03', title: 'TERMINAL' },
  { id: 'skills', num: '04', title: 'SKILLS' },
  { id: 'featured', num: '05', title: 'PROJECT SPOTLIGHT' },
  { id: 'contact', num: '06', title: 'CONTACT' }
];

const StickySectionNumbers = () => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // We create a ScrollTrigger for each section to update the active state
    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: sec.id === 'contact' ? "top 75%" : "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveSection(sec.id),
          onEnterBack: () => setActiveSection(sec.id),
          onLeave: () => {
            // Only clear if we are leaving the last section or scrolling up past first
            if (sec.id === 'contact') setActiveSection(null);
          },
          onLeaveBack: () => {
            if (sec.id === 'about') setActiveSection(null);
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  if (!activeSection) return null;

  const currentSec = sections.find(s => s.id === activeSection);

  return (
    <div className="sticky-section-numbers">
      {sections.map((sec) => (
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
