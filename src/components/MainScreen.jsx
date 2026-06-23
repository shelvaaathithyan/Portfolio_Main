import React from 'react';
import Hero from './Hero';

const MainScreen = () => {
  return (
    <div className="main-layout" style={{ position: 'relative', minHeight: '100vh', pointerEvents: 'auto' }}>
      <Hero />
    </div>
  );
};

export default MainScreen;
