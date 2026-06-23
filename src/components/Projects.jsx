import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiArrowRight } from 'react-icons/fi';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "VisionBite",
      context: "AI-Powered Smart Café Platform",
      tech: ["React", "Python", "OpenCV", "TensorFlow"],
      image: "linear-gradient(135deg, #2a0845 0%, #6441A5 100%)" // Placeholder gradient
    },
    {
      title: "Repora",
      context: "Automated Data Reporting Engine",
      tech: ["Node.js", "Express", "MongoDB", "React"],
      image: "linear-gradient(135deg, #1A2980 0%, #26D0CE 100%)"
    },
    {
      title: "ProgressTracker",
      context: "Developer Habit & Goal System",
      tech: ["Next.js", "Tailwind", "Firebase"],
      image: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
    }
  ];

  useGSAP(() => {
    gsap.from('.project-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="portfolio-section projects-section" id="projects" ref={sectionRef}>
      <div className="section-number-bg key-text">03</div>
      
      <div className="section-container">
        <h2 className="section-title key-text text-white">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image-container" style={{ background: project.image }}>
                {/* Overlay that appears on hover */}
                <div className="project-overlay">
                  <span className="project-context text-blue">{project.context}</span>
                  <button className="project-view-btn">
                    View Project <FiArrowRight />
                  </button>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title key-text">{project.title}</h3>
                <div className="project-tech-list">
                  {project.tech.map((t, i) => (
                    <span className="project-tech-item" key={i}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
