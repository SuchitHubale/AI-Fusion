import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SponsorDetails from './SponsorDetails';

const sponsorsData = [
    { 
      id: 1, name: 'Physiotherapy and Orthocare Clinic', 
      logo: 'Physiotherapy & Orthocare clinic PDF-1_page-0001.jpg', 
      location: 'S.T.Stand Road,Shirala Naka,Ganesh Nager,Islampur', 
      owner: 'Dr.Pradip Rokade', 
      description: `Services:
      - Back Pain Clinic
       - Joint pain and arthritis therapy
       - Neurorehabilitation for paralysis
       - Child rehabilitation
       - Sports physiotherapy
       - Post-surgery recovery therapy
       - Dietary advice
  Advanced Treatments:
  - Laser, Shockwave, IFT
  - Ultrasound, Diathermy, CPM
  - Spinal Decompression Therapy' `
    },
    {
      id: 2,
      name: 'New Ajinkya Bazar',
      logo: '/images/id-1.jpg', // Relative path to the image in the public folder
      location: 'Shri Building, near Dr. Ravi Yadav Hospital, Islampur',
      owner: 'Vijay Patil',
      description: 'Customer satisfaction and customer welfare are our motto! Ajinkya Bazar Family offers high-quality lentils, pulses, semolina, flour, flattened rice (poha), as well as generous discounts on all company products, making it the go-to choice for everyone in the Islampur region. Visit, verify, and then make your purchase, and also get a golden opportunity to win exciting prizes along with your shopping!'
    },    
  
  { id: 3, name: 'FutureWave', logo: '/path/to/futurewave-logo.png', location: 'Boston, MA', owner: 'Mike Johnson', description: 'Next-gen AI hardware manufacturer' },
  { id: 4, name: 'Quantum Solutions', logo: '/path/to/quantum-solutions-logo.png', location: 'Austin, TX', owner: 'Sarah Brown', description: 'Quantum computing and AI integration' },
  { id: 5, name: 'NeuralNet Systems', logo: '/path/to/neuralnet-logo.png', location: 'Seattle, WA', owner: 'David Lee', description: 'Neural network optimization specialists' },
  { id: 6, name: 'DataMinds', logo: '/path/to/dataminds-logo.png', location: 'Chicago, IL', owner: 'Emily Chen', description: 'Big data analytics and AI solutions' },
  { id: 7, name: 'RoboIntel', logo: '/path/to/robointel-logo.png', location: 'Los Angeles, CA', owner: 'Alex Rodriguez', description: 'Robotics and AI integration' },
  { id: 8, name: 'CloudAI', logo: '/path/to/cloudai-logo.png', location: 'Denver, CO', owner: 'Olivia Taylor', description: 'Cloud-based AI services provider' },
  { id: 9, name: 'EthicalAI', logo: '/path/to/ethicalai-logo.png', location: 'Washington D.C.', owner: 'Chris Morgan', description: 'AI ethics and responsible development' },
];

const Sponsors = () => {
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  const handleSponsorClick = (sponsor) => {
    setSelectedSponsor(sponsor);
  };

  return (
    <section className="py-16 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 font-['Orbitron']">
          Our Sponsors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sponsorsData.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              className="backdrop-blur-md bg-gray-900 bg-opacity-50 rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:bg-opacity-70 border border-indigo-500 border-opacity-30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleSponsorClick(sponsor)}
            >
              <div className="p-6 flex flex-col items-center justify-center">
                <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-24 mb-4" />
                <h3 className="text-2xl font-bold text-indigo-300 font-['Orbitron'] text-center">{sponsor.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedSponsor && (
        <SponsorDetails
          sponsor={selectedSponsor}
          onClose={() => setSelectedSponsor(null)}
        />
      )}
    </section>
  );
};

export default Sponsors;