import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  const skillCategories = [
    { title: "Frontend", items: ["React", "Next.js", "Three.js", "GSAP", "Tailwind CSS"] },
    { title: "Backend", items: ["Node.js", "Express", "Python", "Django", "FastAPI"] },
    { title: "AI/ML", items: ["TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV", "NLP"] },
    { title: "Databases", items: ["MongoDB", "PostgreSQL", "Firebase", "Redis"] },
    { title: "Tools", items: ["Git", "Docker", "AWS", "Linux", "Figma"] }
  ];

  useGSAP(() => {
    gsap.from('.skill-category', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }, { scope: sectionRef });

  return (
    <section className="portfolio-section skills-section" id="skills" ref={sectionRef}>
      <div className="section-number-bg key-text">02</div>
      
      <div className="section-container">
        <h2 className="section-title key-text text-white">Skills & Technologies</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div className="skill-category" key={index}>
              <h3 className="skill-category-title text-blue">{category.title}</h3>
              <div className="skill-items">
                {category.items.map((item, i) => (
                  <span className="skill-tag" key={i}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
