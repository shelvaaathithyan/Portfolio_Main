import React from 'react';
import './SkillsMarquee.css';

const SkillsMarquee = () => {
  const skills = ["React", "Node.js", "MongoDB", "Python", "AI/ML", "Firebase", "TensorFlow", "Next.js", "PostgreSQL", "AWS"];
  
  // Double the array for seamless infinite scrolling
  const marqueeItems = [...skills, ...skills, ...skills];

  return (
    <div className="skills-marquee-container">
      <div className="skills-marquee-track">
        {marqueeItems.map((skill, index) => (
          <React.Fragment key={index}>
            <div className="marquee-item key-text">{skill}</div>
            <div className="marquee-separator">•</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SkillsMarquee;
