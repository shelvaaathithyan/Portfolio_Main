import React from 'react';
import Hero from './Hero';
import FeaturedProject from './FeaturedProject';
import About from './About';
import Journey from './Journey';
import Terminal from './Terminal';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import StickySectionNumbers from './StickySectionNumbers';

const MainScreen = () => {
  return (
    <div className="main-layout" style={{ position: 'relative', pointerEvents: 'auto', zIndex: 1 }}>
      <StickySectionNumbers />
      <Hero />
      <About />
      <Journey />
      <Terminal />
      <Skills />
      <FeaturedProject />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default MainScreen;
