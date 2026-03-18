import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import AnimatedPage from '../components/AnimatedPage';

const ReflectionPage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary dark:text-white">Your Reflection</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Taking time to reflect is a crucial part of learning. Use this space to process your experience and solidify your understanding.
        </p>
      </div>
      <FeedbackForm />
    </AnimatedPage>
  );
};

export default ReflectionPage;