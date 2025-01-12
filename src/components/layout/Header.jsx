import React from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Button from '../ui/Button';

const Header = ({ 
  logo, 
  navItems, 
  onNavClick, 
  onMenuClick, 
  onRegister 
}) => {
  return (
    <header className="p-4">
      <div className="container flex items-center justify-between mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <img src={logo} alt="AI Fusion Logo" className="h-10 ml-5" />
        </motion.div>
        
        <nav className="hidden space-x-8 md:flex">
          {navItems.map((item) => (
            <motion.a
              key={item}
              onClick={() => onNavClick(item.toLowerCase())}
              className="font-semibold text-gray-300 transition-colors duration-300 cursor-pointer hover:text-blue-400 font-rajdhani"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <Button onClick={onRegister}>
          REGISTER NOW
        </Button>

        <Menu
          className="w-6 h-6 text-blue-400 transition-colors cursor-pointer md:hidden hover:text-blue-300"
          onClick={onMenuClick}
        />
      </div>
    </header>
  );
};

export default Header;