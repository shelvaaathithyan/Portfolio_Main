import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const graphData = [
  {
    year: 2017, x: 50, y: 350, title: 'Early Steps',
    direction: 'horizontal',
    milestones: ["Ideathon Registration", "Smart Snacky Dev"]
  },
  {
    year: 2018, x: 150, y: 280, title: 'First Recognition',
    direction: 'horizontal',
    milestones: ["Smart Snacky Complete", "Ideathon Winner", "Singapore Visit", "Social Impact Focus"]
  },
  {
    year: 2019, x: 250, y: 150, title: 'Major Spike',
    direction: 'vertical', offset: 'center',
    milestones: ["IoT Training", "SmartBin V1-V3", "IWMA 2nd Prize"]
  },
  {
    year: 2020, x: 350, y: 150, title: 'Plateau & Learning',
    direction: 'vertical', offset: 'right',
    milestones: ["IoT Mini Projects", "Embedded Systems"]
  },
  {
    year: 2021, x: 450, y: 130, title: 'Academic Shift',
    direction: 'vertical', offset: 'left',
    milestones: ["PSG Polytechnic"]
  },
  {
    year: 2022, x: 550, y: 110, title: 'Industry Exposure',
    direction: 'vertical', offset: 'center',
    milestones: ["College Symposiums", "KitKat Internship"]
  },
  {
    year: 2023, x: 650, y: 80, title: 'Noticeable Rise',
    direction: 'vertical', offset: 'right',
    milestones: ["Freelancer Internship", "ApartiBot"]
  },
  {
    year: 2024, x: 750, y: 50, title: 'Strong Rise',
    direction: 'vertical', offset: 'left',
    milestones: ["Achievement Award", "Graduation", "B.E CSE AI & ML", "CSEA Member"]
  },
  {
    year: 2025, x: 850, y: 30, title: 'Very Strong Rise',
    direction: 'vertical', offset: 'center',
    milestones: ["Infinitum Team", "Portfolio V1", "CSEA Coordinator", "Neptune Runner-Up", "Repora", "AI Consortium"]
  },
  {
    year: 2026, x: 950, y: 10, title: 'Highest Peak',
    direction: 'vertical', offset: 'right',
    milestones: ["VisionBite", "Client E-Commerce", "SCRC Research Intern"]
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
  const [hoveredYear, setHoveredYear] = useState(null);
  const [lockedYear, setLockedYear] = useState(null);

  const activeYear = hoveredYear || lockedYear;
  const pathString = generateBezierPath(graphData);

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
        {graphData.map((data) => {
          const isActive = activeYear === data.year;
          const displayMilestones = data.milestones.slice(0, 4);
          const hasMore = data.milestones.length > 4;

          return (
            <div 
              key={data.year}
              className={`graph-node-wrapper ${isActive ? 'active' : ''}`}
              style={{ left: `${(data.x / 1000) * 100}%`, top: `${(data.y / 400) * 100}%` }}
              onMouseEnter={() => setHoveredYear(data.year)}
              onMouseLeave={() => setHoveredYear(null)}
              onClick={() => setLockedYear(lockedYear === data.year ? null : data.year)}
            >
              <div className="node-halo"></div>
              <div className="node-core">
                <div className="node-dot"></div>
              </div>
              <div className="node-year key-text">{data.year}</div>

              {isActive && (
                <div className={`node-expansion direction-${data.direction} offset-${data.offset || 'none'}`}>
                  <div className="expansion-connector"></div>
                  <div className="expansion-milestones">
                    {displayMilestones.map((m, idx) => (
                      <div className="expansion-item" key={idx} style={{ '--i': idx }}>
                        <div className="item-dot"></div>
                        <span className="item-text">{m}</span>
                      </div>
                    ))}
                    {hasMore && (
                      <div className="expansion-item" style={{ '--i': 4 }}>
                        <div className="item-dot"></div>
                        <span className="item-text">+{data.milestones.length - 4} More</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DesktopJourneyGraph;
