import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './DesktopJourneyGraph.css';
import SectionWatermark from './SectionWatermark';

gsap.registerPlugin(ScrollTrigger);

const journeyNodes = [
  {
    year: '2017',
    x: 5, y: 85, // small rise
    size: 'small',
    achievements: [
      { title: "Ideathon-Hackathon Registration", desc: "Registered for the Ideathon-Hackathon conducted by SNS College of Engineering." },
      { title: "Smart Snacky Initiated", desc: "Started developing Smart Snacky." }
    ]
  },
  {
    year: '2018',
    x: 15, y: 65, // sharp upward jump
    size: 'large',
    achievements: [
      { title: "Smart Snacky Completed", desc: "Completed Smart Snacky." },
      { title: "Ideathon-Hackathon Winner", desc: "Won the Ideathon-Hackathon." },
      { title: "Singapore Visit", desc: "Visited Singapore as a recognition reward for the competition victory." },
      { title: "Tech Interest Sparked", desc: "Developed a strong interest in Computer Science and Technology." },
      { title: "Social Impact Vision", desc: "Decided to build technology that could create social impact." }
    ]
  },
  {
    year: '2019',
    x: 25, y: 35, // large growth spike
    size: 'xlarge',
    achievements: [
      { title: "Forge KCT Training", desc: "Attended IoT Training Program conducted by Forge KCT." },
      { title: "SmartBin V1", desc: "Developed SmartBin V1 and presented it at the Science Expo in CODISSIA." },
      { title: "Science Expo Failure", desc: "Did not win, but the experience became a major motivation." },
      { title: "SmartBin V2", desc: "Developed SmartBin V2." },
      { title: "CBSE National Selection", desc: "Selected from the State Level CBSE National Science Exhibition to National Level in Noida." },
      { title: "SmartBin V3", desc: "Developed SmartBin V3." },
      { title: "IWMA 2nd Prize", desc: "Presented SmartBin V3 to IWMA. Won 2nd Prize." },
      { title: "₹10,000 Cash Award", desc: "Received ₹10,000 cash award." }
    ]
  },
  {
    year: '2020',
    x: 35, y: 35, // plateau
    size: 'medium',
    achievements: [
      { title: "Continuous Learning", desc: "Developed multiple IoT mini projects and continued learning embedded systems." }
    ]
  },
  {
    year: '2021',
    x: 45, y: 28, // moderate rise
    size: 'medium',
    achievements: [
      { title: "Diploma Started", desc: "Joined PSG Polytechnic College." }
    ]
  },
  {
    year: '2022',
    x: 55, y: 25, // small rise
    size: 'medium',
    achievements: [
      { title: "Symposiums", desc: "Participated in multiple college symposiums and technical events." },
      { title: "KitKat Internship", desc: "Completed internship at KitKat Software Technologies." }
    ]
  },
  {
    year: '2023',
    x: 65, y: 18, // noticeable rise
    size: 'large',
    achievements: [
      { title: "Freelancer League Internship", desc: "Internship at Freelancer League." },
      { title: "ApartiBot Initiated", desc: "Started development of ApartiBot as Final Year Project." }
    ]
  },
  {
    year: '2024',
    x: 75, y: 10, // strong rise
    size: 'large',
    achievements: [
      { title: "Achievement Award", desc: "Received Achievement Award." },
      { title: "Diploma Graduated", desc: "Graduated from PSG Polytechnic College." },
      { title: "B.E. CSE Started", desc: "Joined PSG College of Technology for B.E. Computer Science Engineering (AI & ML)." },
      { title: "CSEA Member", desc: "Became a member of the Computer Science and Engineering Association (CSEA)." }
    ]
  },
  {
    year: '2025',
    x: 85, y: -2, // very strong rise
    size: 'xlarge',
    achievements: [
      { title: "Infinitum 2025 Organizer", desc: "Part of Infinitum 2025 Organizing Team." },
      { title: "Portfolio V1", desc: "Developed Portfolio Version 1." },
      { title: "Domain Coordinator", desc: "Promoted as Embedded Systems & IoT Domain Coordinator in CSEA." },
      { title: "Oblivion 2025 Hackathon", desc: "Participated in Oblivion 2025, a 24-hour Hackathon at SNS College of Technology." },
      { title: "Neptune Built", desc: "Developed Neptune, a mental health monitoring and management application. Achieved Runner-Up position." },
      { title: "Repora Initiated", desc: "Started development of Repora." },
      { title: "AI Consortium Volunteer", desc: "Volunteered for PSG Tech AI Consortium Event." }
    ]
  },
  {
    year: '2026',
    x: 95, y: -15, // highest peak
    size: 'xxlarge',
    achievements: [
      { title: "VisionBite Initiated", desc: "Started development of VisionBite." },
      { title: "Freelance Project", desc: "Received first client project for a Bangle E-Commerce Website." },
      { title: "SERC IIIT Hyderabad", desc: "Research Intern at SCRC, IIIT Hyderabad." }
    ]
  }
];

