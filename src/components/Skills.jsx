import React from 'react';
import './Skills.css';

const Skills = () => {
  return (
    <section id="skills" className="elias-skills-section">
      <div className="section-header">
        <h2 className="section-title"><span className="hash">#</span>skills</h2>
        <div className="section-line"></div>
      </div>

      <div className="skills-content">
        <div className="skills-visuals">
          {/* Abstract geometric background shapes */}
          <svg width="349" height="282" viewBox="0 0 349 282" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="113.5" width="63" height="63" stroke="#abb2bf" />
            <rect x="250.5" y="0.5" width="86" height="86" stroke="#abb2bf" />
            <rect x="296.5" y="152.5" width="52" height="52" stroke="#abb2bf" />
            
            <circle cx="21" cy="21" r="2" fill="#abb2bf"/>
            <circle cx="21" cy="42" r="2" fill="#abb2bf"/>
            <circle cx="21" cy="63" r="2" fill="#abb2bf"/>
            <circle cx="21" cy="84" r="2" fill="#abb2bf"/>
            <circle cx="42" cy="21" r="2" fill="#abb2bf"/>
            <circle cx="42" cy="42" r="2" fill="#abb2bf"/>
            <circle cx="42" cy="63" r="2" fill="#abb2bf"/>
            <circle cx="42" cy="84" r="2" fill="#abb2bf"/>
            <circle cx="63" cy="21" r="2" fill="#abb2bf"/>
            <circle cx="63" cy="42" r="2" fill="#abb2bf"/>
            <circle cx="63" cy="63" r="2" fill="#abb2bf"/>
            <circle cx="63" cy="84" r="2" fill="#abb2bf"/>
            <circle cx="84" cy="21" r="2" fill="#abb2bf"/>
            <circle cx="84" cy="42" r="2" fill="#abb2bf"/>
            <circle cx="84" cy="63" r="2" fill="#abb2bf"/>
            <circle cx="84" cy="84" r="2" fill="#abb2bf"/>
            
            <rect x="36.5" y="149.5" width="63" height="63" stroke="#c778dd" />
          </svg>
        </div>
        
        <div className="skills-grid">
          <div className="skill-box">
            <div className="skill-title">Languages</div>
            <div className="skill-list">
              TypeScript Lua Python JavaScript
            </div>
          </div>
          
          <div className="skill-box">
            <div className="skill-title">Databases</div>
            <div className="skill-list">
              SQLite PostgreSQL Mongo
            </div>
          </div>
          
          <div className="skill-box">
            <div className="skill-title">Tools</div>
            <div className="skill-list">
              VSCode Neovim Linux Figma XFCE Arch Git Font Awesome
            </div>
          </div>
          
          <div className="skill-box">
            <div className="skill-title">Other</div>
            <div className="skill-list">
              HTML CSS EJS SCSS REST Jinja
            </div>
          </div>
          
          <div className="skill-box">
            <div className="skill-title">Frameworks</div>
            <div className="skill-list">
              React Vue Disnake Discord.js Flask Express.js
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
