import React, { useState } from 'react';
import type { Activity } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div 
      className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col border border-border-light dark:border-border-dark"
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(255, 193, 7, 0.25)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {imageLoading && (
          <div className="absolute inset-0 animate-pulse"></div>
        )}
        <img 
            className={`h-full w-full object-cover transition-opacity duration-500 group-hover:scale-110 ${imageLoading ? 'opacity-0' : 'opacity-100'}`} 
            src={activity.imageUrl} 
            alt={activity.title}
            onLoad={() => setImageLoading(false)}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-primary dark:text-white mb-2">{activity.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 flex-grow text-sm">{activity.description}</p>
        <div className="mt-6">
          <Link
            to={`/practice/${activity.id}`}
            className="w-full text-center block bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Start Activity
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;