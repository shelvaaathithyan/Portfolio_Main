import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Terminal.css';
import './SectionStyles.css';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Terminal = () => {
  const terminalRef = useRef(null);
  const contentRef = useRef(null);
  const [hasRun, setHasRun] = useState(false);

  useGSAP(() => {
    // Only run animation once when scrolled into view
    ScrollTrigger.create({
      trigger: terminalRef.current,
      start: 'top 75%',
      onEnter: () => {
        if (!hasRun) {
          runTerminalSequence();
          setHasRun(true);
        }
      }
    });

    const runTerminalSequence = () => {
      const tl = gsap.timeline();
      
      // Select elements
      const lines = gsap.utils.toArray('.term-line');
      
      lines.forEach((line, index) => {
        const prompt = line.querySelector('.term-prompt');
        const input = line.querySelector('.term-input');
        const output = line.nextElementSibling; // The output div
        
        // Ensure initial state
        gsap.set(input, { text: "" });
        gsap.set(output, { opacity: 0, display: 'none' });
        gsap.set(line, { opacity: 0, display: 'none' });

        // Show prompt
        tl.to(line, { opacity: 1, display: 'flex', duration: 0.1 });
        
        // Type command
        const cmd = input.getAttribute('data-cmd');
        tl.to(input, {
          duration: cmd.length * 0.05,
          text: cmd,
          ease: "none"
        });

        // Show output
        tl.to(output, {
          opacity: 1,
          display: 'block',
          duration: 0.2
        }, "+=0.2");
      });
    };
  }, { scope: terminalRef });

  return (
    <section className="portfolio-section terminal-section" id="terminal" ref={terminalRef}>
      
      <div className="section-container terminal-container">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="term-btn term-close"></div>
            <div className="term-btn term-min"></div>
            <div className="term-btn term-max"></div>
            <div className="term-title">guest@shelvaaathithyan:~</div>
          </div>
          
          <div className="terminal-body" ref={contentRef}>
            
            <div className="term-line">
              <span className="term-user">guest@portfolio</span>
              <span className="term-colon">:</span>
              <span className="term-tilde">~</span>
              <span className="term-prompt">$</span>
              <span className="term-input" data-cmd="whoami"></span>
            </div>
            <div className="term-output text-blue">Shelvaaathithyan VK</div>

            <div className="term-line">
              <span className="term-user">guest@portfolio</span><span className="term-colon">:</span><span className="term-tilde">~</span><span className="term-prompt">$</span>
              <span className="term-input" data-cmd="role"></span>
            </div>
            <div className="term-output">AI/ML Engineer & Full Stack Developer</div>

            <div className="term-line">
              <span className="term-user">guest@portfolio</span><span className="term-colon">:</span><span className="term-tilde">~</span><span className="term-prompt">$</span>
              <span className="term-input" data-cmd="college"></span>
            </div>
            <div className="term-output">PSG College of Technology</div>

            <div className="term-line">
              <span className="term-user">guest@portfolio</span><span className="term-colon">:</span><span className="term-tilde">~</span><span className="term-prompt">$</span>
              <span className="term-input" data-cmd="current_project"></span>
            </div>
            <div className="term-output">VisionBite (AI-Powered Smart Café Platform)</div>

            <div className="term-line">
              <span className="term-user">guest@portfolio</span><span className="term-colon">:</span><span className="term-tilde">~</span><span className="term-prompt">$</span>
              <span className="term-input" data-cmd="status"></span>
            </div>
            <div className="term-output status-green">Open To Work</div>

            {/* Blinking cursor at the end */}
            <div className="term-line" style={{ display: hasRun ? 'flex' : 'none', opacity: 1 }}>
              <span className="term-user">guest@portfolio</span><span className="term-colon">:</span><span className="term-tilde">~</span><span className="term-prompt">$</span>
              <span className="term-cursor">_</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
