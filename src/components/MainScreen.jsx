import React from 'react';
import Hero from './Hero';
import SkillsMarquee from './SkillsMarquee';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';

const MainScreen = () => {
  return (
    <div className="main-layout" style={{ position: 'relative', pointerEvents: 'auto' }}>
      <Hero />
      <SkillsMarquee />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default MainScreen;
