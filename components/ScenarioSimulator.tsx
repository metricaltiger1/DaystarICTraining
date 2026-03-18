import React, { useState, useEffect } from 'react';
import type { Scenario } from '../types';
import Accordion from './Accordion';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiHelpCircle, FiCheckCircle } from 'react-icons/fi';

interface ScenarioSimulatorProps {
  scenario: Scenario;
}

const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ scenario }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>(scenario.roles[0]);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive) {
      interval = window.setInterval(() => {
        setTimer(t => t + 1);
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [isActive]);
  
  const handleStart = () => {
      setIsActive(true);
  }

  const handleNextStep = () => {
    setShowHint(false);
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < scenario.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
    }
  };
  
  const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60).toString().padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
  }

  const progress = (completedSteps.length / scenario.steps.length) * 100;
  const isFinished = currentStep === scenario.steps.length - 1 && completedSteps.includes(currentStep);

  return (
    <div className="bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-border-light dark:border-border-dark max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-primary dark:text-white mb-2">{scenario.title}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">Interactive Role-Play Environment</p>
      
      <div className="mb-6 space-y-4">
        <Accordion title="Instructions & Roles">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Instructions:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {scenario.instructions.map((inst, index) => <li key={index}>{inst}</li>)}
              </ul>
            </div>
            <div>
              <label htmlFor="role-select" className="block font-semibold mb-2">Select Your Role:</label>
              <select
                id="role-select"
                className="block w-full p-2 border border-border-light dark:border-border-dark rounded-md shadow-sm focus:ring-secondary focus:border-secondary bg-light-bg dark:bg-dark-bg"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {scenario.roles.map(role => <option key={role} value={role}>{role}</option>)}
              </select>
            </div>
          </div>
        </Accordion>
      </div>
      
      <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 dark:bg-card-dark/50 rounded-lg">
        <div className="font-semibold text-gray-600 dark:text-gray-300 flex items-center">
            <FiClock className="mr-2 text-primary dark:text-secondary"/>
            <span>Time: {formatTime(timer)}</span>
        </div>
        {!isActive && timer === 0 && (
             <button onClick={handleStart} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Start Simulation</button>
        )}
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
        <motion.div 
            className="bg-secondary h-2.5 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      <div className="border-2 border-dashed border-border-light dark:border-border-dark p-6 rounded-lg min-h-[250px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
                <p className="text-lg font-medium text-light-text dark:text-dark-text mb-4">
                  <span className="font-bold text-primary dark:text-secondary">Step {scenario.steps[currentStep].step}:</span> {scenario.steps[currentStep].prompt}
                </p>
            </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 bg-yellow-100 dark:bg-yellow-500/10 border-l-4 border-secondary text-yellow-800 dark:text-yellow-200 rounded-r-lg my-4 flex items-start"
          >
            <FiHelpCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0"/>
            <p><span className="font-bold">Hint:</span> {scenario.steps[currentStep].hint}</p>
          </motion.div>
        )}
        </AnimatePresence>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowHint(true)}
            disabled={showHint}
            className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Show Hint
          </button>
          
          <button
            onClick={handleNextStep}
            className="flex-1 bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:bg-primary/50"
            disabled={isFinished}
          >
            {currentStep < scenario.steps.length - 1 ? 'Mark Complete & Next' : `Complete Activity`}
          </button>
        </div>
      </div>
      <AnimatePresence>
      {isFinished && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-100 dark:bg-green-500/10 text-green-800 dark:text-green-200 border-l-4 border-green-500 rounded-r-lg flex items-center"
        >
            <FiCheckCircle className="w-6 h-6 mr-4 text-green-500"/>
            <div>
                <h4 className="font-bold">Congratulations!</h4>
                <p>You have completed the scenario. Don't forget to visit the Reflection page.</p>
            </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default ScenarioSimulator;