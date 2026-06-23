import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Portfolio from './Portfolio';
import Blog from './Blog';
import Footer from './Footer';

const MainScreen = () => {
  return (
    <div className="main-layout" style={{ position: 'relative' }}>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Blog />
      <Footer />
    </div>
  );
};

export default MainScreen;
