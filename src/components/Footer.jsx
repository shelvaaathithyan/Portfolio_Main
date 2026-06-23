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
      padding: '4rem 2rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      background: 'rgba(10, 10, 10, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{
          fontSize: '1.2rem',
          color: '#fff',
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-major)',
          letterSpacing: '1px'
        }}>
          Designed & Developed by Shelvaaathithyan VK
        </p>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem'
        }}>
          Building intelligent systems, one idea at a time.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
