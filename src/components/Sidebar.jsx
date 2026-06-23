import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';
import { FiHome, FiUser, FiFolder, FiAward, FiCode, FiMail, FiFileText, FiGithub, FiLinkedin } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xffffff,
          backgroundColor: 0x0, // Black background
          points: 13.00,
          maxDistance: 22.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const navItems1 = [
    { id: 'home', icon: <FiHome /> },
    { id: 'about', icon: <FiUser /> },
    { id: 'portfolio', icon: <FiFolder /> },
    { id: 'awards', icon: <FiAward /> },
    { id: 'code1', icon: <FiCode /> },
    { id: 'contact', icon: <FiMail /> },
  ];

  const navItems2 = [
    { id: 'resume', icon: <FiFileText /> },
    { id: 'github', icon: <FiGithub /> },
    { id: 'linkedin', icon: <FiLinkedin /> },
    { id: 'code2', icon: <FiCode /> },
  ];

  return (
    <div className="sidebar" ref={myRef}>
      {/* The Vanta canvas will render inside myRef. The content needs to be z-index above it */}
      <div className="sidebar-content">
        <div className="avatar-container">
          <div className="avatar">S</div>
        </div>

        <div className="nav-group top-nav">
          {navItems1.map(item => (
            <div 
              key={item.id} 
              className={`nav-icon ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div className="nav-group bottom-nav">
          {navItems2.map(item => (
            <div 
              key={item.id} 
              className={`nav-icon ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
