import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const graphData = [
  {
    year: 2017, x: 50, y: 350, title: 'The Spark',
    direction: 'horizontal',
    milestones: ["A random registration for an Ideathon-Hackathon at SNS College of Engineering unknowingly changed the direction of my life. While developing Smart Snacky, I experienced the excitement of turning ideas into reality and discovered the joy of building technology."]
  },
  {
    year: 2018, x: 150, y: 280, title: 'The First Win',
    direction: 'horizontal',
    milestones: ["Smart Snacky reached completion and went on to win the Ideathon-Hackathon. The opportunity to visit Singapore as a recognition of that achievement opened my eyes to a bigger world. This was the year I developed a genuine passion for Computer Science and decided to build technology that could create meaningful impact."]
  },
  {
    year: 2019, x: 250, y: 150, title: 'Learning Through Failure & Growth',
    direction: 'diagonal-down-right', offset: 'center',
    milestones: ["Curiosity led me to the Forge KCT IoT Training Program, where I entered the world of connected devices. SmartBin V1 faced setbacks at the Science Expo, but that disappointment became fuel for improvement. SmartBin evolved through multiple iterations, eventually reaching the CBSE National Science Exhibition and earning recognition from IWMA with a ₹10,000 award. This year taught me that growth comes from persistence, not perfection."]
  },
  {
    year: 2020, x: 350, y: 150, title: 'Experimentation Phase',
    direction: 'diagonal-down-right',
    milestones: ["With every project, my confidence grew. I spent the year building numerous IoT solutions, exploring embedded systems, sensors, and automation. It was a period of experimentation that strengthened my technical foundation and curiosity."]
  },
  {
    year: 2021, x: 450, y: 130, title: 'A New Academic Journey',
    direction: 'diagonal-down-right',
    milestones: ["Joining PSG Polytechnic marked the beginning of a new chapter. Surrounded by opportunities to learn and grow, I focused on strengthening my engineering fundamentals and preparing myself for bigger challenges ahead."]
  },
  {
    year: 2022, x: 550, y: 110, title: 'Discovering the Industry',
    direction: 'diagonal-down-right',
    milestones: ["College symposiums, competitions, and my internship at KitKat Software Technologies exposed me to the professional world for the first time. Beyond technical skills, I learned communication, teamwork, and how technology operates outside the classroom."]
  },
  {
    year: 2023, x: 650, y: 80, title: 'Building Something Bigger',
    direction: 'diagonal-down-right',
    milestones: ["My internship at Freelancer League provided valuable industry experience, while ApartiBot became my most ambitious project yet. This year transformed me from someone who learned technology into someone who actively built solutions with it."]
  },
  {
    year: 2024, x: 750, y: 50, title: 'Stepping Into the Next Level',
    direction: 'diagonal-down-left',
    milestones: ["Receiving an Achievement Award, graduating from PSG Polytechnic, and joining PSG College of Technology for B.E. CSE (AI & ML) marked a major transition in my journey. Becoming a member of CSEA opened new doors for leadership, collaboration, and growth."]
  },
  {
    year: 2025, x: 850, y: 30, title: 'Leadership & Innovation',
    direction: 'diagonal-down-left',
    milestones: ["This year was defined by responsibility and impact. From organizing Infinitum 2025 and launching my first portfolio to becoming the Embedded Systems & IoT Domain Coordinator at CSEA, I embraced leadership opportunities. The development of Repora and securing Runner-Up at Oblivion 2025 with Neptune reflected my growing confidence in building meaningful products and leading teams."]
  },
  {
    year: 2026, x: 950, y: 10, title: 'Turning Passion Into Profession',
    direction: 'diagonal-down-left',
    milestones: ["VisionBite, my first client project, and my research internship at SCRC IIIT Hyderabad marked the transition from student projects to professional impact. The ideas that began as curiosity years ago were now becoming real-world solutions, research contributions, and opportunities to create value through technology."]
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
        <span className="key-text text-blue text-sm">EVOLUTION GRAPH!!</span>
        <p><span className="glow-word">Hover</span> over years to view achievements</p>
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
                <div className={`node-expansion direction-${data.direction}`}>
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
