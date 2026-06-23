import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <section className="blog-section" id="blog">
      <div className="section-header-center">
        <span className="dot-label"><span className="black-dot"></span> Blogs</span>
        <h2>Design Insights & Trends</h2>
      </div>

      <div className="blog-grid">
        <div className="blog-card">
          <div className="blog-img-placeholder" style={{ backgroundColor: '#f0e6d2' }}>
            Image 1
          </div>
          <div className="blog-content">
            <div className="blog-meta">
              <span className="blog-category">MARKETING</span>
              <span className="blog-time">5 min read</span>
            </div>
            <h3>Conducting in-depth research and usability testing</h3>
          </div>
        </div>

        <div className="blog-card">
          <div className="blog-img-placeholder" style={{ backgroundColor: '#ffe6e6' }}>
             Image 2
          </div>
          <div className="blog-content">
            <div className="blog-meta">
              <span className="blog-category">MARKETING</span>
              <span className="blog-time">5 min read</span>
            </div>
            <h3>Designing cohesive strategies and visual identities</h3>
          </div>
        </div>

        <div className="blog-card">
          <div className="blog-img-placeholder" style={{ backgroundColor: '#e6f2e6' }}>
             Image 3
          </div>
          <div className="blog-content">
            <div className="blog-meta">
              <span className="blog-category">MARKETING</span>
              <span className="blog-time">5 min read</span>
            </div>
            <h3>Providing expert advice and strategic guidance</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
