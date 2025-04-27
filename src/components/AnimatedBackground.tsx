import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 120;
const STAR_SIZE = 1.2;
const STAR_SPEED = 0.15;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

type Star = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
};

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
      stars.current = Array.from({ length: STAR_COUNT }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        z: randomBetween(0.5, 1),
        vx: randomBetween(-STAR_SPEED, STAR_SPEED),
        vy: randomBetween(-STAR_SPEED, STAR_SPEED),
      }));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    const draw = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !canvasRef.current) return;
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;

      ctx.clearRect(0, 0, width, height);

      for (let star of stars.current) {
        star.x += star.vx * star.z;
        star.y += star.vy * star.z;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        ctx.save();
        ctx.globalAlpha = 0.7 + 0.3 * Math.sin(Date.now() / 500 + star.x);
        ctx.beginPath();
        ctx.arc(star.x, star.y, STAR_SIZE * star.z, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 4 * star.z;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: '#111',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}; 