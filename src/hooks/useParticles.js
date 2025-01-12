// hooks/useParticles.js
import { useState, useEffect, useCallback } from 'react';

export const useParticles = (count = 100) => {
  const [particles, setParticles] = useState([]);

  const createParticles = useCallback(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.1,
    }));
  }, [count]);

  useEffect(() => {
    setParticles(createParticles());

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y > 100 ? 0 : particle.y + particle.speedY,
      })));
    };

    const intervalId = setInterval(animateParticles, 50); // Throttle updates
    return () => clearInterval(intervalId);
  }, [createParticles]);

  return particles;
};
