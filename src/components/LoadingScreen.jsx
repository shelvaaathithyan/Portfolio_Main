import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animDuration, setAnimDuration] = useState('6s');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDurationSec, setAudioDurationSec] = useState(6);
  const [pixelDelays, setPixelDelays] = useState([]);

  // Grid size for the pixelation (e.g. 15x15 = 225 pixels)
  const gridSize = 15;

  useEffect(() => {
    // Generate random normalized delays (0 to 1) for each pixel
    const totalPixels = gridSize * gridSize;
    const delays = Array.from({ length: totalPixels }, () => Math.random());
    setPixelDelays(delays);


    let fadeTimer;
    let completeTimer;

    const startTimersAndAnimation = () => {
      if (fadeTimer) return; // Prevent double calls

      // The spider and text must be fully loaded by 3.25s
      const buildDuration = 3.25; 
      setAudioDurationSec(buildDuration);
      setAnimDuration(`${buildDuration}s`);
      setIsPlaying(true);
      
      // Start vanishing (fade out) at exactly 4 seconds
      fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 4000);

      // Complete the loading screen and reveal main page at 5 seconds
      completeTimer = setTimeout(() => {
        onComplete();
      }, 5000);
    };

    // Start everything immediately without audio
    startTimersAndAnimation();

    // Fallback just in case audio hangs forever
    const safetyTimer = setTimeout(() => {
      if (!fadeTimer) startTimersAndAnimation();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`loading-container ${isFadingOut ? 'fade-out' : ''} ${isPlaying ? 'is-playing' : ''}`}
      style={{ '--anim-dur': animDuration }}
    >
      <div className="loading-content">
        <div className="glitch-wrapper">
          <img src="/logo.png" alt="Loading Logo" className="coin-image" />
          
          {/* Pixel Construction Overlay */}
          <div className="pixel-overlay" style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}>
            {pixelDelays.map((delay, i) => (
              <div 
                key={i} 
                className="pixel-block" 
                style={{
                  animation: isPlaying ? `hide-pixel 0.1s ${delay * (audioDurationSec * 0.95)}s forwards` : 'none'
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="loading-text">
          w / G<sup>P</sup> &#8658; G<sup>R</sup>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
