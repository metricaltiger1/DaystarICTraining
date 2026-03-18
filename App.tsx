import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OverviewPage from './pages/OverviewPage';
import ActivitiesPage from './pages/ActivitiesPage';
import PracticePage from './pages/PracticePage';
import ReflectionPage from './pages/ReflectionPage';
import ResourcesPage from './pages/ResourcesPage';
import BackgroundAnimation from './components/BackgroundAnimation';
import { ThemeProvider } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  
  const getPageName = (pathname: string): string => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/practice')) return 'practice';
    const page = pathname.split('/')[1];
    return page || 'home';
  }

  return (
    <div className="flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500 relative isolate">
      <BackgroundAnimation page={getPageName(location.pathname)} />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 sm:pt-32 z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/practice/:activityId" element={<PracticePage />} />
            <Route path="/reflection" element={<ReflectionPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;