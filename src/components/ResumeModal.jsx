import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { FiCheck } from 'react-icons/fi';
import './ResumeModal.css';

const ResumeModal = ({ onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  
  const [phase, setPhase] = useState(0); 
  const [typedCommand, setTypedCommand] = useState('');
  const [checkmarks, setCheckmarks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [downloadState, setDownloadState] = useState('idle');

  const fullCommand = 'resume';
  const progressSteps = [0, 7, 23, 41, 68, 84, 100];
  const checklistItems = [
    'Loading Personal Information',
    'Compiling Projects',
    'Verifying Experience',
    'Packaging Skills',
    'Building PDF'
  ];

  useGSAP(() => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
    gsap.fromTo(contentRef.current, 
      { scale: 0.95, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  const closeSequence = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
    gsap.to(contentRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.3 });
  };

  useEffect(() => {
    const runSequence = async () => {
      const wait = ms => new Promise(r => setTimeout(r, ms));
      
      // Phase 0: Type command
      await wait(200);
      for (let i = 1; i <= fullCommand.length; i++) {
        setTypedCommand(fullCommand.slice(0, i));
        await wait(40);
      }
      await wait(200);
      
      // Phase 1: Generating
      setPhase(1);
      await wait(300);
      
      // Phase 2: Checkmarks
      setPhase(2);
      for (let i = 0; i < checklistItems.length; i++) {
        setCheckmarks(prev => [...prev, checklistItems[i]]);
        await wait(120);
      }
      await wait(200);

      // Phase 3: Progress
      setPhase(3);
      for (let p of progressSteps) {
        setProgress(p);
        await wait(p === 100 ? 50 : 100);
      }
      await wait(200);

      // Phase 4: Ready
      setPhase(4);
    };

    runSequence();
  }, []);

  const handleDownload = async () => {
    if (downloadState !== 'idle') return;
    
    setDownloadState('downloading');
    
    // Simulate short download processing (~600ms)
    await new Promise(r => setTimeout(r, 600));
    
    setDownloadState('complete');
    
    // Trigger actual download
    const link = document.createElement('a');
    link.href = '/Shelvaaathithyan_Resume.pdf';
    link.download = 'Shelvaaathithyan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Move to final Phase 6 message
    setTimeout(() => {
      setPhase(6);
    }, 500);
  };

  const renderProgressBar = (pct) => {
    const totalBlocks = 16;
    const filledBlocks = Math.floor((pct / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    
    const filledStr = '█'.repeat(filledBlocks);
    const emptyStr = '░'.repeat(emptyBlocks);
    return `[${filledStr}${emptyStr}] ${pct}%`;
  };

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div ref={overlayRef} className="resume-modal-overlay" onClick={(e) => {
      if (e.target === overlayRef.current) closeSequence();
    }}>
      <div ref={contentRef} className="resume-modal-content">
        
        <div className="resume-terminal-header">
          <div className="resume-term-btn resume-term-close" onClick={closeSequence}></div>
          <div className="resume-term-btn resume-term-min"></div>
          <div className="resume-term-btn resume-term-max"></div>
        </div>

        <div className="resume-terminal-body">
          
          {/* Phase 0 to 5 Content */}
          {phase < 6 ? (
            <>
              {/* Boot Line */}
              <div className="res-line">
                <span className="res-text-green">guest@portfolio</span>
                <span className="res-text-white">:</span>
                <span className="res-text-blue">~</span>
                <span className="res-text-white" style={{ marginRight: '8px' }}>$</span>
                <span className="res-text-white">{typedCommand}</span>
                {phase === 0 && <span className="res-cursor"></span>}
              </div>

              {/* Generating */}
              {phase >= 1 && (
                <div className="res-text-white" style={{ marginTop: '8px' }}>
                  Generating Resume...
                </div>
              )}

              {/* Checkmarks */}
              {checkmarks.length > 0 && (
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {checkmarks.map((item, idx) => (
                    <div key={idx} className="res-text-white">
                      <span className="res-text-green">✓</span> {item}
                    </div>
                  ))}
                </div>
              )}

              {/* Progress Bar */}
              {phase >= 3 && (
                <div className="res-text-blue" style={{ marginTop: '16px' }}>
                  {renderProgressBar(progress)}
                </div>
              )}

              {/* ASCII & Button */}
              {phase >= 4 && (
                <>
                  <div className="res-ascii-box">
                    ╔══════════════════════╗{'\n'}
                    ║ RESUME READY         ║{'\n'}
                    ║ Version: 2026.1      ║{'\n'}
                    ║ Status: VERIFIED     ║{'\n'}
                    ╚══════════════════════╝
                  </div>

                  <div className="res-btn-container">
                    <button 
                      className="res-download-btn" 
                      onClick={handleDownload}
                      disabled={downloadState !== 'idle'}
                    >
                      {downloadState === 'idle' && 'DOWNLOAD PDF'}
                      {downloadState === 'downloading' && 'DOWNLOADING...'}
                      {downloadState === 'complete' && <><FiCheck style={{ marginRight: '4px' }} /> DOWNLOAD COMPLETE ✓</>}
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            /* Post-Download Final Message (Phase 6) */
            <div style={{ marginTop: '0' }}>
              <div className="res-line">
                <span className="res-text-green">guest@portfolio</span>
                <span className="res-text-white">:</span>
                <span className="res-text-blue">~</span>
                <span className="res-text-white" style={{ marginRight: '8px' }}>$</span>
                <span className="res-cursor"></span>
              </div>
              <div className="res-text-white" style={{ marginTop: '16px' }}>
                Resume exported successfully.
              </div>
              <div className="res-text-white" style={{ marginTop: '8px' }}>
                Good luck with your search.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
