import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import aiVideoSrc from './aa.mp4';
import logoSrc from './saaai.png';

const AIFusionHero = ({ scrollToSection, onRegister }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trendingTopic, setTrendingTopic] = useState('BGMI');
  const heroRef = useRef(null);

  useEffect(() => {
    const topics = ['FREE FIRE', 'IPL AUCTION', 'DECODE', 'BGMI'];
    let index = 0;
    const interval = setInterval(() => {
      setTrendingTopic(topics[index]);
      index = (index + 1) % topics.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (section) => {
    scrollToSection(section);
    setMenuOpen(false);
  };

  const handleExplore = () => {
    scrollToSection('events');
    setMenuOpen(false);
  };

  const navItems = ['EVENTS', 'SPONSORS', 'CONTACT', 'SUPPORT'];

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={aiVideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
      <div className="relative z-10 h-full flex flex-col">
        <header className="p-4">
          <div className="container mx-auto flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img src={logoSrc} alt="AI Fusion Logo" className="h-10 ml-5" />
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  onClick={() => handleNavClick(item.toLowerCase())}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-rajdhani font-semibold cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <motion.button 
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 font-rajdhani font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegister}
            >
              REGISTER NOW
            </motion.button>
            <Menu
              className="w-6 h-6 md:hidden text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-7xl font-bold mb-4 text-white font-rajdhani leading-tight"
            >
              DEPARTMENT OF AIML
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-blue-400 mb-6 font-rajdhani"
            >
              PRESENTING
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative text-8xl md:text-9xl font-bold mb-8 font-rajdhani tracking-widest"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
                AI FUSION
              </span>
              <div className="absolute inset-0 bg-blue-500 mix-blend-color-dodge opacity-20 blur-xl"></div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 font-inter"
            >
              Experience the future of AI in an immersive event like no other
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center justify-center mb-12 text-gray-300"
            >
              <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
              <span className="text-lg font-inter">Trending Event: {trendingTopic}</span>
            </motion.div>
            <motion.button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl px-12 py-4 rounded-full transition-all duration-300 shadow-lg font-rajdhani font-bold"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExplore}
            >
              EXPLORE 
            </motion.button>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
          >
            <div className="container mx-auto p-4">
              <div className="flex justify-end mb-8">
                <X
                  className="text-blue-400 text-3xl cursor-pointer hover:text-blue-300 transition-colors"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
              <nav className="flex flex-col items-center space-y-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    onClick={() => handleNavClick(item.toLowerCase())}
                    className="text-3xl text-gray-300 hover:text-blue-400 transition-colors duration-300 font-rajdhani font-semibold cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 font-rajdhani font-bold text-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onRegister();
                    setMenuOpen(false);
                  }}
                >
                  REGISTER NOW
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIFusionHero;