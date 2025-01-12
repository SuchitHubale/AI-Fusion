import React, { memo } from 'react';
import { useParticles } from '../../hooks/useParticles';

const Snowfall = memo(() => {
  const particles = useParticles(75); // Reduced particle count for better performance

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute bg-blue-200 rounded-full opacity-50 transform-gpu"
          style={{
            transform: `translate(${particle.x}vw, ${particle.y}vh)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
});

Snowfall.displayName = 'Snowfall';
export default Snowfall;