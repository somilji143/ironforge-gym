import React from 'react';
import { Check } from 'lucide-react';

interface Props {
  setIndex: number;
  isWarmup?: boolean;
  previous: { weight: number; reps: number } | null;
  weight: number | '';
  reps: number | '';
  completed: boolean;
  onWeightChange: (val: string) => void;
  onRepsChange: (val: string) => void;
  onComplete: () => void;
}

export const SetTracker: React.FC<Props> = ({
  setIndex,
  isWarmup,
  previous,
  weight,
  reps,
  completed,
  onWeightChange,
  onRepsChange,
  onComplete
}) => {
  return (
    <div className={`flex items-center gap-2 p-2 rounded-[14px] ${completed ? 'bg-[#6366f1]/10' : 'bg-[#1a1a23]'} ${isWarmup ? 'border border-dashed border-[#35354a]' : 'border border-[#2a2a35]'} mb-2 min-h-[44px]`}>
      <div className="w-8 flex justify-center">
        <span className={`text-sm font-bold ${isWarmup ? 'text-[#5a5a6e]' : 'text-white'}`}>
          {isWarmup ? 'W' : setIndex + 1}
        </span>
      </div>
      
      <div className="flex-1 text-center text-xs text-[#8e8ea0]">
        {previous ? `${previous.weight}kg × ${previous.reps}` : '-'}
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="decimal"
          value={weight}
          onChange={(e) => onWeightChange(e.target.value)}
          disabled={completed}
          className="w-16 h-10 bg-[#222230] text-white text-center rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] disabled:opacity-50"
          placeholder="kg"
        />
        <input
          type="text"
          inputMode="numeric"
          value={reps}
          onChange={(e) => onRepsChange(e.target.value)}
          disabled={completed}
          className="w-16 h-10 bg-[#222230] text-white text-center rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6366f1] disabled:opacity-50"
          placeholder="reps"
        />
      </div>
      
      <button
        onClick={onComplete}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
          completed ? 'bg-[#22c55e] text-white' : 'bg-[#222230] text-[#8e8ea0] hover:text-white'
        }`}
      >
        <Check className="w-5 h-5" />
      </button>
    </div>
  );
};
