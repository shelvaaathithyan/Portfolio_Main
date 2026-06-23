import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Skills.css';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const capabilitiesData = [
  {
    title: "Frontend Development",
    desc: "Building responsive and interactive web applications with modern UI/UX and smooth user experiences.",
    tech: ["React", "JavaScript", "GSAP", "HTML", "CSS"]
  },
  {
    title: "Backend Development",
    desc: "Designing scalable APIs, authentication systems, and server-side applications.",
    tech: ["Node.js", "Express", "MongoDB", "Firebase"]
  },
  {
    title: "AI & Machine Learning",
    desc: "Creating intelligent systems using computer vision, automation, and data-driven solutions.",
    tech: ["Python", "OpenCV", "Machine Learning"]
  },
  {
    title: "Database Management",
    desc: "Managing structured and unstructured data with efficient storage and retrieval strategies.",
    tech: ["MongoDB", "MySQL", "Firebase"]
  },
  {
    title: "Tools & Platforms",
    desc: "Using modern tools for development, deployment, collaboration, and design.",
    tech: ["Git", "Power BI", "Blender", "Android Studio"]
  }
];

const metricsData = [
  { value: "5+", label: "Core Domains" },
  { value: "10+", label: "Technologies" },
  { value: "3+", label: "Major Projects" }
];

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Animate Metrics Row
    gsap.from('.cap-metric-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.cap-metrics-row',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate Capability Blocks
    gsap.utils.toArray('.cap-block').forEach((block, index) => {
      const isLeft = index % 2 === 0;
      gsap.fromTo(block, 
        { 
          x: isLeft ? -50 : 50, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, { scope: sectionRef });

  return (
    <section className="portfolio-section skills-section" id="skills" ref={sectionRef}>
      
      <div className="section-container skills-container">
        
        <div className="capabilities-header">
          <h2 className="section-title key-text text-white">Capabilities</h2>
          <p className="cap-subtitle">What I build and how I solve problems.</p>
        </div>

        {/* Metrics Row */}
        <div className="cap-metrics-row">
          {metricsData.map((metric, i) => (
            <div className="cap-metric-card" key={i}>
              <div className="cap-metric-value text-blue key-text">{metric.value}</div>
              <div className="cap-metric-label">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Capability Blocks */}
        <div className="capabilities-list">
          {capabilitiesData.map((cap, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div className={`cap-block-wrapper ${isLeft ? 'align-left' : 'align-right'}`} key={index}>
                <div className="cap-block">
                  <h3 className="cap-title">{cap.title}</h3>
                  <p className="cap-desc">{cap.desc}</p>
                  <div className="cap-tech-pills">
                    {cap.tech.map((t, i) => (
                      <span className="tech-pill" key={i}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;
