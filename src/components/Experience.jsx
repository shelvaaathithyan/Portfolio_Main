import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      company: "AI Solutions, Chennai, India",
      date: "February 2022 - Present",
      role: "Lead AI/ML Developer, Crafting intelligent systems",
      tags: ["AI/ML", "Backend"]
    },
    {
      company: "Tech Innovations Inc, Bangalore",
      date: "January 2020 - February 2022",
      role: "Software Engineer. Crafting tomorrow's experiences",
      tags: ["Mobile", "IoT"]
    },
    {
      company: "Visionary Creations Ltd, UK",
      date: "February 2022 - Present",
      role: "Principal Developer, Crafting tomorrow's experiences",
      tags: ["Backend", "AI/ML"]
    }
  ];

  return (
    <section className="experience-section" id="experience">
      <div className="exp-header">
        <div className="exp-title-area">
          <span className="dot-label"><span className="black-dot"></span> Experiences</span>
          <h2 className="exp-title">Explore My Developer<br/>Journey</h2>
        </div>
        <div className="exp-desc-area">
          <p>Over the past 4+ years, I've had the opportunity to work on a wide range of technical projects, collaborating with diverse teams to bring intelligent solutions to life.</p>
          <a href="#contact" className="book-call-link">Book A Call <FiArrowUpRight /></a>
        </div>
      </div>

      <div className="exp-list">
        {experiences.map((exp, index) => (
          <div className="exp-row" key={index}>
            <div className="exp-company">
              <h3>{exp.company}</h3>
              <p>• {exp.date}</p>
            </div>
            <div className="exp-role">
              <p>{exp.role}</p>
            </div>
            <div className="exp-tags">
              {exp.tags.map(tag => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="exp-footer">
        <div className="exp-images">
           <div className="exp-img-placeholder">Image 1</div>
           <div className="exp-img-placeholder">Image 2</div>
           <div className="exp-img-placeholder">Image 3</div>
        </div>
        <div className="exp-footer-text">
          <p>From crafting seamless user experiences to leading strategic AI initiatives, each experience has shaped my approach and strengthened my passion for solving complex challenges.</p>
          <button className="btn-dark round-btn"><FiArrowUpRight /></button>
        </div>
      </div>
    </section>
  );
};

export default Experience;
