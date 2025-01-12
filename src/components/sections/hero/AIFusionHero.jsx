import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Button from '../../ui/Button';
import Header from '../../layout/Header';
import Navigation from '../../layout/Navigation';
import aiVideoSrc from '../../../assets/videos/aa.mp4';
import logoSrc from '../../../assets/images/saaai.png';

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

  const navItems = ['EVENTS', 'SUBSCRIBE', 'CONTACT', 'SUPPORT'];

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover w-full h-full opacity-60"
      >
        <source src={aiVideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <Header 
          logo={logoSrc}
          navItems={navItems}
          onNavClick={handleNavClick}
          onMenuClick={() => setMenuOpen(true)}
          onRegister={onRegister}
        />

        <Navigation 
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          navItems={navItems}
          onNavClick={handleNavClick}
          onRegister={onRegister}
        />

        <main className="flex items-center justify-center flex-grow">
          <div className="max-w-4xl px-4 mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-4 text-5xl font-bold leading-tight text-white md:text-7xl font-rajdhani"
            >
              DEPARTMENT OF AIML
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6 text-4xl font-bold text-blue-400 md:text-6xl font-rajdhani"
            >
              PRESENTING
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative mb-8 font-bold tracking-widest text-8xl md:text-9xl font-rajdhani"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
                AI FUSION
              </span>
              <div className="absolute inset-0 bg-blue-500 mix-blend-color-dodge opacity-20 blur-xl"></div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mb-8 text-xl text-gray-300 md:text-2xl font-inter"
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
            <Button 
              variant="gradient" 
              size="large" 
              onClick={handleExplore}
              className="shadow-lg hover:shadow-blue-500/50"
            >
              EXPLORE
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIFusionHero;