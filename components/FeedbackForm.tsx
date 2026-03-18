import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState({ learn: '', challenges: '', apply: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.learn || !formData.challenges || !formData.apply) return;
    setIsSubmitted(true);
    console.log('Feedback submitted:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border-light dark:border-border-dark relative">
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-card-light dark:bg-card-dark z-10 flex flex-col items-center justify-center rounded-xl"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <FiCheckCircle className="w-16 h-16 text-green-500 mb-4" />
            </motion.div>
            <h3 className="font-semibold text-2xl text-light-text dark:text-dark-text">Thank you!</h3>
            <p className="text-gray-500 dark:text-gray-400">Your reflection has been recorded.</p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ learn: '', challenges: '', apply: '' });
              }}
              className="mt-6 bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary/90 transition-colors"
            >
              Submit Another
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="learn" className="block text-lg font-medium text-light-text dark:text-dark-text mb-2">What did you learn?</label>
          <textarea
            id="learn"
            name="learn"
            rows={4}
            value={formData.learn}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-border-light dark:border-border-dark rounded-md shadow-sm focus:ring-secondary focus:border-secondary bg-light-bg dark:bg-dark-bg transition"
            placeholder="Describe a key takeaway from the role-playing exercises..."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="challenges" className="block text-lg font-medium text-light-text dark:text-dark-text mb-2">What challenges did you face?</label>
          <textarea
            id="challenges"
            name="challenges"
            rows={4}
            value={formData.challenges}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-border-light dark:border-border-dark rounded-md shadow-sm focus:ring-secondary focus:border-secondary bg-light-bg dark:bg-dark-bg transition"
            placeholder="Were there any moments of uncertainty or difficulty? What were they?"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="apply" className="block text-lg font-medium text-light-text dark:text-dark-text mb-2">How will you apply this?</label>
          <textarea
            id="apply"
            name="apply"
            rows={4}
            value={formData.apply}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-border-light dark:border-border-dark rounded-md shadow-sm focus:ring-secondary focus:border-secondary bg-light-bg dark:bg-dark-bg transition"
            placeholder="Think of specific situations at Daystar where you can use these skills."
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-secondary text-primary font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition-all transform hover:scale-105"
          >
            Submit Reflection
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;