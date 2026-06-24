import React, { useEffect, useRef } from 'react';

const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Mouse tracking for interaction
    let mouse = { x: null, y: null, radius: 150 };
    
    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    // Node configuration
    const isMobile = window.innerWidth < 768;
    const baseNumNodes = Math.floor(Math.random() * (40 - 25 + 1) + 25); // 25-40 nodes
    const numNodes = isMobile ? Math.floor(baseNumNodes * 0.6) : baseNumNodes;
    const maxConnectionDistance = isMobile ? 150 : 200;
    const baseNodeOpacity = 0.08;
    const baseLineOpacity = isMobile ? 0.02 : 0.05;
    
    class Node {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow drift
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${baseNodeOpacity})`;
        
        // Slightly brighten if near mouse
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const glow = 1 - (dist / mouse.radius);
            ctx.fillStyle = `rgba(255, 255, 255, ${baseNodeOpacity + (glow * 0.1)})`;
          }
        }
        
        ctx.fill();
      }
    }
    
    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
      nodes.push(new Node());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Draw connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < maxConnectionDistance) {
            ctx.beginPath();
            
            // Calculate opacity based on distance
            let opacity = (1 - (dist / maxConnectionDistance)) * baseLineOpacity;
            
            // Brighten lines near mouse
            if (mouse.x && mouse.y) {
              const dxMouse = mouse.x - (nodes[i].x + nodes[j].x) / 2;
              const dyMouse = mouse.y - (nodes[i].y + nodes[j].y) / 2;
              const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
              
              if (distMouse < mouse.radius) {
                const glow = 1 - (distMouse / mouse.radius);
                opacity += glow * 0.07; // Cap opacity at around 0.12 max
              }
            }
            
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2,
        pointerEvents: 'none'
      }}
    />
  );
};

export default NeuralNetwork;
