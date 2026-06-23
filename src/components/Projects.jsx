import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiGithub } from 'react-icons/fi';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  const projects = [
    {
      title: "Dia-sole",
      context: "Mobile app to analyze & monitor foot health",
      tech: ["Flutter", "Dart", "Cloud"],
      image: "url('/diasole.jpeg') center top / cover no-repeat",
      link: "https://github.com/shelvaaathithyan/Dia-sole"
    },
    {
      title: "Repora",
      context: "Full-stack web application for managing class activities",
      tech: ["Node.js", "Express", "MongoDB", "React"],
      image: "url('/repora.jpeg') center top / cover no-repeat",
      link: "https://github.com/shelvaaathithyan/repora-final"
    },
    {
      title: "Neptune",
      context: "AI-assisted mental health companion",
      tech: ["Flutter", "Dart", "C++"],
      image: "url('/neptune.jpeg') center top / cover no-repeat",
      link: "https://github.com/shelvaaathithyan/mental-health_frontend"
    },
    {
      title: "Smart Snacky",
      context: "An interactive educational device",
      tech: ["Raspberry PI", "Python", "Sensor"],
      image: "url('/smartsnacky.jpeg') center top / cover no-repeat",
      link: "https://github.com/shelvaaathithyan/Smart_Snacky"
    },
    {
      title: "SmartBin",
      context: "Smart Garbage Collector for Smart City",
      tech: ["Arduino", "Bluetooth", "Sensors"],
      image: "url('/smartbin.png') center top / cover no-repeat",
      link: "https://github.com/shelvaaathithyan/SmartBin"
    },
    {
      title: "CloudSync",
      context: "Distributed File Storage Platform",
      tech: ["Next.js", "AWS S3", "MongoDB", "Redis"],
      image: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)"
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
      
      <div className="section-container">
        <h2 className="section-title key-text text-white">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image-container" style={{ background: project.image }}>
                {/* Overlay that appears on hover */}
                <div className="project-overlay">
                  <span className="project-context text-white">{project.context}</span>
                  <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="project-github-link">
                    <FiGithub size={36} />
                  </a>
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
