import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Journey.css';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const sectionRef = useRef(null);

  const timelineData = [
    { year: "2021", title: "PSG Polytechnic", desc: "Started the journey into computer science." },
    { year: "2024", title: "PSG College of Technology", desc: "Deepening knowledge in AI/ML and software engineering." },
    { year: "Project", title: "Repora", desc: "Built automated data reporting engines." },
    { year: "Featured", title: "VisionBite", desc: "Developed AI-powered smart café platform." },
    { year: "Future", title: "AI/ML Engineer", desc: "Building intelligent systems of tomorrow." }
  ];

  useGSAP(() => {
    // Animate the line drawing down
    gsap.fromTo('.journey-line-fill', 
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.journey-timeline',
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true
        }
      }
    );

    // Fade in nodes and content as they scroll into view
    gsap.utils.toArray('.journey-item').forEach((item, i) => {
      gsap.from(item, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section className="portfolio-section journey-section" id="journey" ref={sectionRef}>
      <div className="section-number-bg key-text">02</div>
      
      <div className="section-container">
        <h2 className="section-title key-text text-white">The Journey</h2>
        
        <div className="journey-timeline">
          <div className="journey-line-bg"></div>
          <div className="journey-line-fill"></div>
          
          {timelineData.map((data, index) => (
            <div className="journey-item" key={index}>
              <div className="journey-node"></div>
              <div className="journey-content">
                <span className="journey-year text-blue key-text">{data.year}</span>
                <h3 className="journey-item-title">{data.title}</h3>
                <p className="journey-desc">{data.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
