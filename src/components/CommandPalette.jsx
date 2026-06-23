import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiSearch, FiFileText, FiCode, FiUser, FiMail, FiGithub } from 'react-icons/fi';
import './CommandPalette.css';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const overlayRef = useRef(null);
  const paletteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(
        paletteRef.current,
        { scale: 0.95, opacity: 0, y: -20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closePalette = () => {
    gsap.to(paletteRef.current, { scale: 0.95, opacity: 0, y: -20, duration: 0.2 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: () => setIsOpen(false) });
  };

  if (!isOpen) return null;

  const commands = [
    { name: 'View VisionBite', icon: <FiCode />, action: () => { closePalette(); document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' }); } },
    { name: 'View Repora', icon: <FiCode />, action: () => { closePalette(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); } },
    { name: 'About Me', icon: <FiUser />, action: () => { closePalette(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); } },
    { name: 'Download Resume', icon: <FiFileText />, action: () => { closePalette(); alert("Resume Modal Coming Soon"); } },
    { name: 'Contact', icon: <FiMail />, action: () => { closePalette(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } },
    { name: 'Open GitHub', icon: <FiGithub />, action: () => { closePalette(); window.open("https://github.com/shelvaaathithyan", "_blank"); } },
  ];

  const filteredCommands = commands.filter(cmd => cmd.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="cmd-overlay" ref={overlayRef} onClick={closePalette}>
      <div className="cmd-palette" ref={paletteRef} onClick={(e) => e.stopPropagation()}>
        <div className="cmd-header">
          <FiSearch className="cmd-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Search Portfolio or Type a Command..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="cmd-esc">ESC</span>
        </div>
        <div className="cmd-body">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <button key={index} className="cmd-item" onClick={cmd.action}>
                <span className="cmd-item-icon">{cmd.icon}</span>
                {cmd.name}
              </button>
            ))
          ) : (
            <div className="cmd-empty">No results found for "{searchQuery}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
