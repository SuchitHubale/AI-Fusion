import React, { memo } from 'react';
import EventCard from './EventCard';

const EventList = memo(({ events, onEventClick }) => {
  return (
    <section className="min-h-screen py-16 bg-black">
      <div className="container px-4 mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-['Orbitron']">
          Stellar Events
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventCard
              key={event.id || event.name}
              event={event}
              index={index}
              onClick={onEventClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

EventList.displayName = 'EventList';
export default EventList;