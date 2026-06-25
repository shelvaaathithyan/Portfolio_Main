import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './SideQuests.css';

const quests = [
  { id: 1, src: '/csklogo.jpeg', alt: 'Cricket', glow: 'rgba(255, 255, 0, 0.4)' },
  { id: 2, src: '/badminton.png', alt: 'Badminton', glow: 'rgba(0, 255, 0, 0.4)' },
  { id: 3, src: '/lego.png', alt: 'LEGO', glow: 'rgba(255, 165, 0, 0.4)' },
  { id: 4, src: '/marvel.png', alt: 'Marvel', glow: 'rgba(255, 0, 0, 0.4)' },
  { id: 5, src: '/ironmanmain.jpg', alt: 'Iron Man', glow: 'rgba(0, 255, 255, 0.4)' },
  { id: 6, src: '/thalapathy.png', alt: 'Movies', glow: 'rgba(255, 0, 0, 0.4)' },
  { id: 7, src: '/thalapathy2.png', alt: 'Movies 2', glow: 'rgba(255, 0, 0, 0.4)' },
  { id: 8, src: '/spidermangame.jpg', alt: 'Gaming', glow: 'rgba(0, 0, 255, 0.4)' },
  { id: 9, src: '/msd.jpeg', alt: 'MS Dhoni', glow: 'rgba(255, 255, 0, 0.4)' }
];

// Duplicate to allow seamless scroll
const extendedQuests = [...quests, ...quests, ...quests, ...quests];

const SideQuests = () => {
  const trackRef = useRef(null);

  useGSAP(() => {
    // Infinite linear scroll
    gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1
    });
  }, { scope: trackRef });

  return (
    <section className="side-quests-section">
      <div className="side-quests-container">
        <h4 className="side-quests-heading">LIFE BEYOND CODE</h4>
        <div className="side-quests-marquee">
          <div className="side-quests-track" ref={trackRef}>
            {extendedQuests.map((q, idx) => (
              <img 
                key={`${q.id}-${idx}`} 
                src={q.src} 
                alt={q.alt} 
                className="side-quest-img" 
                style={{ '--hover-glow': q.glow }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideQuests;
