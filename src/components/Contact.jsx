import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import './Contact.css';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

// Note: Using placeholders since I don't have your actual personal files.
// Please replace these URLs with your real photos in your public/ directory or imports!
const filmData = [
  {
    id: 1,
    img: "/dip.jpeg",
    title: "Diploma Graduation",
    subtitle: "PSG Polytechnic College"
  },
  {
    id: 2,
    img: "/press.jpeg",
    title: "Ideathon-Hackathon Press Meet",
    subtitle: "SNS College Of Engineering"
  },
  {
    id: 3,
    img: "/dipp.jpeg",
    title: "Recognition of Diploma Project",
    subtitle: "ApartiBot"
  },
  {
    id: 4,
    img: "/del.jpeg",
    title: "National Science Expo",
    subtitle: "Mayoor School,Noida"
  }
];

// Duplicate the array for a seamless infinite scroll loop
const extendedFilmData = [...filmData, ...filmData];

const Contact = () => {
  const sectionRef = useRef(null);
  const reelRef = useRef(null);

  useGSAP(() => {
    // Left Content Animation
    gsap.from('.contact-left-content > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Film Strip Entrance
    gsap.from('.film-strip-container', {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.contact-gallery',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

  }, { scope: sectionRef });

  return (
    <section className="portfolio-section contact-section" id="contact" data-section="contact" ref={sectionRef}>
      <div className="section-container contact-container">
        
        <div className="contact-layout">
          
          {/* Left Side: Contact Info */}
          <div className="contact-left-content">
            <h2 className="contact-mega-title key-text text-white">
              Let's Build<br/>Something Great<br/>Together
            </h2>
            
            <div className="contact-buttons">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shelvaaathithyan@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-btn email-btn">
                <FiMail className="contact-icon" /> Email Me
              </a>
              <a href="https://www.linkedin.com/in/shelvaaathithyan" target="_blank" rel="noopener noreferrer" className="contact-btn linkedin-btn">
                <FiLinkedin className="contact-icon" /> LinkedIn
              </a>
              <a href="https://github.com/shelvaaathithyan" target="_blank" rel="noopener noreferrer" className="contact-btn github-btn">
                <FiGithub className="contact-icon" /> GitHub
              </a>
            </div>
          </div>

          {/* Right Side: Film Strip Gallery */}
          <div className="contact-gallery">
            
            <div className="film-strip-container">
              
              <div className="film-reel" ref={reelRef}>
                {filmData.map((data, index) => (
                  <div className="film-frame" key={`${data.id}-${index}`}>
                    <img src={data.img} alt={data.title} className="film-img" />
                    <div className="film-caption">
                      <span className="film-title">{data.title}</span>
                      <span className="film-subtitle">{data.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Contact;
