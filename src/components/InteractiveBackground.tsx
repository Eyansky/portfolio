
import React, { useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Determine bubble color based on theme
    const isDark = resolvedTheme === 'dark';
    const baseColor = isDark ? '155, 135, 245' : '75, 85, 205'; // Purple for dark, Blue for light

    class Bubble {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      originalX: number;
      originalY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.radius = Math.random() * 30 + 10;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${baseColor}, ${Math.random() * 0.2 + 0.1})`;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = `rgba(${baseColor}, 0.1)`;
        ctx.stroke();
      }

      update(mouseX: number, mouseY: number) {
        // Natural floating movement
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off edges
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx *= -1;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy *= -1;

        // Mouse repulsion
        if (mouse.isActive) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 120;

          if (distance < repulsionRadius) {
            const angle = Math.atan2(dy, dx);
            const force = (repulsionRadius - distance) / repulsionRadius;
            
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
          }
        }

        // Subtle return to original position
        const returnForce = 0.01;
        this.x += (this.originalX - this.x) * returnForce;
        this.y += (this.originalY - this.y) * returnForce;
      }
    }

    // Mouse tracking
    const mouse = {
      x: 0,
      y: 0,
      isActive: false,
    };

    canvas.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
      mouse.isActive = true;
    });

    canvas.addEventListener('mouseout', () => {
      mouse.isActive = false;
    });

    // Touch support
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.isActive = true;
    });

    canvas.addEventListener('touchend', () => {
      mouse.isActive = false;
    });

    // Create bubbles
    const bubbles: Bubble[] = [];
    const numberOfBubbles = Math.min(window.innerWidth * window.innerHeight / 20000, 50);
    
    for (let i = 0; i < numberOfBubbles; i++) {
      bubbles.push(new Bubble());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(bubble => {
        bubble.update(mouse.x, mouse.y);
        bubble.draw();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [resolvedTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-auto z-0"
    />
  );
};

export default InteractiveBackground;
