import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-bg dark:bg-dark-bg border-t border-border-light dark:border-border-dark">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Daystar University &mdash; PBL Project for Intercultural Communication.
        </p>
      </div>
    </footer>
  );
};

export default Footer;