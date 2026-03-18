import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { FiTarget, FiNavigation, FiPlayCircle, FiCheckCircle } from 'react-icons/fi';

const OverviewPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary dark:text-white">Training Overview</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your guide to mastering intercultural communication at Daystar University.
            </p>
        </div>
      
        <div className="space-y-8">
            <div className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark">
                <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4 flex items-center"><FiTarget className="mr-3 text-secondary"/>Objectives</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our goal is to equip you with the skills and confidence to thrive in a diverse academic setting. By completing this training, you will be able to:
                </p>
                <ul className="space-y-2">
                    <li className="flex items-start"><FiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Identify and understand key differences in communication styles across cultures.</span></li>
                    <li className="flex items-start"><FiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Apply active listening and respectful questioning techniques.</span></li>
                    <li className="flex items-start"><FiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Navigate group work and classroom discussions with greater cultural sensitivity.</span></li>
                    <li className="flex items-start"><FiCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" /><span>Develop strategies for resolving potential cross-cultural misunderstandings.</span></li>
                </ul>
            </div>
            
            <div className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark">
                <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4 flex items-center"><FiNavigation className="mr-3 text-secondary"/>How to Use This Site</h2>
                <ol className="space-y-3">
                    <li className="flex items-center"><span className="font-bold text-primary dark:text-secondary mr-3">1.</span><span><strong>Explore Activities:</strong> Head to the <Link to="/activities" className="text-primary dark:text-secondary font-medium hover:underline">Activities</Link> page to see the available scenarios.</span></li>
                    <li className="flex items-center"><span className="font-bold text-primary dark:text-secondary mr-3">2.</span><span><strong>Engage in Practice:</strong> Choose an activity and immerse yourself in the simulation.</span></li>
                    <li className="flex items-center"><span className="font-bold text-primary dark:text-secondary mr-3">3.</span><span><strong>Reflect on Learning:</strong> After each activity, visit the <Link to="/reflection" className="text-primary dark:text-secondary font-medium hover:underline">Reflection</Link> page to process your experience.</span></li>
                    <li className="flex items-center"><span className="font-bold text-primary dark:text-secondary mr-3">4.</span><span><strong>Consult Resources:</strong> The <Link to="/resources" className="text-primary dark:text-secondary font-medium hover:underline">Resources</Link> page has extra materials to deepen your understanding.</span></li>
                </ol>
            </div>

            <div className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark">
                <h2 className="text-2xl font-semibold text-light-text dark:text-dark-text mb-4 flex items-center"><FiPlayCircle className="mr-3 text-secondary"/>Demonstration</h2>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-900/50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        <FiPlayCircle className="w-16 h-16 mx-auto" />
                        <p className="mt-2 font-semibold">A short demonstration video is coming soon.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default OverviewPage;