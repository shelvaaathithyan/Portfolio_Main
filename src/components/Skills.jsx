import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PixelGlobe from './PixelGlobe';
import SectionWatermark from './SectionWatermark';
import './Skills.css';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = {
  frontend: {
    id: 'frontend',
    title: "Frontend Development",
    summary: "React • JavaScript",
    description: "Building responsive web applications and modern interactive experiences.",
    tech: ["React", "JavaScript", "HTML", "CSS", "GSAP"],
    mobileStack: "React • JavaScript • HTML • CSS",
    size: "large"
  },
  backend: {
    id: 'backend',
    title: "Backend Development",
    summary: "Node.js • Express.js",
    description: "Building scalable APIs, authentication systems, and backend services.",
    tech: ["Node.js", "Express.js", "Firebase"],
    mobileStack: "Node.js • Express.js",
    size: "large"
  },
  aiml: {
    id: 'aiml',
    title: "AI / ML Engineering",
    summary: "Python • OpenCV",
    description: "Creating intelligent systems using computer vision, automation, and machine learning.",
    tech: ["Python", "OpenCV", "Machine Learning"],
    mobileStack: "Python • OpenCV",
    size: "medium"
  },
  databases: {
    id: 'databases',
    title: "Databases",
    summary: "MongoDB • Firebase",
    description: "Architecting scalable data storage, real-time sync, and robust data models.",
    tech: ["MongoDB", "MySQL", "Firebase"],
    mobileStack: "MongoDB • Firebase • SQL",
    size: "medium"
  }
};

const nodesConfig = [
  { id: 'aiml', x: 400, y: 50 },
  { id: 'frontend', x: 100, y: 250 },
  { id: 'backend', x: 700, y: 250 },
  { id: 'databases', x: 400, y: 450 }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [hoverNodeId, setHoverNodeId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [pulseActive, setPulseActive] = useState(null);
  const [globePulse, setGlobePulse] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowCards(false); // Reset mobile state on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo('.network-line',
        { strokeDasharray: 500, strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out', stagger: 0.1 }
      )
        .fromTo('.domain-node',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' },
          "-=1.0"
        )
        .fromTo('.node-content',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.6"
        );
    } else if (showCards) {
      // Phase 3: Capability Reveal
      gsap.fromTo('.mobile-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, { scope: sectionRef, dependencies: [isMobile, showCards] });

  const handleMouseEnter = (nodeId) => {
    if (isMobile) return;
    setHoverNodeId(nodeId);
    setGlobePulse(true);
    setTimeout(() => setGlobePulse(false), 500);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setHoverNodeId(null);
  };

  const handleClick = (nodeId) => {
    if (isMobile) return;
    if (activeNodeId !== nodeId) {
      setActiveNodeId(nodeId);
      setPulseActive(nodeId);
      setTimeout(() => {
        if (pulseActive === nodeId) setPulseActive(null);
      }, 1000);
    }
  };

  const handleClickOutside = (e) => {
    if (isMobile) return;
    if (!e.target.closest('.domain-node') && !e.target.closest('.info-panel')) {
      setActiveNodeId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  // Phase 2: Mobile Globe Interaction Tap
  const handleMobileGlobeTap = () => {
    if (showCards) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setShowCards(true);
      }
    });

    // Step 1 & 2: Dot scales and glow expands
    tl.to('.center-tap-dot', {
      scale: 1.2,
      boxShadow: '0 0 20px 5px rgba(255,255,255,0.8)',
      duration: 0.15
    })
      // Step 3 & 4: Arrow and text fade out
      .to(['.mobile-press-arrow', '.press-me-text'], {
        opacity: 0,
        duration: 0.2
      }, "+=0")
      // Step 5: Globe fades and scales down
      .to('.mobile-globe-wrapper', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3
      }, "+=0");
  };

  const activeData = activeNodeId ? capabilitiesData[activeNodeId] : null;

  return (
    <section className="portfolio-section skills-section" id="capabilities" data-section="capabilities" ref={sectionRef}>
      <SectionWatermark number="04" title="CAPABILITIES" />
      <div className="section-container skills-container">

        <div className="capabilities-header">
          <h2 className="section-title key-text text-white">Capabilities</h2>
          <p className="cap-subtitle">Technologies powering intelligent systems.</p>
        </div>

        <div className="dna-explorer" ref={containerRef}>

          {!isMobile && (
            <div className="globe-container" style={{ transform: globePulse ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%) scale(1)', transition: 'transform 0.3s ease' }}>
              <PixelGlobe active={activeNodeId !== null || hoverNodeId !== null} isMobile={false} />
            </div>
          )}

          {!isMobile && (
            <>
              <div className="dna-network-wrapper">
                <div className="dna-connections">
                  <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
                    {nodesConfig.map(node => {
                      const isActive = activeNodeId === node.id;
                      const isHover = hoverNodeId === node.id;
                      return (
                        <line
                          key={`line-${node.id}`}
                          className={`network-line ${isActive ? 'line-active' : ''} ${isHover && !isActive ? 'line-hover' : ''}`}
                          x1="400" y1="250"
                          x2={node.x} y2={node.y}
                        />
                      )
                    })}

                    {nodesConfig.map(node => (
                      <line
                        key={`pulse-${node.id}`}
                        className={`network-pulse-line ${pulseActive === node.id ? 'pulsing' : ''}`}
                        x1="400" y1="250"
                        x2={node.x} y2={node.y}
                      />
                    ))}
                  </svg>
                </div>

                <div className="dna-nodes-container">
                  {nodesConfig.map(node => {
                    const isActive = activeNodeId === node.id;
                    const isHover = hoverNodeId === node.id;
                    const isDimmed = activeNodeId !== null && activeNodeId !== node.id;

                    return (
                      <div
                        key={node.id}
                        className={`domain-node node-${node.id} size-${capabilitiesData[node.id].size} ${isActive ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                        style={{ transform: `translate(${node.x - 400}px, ${node.y - 250}px) ${isHover || isActive ? 'scale(1.08)' : 'scale(1)'}` }}
                        onMouseEnter={() => handleMouseEnter(node.id)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(node.id)}
                      >
                        <div className="node-inner"></div>
                        <div className="node-content">
                          <div className="node-title">{capabilitiesData[node.id].title}</div>
                          <div className="node-tech-summary">{capabilitiesData[node.id].summary}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="active-panel-container">
                <div className={`info-panel ${activeData ? 'visible' : ''}`}>
                  {activeData && (
                    <>
                      <div className="panel-header-text">ACTIVE CAPABILITY</div>
                      <h3>{activeData.title}</h3>
                      <div className="info-panel-tech-simple">
                        {activeData.tech.map((t, idx) => (
                          <span key={idx} className="tech-item">{t}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Phase 1: Mobile Globe Intro State */}
          {isMobile && !showCards && (
            <div className="mobile-globe-wrapper" onClick={handleMobileGlobeTap}>
              <div className="globe-container">
                <PixelGlobe active={false} isMobile={true} />
              </div>
              <div className="center-tap-dot" />
              <img src="/arrow-white.png" alt="Press Me Arrow" className="mobile-press-arrow" />
              <div className="press-me-text">PRESS ME...</div>
            </div>
          )}

          {/* Phase 3: Mobile Cards Reveal */}
          {isMobile && showCards && (
            <div className="mobile-stack">
              {['frontend', 'backend', 'aiml', 'databases'].map(id => {
                const data = capabilitiesData[id];
                return (
                  <div key={id} className="mobile-card">
                    <div className="mobile-card-title">{data.title}</div>
                    <div className="mobile-tech-stack">{data.mobileStack}</div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Skills;
