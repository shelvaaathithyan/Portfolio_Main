import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaGithub } from 'react-icons/fa';
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
      title: "ApartiBot",
      context: "Automated delivery robot using an application for ordering groceries",
      tech: ["Robotics", "IoT", "Mobile App"],
      image: "url('/apartibot.jpg') center top / cover no-repeat",
      link: "https://github.com/shelvaaathithyan/ApartiBot"
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
                    <FaGithub size={36} />
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
        
        {/* Explore More Button */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '1rem', width: '100%', clear: 'both', position: 'relative' }}>
          <a 
            href="https://github.com/shelvaaathithyan?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-outline explore-more-btn"
          >
            <FaGithub size={20} /> Explore More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
