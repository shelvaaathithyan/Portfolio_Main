import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const progressRef = useRef(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3 // Smooth scrub
      }
    });
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.1)',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      <div 
        ref={progressRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--accent-color)', // Soft blue
          transformOrigin: '0% 50%',
          transform: 'scaleX(0)',
          boxShadow: '0 0 10px var(--accent-color)'
        }}
      />
    </div>
  );
};

export default ScrollProgress;
