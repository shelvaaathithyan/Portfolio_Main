import React from 'react';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">Shelvaaathithyan VK</span>
      </div>
      
      <div className="navbar-links">
        <a href="#about">About Me</a>
        <a href="#portfolio">Projects</a>
        <a href="#services">Skills</a>
        <a href="#blog">Blog</a>
      </div>
    </nav>
  );
};

export default Navbar;
