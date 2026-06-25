import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SectionWatermark = ({ number, title }) => {
  const watermarkRef = useRef(null);

  useGSAP(() => {
    const el = watermarkRef.current;
    if (!el || !el.parentElement) return;

    // Initial state: hidden, shifted, blurred
    gsap.set(el, {
      opacity: 0,
      x: -100,
      yPercent: -50,
      filter: 'blur(12px)'
    });

    // Cinematic Reveal (animates only once)
    gsap.to(el, {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top 75%'
      }
    });

    // Subtle Parallax Drift
    gsap.to(el, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  return (
    <div className="section-watermark" ref={watermarkRef}>
      <div className="watermark-number">{number}</div>
      <div className="watermark-text">{title}</div>
    </div>
  );
};

export default SectionWatermark;
