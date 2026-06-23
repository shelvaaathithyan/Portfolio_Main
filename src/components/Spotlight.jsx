import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Spotlight = () => {
  const spotlightRef = useRef(null);
  
  useEffect(() => {
    if (!spotlightRef.current) return;
    
    // Set initial position to center
    gsap.set(spotlightRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });
    
    // Smooth trailing effect using gsap.quickTo for performance
    const xTo = gsap.quickTo(spotlightRef.current, "x", {duration: 0.8, ease: "power3"});
    const yTo = gsap.quickTo(spotlightRef.current, "y", {duration: 0.8, ease: "power3"});
    
    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={spotlightRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vw', // Making it large enough to cover viewport
        pointerEvents: 'none',
        zIndex: -1, // Above neural network (-2), below content (0+)
        // Primary spotlight + small ambient glow
        background: `
          radial-gradient(circle 600px at center, rgba(59, 130, 246, 0.08) 0%, transparent 80%),
          radial-gradient(circle 200px at center, rgba(255, 255, 255, 0.03) 0%, transparent 100%)
        `,
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default Spotlight;
