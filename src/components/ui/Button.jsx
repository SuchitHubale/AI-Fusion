import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  className = '' 
}) => {
  const baseStyles = "font-bold text-white transition-all duration-300 font-rajdhani rounded-full";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600"
  };
  
  const sizes = {
    medium: "px-6 py-2 text-base",
    large: "px-12 py-4 text-xl"
  };

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;