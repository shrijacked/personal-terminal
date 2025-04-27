import React, { useRef, useEffect } from 'react';

const STAR_COUNT = 300;
const STAR_SIZE = 1.2;
const STAR_SPEED_MIN = 0.5;
const STAR_SPEED_MAX = 2.5;
const STAR_ACCEL = 0.012; // acceleration per frame

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

type Star = {
  x: number; // current x
  y: number; // current y
  angle: number; // direction in radians
  speed: number; // current speed
  distance: number; // distance from center
  z: number; // for size/brightness
};

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<Star[]>([]);
  const center = useRef({ x: 0, y: 0 });

  // Helper to respawn a star near the center
  function respawnStar(width: number, height: number): Star {
    const angle = randomBetween(0, 2 * Math.PI);
    const distance = randomBetween(0, 20); // start close to center
    const speed = randomBetween(STAR_SPEED_MIN, STAR_SPEED_MAX);
    const z = randomBetween(0.5, 1.2);
    return {
      x: width / 2 + Math.cos(angle) * distance,
      y: height / 2 + Math.sin(angle) * distance,
      angle,
      speed,
      distance,
      z,
    };
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvasRef.current) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
      center.current = { x: width / 2, y: height / 2 };
      stars.current = Array.from({ length: STAR_COUNT }, () => respawnStar(width, height));
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
      const cx = center.current.x;
      const cy = center.current.y;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.current.length; i++) {
        let star = stars.current[i];
        // Accelerate outward
        star.speed += STAR_ACCEL * star.z;
        star.distance += star.speed;
        star.x = cx + Math.cos(star.angle) * star.distance;
        star.y = cy + Math.sin(star.angle) * star.distance;

        // If out of bounds, respawn
        if (
          star.x < 0 || star.x > width ||
          star.y < 0 || star.y > height
        ) {
          stars.current[i] = respawnStar(width, height);
          continue;
        }

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