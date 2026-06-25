import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './DesktopJourneyGraph.css';

gsap.registerPlugin(ScrollTrigger);

// Using a 1200x600 viewBox for the graph
const nodesData = [
  { year: 2017, x: 50, y: 480, size: 'small', label: "Small rise" },
  { year: 2018, x: 150, y: 350, size: 'large', label: "Sharp rise" },
  { year: 2019, x: 250, y: 150, size: 'extra-large', label: "Major spike" },
  { year: 2020, x: 380, y: 250, size: 'small', label: "Plateau / Challenge Dip" },
  { year: 2021, x: 500, y: 200, size: 'medium', label: "Moderate rise" },
  { year: 2022, x: 620, y: 180, size: 'small', label: "Small rise" },
  { year: 2023, x: 740, y: 120, size: 'medium', label: "Noticeable rise" },
  { year: 2024, x: 860, y: 70, size: 'large', label: "Strong rise" },
  { year: 2025, x: 980, y: 30, size: 'large', label: "Very strong rise" },
  { year: 2026, x: 1100, y: 10, size: 'extra-large', label: "Highest peak" }
];

// Helper to generate a smooth bezier curve through points
const generateBezierPath = (points) => {
  if (points.length === 0) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    
    // Control points for a smooth horizontal-ish flow
    const cp1X = current.x + (next.x - current.x) * 0.5;
    const cp1Y = current.y;
    const cp2X = current.x + (next.x - current.x) * 0.5;
    const cp2Y = next.y;
    
    path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${next.x} ${next.y}`;
  }
  return path;
};

// Milestone Content
const achievements = {
  2017: [
    "Registered for Ideathon-Hackathon (SNS College)",
    "Started developing Smart Snacky"
  ],
  2018: [
    "Completed Smart Snacky",
    "Won Ideathon-Hackathon",
    "Singapore Recognition Visit",
    "Developed deep interest in Tech",
    "Decided to build social impact tech"
  ],
  2019: [
    "Forge KCT IoT Training",
    "SmartBin V1",
    "Science Expo Failure (Motivation)",
    "SmartBin V2",
    "CBSE National Selection",
    "SmartBin V3",
    "IWMA 2nd Prize",
    "₹10,000 Cash Award"
  ],
  2020: [
    "Developed IoT mini projects",
    "Continued embedded systems learning"
  ],
  2021: [
    "Joined PSG Polytechnic College"
  ],
  2022: [
    "Participated in multiple symposiums",
    "Internship at KitKat Software Technologies"
  ],
  2023: [
    "Internship at Freelancer League",
    "Started ApartiBot (Final Year Project)"
  ],
  2024: [
    "Received Achievement Award",
    "Graduated from PSG Polytechnic College",
    "Joined PSG College of Technology (AI & ML)",
    "Joined Computer Science & Engineering Association (CSEA)"
  ],
  2025: [
    "Infinitum 2025 Organizing Team",
    "Developed Portfolio Version 1",
    "Promoted to Embedded & IoT Domain Coordinator (CSEA)",
    "Participated in Oblivion 2025 (24hr Hackathon)",
    "Developed Neptune (Mental Health App)",
    "Runner-Up at Oblivion 2025",
    "Started development of Repora",
    "Volunteered for PSG Tech AI Consortium"
  ],
  2026: [
    "Started development of VisionBite",
    "First client project (Bangle E-Commerce)",
    "Research Intern at SCRC, IIIT Hyderabad"
  ]
};

const DesktopJourneyGraph = () => {
  const [activeYear, setActiveYear] = useState(null);
  const containerRef = useRef(null);
  const pathString = generateBezierPath(nodesData);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate the path drawing itself from left to right
    tl.from('.journey-base-path', {
      strokeDasharray: 2000,
      strokeDashoffset: 2000,
      duration: 2,
      ease: 'power2.inOut'
    })
    // Animate nodes popping in
    .from('.journey-year-node', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    }, "-=1.5")
    // Animate particles fading in
    .from('.journey-particle-field', {
      opacity: 0,
      scale: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power1.out'
    }, "-=1.5");

    // Continuous Pulse animation traveling along the path
    gsap.to('.journey-energy-pulse', {
      strokeDashoffset: -1000,
      duration: 8,
      repeat: -1,
      ease: 'none'
    });
  }, { scope: containerRef });

  const handleNodeEnter = (year) => {
    setActiveYear(year);
  };

  const handleNodeLeave = () => {
    setActiveYear(null);
  };

  return (
    <div className="desktop-journey-graph" ref={containerRef}>
      <svg viewBox="0 0 1200 600" className="journey-svg" preserveAspectRatio="xMidYMid meet">
        {/* Base Glow Line */}
        <path 
          d={pathString} 
          className="journey-base-path"
        />
        {/* Animated Pulse Line */}
        <path 
          d={pathString} 
          className="journey-energy-pulse"
        />

        {/* Floating Particles (decorative) */}
        {nodesData.map((node, i) => (
          <circle 
            key={`particle-${i}`} 
            cx={node.x} 
            cy={node.y} 
            r="40" 
            className="journey-particle-field"
          />
        ))}
      </svg>

      <div className="journey-nodes-layer">
        {nodesData.map((node) => (
          <div 
            key={node.year}
            className={`journey-year-node size-${node.size} ${activeYear === node.year ? 'active' : ''}`}
            style={{ left: `${(node.x / 1200) * 100}%`, top: `${(node.y / 600) * 100}%` }}
            onMouseEnter={() => handleNodeEnter(node.year)}
            onMouseLeave={handleNodeLeave}
          >
            <div className="node-core"></div>
            <div className="node-year-label">{node.year}</div>
          </div>
        ))}
      </div>

      {/* Interactive Floating Achievement Panel */}
      <div className={`achievement-panel ${activeYear ? 'visible' : ''}`}>
        {activeYear && (
          <div className="achievement-content">
            <h3 className="achievement-year">{activeYear}</h3>
            <ul className="achievement-list">
              {achievements[activeYear].map((item, idx) => (
                <li key={idx}>
                  <span className="bullet-dot"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopJourneyGraph;
