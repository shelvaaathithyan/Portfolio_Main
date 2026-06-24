import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const curtainRef = useRef(null);
  const orbRef = useRef(null);
  
  const isCompleteTriggered = useRef(false);

  const checkCompletion = () => {
    if (!isCompleteTriggered.current) {
      isCompleteTriggered.current = true;
      if (onComplete) onComplete();
    }
  };

  useGSAP(() => {
    // --- TIMELINE ORCHESTRATION (3.0s Total) ---
    const tl = gsap.timeline({
      onComplete: checkCompletion
    });

    // Phase 1 (0s - 1s): Orb Fades In
    tl.to(orbRef.current, { 
      opacity: 1, 
      scale: 1, 
      duration: 1.0, 
      ease: "power2.out" 
    }, 0.0);

    // Phase 2 (1s - 2s): Subtle Breathing Pulse
    tl.to(orbRef.current, { 
      scale: 1.05, 
      duration: 0.5, 
      ease: "power1.inOut" 
    }, 1.0);
    
    tl.to(orbRef.current, { 
      scale: 1, 
      duration: 0.5, 
      ease: "power1.inOut" 
    }, 1.5);

    // Phase 3 (2s - 2.8s): Rapid Expansion Reveal
    // The orb scales up aggressively while the black curtain fades away
    tl.to(orbRef.current, { 
      scale: 40, 
      duration: 0.8, 
      ease: "power3.in" 
    }, 2.0);

    tl.to(curtainRef.current, { 
      opacity: 0, 
      duration: 0.6, 
      ease: "power2.in" 
    }, 2.2);

    // The orb's opacity fades out slightly delayed so it acts as a smooth transition mask
    tl.to(orbRef.current, { 
      opacity: 0, 
      duration: 0.4, 
      ease: "power1.in" 
    }, 2.4);

    // Phase 4 (2.8s - 3.0s): Cleanup
    tl.to(containerRef.current, { 
      opacity: 0, 
      duration: 0.2 
    }, 2.8);

  }, []);

  return (
    <div ref={containerRef} className="loading-container">
      <div ref={curtainRef} className="black-curtain" />
      <div ref={orbRef} className="gradient-orb" />
    </div>
  );
};

export default LoadingScreen;
