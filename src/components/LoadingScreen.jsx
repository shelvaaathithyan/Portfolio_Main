import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  
  // Track readiness
  const minDurationReached = useRef(false);
  const assetsLoaded = useRef(false);
  const isCompleteTriggered = useRef(false);

  const checkCompletion = () => {
    if (minDurationReached.current && assetsLoaded.current && !isCompleteTriggered.current) {
      isCompleteTriggered.current = true;
      setIsFadingOut(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); // 1s cinematic fade out
    }
  };

  useEffect(() => {
    // Phase 7 minimum duration hold (approx 5.5s total timeline duration)
    // The timeline triggers checkCompletion exactly when it's ready.
    
    // Preload critical assets
    const criticalImages = [
      '/logo.png',
      '/spidergif.gif',
      '/csklogo.jpeg',
      '/marvel.png',
      '/thalapathy.png',
      '/spidermangame.jpg',
      '/ironmanmain.jpg',
      '/badminton.png',
      '/lego.png'
    ];

    let loadedCount = 0;
    
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount >= criticalImages.length) {
        assetsLoaded.current = true;
        checkCompletion();
      }
    };

    criticalImages.forEach(src => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad; 
      img.src = src;
    });

  }, []);

  // Anim state object for GSAP to control the Canvas rendering loop
  const animState = useRef({
    convergence: 0,
    silhouetteAlpha: 0,
    absorption: 0
  });

  useGSAP(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- ORCHESTRATED TIMELINE ---
    const tl = gsap.timeline({
      onComplete: () => {
        minDurationReached.current = true;
        checkCompletion();
      }
    });

    // Phase 1: 0 - 2s (Infinite Tunnel Running Normally, do nothing to vars)

    // Phase 2: 2.0s - 3.0s (Particle Convergence)
    tl.to(animState.current, { convergence: 1, duration: 1.0, ease: "power2.inOut" }, 2.0);

    // Phase 3: 3.0s - 3.5s (Spider Silhouette Emerges Faintly)
    tl.to(animState.current, { silhouetteAlpha: 0.3, duration: 0.5, ease: "power1.inOut" }, 3.0);

    // Phase 4 Part A: 3.4s - 3.5s (Particle Absorption Burst - Sucks inward)
    // Starting slightly before logo reveals
    tl.to(animState.current, { absorption: 1, duration: 0.2, ease: "power4.in" }, 3.4);

    // Phase 4 Part B: 3.5s - 4.3s (Logo Materialization)
    tl.to(logoRef.current, { 
      opacity: 1, 
      scale: 1, 
      filter: "brightness(0) invert(1) blur(0px)", 
      duration: 0.8, 
      ease: "power3.out" 
    }, 3.5);

    // Phase 6: 4.3s - 4.9s (Slogan Reveal)
    tl.to(".slogan-char", {
      opacity: 1,
      y: 0,
      duration: 0.12,
      stagger: 0.08,
      ease: "power2.out"
    }, 4.3);

    // Phase 7: Timeline completes ~5.3s, firing checkCompletion which holds for 1s then fades.

    // --- INFINITE DATA TUNNEL ENGINE ---
    const particles = [];
    const particleCount = 200; 
    const fov = 400; 

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * window.innerWidth * 2.5,
        y: (Math.random() - 0.5) * window.innerHeight * 2.5,
        z: Math.random() * 2000,
        speed: Math.random() * 2 + 1, 
        baseSize: Math.random() * 1.5 + 0.5,
        layer: Math.floor(Math.random() * 4),
        // Angle for mathematical polar clustering
        angle: Math.random() * Math.PI * 2
      });
    }

    let animationFrameId;

    const render = () => {
      ctx.fillStyle = `rgba(0, 0, 0, 0.3)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const state = animState.current;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        
        // Move particle forward
        let currentSpeed = p.speed * 4;
        
        // Phase 2: Slow down center particles during convergence
        if (state.convergence > 0) {
          currentSpeed = currentSpeed * (1 - (state.convergence * 0.8));
        }
        
        p.z -= currentSpeed;
        
        // Rotation
        const angleRot = 0.0005;
        const nx = p.x * Math.cos(angleRot) - p.y * Math.sin(angleRot);
        const ny = p.x * Math.sin(angleRot) + p.y * Math.cos(angleRot);
        p.x = nx;
        p.y = ny;

        if (p.z <= 1) {
          p.z = 2000;
          p.x = (Math.random() - 0.5) * window.innerWidth * 2.5;
          p.y = (Math.random() - 0.5) * window.innerHeight * 2.5;
          p.angle = Math.random() * Math.PI * 2;
        }

        let targetX = p.x;
        let targetY = p.y;

        // Phase 2/3: Mathematical Spider Silhouette Convergence
        // A polar curve that roughly creates an 8-legged central core
        if (state.convergence > 0 && p.layer >= 2) { 
          // Only pull foreground layers to form silhouette
          const r = 40 + 30 * Math.abs(Math.sin(p.angle * 4)); 
          const idealX = r * Math.cos(p.angle) * (p.z / fov); // scale up based on depth so it matches screen size
          const idealY = r * Math.sin(p.angle) * (p.z / fov);
          
          targetX = p.x + (idealX - p.x) * state.convergence;
          targetY = p.y + (idealY - p.y) * state.convergence;
        }

        // Phase 4: Absorption Burst (Suck into exact center)
        if (state.absorption > 0) {
          targetX = targetX + (0 - targetX) * state.absorption;
          targetY = targetY + (0 - targetY) * state.absorption;
        }

        const scale = fov / p.z;
        const x2d = cx + targetX * scale;
        const y2d = cy + targetY * scale;

        let alpha = Math.min(1, (2000 - p.z) / 800); 
        if (p.z < 200) {
          alpha = p.z / 200; 
        }

        // Phase 3: Enhance alpha for the silhouette
        if (state.silhouetteAlpha > 0 && p.layer >= 2 && state.absorption < 1) {
          alpha = Math.max(alpha, state.silhouetteAlpha);
        }

        const colors = [
          `rgba(77, 163, 255, ${alpha * 0.3})`,
          `rgba(110, 184, 255, ${alpha * 0.5})`,
          `rgba(159, 208, 255, ${alpha * 0.7})`,
          `rgba(255, 255, 255, ${alpha})`
        ];

        // Draw particle
        // Fade out entirely during absorption burst so logo takes over smoothly
        const renderAlpha = Math.max(0, 1 - (state.absorption * 1.5));
        
        if (renderAlpha > 0) {
          ctx.globalAlpha = renderAlpha;
          ctx.fillStyle = colors[p.layer];
          ctx.beginPath();
          ctx.arc(x2d, y2d, p.baseSize * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }

        // Neural Network Connections
        if (p.z > 100 && p.z < 1000 && state.absorption < 0.5) {
          for (let j = i + 1; j < particleCount; j++) {
            const p2 = particles[j];
            if (p2.z > 100 && p2.z < 1000) {
              const dx = targetX - p2.x; // approximate distance
              const dy = targetY - p2.y;
              const dz = p.z - p2.z;
              const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
              
              if (dist < 120) {
                const scale2 = fov / p2.z;
                // If the second particle is also converging, we should approximate its target too
                let targetX2 = p2.x;
                let targetY2 = p2.y;
                if (state.convergence > 0 && p2.layer >= 2) {
                  const r2 = 40 + 30 * Math.abs(Math.sin(p2.angle * 4)); 
                  const idealX2 = r2 * Math.cos(p2.angle) * (p2.z / fov);
                  const idealY2 = r2 * Math.sin(p2.angle) * (p2.z / fov);
                  targetX2 = p2.x + (idealX2 - p2.x) * state.convergence;
                  targetY2 = p2.y + (idealY2 - p2.y) * state.convergence;
                }

                const x2d2 = cx + targetX2 * scale2;
                const y2d2 = cy + targetY2 * scale2;
                
                ctx.globalAlpha = renderAlpha;
                ctx.strokeStyle = `rgba(77, 163, 255, ${0.05 * alpha})`;
                ctx.lineWidth = 0.5 * scale;
                ctx.beginPath();
                ctx.moveTo(x2d, y2d);
                ctx.lineTo(x2d2, y2d2);
                ctx.stroke();
                ctx.globalAlpha = 1.0;
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`loading-container ${isFadingOut ? 'fade-out' : ''}`}>
      <canvas ref={canvasRef} className="vortex-canvas" />
      <div className="absolute-center">
        <div className="glitch-wrapper core-pulse-active">
          <div ref={logoRef} className="spider-logo pre-materialize" />
        </div>
        <div ref={textRef} className="loading-text glow-text">
          <span className="slogan-char">W</span>
          <span className="slogan-char">&nbsp;</span>
          <span className="slogan-char">/</span>
          <span className="slogan-char">&nbsp;</span>
          <span className="slogan-char">G<sup>P</sup></span>
          <span className="slogan-char">&nbsp;</span>
          <span className="slogan-char">&#8658;</span>
          <span className="slogan-char">&nbsp;</span>
          <span className="slogan-char">G<sup>R</sup></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
