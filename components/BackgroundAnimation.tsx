import React, { useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface BackgroundAnimationProps {
  page: string;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ page }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let mouse = { x: undefined as number | undefined, y: undefined as number | undefined };
    
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    };
    
    const handleMouseLeave = () => {
        mouse.x = undefined;
        mouse.y = undefined;
    }
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const colors = {
      dark: {
        primary: 'rgba(255, 193, 7, 0.3)', // secondary color with opacity
        secondary: 'rgba(51, 65, 85, 0.4)', // border-dark with opacity
        lines: 'rgba(51, 65, 85, 0.2)'
      },
      light: {
        primary: 'rgba(10, 77, 104, 0.2)', // primary color with opacity
        secondary: 'rgba(226, 232, 240, 0.6)', // border-light with opacity
        lines: 'rgba(226, 232, 240, 0.4)'
      }
    };
    
    const themeColors = theme === 'dark' ? colors.dark : colors.light;

    const createParticles = (num: number, shape: 'circle' | 'square' = 'circle', speedFactor = 1) => {
      particles = [];
      for (let i = 0; i < num; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speedFactor,
          vy: (Math.random() - 0.5) * speedFactor,
          size: Math.random() * 2 + 1,
          shape,
        });
      }
    };
    
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.fillStyle = themeColors.primary;
        ctx.beginPath();
        if(p.shape === 'circle') {
           ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        } else {
           ctx.rect(p.x, p.y, p.size, p.size);
        }
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };
    
    const animateLines = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.y += p.vy;
          if (p.y > canvas.height + 10) p.y = -10;
          ctx.strokeStyle = themeColors.lines;
          ctx.lineWidth = p.size;
          ctx.beginPath();
          ctx.moveTo(0, p.y);
          ctx.lineTo(canvas.width, p.y);
          ctx.stroke();
        });
        animationFrameId = requestAnimationFrame(animateLines);
    }
    
    const animateWaves = (time: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const frequency = 0.0015;
        const amplitude = 50;
        const speed = 0.0005;
        
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            for (let x = 0; x < canvas.width; x++) {
                const y = Math.sin(x * frequency + time * speed * (i + 1)) * amplitude * (1 / (i + 1)) + canvas.height / 2 + 200 + i * 50;
                ctx.lineTo(x, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.closePath();
            ctx.fillStyle = i === 0 ? themeColors.primary : i === 1 ? themeColors.secondary : themeColors.lines;
            ctx.fill();
        }
        
        animationFrameId = requestAnimationFrame(animateWaves);
    }

    switch (page) {
      case 'home': {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        createParticles(100, 'circle', 0.25);
        
        const homeAnimate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                // Original movement
                p.x += p.vx;
                p.y += p.vy;

                // Wall collision
                if (p.x - p.size < 0 || p.x + p.size > canvas.width) p.vx *= -1;
                if (p.y - p.size < 0 || p.y + p.size > canvas.height) p.vy *= -1;
                
                // Mouse interaction (repel)
                if (mouse.x !== undefined && mouse.y !== undefined) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    const interactionRadius = 150;
                    if (dist < interactionRadius) {
                        const force = (interactionRadius - dist) / interactionRadius;
                        p.x += (dx / dist) * force * 1.5;
                        p.y += (dy / dist) * force * 1.5;
                    }
                }
                
                // Draw particle
                ctx.fillStyle = themeColors.primary;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
                    const connectRadius = 130;
                    if (dist < connectRadius) {
                        ctx.strokeStyle = themeColors.secondary;
                        ctx.lineWidth = 0.5;
                        ctx.globalAlpha = 1 - (dist / connectRadius);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1.0;

            animationFrameId = requestAnimationFrame(homeAnimate);
        };
        
        homeAnimate();
        break;
      }
      case 'overview':
      case 'resources':
        createParticles(50, 'circle', 0.5);
        animateParticles();
        break;
      case 'activities':
        createParticles(150, 'square', 0.8);
        animateParticles();
        break;
      case 'practice':
        createParticles(30);
        particles.forEach(p => {
            p.y = Math.random() * canvas.height;
            p.vy = Math.random() * 0.5 + 0.1;
            p.size = Math.random() * 1.5;
        });
        animateLines();
        break;
      case 'reflection':
        animateWaves(0);
        break;
      default:
        break;
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [page, theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />;
};

export default BackgroundAnimation;
