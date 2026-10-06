import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { formatTime } from '../utils/calculations';

interface Props {
  remaining: number;
  total: number;
  exerciseName?: string;
  onSkip: () => void;
  onAddTime: (seconds: number) => void;
}

export const RestTimer: React.FC<Props> = ({ remaining, total, exerciseName, onSkip, onAddTime }) => {
  const progress = total > 0 ? ((total - remaining) / total) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed inset-0 bg-[#0f0f13]/95 backdrop-blur z-50 flex flex-col items-center justify-center p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-8">Rest</h2>
        
        <div className="relative w-64 h-64 flex items-center justify-center mb-12">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="#222230"
              strokeWidth="8"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="#6366f1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="text-6xl font-bold text-white tabular-nums tracking-tighter">
            {formatTime(remaining)}
          </div>
        </div>

        <div className="flex items-center gap-6 mb-12">
          <button
            onClick={() => onAddTime(-15)}
            className="w-14 h-14 bg-[#1a1a23] border border-[#2a2a35] rounded-full flex items-center justify-center text-white active:scale-95"
          >
            -15s
          </button>
          
          <button
            onClick={onSkip}
            className="px-8 h-14 bg-[#6366f1] text-white font-bold rounded-full active:scale-95"
          >
            SKIP
          </button>
          
          <button
            onClick={() => onAddTime(15)}
            className="w-14 h-14 bg-[#1a1a23] border border-[#2a2a35] rounded-full flex items-center justify-center text-white active:scale-95"
          >
            +15s
          </button>
        </div>

        {exerciseName && (
          <div className="text-center mt-auto mb-10">
            <p className="text-[#8e8ea0] text-sm uppercase tracking-widest font-semibold mb-2">Up Next</p>
            <p className="text-white text-xl font-medium">{exerciseName}</p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
