import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    gsap.from(footerRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 95%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} style={{
      width: '100%',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      background: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '0.3rem',
          fontFamily: 'var(--font-major)',
          letterSpacing: '1px'
        }}>
          Designed & Developed by Shelvaaathithyan VK
        </p>
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.8rem'
        }}>
          Building intelligent systems, one idea at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
