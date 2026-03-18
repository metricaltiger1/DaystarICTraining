import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SCENARIOS } from '../constants';
import ScenarioSimulator from '../components/ScenarioSimulator';
import AnimatedPage from '../components/AnimatedPage';
import { FiAlertTriangle } from 'react-icons/fi';

const PracticePage: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();

  if (!activityId || !SCENARIOS[activityId]) {
    return (
      <AnimatedPage>
        <div className="text-center bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-lg mx-auto border border-border-light dark:border-border-dark">
          <FiAlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">Scenario Not Found</h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300">The requested activity could not be found. Please return to the activities page.</p>
          <Link to="/activities" className="mt-6 inline-block bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90">
            Back to Activities
          </Link>
        </div>
      </AnimatedPage>
    );
  }

  const scenario = SCENARIOS[activityId];

  return <AnimatedPage><ScenarioSimulator scenario={scenario} /></AnimatedPage>;
};

export default PracticePage;