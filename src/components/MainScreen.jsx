import React from 'react';
import Hero from './Hero';
import FeaturedProject from './FeaturedProject';
import About from './About';
import Journey from './Journey';
import Terminal from './Terminal';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import SideQuests from './SideQuests';
import Footer from './Footer';
import StickySectionNumbers from './StickySectionNumbers';
import LazyMount from './LazyMount';

const MainScreen = ({ onOpenSimulation }) => {
  return (
    <div className="main-layout" style={{ position: 'relative', pointerEvents: 'auto', zIndex: 1 }}>
      <StickySectionNumbers />
      <Hero onOpenSimulation={onOpenSimulation} />
      <About />
      <Journey />
      <Terminal onOpenSimulation={onOpenSimulation} />
      <Skills />
      <LazyMount>
        <FeaturedProject />
      </LazyMount>
      <LazyMount>
        <Projects />
      </LazyMount>
      <Contact />
      <LazyMount>
        <SideQuests />
      </LazyMount>
      <Footer />
    </div>
  );
};

export default MainScreen;
