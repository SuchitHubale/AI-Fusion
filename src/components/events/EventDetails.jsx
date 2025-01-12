import React, { memo } from 'react';
import Modal from '../../components/ui/Modal';
import { motion } from 'framer-motion';

const EventDetails = memo(({ event, onClose, onRegister }) => {
  if (!event) return null;

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-8 text-white border border-indigo-500 shadow-2xl bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl">
        <h2 className="text-4xl font-bold mb-6 text-indigo-200 font-['Orbitron']">{event.name}</h2>
        <img
          src={event.image}
          alt={event.name}
          className="object-cover w-full h-64 mb-6 rounded-lg"
          loading="lazy"
        />
        
        <EventContent event={event} />
        <EventInfo event={event} />
        <CoordinatorInfo coordinator={event.coordinator} />
        
        <div className="flex justify-end space-x-4">
          <ActionButton onClick={() => { onRegister(); onClose(); }}>
            Register
          </ActionButton>
          <ActionButton onClick={onClose} variant="secondary">
            Close
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
});

const EventContent = memo(({ event }) => (
  <div className="mb-6 space-y-4">
    <p className="text-xl font-semibold text-indigo-200">{event.description}</p>
    {[1, 2, 3, 4, 5, 6].map(num => (
      event[`round${num}`] && (
        <p key={num} className="text-lg leading-relaxed text-indigo-200">
          {event[`round${num}`]}
        </p>
      )
    ))}
  </div>
));

const EventInfo = memo(({ event }) => (
  <div className="grid grid-cols-2 gap-4 p-4 mb-6 bg-indigo-800 rounded-lg bg-opacity-30">
    <div className="space-y-2">
      <InfoItem label="Event Type" value={event.type} />
      <InfoItem label="Date" value={event.date} />
      <InfoItem label="Location" value={event.location} />
    </div>
    <div className="space-y-2">
      <InfoItem label="Entry Fee" value={event.entryFee} />
      <InfoItem label="Team Size" value={event.members} />
    </div>
  </div>
));

const InfoItem = memo(({ label, value }) => (
  <div>
    <span className="font-semibold text-purple-300">{label}: </span>
    <span className="text-indigo-200">{value}</span>
  </div>
));

const CoordinatorInfo = memo(({ coordinator }) => (
  <div className="p-4 mb-6 bg-indigo-800 bg-opacity-50 rounded-lg">
    <h3 className="mb-3 text-2xl font-semibold text-indigo-300">Event Coordinator</h3>
    <div className="space-y-2">
      <p className="text-lg">
        <span className="font-semibold text-purple-300">Name: </span>
        <span className="text-indigo-200">{coordinator.name}</span>
      </p>
      <p className="text-lg">
        <span className="font-semibold text-purple-300">Contact: </span>
        <span className="text-indigo-200">{coordinator.contact}</span>
      </p>
    </div>
  </div>
));

const ActionButton = memo(({ onClick, variant = 'primary', children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-lg font-semibold ${
      variant === 'primary' 
        ? 'bg-indigo-500 hover:bg-indigo-600' 
        : 'bg-purple-600 hover:bg-purple-700'
    }`}
  >
    {children}
  </motion.button>
));

// Add display names for React DevTools
EventDetails.displayName = 'EventDetails';
EventContent.displayName = 'EventContent';
EventInfo.displayName = 'EventInfo';
InfoItem.displayName = 'InfoItem';
CoordinatorInfo.displayName = 'CoordinatorInfo';
ActionButton.displayName = 'ActionButton';

export default EventDetails;