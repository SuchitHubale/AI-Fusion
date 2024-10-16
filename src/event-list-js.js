import React from 'react';
import { useSpring, animated, config } from 'react-spring';

const EventList = ({ events, onEventClick }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  return (
    <animated.section style={fadeIn} className="py-16 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-['Orbitron']">
          Stellar Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={event.name} event={event} index={index} onClick={() => onEventClick(event)} />
          ))}
        </div>
      </div>
    </animated.section>
  );
};

const EventCard = ({ event, index, onClick }) => {
  const spring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: index * 100,
    config: config.wobbly,
  });

  return (
    <animated.div
      style={spring}
      className="backdrop-blur-md bg-gray-900 bg-opacity-50 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:bg-opacity-70 border border-indigo-500 border-opacity-30"
      onClick={onClick}
    >
      <div className="relative h-64">
        <img src={event.image} alt={event.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col justify-end p-6">
          <h3 className="text-2xl font-bold mb-2 text-indigo-300 font-['Orbitron']">{event.name}</h3>
          <p className="text-purple-200 text-sm mb-2">{event.type}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-indigo-200 text-sm mb-2">{event.description}</p>
        <p className="text-purple-300 text-sm mb-1">Entry Fee: {event.entryFee}</p>
        <p className="text-purple-300 text-sm">{event.members}</p>
      </div>
    </animated.div>
  );
};

export default EventList;