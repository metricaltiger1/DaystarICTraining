import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="relative rounded-lg shadow-2xl overflow-hidden h-[60vh] flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="absolute inset-0">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
        )}
        <img
          className={`h-full w-full object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          src="https://images.squarespace-cdn.com/content/v1/54ef816fe4b078fcddf32f3d/1614372304657-IFQ4VPLMB2J8SFZYECM0/IMG_0994.jpg"
          alt="Daystar University students celebrating graduation"
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40" aria-hidden="true" />
      </div>
      <div className="relative max-w-4xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Intercultural Communication Training
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-xl text-indigo-100"
        >
          Building intercultural competence and confidence among Daystar University students.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10"
        >
          <Link
            to="/overview"
            className="inline-block bg-secondary text-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            Start Training
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;