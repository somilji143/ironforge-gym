import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Library, User, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Progress', path: '/progress', icon: TrendingUp },
  { name: 'Exercises', path: '/exercises', icon: Library },
  { name: 'Profile', path: '/profile', icon: User },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0f0f13]/90 backdrop-blur-xl border-t border-border z-50 safe-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <NavLink
              key={tab.name}
              to={tab.path}
              className="flex flex-col items-center justify-center w-16 h-14 relative"
            >
              <tab.icon className={`w-[22px] h-[22px] mb-0.5 transition-colors ${isActive ? 'text-accent' : 'text-text-muted'}`} />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-accent' : 'text-text-muted'}`}>
                {tab.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px w-8 h-[3px] bg-accent rounded-b-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
