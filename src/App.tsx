import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { BottomNav } from './components/BottomNav';
import HomePage from './pages/HomePage';
import WorkoutPage from './pages/WorkoutPage';
import { ProgressPage } from './pages/ProgressPage';
import ExercisesPage from './pages/ExercisesPage';
import ExerciseDetailPage from './pages/ExerciseDetailPage';
import { ProfilePage } from './pages/ProfilePage';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.15 }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/workout" element={<PageTransition><WorkoutPage /></PageTransition>} />
        <Route path="/progress" element={<PageTransition><ProgressPage /></PageTransition>} />
        <Route path="/exercises" element={<PageTransition><ExercisesPage /></PageTransition>} />
        <Route path="/exercise/:id" element={<PageTransition><ExerciseDetailPage /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/workout';

  return (
    <div className="min-h-screen bg-[#0f0f13] text-white font-sans max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      <AnimatedRoutes />
      {!hideNav && <BottomNav />}
    </div>
  );
}

export default App;
