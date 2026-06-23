import React from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

const projectsData = [
  {
    title: 'ChertNodes',
    tech: 'HTML SCSS Python Flask',
    description: 'Minecraft servers hosting',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=500&q=80',
    links: [
      { name: 'Live <~>', url: '#' },
      { name: 'Cached >', url: '#' }
    ]
  },
  {
    title: 'ProtectX',
    tech: 'React Express Discord.js Node.js HTML SCSS Python Flask',
    description: 'Discord anti-crash bot',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80',
    links: [
      { name: 'Live <~>', url: '#' }
    ]
  },
  {
    title: 'Kahoot Answers Viewer',
    tech: 'CSS Express Node.js',
    description: 'Get answers to your kahoot quiz',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80',
    links: [
      { name: 'Live <~>', url: '#' }
    ]
  }
];

const Projects = () => {
  return (
    <section id="works" className="elias-projects-section">
      <div className="section-header">
        <h2 className="section-title"><span className="hash">#</span>projects</h2>
        <div className="section-line"></div>
        <Link to="/projects" className="view-all">View all ~~&gt;</Link>
      </div>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-tech">
              {project.tech}
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-links">
                {project.links.map((link, i) => (
                  <a href={link.url} key={i} className={`btn-link ${link.name.includes('Live') ? 'primary-btn' : 'secondary-btn'}`}>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
