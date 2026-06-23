import React from 'react';
import './ProjectsPage.css';

const completeApps = [
  {
    title: 'ChertNodes',
    tech: 'HTML SCSS Python Flask',
    description: 'Minecraft servers hosting',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=500&q=80',
    links: [{ name: 'Live <~>', url: '#' }, { name: 'Cached >', url: '#' }]
  },
  {
    title: 'Kahoot Answers Viewer',
    tech: 'CSS Express Node.js',
    description: 'Get answers to your kahoot quiz',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80',
    links: [{ name: 'Live <~>', url: '#' }]
  },
  {
    title: 'ProtectX',
    tech: 'React Express Discord.js Node.js HTML SCSS Python Flask',
    description: 'Discord anti-crash bot',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80',
    links: [{ name: 'Cached >', url: '#' }]
  },
  {
    title: 'Kotik Bot',
    tech: 'HTML CSS JS',
    description: 'Multi-functional discord bot',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80',
    links: [{ name: 'Live <~>', url: '#' }]
  },
  {
    title: 'Portfolio',
    tech: 'Vue TS Less',
    description: "You're using it rn",
    image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=500&q=80',
    links: [{ name: 'Github <~>', url: '#' }]
  }
];

const smallProjects = [
  { title: 'Bot boilerplate', tech: 'Discord.js TS JS', description: 'Start creating scalable discord.js bot with typescript in seconds', link: 'Github <~>' },
  { title: 'My blog', tech: 'VUE CSS JS', description: 'Front-end of my future blog website written in vue', link: 'Github <~>' },
  { title: 'Chess pro', tech: 'Figma', description: 'Figma landing page about service for viewing chess tournaments', link: 'Figma <~>' },
  { title: 'Crash protect website', tech: 'Figma', description: 'Figma template for website about anti-raid, anti-crash discord bot', link: 'Figma <~>' },
  { title: 'CSS expirements', tech: 'HTML CSS', description: 'Collection of my different little projects in css', link: 'Live <~>' },
  { title: 'Web Dev nvim config', tech: 'Lua NeoVim', description: 'Config for neovim perfect for web developer', link: 'Github <~>' },
  { title: 'Ooku', tech: 'Python Quart HTML', description: 'Simple link shortener with auth', link: 'Live <~>' },
  { title: 'School website', tech: 'Figma', description: 'Figma template website for my school', link: 'Figma <~>' },
];

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <div className="page-header">
        <h1 className="page-title"><span className="hash">/</span>projects</h1>
        <p className="page-subtitle">List of my projects</p>
      </div>

      <section className="projects-section">
        <h2 className="section-title"><span className="hash">#</span>complete-apps</h2>
        <div className="projects-grid">
          {completeApps.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-tech">{project.tech}</div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-links">
                  {project.links.map((link, i) => (
                    <a href={link.url} key={i} className={`btn-link ${link.name.includes('Live') || link.name.includes('Github') || link.name.includes('Figma') ? 'primary-btn' : 'secondary-btn'}`}>
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="projects-section">
        <h2 className="section-title"><span className="hash">#</span>small-projects</h2>
        <div className="projects-grid small-grid">
          {smallProjects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="project-tech">{project.tech}</div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-links">
                  <a href="#" className="btn-link primary-btn">{project.link}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
