import { SetLog } from '../types';

export const estimated1RM = (weight: number, reps: number): number => {
  if (reps === 0) return 0;
  return weight * (1 + reps / 30);
};

export const totalVolume = (sets: SetLog[]): number => {
  return sets.reduce((total, set) => {
    if (set.completed) {
      return total + (set.weight * set.reps);
    }
    return total;
  }, 0);
};

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m} min`;
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const isProgressionReady = (sets: SetLog[], maxReps: number): boolean => {
  if (sets.length === 0) return false;
  return sets.every(set => set.completed && set.reps >= maxReps);
};

export const generateWorkoutId = (): string => {
  return `wo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
