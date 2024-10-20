import React from 'react';
import { useSpring, animated, config } from 'react-spring';

const EventDetails = ({ event, onClose, onRegister }) => {
  const modalSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: config.gentle,
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <animated.div
        style={modalSpring}
        className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-xl p-8 w-full max-w-2xl border border-indigo-500 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-4xl font-bold mb-6 text-indigo-2  00 font-['Orbitron']">{event.name}</h2>
        <img src={event.image} alt={event.name} className="w-full h-64 object-cover rounded-lg mb-6" />
        <p className="mb-6 text-indigo-200 text-lg leading-relaxed">{event.round1}</p>
        <p className="mb-6 text-indigo-200 text-lg leading-relaxed">{event.round2}</p>
        <p className="mb-6 text-indigo-200 text-lg leading-relaxed">{event.round3}</p>
        <p className="mb-6 text-indigo-200 text-lg leading-relaxed">{event.round4}</p>
        <p className="mb-6 text-indigo-200 text-lg leading-relaxed">{event.round5}</p>
        <p className="mb-6 text-indigo-200 text-lg leading-relaxed">{event.round6}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="mb-2"><strong className="text-purple-300">Type:</strong> {event.type}</p>
            <p className="mb-2"><strong className="text-purple-300">Date:</strong> {event.date}</p>
            <p className="mb-2"><strong className="text-purple-300">Entry Fee:</strong> {event.entryFee}</p>
          </div>
          <div>
            <p className="mb-2"><strong className="text-purple-300">Location:</strong> {event.location}</p>
            <p className="mb-2"><strong className="text-purple-300">Team Size:</strong> {event.members}</p>
          </div>
        </div>
        
        <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4 mb-6">
          <h3 className="text-2xl font-semibold mb-3 text-indigo-300">Event Coordinator</h3>
          <p className="mb-1"><strong className="text-purple-300">Name:</strong> {event.coordinator.name}</p>
          <p><strong className="text-purple-300">Contact:</strong> {event.coordinator.contact}</p>
        </div>
        
        <div className="flex justify-end space-x-4">
          <AnimatedButton onClick={() => { onRegister(); onClose(); }} className="bg-indigo-500 hover:bg-indigo-600">
            Register
          </AnimatedButton>
          <AnimatedButton onClick={onClose} className="bg-purple-600 hover:bg-purple-700">
            Close
          </AnimatedButton>
        </div>
      </animated.div>
    </div>
  );
};

const AnimatedButton = ({ onClick, className, children }) => {
  const [spring, set] = useSpring(() => ({ scale: 1 }));
  
  return (
    <animated.button
      style={spring}
      onClick={onClick}
      onMouseEnter={() => set({ scale: 1.05 })}
      onMouseLeave={() => set({ scale: 1 })}
      className={`px-6 py-2 rounded-full text-lg transition-colors ${className}`}
    >
      {children}
    </animated.button>
  );
};

export default EventDetails;