// Helper to construct a smooth bezier path through coordinates
const generateSmoothPath = (points) => {
  if (points.length === 0) return '';
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 2;
    const cp1y = p0.y;
    const cp2x = p0.x + (p1.x - p0.x) / 2;
    const cp2y = p1.y;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }
  return path;
};

const DesktopJourneyGraph = () => {
  const sectionRef = useRef(null);
  const graphRef = useRef(null);
  const [hoveredYear, setHoveredYear] = useState(null);

  useGSAP(() => {
    // Animate the main path drawing in
    gsap.fromTo('.graph-path-main',
      { strokeDasharray: 2000, strokeDashoffset: 2000 },
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );

    // Animate nodes popping in
    gsap.fromTo('.journey-graph-node',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      }
    );

    // Continuous pulse traveling along the path
    gsap.to('.graph-path-pulse', {
      strokeDashoffset: -2000,
      duration: 6,
      ease: 'none',
      repeat: -1
    });

  }, { scope: sectionRef });

  const activeData = journeyNodes.find(n => n.year === hoveredYear);
  const pathString = generateSmoothPath(journeyNodes);

  return (
    <div className="desktop-journey-graph" ref={sectionRef}>

      <SectionWatermark number="02" title="JOURNEY" />

      <div className="journey-hero-header">
        <h2 className="section-title key-text text-white">THE JOURNEY</h2>
        <p className="journey-subtitle">A timeline of growth, failures, learning, leadership, innovation, and achievements.</p>
      </div>

      <div className="journey-graph-container" ref={graphRef}>

        {/* SVG Graph Layer */}
        <svg
          className="journey-svg-layer"
          viewBox="0 -30 100 140"
          preserveAspectRatio="none"
        >
          {/* Main glowing path */}
          <path
            className="graph-path-main"
            d={pathString}
            fill="none"
          />
          {/* Energy pulse path */}
          <path
            className="graph-path-pulse"
            d={pathString}
            fill="none"
          />
        </svg>

        {/* HTML Nodes Layer */}
        {journeyNodes.map((node) => (
          <div
            key={node.year}
            className={`journey-graph-node size-${node.size} ${hoveredYear === node.year ? 'active' : ''}`}
            style={{
              left: `${node.x}%`,
              top: `${((node.y + 30) / 140) * 100}%`
            }}
            onMouseEnter={() => setHoveredYear(node.year)}
            onMouseLeave={() => setHoveredYear(null)}
          >
            <div className="node-core"></div>
            <div className="node-year-label">{node.year}</div>

            {/* Particles that appear on hover */}
            {hoveredYear === node.year && (
              <div className="node-particles">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`particle p-${i}`}></div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Floating Achievement Panel */}
        <div className={`achievement-panel-container ${hoveredYear ? 'visible' : ''}`}>
          {activeData && (
            <div className="achievement-panel">
              <h3 className="panel-year-title">{activeData.year}</h3>
              <div className="panel-achievements-list">
                {activeData.achievements.map((ach, idx) => (
                  <div key={idx} className="achievement-item">
                    <div className="achievement-bullet"></div>
                    <div className="achievement-content">
                      <div className="achievement-title">{ach.title}</div>
                      <div className="achievement-desc">{ach.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DesktopJourneyGraph;
