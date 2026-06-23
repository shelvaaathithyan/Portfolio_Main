import React from 'react';
import TextPressure from './TextPressure';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="text-pressure-container">
          <TextPressure
            text="Hello !!"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="var(--text-primary)"
            minFontSize={24}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
