'use client';
import React, { useRef, useEffect } from 'react';

type Star = {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
};

export default function InteractiveStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // This effect runs only once on the client-side after the component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    const numStars = 200;
    const mouse = { x: -1000, y: -1000 }; // Start mouse off-screen

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      stars = []; // Reset stars on resize
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Drifting animation
        star.x += star.vx;
        star.y += star.vy;

        // Wrap stars around the screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Interaction with mouse
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let interactionFactor = 1;

        if (dist < 100) {
          // Push stars away from cursor
          star.x += (dx / dist) * 2;
          star.y += (dy / dist) * 2;
          interactionFactor = (100 - dist) / 100 + 1; // Brighten stars near cursor
        }

        const starColor = `rgba(192, 132, 252, ${star.opacity * interactionFactor})`;

        // --- Glow Effect ---
        ctx.shadowColor = starColor;
        // Set the blur radius of the shadow, which creates the glow effect
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();


        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
    />
  );
}
