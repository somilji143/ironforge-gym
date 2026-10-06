// ─── Core Types ──────────────────────────────────────────────

export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Quads' | 'Hamstrings' | 'Glutes' | 'Calves' | 'Core' | 'Front Deltoids' | 'Side Deltoids' | 'Rear Deltoids' | 'Lats' | 'Upper Back' | 'Forearms';

export type Equipment = 'Machine' | 'Dumbbell' | 'Barbell' | 'Cable' | 'Bodyweight' | 'EZ Bar';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  equipment: Equipment;
  instructions: string[];
  commonMistakes: string[];
  breathing: string;
  beginnerTip: string;
  formSafety?: string;
  alternatives: string[];       // IDs of alternative exercises
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  minReps: number;
  maxReps: number;
  restSeconds: number;
  isTime?: boolean;             // true for plank-type exercises (reps = seconds)
}

export interface WorkoutDay {
  id: string;
  dayIndex: number;             // 0=Monday ... 6=Sunday
  name: string;                 // "Push A", "Pull B", etc.
  label: string;                // "Chest • Shoulders • Triceps"
  muscleGroups: MuscleGroup[];
  exercises: WorkoutExercise[];
}

export interface WeekProgram {
  days: (WorkoutDay | null)[];  // index 0–6, null = rest
}

// ─── Workout Tracking ────────────────────────────────────────

export interface SetLog {
  weight: number;
  reps: number;
  completed: boolean;
  isWarmup?: boolean;
  timestamp?: number;
}

export interface ExerciseLog {
  exerciseId: string;
  sets: SetLog[];
  notes: string;
}

export interface WorkoutLog {
  id: string;
  workoutDayId: string;
  date: string;                 // ISO date string YYYY-MM-DD
  startTime: number;            // timestamp
  endTime?: number;
  exercises: ExerciseLog[];
  completed: boolean;
}

// ─── Active Workout ──────────────────────────────────────────

export interface ActiveWorkout {
  workoutDayId: string;
  startTime: number;
  currentExerciseIndex: number;
  currentSetIndex: number;
  exercises: ActiveExerciseState[];
}

export interface ActiveExerciseState {
  exerciseId: string;
  sets: ActiveSetState[];
  notes: string;
}

export interface ActiveSetState {
  weight: number;
  reps: number;
  completed: boolean;
  isWarmup: boolean;
}

// ─── User Data ───────────────────────────────────────────────

export interface BodyWeightEntry {
  date: string;
  weight: number;
}

export interface PersonalRecord {
  exerciseId: string;
  weight: number;
  reps: number;
  date: string;
  estimated1RM: number;
}

export interface UserSettings {
  beginnerMode: boolean;
  beginnerStartDate: string | null;
  bodyWeightGoal: number;
  currentBodyWeight: number;
  bodyWeightHistory: BodyWeightEntry[];
  theme: 'dark';
  restTimerSound: boolean;
  restTimerVibrate: boolean;
  unitSystem: 'metric';
}
