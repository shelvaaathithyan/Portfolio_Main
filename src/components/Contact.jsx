import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import { FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { HiPencil } from 'react-icons/hi';
import './Contact.css';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Note: Using placeholders since I don't have your actual personal files.
// Please replace these URLs with your real photos in your public/ directory or imports!
const filmData = [
  {
    id: 1,
    img: "/dip.jpeg",
    title: "Diploma Graduation",
    subtitle: "PSG Polytechnic College",
    position: "center 0%"
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
  },
  {
    id: 5,
    img: "/s.png",
    title: "Development Of Smart Bin",
    subtitle: "Forge KCT"
  },
  {
    id: 6,
    img: "/infinitum 2025.jpeg",
    title: "Infinitum 2K25",
    subtitle: "PSG College Of Technology",
    position: "center 65%"
  },
  {
    id: 7,
    img: "/infinitum 2026.jpeg",
    title: "Infinitum 2K26",
    subtitle: "PSG College Of Technology"
  },
  {
    id: 8,
    img: "/oblivion 2025.jpeg",
    title: "Oblivion 2025",
    subtitle: "SNS College Of Technology"
  },
  {
    id: 9,
    img: "/ordusion.jpeg",
    title: "Ordusion '24",
    subtitle: "Sri Ramanakrishna College Of Arts & Science"
  },
  {
    id: 10,
    img: "/tradic.jpeg",
    title: "Tradic '22",
    subtitle: "Sri Sai Ranganathan Engineering College"
  },
  {
    id: 11,
    img: "/smart bin.jpeg",
    title: "Codissia Science Expo",
    subtitle: "Smart Bin V1"
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

    // Brace, Pencil, & Text Annotation Animation
    console.log("Brace animation initialized");
    const bracePath = document.querySelector('.brace-path');
    const pencil = document.querySelector('.annotation-pencil');
    
    if (bracePath) {
      // Force calculate length and apply immediately as a fallback safeguard
      const rawLength = bracePath.getTotalLength ? bracePath.getTotalLength() : 1000;
      const length = Math.ceil(rawLength);
      
      // Ensure unit 'px' is used so CSS and GSAP parse it correctly
      bracePath.style.strokeDasharray = `${length}px`;
      bracePath.style.strokeDashoffset = `${length}px`;
      
      if (pencil) {
        pencil.style.opacity = 0;
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-gallery',
          start: 'top 65%',
          toggleActions: 'play none none reverse',
          onEnter: () => console.log("Brace animation started"),
          onEnterBack: () => console.log("Brace animation started (scroll back)")
        }
      });

      // Temporary opacity test requested by user
      tl.fromTo('.annotation-brace', 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.5, ease: 'none' }, 
        "draw"
      );

      if (pencil && gsap.plugins.MotionPathPlugin) {
        // Step 1: Pencil appears
        tl.to(pencil, { opacity: 1, duration: 0.1 }, "draw")
        
        // Step 2 & 3: Draw brace and move pencil along path
        .fromTo(bracePath, 
          { strokeDashoffset: `${length}px` },
          { strokeDashoffset: "0px", duration: 1.4, ease: 'power2.out' }, 
          "draw"
        )
        .to(pencil, {
          motionPath: {
            path: bracePath,
            align: bracePath,
            alignOrigin: [0.5, 1] // align center bottom of pencil to path
          },
          duration: 1.4,
          ease: 'power2.out'
        }, "draw")
        
        // Step 5: Pencil fades out
        .to(pencil, { opacity: 0, duration: 0.2 });
      } else {
        // Fallback: Just draw the brace if pencil/MotionPath fails
        tl.fromTo(bracePath,
          { strokeDashoffset: `${length}px` },
          { strokeDashoffset: "0px", duration: 1.4, ease: 'power2.out' },
          "draw"
        );
      }

      // Step 6: Text fades in
      tl.fromTo('.annotation-text span', 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        "draw+=1.2" // sync with end of drawing
      );
    }

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
              <a href="https://www.linkedin.com/in/shelvaaathithyan" target="_blank" rel="noopener noreferrer" className="contact-icon-btn linkedin-btn">
                <FiLinkedin size={22} />
              </a>
              <a href="https://github.com/shelvaaathithyan" target="_blank" rel="noopener noreferrer" className="contact-icon-btn github-btn">
                <FiGithub size={22} />
              </a>
              <a href="https://www.instagram.com/shelvaaathithyan.vk?igsh=MXFvNGQyZmk3bm9nNA==" target="_blank" rel="noopener noreferrer" className="contact-icon-btn instagram-btn">
                <FiInstagram size={22} />
              </a>
              <a href="https://leetcode.com/u/shelvaleet/" target="_blank" rel="noopener noreferrer" className="contact-icon-btn leetcode-btn">
                <SiLeetcode size={22} />
              </a>
            </div>
          </div>

          {/* Right Side: Film Strip Gallery */}
          <div className="contact-gallery">
            
            <div className="gallery-wrapper">
              <div className="film-strip-container">
                
                <div className="film-reel" ref={reelRef}>
                  {filmData.map((data, index) => (
                    <div className="film-frame" key={`${data.id}-${index}`}>
                      <img 
                        src={data.img} 
                        alt={data.title} 
                        className="film-img" 
                        style={data.position ? { objectPosition: data.position } : {}}
                      />
                      <div className="film-caption">
                        <span className="film-title">{data.title}</span>
                        <span className="film-subtitle">{data.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Hand-drawn Annotation */}
              <div className="gallery-annotation">
                
                <div className="svg-container" style={{ position: 'relative' }}>
                  <svg width="30" height="420" viewBox="0 0 30 420" className="annotation-brace">
                    <path 
                      className="brace-path"
                      d="M 5 10 Q 20 10 20 30 L 20 190 Q 20 210 28 210 Q 20 210 20 230 L 20 390 Q 20 410 5 410"
                      fill="none"
                      stroke="rgba(120,210,255,0.7)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="annotation-pencil">
                    <div className="pencil-wrapper">
                      <HiPencil size={20} color="#9AE6FF" />
                    </div>
                  </div>
                </div>

                <div className="annotation-text">
                  <span>You</span>
                  <span>can</span>
                  <span>scroll</span>
                  <span>me!!</span>
                </div>
              </div>

            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
};

export default Contact;
