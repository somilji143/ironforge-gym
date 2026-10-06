import React from 'react';
import { Clock, Dumbbell, Zap, Trophy, Flame } from 'lucide-react';
import { formatDuration } from '../utils/calculations';
import { useNavigate } from 'react-router-dom';

interface Props {
  workoutName: string;
  duration: number; // in seconds
  exerciseCount: number;
  setCount: number;
  totalVolume: number;
  prCount: number;
}

export const WorkoutSummary: React.FC<Props> = ({
  workoutName,
  duration,
  exerciseCount,
  setCount,
  totalVolume,
  prCount
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1a1a23] rounded-[14px] p-6 border border-[#2a2a35] max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-[#22c55e]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Workout Complete!</h2>
        <p className="text-[#8e8ea0]">{workoutName}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#222230] p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <Clock className="w-6 h-6 text-[#818cf8] mb-2" />
          <span className="text-xl font-bold text-white">{formatDuration(duration)}</span>
          <span className="text-xs text-[#8e8ea0] uppercase tracking-wider mt-1">Time</span>
        </div>
        
        <div className="bg-[#222230] p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <Zap className="w-6 h-6 text-[#f59e0b] mb-2" />
          <span className="text-xl font-bold text-white">{totalVolume} kg</span>
          <span className="text-xs text-[#8e8ea0] uppercase tracking-wider mt-1">Volume</span>
        </div>
        
        <div className="bg-[#222230] p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <Dumbbell className="w-6 h-6 text-[#ef4444] mb-2" />
          <span className="text-xl font-bold text-white">{exerciseCount} / {setCount}</span>
          <span className="text-xs text-[#8e8ea0] uppercase tracking-wider mt-1">Ex / Sets</span>
        </div>

        <div className="bg-[#222230] p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <Flame className="w-6 h-6 text-[#22c55e] mb-2" />
          <span className="text-xl font-bold text-white">{prCount}</span>
          <span className="text-xs text-[#8e8ea0] uppercase tracking-wider mt-1">New PRs</span>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="w-full bg-[#6366f1] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#4f46e5] active:scale-[0.98] transition-transform"
      >
        DONE
      </button>
    </div>
  );
};
