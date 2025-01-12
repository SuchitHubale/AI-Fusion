import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from '../ui/Button';

const Navigation = ({ 
  isOpen, 
  onClose, 
  navItems, 
  onNavClick, 
  onRegister 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95"
        >
          <div className="container p-4 mx-auto">
            <div className="flex justify-end mb-8">
              <X
                className="text-3xl text-blue-400 transition-colors cursor-pointer hover:text-blue-300"
                onClick={onClose}
              />
            </div>
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  onClick={() => onNavClick(item.toLowerCase())}
                  className="text-3xl font-semibold text-gray-300 transition-colors duration-300 cursor-pointer hover:text-blue-400 font-rajdhani"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
              <Button onClick={() => {
                onRegister();
                onClose();
              }}>
                REGISTER NOW
              </Button>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;