import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const graphData = [
  {
    year: 2017, x: 50, y: 350, size: 'small', title: 'Early Steps',
    milestones: [
      "Registered for the Ideathon-Hackathon conducted by SNS College of Engineering.",
      "Started developing Smart Snacky."
    ]
  },
  {
    year: 2018, x: 150, y: 280, size: 'large', title: 'First Recognition',
    milestones: [
      "Completed Smart Snacky.",
      "Won the Ideathon-Hackathon.",
      "Visited Singapore as a recognition reward.",
      "Developed a strong interest in Computer Science.",
      "Decided to build technology for social impact."
    ]
  },
  {
    year: 2019, x: 250, y: 150, size: 'extra-large', title: 'Major Spike',
    milestones: [
      "Attended IoT Training Program (Forge KCT).",
      "SmartBin V1 at Science Expo in CODISSIA.",
      "SmartBin V2 - State Level CBSE National Selection.",
      "SmartBin V3.",
      "IWMA 2nd Prize & ₹10,000 cash award."
    ]
  },
  {
    year: 2020, x: 350, y: 150, size: 'small', title: 'Plateau & Learning',
    milestones: [
      "Developed multiple IoT mini projects.",
      "Continued learning embedded systems."
    ]
  },
  {
    year: 2021, x: 450, y: 130, size: 'medium', title: 'Academic Shift',
    milestones: [
      "Joined PSG Polytechnic College."
    ]
  },
  {
    year: 2022, x: 550, y: 110, size: 'medium', title: 'Industry Exposure',
    milestones: [
      "Participated in multiple college symposiums and events.",
      "Completed internship at KitKat Software Technologies."
    ]
  },
  {
    year: 2023, x: 650, y: 80, size: 'large', title: 'Noticeable Rise',
    milestones: [
      "Internship at Freelancer League.",
      "Started development of ApartiBot as Final Year Project."
    ]
  },
  {
    year: 2024, x: 750, y: 50, size: 'large', title: 'Strong Rise',
    milestones: [
      "Received Achievement Award.",
      "Graduated from PSG Polytechnic College.",
      "Joined PSG College of Technology for B.E. CSE (AI & ML).",
      "Became a member of CSEA."
    ]
  },
  {
    year: 2025, x: 850, y: 30, size: 'extra-large', title: 'Very Strong Rise',
    milestones: [
      "Infinitum 2025 Organizing Team.",
      "Developed Portfolio Version 1.",
      "Promoted as Embedded Systems & IoT Domain Coordinator in CSEA.",
      "Oblivion 2025 Hackathon Runner-Up (Neptune App).",
      "Started development of Repora.",
      "Volunteered for PSG Tech AI Consortium Event."
    ]
  },
  {
    year: 2026, x: 950, y: 10, size: 'extra-large', title: 'Highest Peak',
    milestones: [
      "Started development of VisionBite.",
      "Received first client project for a Bangle E-Commerce Website.",
      "Research Intern at SCRC, IIIT Hyderabad."
    ]
  }
];

// Helper to generate a smooth bezier path through points
const generateBezierPath = (points) => {
  if (points.length === 0) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    path += ` C ${midX} ${curr.y}, ${midX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
};

const DesktopJourneyGraph = () => {
  const containerRef = useRef(null);
  const [activeYear, setActiveYear] = useState(null);

  const pathString = generateBezierPath(graphData);
  const activeData = graphData.find(d => d.year === activeYear);

  useGSAP(() => {
    // Initial draw animation of the path
    gsap.fromTo('.graph-path', 
      { strokeDasharray: 2000, strokeDashoffset: 2000 },
      { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut', scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      }}
    );

    // Fade in nodes after path draws
    gsap.fromTo('.graph-node-wrapper',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)', scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%'
      }}
    );
  }, { scope: containerRef });

  return (
    <div className="desktop-journey-graph" ref={containerRef}>
      
      <div className="graph-instructions">
        <span className="key-text text-blue text-sm">INTERACTIVE EVOLUTION GRAPH</span>
        <p>Hover over milestones to view achievements</p>
      </div>

      <div className="svg-graph-container">
        <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" className="journey-svg">
          {/* Base glowing path */}
          <path 
            d={pathString} 
            className="graph-path base-path" 
            fill="none" 
          />
          {/* Animated energy pulse path (overlay) */}
          <path 
            d={pathString} 
            className="graph-path pulse-path" 
            fill="none" 
          />
        </svg>

        {/* HTML Overlay Nodes */}
        {graphData.map((data) => (
          <div 
            key={data.year}
            className={`graph-node-wrapper ${activeYear === data.year ? 'active' : ''}`}
            style={{ left: `${(data.x / 1000) * 100}%`, top: `${(data.y / 400) * 100}%` }}
            onMouseEnter={() => setActiveYear(data.year)}
            onMouseLeave={() => setActiveYear(null)}
          >
            <div className="node-halo"></div>
            <div className="node-core">
              <div className="node-dot"></div>
            </div>
            <div className="node-year key-text">{data.year}</div>
          </div>
        ))}
      </div>

      {/* Floating Achievement Panel */}
      <div className={`achievement-panel-container ${activeData ? 'visible' : ''}`}>
        {activeData && (
          <div className="achievement-panel">
            <div className="panel-header">
              <span className="panel-year key-text text-blue">{activeData.year}</span>
              <span className="panel-title">{activeData.title}</span>
            </div>
            <ul className="milestone-list">
              {activeData.milestones.map((milestone, idx) => (
                <li key={idx} className="milestone-item">
                  <span className="milestone-bullet"></span>
                  {milestone}
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
