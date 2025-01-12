import React, { memo } from 'react';
import { motion } from 'framer-motion';

const EventCard = memo(({ event, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="overflow-hidden bg-gray-900 bg-opacity-50 border border-indigo-500 shadow-lg cursor-pointer backdrop-blur-md rounded-xl hover:shadow-2xl hover:bg-opacity-70 border-opacity-30"
      onClick={() => onClick(event)}
    >
      <div className="relative h-64">
        {/* Use next/image if using Next.js */}
        <img
          src={event.image}
          alt={event.name}
          className="absolute inset-0 object-cover w-full h-full"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
          <h3 className="text-2xl font-bold mb-2 text-indigo-300 font-['Orbitron']">{event.name}</h3>
          <p className="mb-2 text-sm text-purple-200">{event.type}</p>
        </div>
      </div>
    </motion.div>
  );
});

EventCard.displayName = 'EventCard';
export default EventCard;