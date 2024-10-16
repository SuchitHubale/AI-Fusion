import React from 'react';
import { motion } from 'framer-motion';

const SponsorDetails = ({ sponsor, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="backdrop-blur-md bg-gray-900 bg-opacity-70 rounded-xl shadow-lg overflow-hidden border border-indigo-500 border-opacity-30 p-8 max-w-2xl w-full mx-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-['Orbitron']">{sponsor.name}</h2>
          <button
            onClick={onClose}
            className="text-indigo-300 hover:text-purple-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img src={sponsor.logo} alt={sponsor.name} className="w-full max-h-48 object-contain mb-4" />
            <p className="text-indigo-200"><strong className="text-purple-300">Location:</strong> {sponsor.location}</p>
            <p className="text-indigo-200"><strong className="text-purple-300">Owner:</strong> {sponsor.owner}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-purple-400 font-['Orbitron']">About {sponsor.name}</h3>
            <p className="text-indigo-200">{sponsor.description}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-purple-400 font-['Orbitron']">Sponsorship Tier</h3>
          <p className="text-indigo-200">
            {sponsor.name} is a <span className="text-indigo-400 font-bold">{getTier(sponsor.id)}</span> sponsor for our AI Fusion event.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const getTier = (id) => {
  if (id <= 3) return 'Platinum';
  if (id <= 6) return 'Gold';
  return 'Silver';
};

export default SponsorDetails;