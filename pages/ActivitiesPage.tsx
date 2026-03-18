import React from 'react';
import { ACTIVITIES } from '../constants';
import ActivityCard from '../components/ActivityCard';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};


const ActivitiesPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary dark:text-white">Role-Playing Activities</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Choose an activity below to begin practicing your intercultural communication skills in a safe, simulated environment.
        </p>
      </div>
      <motion.div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {ACTIVITIES.map(activity => (
          <motion.div key={activity.id} variants={itemVariants}>
            <ActivityCard activity={activity} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatedPage>
  );
};

export default ActivitiesPage;