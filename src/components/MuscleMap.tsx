import React from 'react';
import { MuscleGroup } from '../types';

interface Props {
  activeMuscles: MuscleGroup[];
}

const MUSCLE_MAP: Record<string, string[]> = {
  chest: ['Chest'],
  back: ['Back', 'Lats', 'Upper Back'],
  shoulders: ['Shoulders', 'Front Deltoids', 'Side Deltoids', 'Rear Deltoids'],
  biceps: ['Biceps'],
  triceps: ['Triceps'],
  legs: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
  core: ['Core'],
};

export const MuscleMap: React.FC<Props> = ({ activeMuscles }) => {
  const isActive = (group: string): string => {
    const mapped = MUSCLE_MAP[group] ?? [];
    return activeMuscles.some(m => mapped.includes(m)) ? '#6366f1' : '#2a2a35';
  };

  return (
    <div className="flex justify-center gap-6 py-4">
      {/* Front */}
      <div className="text-center">
        <svg width="100" height="200" viewBox="0 0 100 200" className="w-24 h-48">
          <circle cx="50" cy="20" r="15" fill="#2a2a35" />
          <path d="M30 45 Q50 60 70 45 L65 75 Q50 85 35 75 Z" fill={isActive('chest')} />
          <rect x="38" y="80" width="24" height="40" rx="4" fill={isActive('core')} />
          <circle cx="25" cy="50" r="10" fill={isActive('shoulders')} />
          <circle cx="75" cy="50" r="10" fill={isActive('shoulders')} />
          <rect x="15" y="60" width="12" height="30" rx="6" fill={isActive('biceps')} />
          <rect x="73" y="60" width="12" height="30" rx="6" fill={isActive('biceps')} />
          <path d="M35 125 L45 180 L35 180 Z" fill={isActive('legs')} stroke={isActive('legs')} strokeWidth="4" strokeLinecap="round" />
          <path d="M65 125 L55 180 L65 180 Z" fill={isActive('legs')} stroke={isActive('legs')} strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Front</span>
      </div>

      {/* Back */}
      <div className="text-center">
        <svg width="100" height="200" viewBox="0 0 100 200" className="w-24 h-48">
          <circle cx="50" cy="20" r="15" fill="#2a2a35" />
          <path d="M35 35 Q50 25 65 35 L70 55 Q50 65 30 55 Z" fill={isActive('back')} />
          <path d="M30 60 L70 60 L60 90 L40 90 Z" fill={isActive('back')} />
          <circle cx="25" cy="50" r="10" fill={isActive('shoulders')} />
          <circle cx="75" cy="50" r="10" fill={isActive('shoulders')} />
          <rect x="15" y="60" width="12" height="30" rx="6" fill={isActive('triceps')} />
          <rect x="73" y="60" width="12" height="30" rx="6" fill={isActive('triceps')} />
          <path d="M35 100 Q50 90 65 100 L70 120 Q50 130 30 120 Z" fill={isActive('legs')} />
          <path d="M38 125 L45 190 L38 190 Z" fill={isActive('legs')} stroke={isActive('legs')} strokeWidth="4" strokeLinecap="round" />
          <path d="M62 125 L55 190 L62 190 Z" fill={isActive('legs')} stroke={isActive('legs')} strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">Back</span>
      </div>
    </div>
  );
};
