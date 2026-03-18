import React from 'react';
import HeroSection from '../components/HeroSection';
import AnimatedPage from '../components/AnimatedPage';
import { motion, Variants } from 'framer-motion';
import { FiMousePointer, FiMessageSquare, FiAward } from 'react-icons/fi';

const features = [
  {
    icon: <FiMousePointer className="h-10 w-10 text-secondary" />,
    title: 'Select a Scenario',
    description: 'Choose from a variety of real-world situations to practice your skills.'
  },
  {
    icon: <FiMessageSquare className="h-10 w-10 text-secondary" />,
    title: 'Engage & Role-Play',
    description: 'Follow interactive prompts and hints in our simulator to navigate the conversation.'
  },
  {
    icon: <FiAward className="h-10 w-10 text-secondary" />,
    title: 'Reflect & Grow',
    description: 'After each scenario, reflect on your experience to solidify your learning.'
  }
];

const featureVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
};

const HomePage: React.FC = () => {
  return (
    <AnimatedPage>
      <div className="space-y-20">
        <HeroSection />
        <section className="text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Your Journey to Intercultural Competence</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            This platform provides a safe and interactive space to develop practical communication skills essential for thriving in Daystar University's vibrant multicultural community.
          </p>
        </section>
        
        <section className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-white mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-sm rounded-xl shadow-md border border-border-light dark:border-border-dark"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={featureVariants}
              >
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-secondary/10 mx-auto mb-6">
                    {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </AnimatedPage>
  );
};

export default HomePage;