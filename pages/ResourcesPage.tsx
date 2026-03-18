import React from 'react';
import { RESOURCES } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { FiBookOpen, FiVideo, FiCrosshair } from 'react-icons/fi';

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

const ResourceTypeIcon: React.FC<{type: string}> = ({ type }) => {
    const icons: Record<string, React.ReactElement> = {
        'Reading': <FiBookOpen />,
        'Video': <FiVideo />,
        'Bible Reference': <FiCrosshair />
    };
    return <div className="text-secondary text-2xl">{icons[type] || <FiBookOpen />}</div>;
}


const ResourcesPage: React.FC = () => {
  return (
    <AnimatedPage>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary dark:text-white">Resources for Deeper Learning</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Explore these additional materials to expand your knowledge of intercultural communication from various perspectives.
        </p>
      </div>
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {RESOURCES.map((resource, index) => (
          <motion.div
            key={index} 
            className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-border-light dark:border-border-dark flex items-start sm:items-center space-x-6"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ResourceTypeIcon type={resource.type} />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-primary dark:text-white">{resource.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1 mb-3 text-sm">{resource.description}</p>
              <a 
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer" 
                className="font-medium text-primary dark:text-secondary hover:underline text-sm"
              >
                Learn More &rarr;
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </AnimatedPage>
  );
};

export default ResourcesPage;