import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FiGlobe, FiAward, FiDollarSign, FiSmartphone, FiBookOpen, FiCpu, FiTarget } from 'react-icons/fi';
import './Journey.css';
import './SectionStyles.css';

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  const sectionRef = useRef(null);

  const statsData = [
    { value: "5+", label: "Major Achievements" },
    { value: "₹10K", label: "Prize Money" },
    { value: "Singapore", label: "Recognition" },
    { value: "2024", label: "Achievement Award" }
  ];

  const timelineData = [
    { 
      year: "Late 2017 – Mid 2018", 
      icon: <FiGlobe />,
      title: "Ideathon-Hackathon Winner", 
      institution: "SNS College of Engineering",
      desc: "Won the Ideathon-Hackathon conducted by SNS College of Engineering and earned the opportunity to visit Singapore as part of the recognition and prize.",
      badge: "Singapore Visit",
      highlight: true
    },
    { 
      year: "Late 2018", 
      icon: <FiAward />,
      title: "1st Place – State Level Project Expo", 
      institution: "Tamil Nadu, India",
      desc: "Secured 1st place in the State Level Project Expo and advanced to the National Level Competition, achieving 7th position among top participants nationwide.",
      badge: "State Level Winner",
      highlight: true
    },
    { 
      year: "Mid 2019", 
      icon: <FiDollarSign />,
      title: "2nd Place – IWMA Competition", 
      institution: "PSG College of Technology",
      desc: "Secured 2nd place in the Industrial Waste Management Association (IWMA) Competition and received a cash prize of ₹10,000.",
      badge: "₹10,000 Prize",
      highlight: true
    },
    { 
      year: "Late 2023", 
      icon: <FiSmartphone />,
      title: "Mobile App Development Training", 
      institution: "Freelancer League",
      desc: "Completed intensive training in mobile application development, including Firebase integration, Kodular, and Android Studio development workflows.",
      highlight: true
    },
    { 
      year: "Mid 2024", 
      icon: <FiBookOpen />,
      title: "Achievement Award", 
      institution: "PSG Polytechnic College",
      desc: "Received the Achievement Award for outstanding academic performance and excellence in co-curricular and extra-curricular activities during the diploma program.",
      highlight: true
    },
    { 
      year: "Present", 
      icon: <FiCpu />,
      title: "Computer Science Engineering (AI & ML)", 
      institution: "PSG College of Technology",
      desc: "Currently pursuing B.E. Computer Science Engineering (AI & ML), focusing on intelligent systems, machine learning, full-stack development, and real-world problem solving.",
      highlight: true
    },
    { 
      year: "Current", 
      icon: <span style={{fontSize: "1.2rem"}}>🔬</span>,
      title: "Research Intern", 
      institution: "Software Engineering Research Center (SERC), IIIT Hyderabad",
      desc: "Currently working as a Research Intern at the Software Engineering Research Center (SERC), IIIT Hyderabad, contributing to the development of LoCoML (Low-Code Machine Learning), an innovative low-code framework for building, managing, and orchestrating complex machine learning inference pipelines.\n\nLoCoML simplifies AI workflow creation through dynamic pipeline orchestration, automated model integration, and flexible workflow management for real-world machine learning applications.",
      badge: "CURRENT ROLE",
      highlight: true,
      isResearch: true,
      tags: [
        "🔬 Research & Development",
        "🧠 Low-Code Machine Learning",
        "⚙️ Pipeline Orchestration",
        "🤖 AI Workflow Automation",
        "🌐 Bhashini Integration"
      ]
    },
    { 
      year: "Future", 
      icon: <FiTarget />,
      title: "Building Intelligent Systems", 
      institution: "AI Engineer & Researcher",
      desc: "Building scalable intelligent systems, machine learning platforms, and impactful AI solutions that solve real-world problems.",
      highlight: false
    }
  ];

  useGSAP(() => {
    // Animate stats
    gsap.from('.journey-stat-card', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.journey-stats-row',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    // Batch animate timeline cards for better performance
    ScrollTrigger.batch('.journey-card', {
      onEnter: batch => {
        gsap.to(batch, { opacity: 1, y: 0, x: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
        // Stagger tags for research card
        batch.forEach(card => {
          if (card.classList.contains('research-card')) {
            gsap.fromTo(card.querySelectorAll('.journey-tag'), 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, delay: 0.3, ease: 'power2.out' }
            );
          }
        });
      },
      onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 30, stagger: 0.1, duration: 0.4, ease: 'power2.in' }),
      start: 'top 90%'
    });

    // Animate timeline nodes
    ScrollTrigger.batch('.journey-node', {
      onEnter: batch => gsap.to(batch, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.4, ease: 'back.out(1.5)' }),
      onLeaveBack: batch => gsap.to(batch, { scale: 0, opacity: 0, stagger: 0.1, duration: 0.3, ease: 'power2.in' }),
      start: 'top 90%'
    });

  }, { scope: sectionRef });

  return (
    <section className="portfolio-section journey-section" id="journey" data-section="journey" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title key-text text-white" style={{ textAlign: 'center', marginBottom: '2rem' }}>The Journey</h2>
        
        {/* Statistics Row */}
        <div className="journey-stats-row">
          {statsData.map((stat, i) => (
            <div className="journey-stat-card" key={i}>
              <div className="journey-stat-value text-blue key-text">{stat.value}</div>
              <div className="journey-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline Stack */}
        <div className="journey-timeline-stack">
          <div className="journey-line-static"></div>
          
          {timelineData.map((data, index) => (
            <div className={`journey-item-stacked ${data.highlight ? 'highlighted' : ''}`} key={index}>
              <div className="journey-node-wrapper">
                <div className="journey-node" style={{ opacity: 0, transform: 'scale(0)' }}>
                  {data.icon}
                </div>
              </div>
              
              <div className={`journey-card ${data.isResearch ? 'research-card' : ''}`} style={{ opacity: 0, transform: data.isResearch ? 'translateX(50px)' : 'translateY(30px)' }}>
                <div className="journey-card-header">
                  <span className="journey-year-tag key-text text-blue">{data.year}</span>
                  {data.badge && (
                    <span className="journey-badge">{data.badge}</span>
                  )}
                </div>
                <h3 className="journey-card-title">{data.title}</h3>
                <h4 className="journey-card-institution">{data.institution}</h4>
                {data.desc.split('\n\n').map((para, pIdx) => (
                  <p key={pIdx} className="journey-card-desc">{para}</p>
                ))}
                
                {data.tags && (
                  <div className="journey-tags-container">
                    {data.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="journey-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
