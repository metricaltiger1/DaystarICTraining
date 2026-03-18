import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-card-dark/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card-light dark:focus:ring-offset-card-dark focus:ring-primary transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <FiMoon className="h-5 w-5" /> : <FiSun className="h-5 w-5" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggleButton;