import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  // Animation state object for GSAP to tween smoothly
  const animState = useRef({
    particleOpacity: 0,
    speed: 0.002,
    pull: 0,
    radiusMultiplier: 1,
    explosionVelocity: 0,
    coreOpacity: 0,
    logoScale: 1,
    logoOpacity: 0,
    textOpacity: 0
  });

  useGSAP(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size and handle resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize 400 vortex particles
    const particleCount = 400;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * Math.max(canvas.width, canvas.height) + 50,
        baseSpeed: Math.random() * 0.8 + 0.2,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.5
      });
    }

    // High-performance canvas animation loop
    let animationFrameId;
    const render = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const state = animState.current;

      // Dark background with slight transparency to create light trails
      ctx.fillStyle = `rgba(0, 0, 0, 0.15)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (state.particleOpacity > 0 || state.explosionVelocity > 0) {
        particles.forEach(p => {
          // Update particle position based on vortex properties
          p.angle += state.speed * p.baseSpeed;
          p.distance -= state.pull * p.distance;
          
          if (state.explosionVelocity > 0) {
            p.distance += state.explosionVelocity * p.baseSpeed;
          }

          const currentDist = p.distance * state.radiusMultiplier;
          const x = cx + Math.cos(p.angle) * currentDist;
          const y = cy + Math.sin(p.angle) * currentDist;

          // Draw individual particle (electric blue)
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha * state.particleOpacity})`;
          ctx.fill();

          // Connect nearby particles for a "web-like" energy effect
          if (Math.random() > 0.95 && currentDist < 300) {
            const connectP = particles[Math.floor(Math.random() * particleCount)];
            const cx2 = cx + Math.cos(connectP.angle) * connectP.distance * state.radiusMultiplier;
            const cy2 = cy + Math.sin(connectP.angle) * connectP.distance * state.radiusMultiplier;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(cx2, cy2);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * state.particleOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }

      // Draw the bright core during collapse and explode phases
      if (state.coreOpacity > 0) {
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${state.coreOpacity})`);
        gradient.addColorStop(0.1, `rgba(59, 130, 246, ${state.coreOpacity * 0.9})`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sync React element styles manually for better performance during GSAP tweening
      if (logoRef.current) {
        logoRef.current.style.opacity = state.logoOpacity;
        logoRef.current.style.transform = `scale(${state.logoScale})`;
      }
      if (textRef.current) {
        textRef.current.style.opacity = state.textOpacity;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // The Orchestrated GSAP Timeline (Total Duration: ~6 seconds)
    const tl = gsap.timeline({
      onComplete: () => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete(); // Reveal main portfolio after 1s fade-out
        }, 1000);
      }
    });

    // Stage 1: Spider Appear with Glitch & Text Reveal (0s - 1.5s)
    tl.to(animState.current, { logoOpacity: 1, duration: 1.5, ease: "power1.inOut" }, 0);
    tl.to(animState.current, { textOpacity: 1, duration: 1.5, ease: "power1.inOut" }, 0.5);

    // Stage 2: Energy Buildup & Vortex Formation (1.5s - 3.5s)
    tl.to(animState.current, { particleOpacity: 1, duration: 2, ease: "power2.inOut" }, 1.5);
    tl.to(animState.current, { speed: 0.04, duration: 2, ease: "power2.in" }, 1.5);

    // Stage 3: Vortex Acceleration & Inward Pull (3.5s - 4.8s)
    tl.to(animState.current, { speed: 0.2, pull: 0.02, duration: 1.3, ease: "power3.in" }, 3.5);
    tl.to(logoRef.current, { filter: "brightness(2) invert(1) drop-shadow(0 0 25px #3B82F6)", duration: 1.3 }, 3.5);

    // Stage 4: Transformation & Collapse (4.8s - 5.2s)
    tl.to(animState.current, { pull: 0.2, radiusMultiplier: 0.05, logoScale: 0, coreOpacity: 1, duration: 0.4, ease: "power4.in" }, 4.8);
    tl.to(animState.current, { textOpacity: 0, duration: 0.2 }, 4.8);

    // Stage 5: Portfolio Reveal / Explode (5.2s - 5.7s)
    tl.to(animState.current, { explosionVelocity: 60, coreOpacity: 0, particleOpacity: 0.8, duration: 0.5, ease: "power2.out" }, 5.2);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div className={`loading-container ${isFadingOut ? 'fade-out' : ''}`}>
      <canvas ref={canvasRef} className="vortex-canvas" />
      <div className="loading-content absolute-center">
        <div className="glitch-wrapper">
          {/* Using a div with background-image instead of <img> to support CSS pseudo-elements for the glitch effect */}
          <div ref={logoRef} className="spider-logo glitch-effect" />
        </div>
        <div ref={textRef} className="loading-text glow-text">
          w / G<sup>P</sup> &#8658; G<sup>R</sup>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
