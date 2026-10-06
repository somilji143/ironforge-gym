import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getExercise } from '../data/exercises';
import { ExerciseAnimation } from './animations/ExerciseAnimation';

interface Props {
  exerciseId: string;
  sets: number;
  minReps?: number;
  maxReps?: number;
  isTime?: boolean;
  index?: number;
  onClick?: () => void;
}

export const ExerciseCard: React.FC<Props> = ({ exerciseId, sets, minReps, maxReps, isTime, index, onClick }) => {
  const navigate = useNavigate();
  const exercise = getExercise(exerciseId);

  if (!exercise) return null;

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(`/exercise/${exerciseId}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-[#1a1a23] border border-[#2a2a35] rounded-[14px] p-4 flex items-center gap-4 active:scale-[0.98] transition-transform cursor-pointer"
    >
      <div className="w-16 h-16 bg-[#222230] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
        <ExerciseAnimation exerciseId={exerciseId} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold truncate">{exercise.name}</h3>
        <p className="text-sm text-[#8e8ea0] mt-1">
          {sets} sets × {minReps}{maxReps && maxReps !== minReps ? `-${maxReps}` : ''} {isTime ? 'sec' : 'reps'}
        </p>
        <div className="flex gap-2 mt-2">
          <span className="text-[10px] px-2 py-1 bg-[#222230] text-[#8e8ea0] rounded-full uppercase tracking-wider font-semibold">
            {exercise.equipment}
          </span>
          <span className="text-[10px] px-2 py-1 bg-[#6366f1]/20 text-[#818cf8] rounded-full uppercase tracking-wider font-semibold">
            {exercise.muscleGroup}
          </span>
        </div>
      </div>
    </div>
  );
};
