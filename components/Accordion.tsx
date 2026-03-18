import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border-light dark:border-border-dark rounded-lg mb-2 overflow-hidden">
      <button
        type="button"
        className="flex items-center justify-between w-full p-4 font-medium text-left text-light-text dark:text-dark-text bg-card-light dark:bg-card-dark/50 hover:bg-gray-100 dark:hover:bg-card-dark transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-light-bg dark:bg-dark-bg text-sm">
              {children}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;