import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Terminal.css';
import './SectionStyles.css';
import MultiverseDatabase from './MultiverseDatabase';

gsap.registerPlugin(ScrollTrigger);

const COMMANDS = {
  help: () => (
    <div className="term-help-container">
      <div className="help-title">COMMAND DATABASE</div>
      <div className="help-divider">────────────────────────────────</div>
      
      <div className="help-section-header" style={{ color: '#8A8A8A' }}>CORE COMMANDS</div>
      <div className="help-grid">
        <div className="help-cmd core">whoami</div><div className="help-cmd core">skills</div>
        <div className="help-cmd core">projects</div><div className="help-cmd core">experience</div>
        <div className="help-cmd core">education</div><div className="help-cmd core">achievements</div>
        <div className="help-cmd core">contact</div><div className="help-cmd core">visionbite</div>
        <div className="help-cmd core">repora</div><div className="help-cmd core">locoml</div>
        <div className="help-cmd core">resume</div><div className="help-cmd core">clear</div>
        <div className="help-cmd core">help</div>
      </div>

      <div className="help-section-header" style={{ color: '#FF4D4D', marginTop: '16px' }}>PROTOCOLS</div>
      <div className="help-grid">
        <div className="help-cmd proto">spider</div><div className="help-cmd proto">ironman</div>
        <div className="help-cmd proto">thor</div><div className="help-cmd proto">multiverse</div>
      </div>

      <div className="help-divider" style={{ marginTop: '16px' }}>────────────────────────────────</div>

      <div className="help-status-header" style={{ color: '#00D4AA', marginBottom: '8px' }}>STATUS:</div>
      <div style={{ color: '#4DA3FF', marginBottom: '4px' }}>13 COMMANDS AVAILABLE</div>
      <div style={{ color: '#FF4D4D', marginBottom: '16px' }}>4 HIDDEN PROTOCOLS DETECTED</div>
      
      <div style={{ color: '#00D4AA', display: 'flex', alignItems: 'center' }}>
        SYSTEM STATUS: ONLINE <span className="help-cursor">█</span>
      </div>
    </div>
  ),
  whoami: () => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem', color: '#fff' }}>Shelvaaathithyan VK</div>
      <div className="text-blue">AI/ML Engineer</div>
      <div className="text-blue">Full Stack Developer</div>
      <div className="text-blue">Research Intern</div>
      <div style={{ marginTop: '1rem', color: '#adb5bd', maxWidth: '600px' }}>Passionate about building intelligent systems and impactful digital experiences.</div>
    </div>
  ),
  role: () => <div style={{ marginBottom: '1rem', color: '#adb5bd' }}>AI/ML Engineer & Full Stack Developer</div>,
  status: () => <div className="status-green" style={{ marginBottom: '1rem' }}>Open To Work</div>,
  skills: () => (
    <div style={{ marginBottom: '1rem', color: '#adb5bd', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div><span className="text-blue" style={{ fontWeight: 'bold' }}>Frontend:</span> React, GSAP, JavaScript, HTML, CSS</div>
      <div><span className="text-blue" style={{ fontWeight: 'bold' }}>Backend:</span> Node.js, Express, MongoDB, Firebase</div>
      <div><span className="text-blue" style={{ fontWeight: 'bold' }}>AI/ML:</span> Python, OpenCV, Machine Learning</div>
      <div><span className="text-blue" style={{ fontWeight: 'bold' }}>Tools:</span> Git, Power BI, Blender, Android Studio</div>
    </div>
  ),
  projects: () => (
    <div style={{ marginBottom: '1rem' }}>
      <div className="text-blue" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Featured Projects:</div>
      <ol style={{ paddingLeft: '1.5rem', color: '#adb5bd', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <li>VisionBite</li>
        <li>Repora</li>
        <li>ProgressTracker</li>
        <li>LoCoML</li>
      </ol>
      <div style={{ color: '#888', fontSize: '0.9rem' }}>Type <span style={{ color: '#fff' }}>visionbite</span>, <span style={{ color: '#fff' }}>repora</span>, or <span style={{ color: '#fff' }}>locoml</span> for more details.</div>
    </div>
  ),
  visionbite: () => (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#fff' }}>VisionBite</div>
      <div className="text-blue">AI-Powered Smart Café Platform</div>
      <div style={{ marginTop: '0.5rem' }}><span style={{ fontWeight: 'bold', color: '#adb5bd' }}>Features:</span></div>
      <ul style={{ paddingLeft: '1.5rem', color: '#888', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <li>Face Recognition</li>
        <li>Emotion Detection</li>
        <li>Personalized Recommendations</li>
        <li>Order Management</li>
        <li>Admin Dashboard</li>
      </ul>
      <div style={{ marginTop: '0.5rem' }}><span style={{ fontWeight: 'bold', color: '#adb5bd' }}>Stack:</span> React, Node.js, MongoDB, OpenCV</div>
    </div>
  ),
  repora: () => (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#fff' }}>Repora</div>
      <div className="text-blue">Class Representative Management Platform</div>
      <div style={{ marginTop: '0.5rem' }}><span style={{ fontWeight: 'bold', color: '#adb5bd' }}>Features:</span></div>
      <ul style={{ paddingLeft: '1.5rem', color: '#888', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <li>Resource Booking</li>
        <li>Announcements</li>
        <li>Issue Tracking</li>
        <li>Document Sharing</li>
      </ul>
      <div style={{ marginTop: '0.5rem' }}><span style={{ fontWeight: 'bold', color: '#adb5bd' }}>Stack:</span> React, Node.js, MongoDB</div>
    </div>
  ),
  experience: () => (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div className="text-blue" style={{ fontWeight: 'bold' }}>Current Role</div>
      <div style={{ color: '#fff', fontSize: '1.1rem' }}>Research Intern</div>
      <div style={{ color: '#adb5bd' }}>Software Engineering Research Center (SERC)</div>
      <div style={{ color: '#888' }}>IIIT Hyderabad</div>
      <div style={{ marginTop: '0.5rem' }}><span style={{ fontWeight: 'bold', color: '#adb5bd' }}>Working on:</span> LoCoML (Low-Code Machine Learning)</div>
    </div>
  ),
  locoml: () => (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#fff' }}>LoCoML</div>
      <div className="text-blue">Low-Code Machine Learning Framework</div>
      <div style={{ marginTop: '0.5rem' }}><span style={{ fontWeight: 'bold', color: '#adb5bd' }}>Features:</span></div>
      <ul style={{ paddingLeft: '1.5rem', color: '#888', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <li>Pipeline Orchestration</li>
        <li>Custom Model Integration</li>
        <li>AI Workflow Automation</li>
        <li>Bhashini Ecosystem Integration</li>
      </ul>
      <div style={{ marginTop: '0.5rem' }}><span style={{ fontWeight: 'bold', color: '#adb5bd' }}>Organization:</span> IIIT Hyderabad</div>
    </div>
  ),
  education: () => (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>PSG College of Technology</div>
        <div style={{ color: '#adb5bd' }}>B.E Computer Science Engineering (AI & Machine Learning)</div>
      </div>
      <div>
        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1rem' }}>PSG Polytechnic College</div>
      </div>
    </div>
  ),
  achievements: () => (
    <div style={{ marginBottom: '1rem' }}>
      <ul style={{ paddingLeft: '1.5rem', color: '#adb5bd', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <li>Ideathon-Hackathon Winner</li>
        <li>Singapore Recognition</li>
        <li>State Level Project Expo Winner</li>
        <li>IWMA Competition Runner-Up</li>
        <li>Achievement Award</li>
      </ul>
    </div>
  ),
  contact: () => (
    <div style={{ marginBottom: '1rem', color: '#adb5bd', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div><span className="text-blue" style={{ fontWeight: 'bold' }}>Email:</span> shelvaaathithyan@gmail.com</div>
      <div><span className="text-blue" style={{ fontWeight: 'bold' }}>LinkedIn:</span> linkedin.com/in/shelvaaathithyan</div>
      <div><span className="text-blue" style={{ fontWeight: 'bold' }}>GitHub:</span> github.com/shelvaaathithyan</div>
    </div>
  ),
  sudo_hire: () => (
    <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div className="status-green" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Access Granted ✅</div>
      <div style={{ color: '#adb5bd' }}>Excellent choice. AI Engineer initialized.</div>
    </div>
  )
};

const COMMAND_KEYS = Object.keys(COMMANDS).filter(k => k !== 'role' && k !== 'status' && k !== 'sudo_hire');

const parseCommand = (rawInput) => {
  const input = rawInput.toLowerCase().trim();
  if (!input) return null;
  
  // Exact match
  if (COMMANDS[input]) return input;
  if (input === 'clear' || input === 'resume') return input;
  if (input === 'sudo hire shelvaaathithyan') return 'sudo_hire';
  if (input === 'spider') return 'spider';
  if (input === 'ironman') return 'ironman';
  if (input === 'thor') return 'thor';
  if (input === 'multiverse') return 'multiverse';
  
  // Fuzzy match
  if (input.includes('visionbite')) return 'visionbite';
  if (input.includes('repora')) return 'repora';
  if (input.includes('locoml') || input.includes('internship') || input.includes('research')) return 'locoml';
  if (input.includes('skill') || input.includes('tech') || input.includes('stack')) return 'skills';
  if (input.includes('project') || input.includes('work')) return 'projects';
  if (input.includes('experience') || input.includes('job') || input.includes('role') || input.includes('current')) return 'experience';
  if (input.includes('education') || input.includes('study') || input.includes('college')) return 'education';
  if (input.includes('contact') || input.includes('email') || input.includes('hire') || input.includes('reach') || input.includes('linkedin') || input.includes('github')) return 'contact';
  if (input.includes('who') || input.includes('about')) return 'whoami';
  if (input.includes('achieve') || input.includes('award') || input.includes('win')) return 'achievements';
  if (input.includes('help')) return 'help';
  if (input.includes('resume') || input.includes('cv')) return 'resume';
  if (input.includes('clear') || input.includes('clean')) return 'clear';
  
  return 'not_found';
};

const Terminal = () => {
  const terminalRef = useRef(null);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  
  const [bootState, setBootState] = useState('idle'); // idle, booting, ready
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [easterEggType, setEasterEggType] = useState(null);
  const [multiverseState, setMultiverseState] = useState('idle');
  const [scanBars, setScanBars] = useState([
    { label: "AI ENGINEERING", value: 95, current: 0 },
    { label: "RESEARCH", value: 93, current: 0 },
    { label: "INNOVATION", value: 96, current: 0 },
    { label: "AUTOMATION", value: 92, current: 0 }
  ]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const suggestions = ['help', 'resume', 'multiverse', 'visionbite', 'repora', 'skills'];

  const typewriterRef = useRef(null);
  const initTextRef = useRef(null);
  const syncValueRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, bootState, input]);

  const handleBodyClick = () => {
    if (inputRef.current && bootState === 'ready') {
      inputRef.current.focus({ preventScroll: true });
    }
    if (!hasInteracted) setHasInteracted(true);
  };

  useGSAP(() => {
    let triggered = false;
    
    ScrollTrigger.create({
      trigger: terminalRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        if (!triggered) {
          triggered = true;
          setBootState('booting');
          runBootSequence();
        }
      }
    });

    const runBootSequence = async () => {
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      
      const bootCmds = [
        { cmd: 'whoami', key: 'whoami' },
        { cmd: 'role', key: 'role' },
        { cmd: 'status', key: 'status' }
      ];
      
      for (const item of bootCmds) {
        await wait(600); // simulate typing delay
        setHistory(prev => [...prev, { command: item.cmd, component: COMMANDS[item.key](), isBoot: true }]);
      }
      
      await wait(500);
      setBootState('ready');
      if (inputRef.current) inputRef.current.focus({ preventScroll: true });
    };
  }, { scope: terminalRef });

  // Animate new history entries
  useGSAP(() => {
    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      if (!lastEntry.isBoot) {
        gsap.from(`.history-entry-${history.length - 1} .term-output-wrapper`, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  }, { scope: terminalRef, dependencies: [history.length] });

  // Terminal Discovery Animation (Idle Pulse & Rotating Suggestions)
  useGSAP(() => {
    let pulseTimeline;
    let suggestionTimeline;
    
    if (bootState === 'ready' && !hasInteracted) {
      // Pulse Animation
      pulseTimeline = gsap.timeline({ repeat: -1, repeatDelay: 5 });
      
      pulseTimeline.to('.term-discovery-pulse', {
        scale: 1.8,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        onStart: () => {
          gsap.set('.term-discovery-pulse', { opacity: 0.3, scale: 0 });
          
          // Animate Prompt text
          gsap.to('.term-active-line .term-user, .term-active-line .term-prompt', {
            color: '#4dffb8', // slightly brighter green
            textShadow: '0 0 8px rgba(77, 255, 184, 0.4)',
            duration: 0.2, // 0.2s yoyo = 0.4s total
            yoyo: true,
            repeat: 1
          });

          // Cursor enhancement
          gsap.to('.term-cursor-glow', {
            opacity: 1,
            scale: 1.2,
            duration: 0.2,
            yoyo: true,
            repeat: 1
          });
        }
      });

      // Rotating Command Suggestions
      suggestionTimeline = gsap.timeline({ repeat: -1 });
      
      suggestionTimeline.to('.term-suggestion-text', {
        opacity: 0,
        y: -4,
        duration: 0.35,
        ease: 'power2.out',
        delay: 2.15, // Total 2.5s cycle (2.15 + 0.35)
        onComplete: () => {
          setSuggestionIndex(prev => (prev + 1) % suggestions.length);
          gsap.set('.term-suggestion-text', { y: 4 });
        }
      }).to('.term-suggestion-text', {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out'
      });
    }

    return () => {
      if (pulseTimeline) pulseTimeline.kill();
      if (suggestionTimeline) suggestionTimeline.kill();
    };
  }, { scope: terminalRef, dependencies: [bootState, hasInteracted] });

  const runEasterEggSequence = (type) => {
    setEasterEggType(type);
    
    // Initial Setup
    gsap.set('.protocol-layer', { opacity: 1 });
    gsap.set('.easter-egg-wrapper', { opacity: 0, scale: 0.8, filter: 'blur(8px)' });

    const tl = gsap.timeline({
      onComplete: () => {
        setEasterEggType(null);
      }
    });

    // Reveal GIF smoothly
    tl.to('.easter-egg-wrapper', { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      duration: 0.6, 
      ease: "power3.out" 
    }, 0);

    // Fade out everything after 5 seconds total
    tl.to('.easter-egg-wrapper', { opacity: 0, scale: 0.8, filter: 'blur(4px)', duration: 0.5 }, 5.0)
      .to('.protocol-layer', { opacity: 0, duration: 0.5 }, 5.1);
  };

  const runMultiverseSequence = async (cmdString) => {
    setCmdHistory(prev => [...prev, cmdString]);
    setInput('');
    setHistory(prev => [...prev, { command: cmdString, component: null, isBoot: false }]);
    setMultiverseState('booting');
    
    const wait = ms => new Promise(r => setTimeout(r, ms));
    
    await wait(200);
    setHistory(prev => [...prev, { command: '', component: <div className="text-blue">ACCESSING MULTIVERSE DATABASE...</div>, isBoot: false }]);
    await wait(600);
    
    setHistory(prev => [...prev, { command: '', component: <div>Establishing Quantum Link... <span className="status-green">[██████████████] 100%</span></div>, isBoot: false }]);
    await wait(600);
    
    setHistory(prev => [...prev, { command: '', component: <div>Scanning Alternate Timelines... <span className="status-green">[██████████████] 100%</span></div>, isBoot: false }]);
    await wait(600);
    
    setHistory(prev => [...prev, { command: '', component: <div className="text-blue">5 TIMELINES DETECTED</div>, isBoot: false }]);
    await wait(600);
    
    setHistory(prev => [...prev, { command: '', component: <div className="text-blue">Opening Database...</div>, isBoot: false }]);
    await wait(400);

    setMultiverseState('active');
  };

  const handleKeyDown = (e) => {
    if (!hasInteracted) setHasInteracted(true);
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!input.trim()) return;

      const trimmed = input.trim();
      const parsed = parseCommand(input);
      let outputComponent = null;

      if (parsed === 'clear') {
        setHistory([]);
        setInput('');
        setHistoryIndex(-1);
        setCmdHistory(prev => [...prev, trimmed]);
        return;
      } else if (parsed === 'resume') {
        window.open('/Shelvaaathithyan_Resume.pdf', '_blank');
        outputComponent = <div className="status-green" style={{ marginBottom: '1rem' }}>Downloading Resume...</div>;
      } else if (parsed === 'spider' || parsed === 'ironman' || parsed === 'thor') {
        setCmdHistory(prev => [...prev, trimmed]);
        setInput('');
        setHistory(prev => [...prev, { 
          command: trimmed, 
          component: null, 
          isBoot: false 
        }]);
        setTimeout(() => runEasterEggSequence(parsed), 250);
        return;
      } else if (parsed === 'multiverse') {
        runMultiverseSequence(trimmed);
        return;
      } else if (parsed === 'not_found') {
        outputComponent = (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#ef4444' }}>Command not found: {trimmed}</div>
            <div style={{ color: '#888' }}>Type <span style={{ color: '#fff' }}>help</span> to see available commands.</div>
          </div>
        );
      } else if (parsed) {
        outputComponent = COMMANDS[parsed]();
      }

      setHistory(prev => [...prev, { command: trimmed, component: outputComponent, isBoot: false }]);
      setCmdHistory(prev => [...prev, trimmed]);
      setHistoryIndex(-1);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= cmdHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(cmdHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = COMMAND_KEYS.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const PromptString = () => (
    <>
      <span className="term-user">guest@portfolio</span>
      <span className="term-colon">:</span>
      <span className="term-tilde">~</span>
      <span className="term-prompt">$</span>
    </>
  );

  return (
    <section className="portfolio-section terminal-section" id="terminal" ref={terminalRef}>
      <div className="section-container terminal-container">
        <div className={`terminal-window ${multiverseState === 'active' ? 'mv-expanded' : ''}`}>
          
          {/* Simple Easter Egg Layer */}
          <div className="protocol-layer">
            <div className={`easter-egg-wrapper ${easterEggType || ''}`}>
              <div className="easter-egg-gif-container">
                {easterEggType && (
                  <img 
                    src={`/${easterEggType}gif.gif`} 
                    alt="Core" 
                    className="easter-egg-core-hologram" 
                    onError={() => console.error(`${easterEggType} GIF failed to load`)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="terminal-header">
            <div className="term-btn term-close"></div>
            <div className="term-btn term-min"></div>
            <div className="term-btn term-max"></div>
            <div className="term-title">
              {multiverseState === 'active' ? 'MULTIVERSE DATABASE' : 'guest@shelvaaathithyan:~'}
            </div>
          </div>
          
          <div className="terminal-body" ref={bodyRef} onClick={handleBodyClick}>
            {multiverseState === 'active' ? (
              <MultiverseDatabase onClose={() => {
                setMultiverseState('idle');
                setHistory(prev => [...prev, { command: '', component: <div className="status-green" style={{marginTop: '1rem'}}>Multiverse session terminated. Restoring Earth-616 console...</div>, isBoot: false }]);
                setTimeout(() => { if(inputRef.current) inputRef.current.focus(); }, 100);
              }} />
            ) : (
              <>
            
            <div className="terminal-history-container">
              {history.map((entry, idx) => (
                <div key={idx} className={`history-entry-${idx}`}>
                  <div className="term-line" style={{ display: 'flex' }}>
                    <PromptString />
                    <span className="term-input" style={{ marginLeft: '8px' }}>{entry.command}</span>
                  </div>
                  <div className="term-output-wrapper">
                    {entry.component}
                  </div>
                </div>
              ))}
            </div>

            {bootState === 'ready' && (
              <div className="term-active-line" style={{ display: 'flex', alignItems: 'center' }}>
                <PromptString />
                <div style={{ position: 'relative', flexGrow: 1, display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
                  {!hasInteracted && (
                    <>
                      <div className="term-discovery-pulse"></div>
                      <div className="term-cursor-glow"></div>
                    </>
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (!hasInteracted) setHasInteracted(true);
                    }}
                    onKeyDown={handleKeyDown}
                    className="term-cli-input"
                    spellCheck="false"
                    autoComplete="off"
                    style={{ position: 'relative', zIndex: 2 }}
                  />
                  {!hasInteracted && !input && (
                    <div className="term-suggestion" style={{ position: 'absolute', left: '12px', pointerEvents: 'none', color: 'rgba(59, 130, 246, 0.6)', display: 'flex', alignItems: 'center', height: '100%', zIndex: 1 }}>
                      Try: <span className="term-suggestion-text" style={{ marginLeft: '4px', display: 'inline-block' }}>{suggestions[suggestionIndex]}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {bootState !== 'ready' && (
              <div className="term-line" style={{ display: 'flex' }}>
                <PromptString />
                <span className="term-cursor" style={{ marginLeft: '8px' }}></span>
              </div>
            )}
            
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
