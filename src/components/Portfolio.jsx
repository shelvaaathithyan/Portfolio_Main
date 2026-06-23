import React from 'react';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="section-header-center">
        <span className="dot-label"><span className="black-dot"></span> Portfolio</span>
        <h2>Latest Works</h2>
      </div>

      <div className="portfolio-grid">
        <div className="portfolio-card">
          <div className="port-img-placeholder">Project Image 1</div>
          <div className="port-info">
            <h3>AI Analytics Dashboard</h3>
            <span className="port-tag">For <strong>Enterprise</strong></span>
          </div>
        </div>
        
        <div className="portfolio-card">
          <div className="port-img-placeholder has-icon">
             Project Image 2
             <div className="hover-icon"><FiArrowUpRight /></div>
          </div>
          <div className="port-info">
            <h3>Machine Learning Model API</h3>
            <span className="port-tag">For <strong>Startup</strong></span>
          </div>
        </div>
        
        <div className="portfolio-card">
          <div className="port-img-placeholder">Project Image 3</div>
          <div className="port-info">
            <h3>IoT Data Platform</h3>
            <span className="port-tag">For <strong>Tech Co</strong></span>
          </div>
        </div>
      </div>
      
      <div className="portfolio-footer">
        <a href="#more" className="check-more">Check out More <FiArrowRight className="arrow-right"/> View More</a>
      </div>
    </section>
  );
};

export default Portfolio;
