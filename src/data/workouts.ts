import { WorkoutDay, WeekProgram } from '../types';

export const pushA: WorkoutDay = {
  id: 'push-a', dayIndex: 0, name: 'Push A',
  label: 'Chest • Shoulders • Triceps',
  muscleGroups: ['Chest', 'Front Deltoids', 'Side Deltoids', 'Triceps'],
  exercises: [
    { exerciseId: 'machine-chest-press', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'db-incline-press', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'machine-chest-fly', sets: 2, minReps: 12, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'db-shoulder-press', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'db-lateral-raise', sets: 3, minReps: 12, maxReps: 15, restSeconds: 75 },
    { exerciseId: 'tricep-pushdown', sets: 3, minReps: 10, maxReps: 15, restSeconds: 90 },
  ],
};

export const pullA: WorkoutDay = {
  id: 'pull-a', dayIndex: 1, name: 'Pull A',
  label: 'Back • Biceps',
  muscleGroups: ['Lats', 'Upper Back', 'Rear Deltoids', 'Biceps'],
  exercises: [
    { exerciseId: 'cable-lat-pulldown', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'seated-cable-row', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'db-row', sets: 3, minReps: 10, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'face-pull', sets: 2, minReps: 12, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'db-bicep-curl', sets: 3, minReps: 10, maxReps: 12, restSeconds: 90 },
    { exerciseId: 'db-hammer-curl', sets: 2, minReps: 10, maxReps: 12, restSeconds: 90 },
  ],
};

export const legsA: WorkoutDay = {
  id: 'legs-a', dayIndex: 2, name: 'Legs A',
  label: 'Legs • Core',
  muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core'],
  exercises: [
    { exerciseId: 'leg-press', sets: 3, minReps: 10, maxReps: 12, restSeconds: 150 },
    { exerciseId: 'goblet-squat', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'seated-leg-curl', sets: 3, minReps: 10, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'leg-extension', sets: 2, minReps: 12, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'standing-calf-raise', sets: 3, minReps: 12, maxReps: 20, restSeconds: 75 },
    { exerciseId: 'plank', sets: 3, minReps: 30, maxReps: 60, restSeconds: 60, isTime: true },
  ],
};

export const pushB: WorkoutDay = {
  id: 'push-b', dayIndex: 3, name: 'Push B',
  label: 'Chest • Shoulders • Triceps',
  muscleGroups: ['Chest', 'Front Deltoids', 'Side Deltoids', 'Triceps'],
  exercises: [
    { exerciseId: 'incline-machine-press', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'db-bench-press', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'cable-fly', sets: 2, minReps: 12, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'machine-shoulder-press', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'cable-lateral-raise', sets: 3, minReps: 12, maxReps: 15, restSeconds: 75 },
    { exerciseId: 'overhead-tricep-extension', sets: 3, minReps: 10, maxReps: 15, restSeconds: 90 },
  ],
};

export const pullB: WorkoutDay = {
  id: 'pull-b', dayIndex: 4, name: 'Pull B',
  label: 'Back • Biceps • Rear Delts',
  muscleGroups: ['Lats', 'Upper Back', 'Rear Deltoids', 'Biceps'],
  exercises: [
    { exerciseId: 'machine-lat-pulldown', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'chest-supported-row', sets: 3, minReps: 8, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'machine-seated-row', sets: 3, minReps: 10, maxReps: 12, restSeconds: 120 },
    { exerciseId: 'rear-delt-fly', sets: 3, minReps: 12, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'ez-bar-curl', sets: 3, minReps: 10, maxReps: 12, restSeconds: 90 },
    { exerciseId: 'cable-hammer-curl', sets: 2, minReps: 10, maxReps: 15, restSeconds: 90 },
  ],
};

export const legsB: WorkoutDay = {
  id: 'legs-b', dayIndex: 5, name: 'Legs B',
  label: 'Legs • Core',
  muscleGroups: ['Quads', 'Hamstrings', 'Glutes', 'Calves', 'Core'],
  exercises: [
    { exerciseId: 'hack-squat', sets: 3, minReps: 8, maxReps: 12, restSeconds: 150 },
    { exerciseId: 'romanian-deadlift', sets: 3, minReps: 8, maxReps: 12, restSeconds: 150 },
    { exerciseId: 'leg-press', sets: 2, minReps: 10, maxReps: 15, restSeconds: 120 },
    { exerciseId: 'lying-leg-curl', sets: 3, minReps: 10, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'leg-extension', sets: 2, minReps: 12, maxReps: 15, restSeconds: 90 },
    { exerciseId: 'seated-calf-raise', sets: 3, minReps: 15, maxReps: 20, restSeconds: 75 },
    { exerciseId: 'cable-crunch', sets: 3, minReps: 12, maxReps: 15, restSeconds: 60 },
  ],
};

export const weekProgram: WeekProgram = {
  days: [pushA, pullA, legsA, pushB, pullB, legsB, null],
};

export const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const dayAbbrev = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function getTodayWorkout(): WorkoutDay | null {
  const dayIndex = (new Date().getDay() + 6) % 7; // JS: 0=Sun → our 0=Mon
  return weekProgram.days[dayIndex] ?? null;
}

export function getTodayIndex(): number {
  return (new Date().getDay() + 6) % 7;
}
