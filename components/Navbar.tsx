import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// FIX: Add Variants type from framer-motion to correctly type animation variants.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import ThemeToggleButton from './ThemeToggleButton';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors duration-300 group ${
      isActive
        ? 'text-secondary'
        : 'text-light-text dark:text-dark-text hover:text-secondary/80'
    } after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-secondary after:transform after:scale-x-0 after:origin-left after:transition-transform ${ isActive ? 'after:scale-x-100' : 'group-hover:after:scale-x-100'}`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
        isActive ? 'bg-secondary text-primary' : 'text-light-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-card-dark/50'
    }`;
    
  const menuVariants: Variants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { type: 'tween', ease: 'easeInOut', duration: 0.3 } }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-primary dark:text-white text-xl font-bold">
              Daystar<span className="text-secondary">.</span>Training
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/overview" className={navLinkClasses}>Overview</NavLink>
              <NavLink to="/activities" className={navLinkClasses}>Activities</NavLink>
              <NavLink to="/reflection" className={navLinkClasses}>Reflection</NavLink>
              <NavLink to="/resources" className={navLinkClasses}>Resources</NavLink>
              <ThemeToggleButton />
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <ThemeToggleButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="ml-2 bg-transparent inline-flex items-center justify-center p-2 rounded-md text-light-text dark:text-dark-text hover:text-secondary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? <FiMenu className="block h-6 w-6" /> : <FiX className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden fixed top-20 left-0 right-0 bottom-0 bg-card-light dark:bg-card-dark" 
            id="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>Home</NavLink>
              <NavLink to="/overview" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>Overview</NavLink>
              <NavLink to="/activities" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>Activities</NavLink>
              <NavLink to="/reflection" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>Reflection</NavLink>
              <NavLink to="/resources" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}>Resources</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;