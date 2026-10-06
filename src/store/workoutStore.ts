import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActiveWorkout, ActiveExerciseState, ActiveSetState, WorkoutDay } from '../types';

interface RestTimerState {
  active: boolean;
  remaining: number;
  total: number;
}

interface WorkoutStore {
  activeWorkout: ActiveWorkout | null;
  restTimer: RestTimerState;
  startWorkout: (workoutDay: WorkoutDay, beginnerMode?: boolean) => void;
  completeSet: (exerciseIndex: number, setIndex: number, weight: number, reps: number, restDuration: number) => void;
  updateSetWeight: (exerciseIndex: number, setIndex: number, weight: number) => void;
  updateSetReps: (exerciseIndex: number, setIndex: number, reps: number) => void;
  skipRestTimer: () => void;
  updateRestTimer: (remaining: number) => void;
  nextExercise: () => void;
  prevExercise: () => void;
  finishWorkout: () => void;
  addNote: (exerciseIndex: number, note: string) => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      activeWorkout: null,
      restTimer: { active: false, remaining: 0, total: 0 },

      startWorkout: (workoutDay: WorkoutDay, beginnerMode: boolean = false) => {
        const exercises: ActiveExerciseState[] = workoutDay.exercises.map(ex => {
          const numSets = beginnerMode ? 2 : (ex.sets || 3);
          const sets: ActiveSetState[] = Array.from({ length: numSets }).map(() => ({
            weight: 0,
            reps: 0,
            completed: false,
            isWarmup: false,
          }));
          return {
            exerciseId: ex.exerciseId,
            sets,
            notes: '',
          };
        });

        set({
          activeWorkout: {
            workoutDayId: workoutDay.id,
            startTime: Date.now(),
            currentExerciseIndex: 0,
            currentSetIndex: 0,
            exercises,
          },
          restTimer: { active: false, remaining: 0, total: 0 }
        });
      },

      completeSet: (exerciseIndex, setIndex, weight, reps, restDuration = 90) => {
        const { activeWorkout } = get();
        if (!activeWorkout) return;

        const newExercises = activeWorkout.exercises.map((ex, i) => {
          if (i !== exerciseIndex) return ex;
          const newSets = ex.sets.map((s, j) => {
            if (j !== setIndex) return s;
            return { ...s, weight, reps, completed: true, isWarmup: false };
          });
          return { ...ex, sets: newSets };
        });

        set({
          activeWorkout: { ...activeWorkout, exercises: newExercises },
          restTimer: { active: true, remaining: restDuration, total: restDuration }
        });
      },

      updateSetWeight: (exerciseIndex, setIndex, weight) => {
        const { activeWorkout } = get();
        if (!activeWorkout) return;
        const newExercises = activeWorkout.exercises.map((ex, i) => {
          if (i !== exerciseIndex) return ex;
          const newSets = ex.sets.map((s, j) => j === setIndex ? { ...s, weight } : s);
          return { ...ex, sets: newSets };
        });
        set({ activeWorkout: { ...activeWorkout, exercises: newExercises } });
      },

      updateSetReps: (exerciseIndex, setIndex, reps) => {
        const { activeWorkout } = get();
        if (!activeWorkout) return;
        const newExercises = activeWorkout.exercises.map((ex, i) => {
          if (i !== exerciseIndex) return ex;
          const newSets = ex.sets.map((s, j) => j === setIndex ? { ...s, reps } : s);
          return { ...ex, sets: newSets };
        });
        set({ activeWorkout: { ...activeWorkout, exercises: newExercises } });
      },

      skipRestTimer: () => {
        set({ restTimer: { active: false, remaining: 0, total: 0 } });
      },

      updateRestTimer: (remaining) => {
        const { restTimer } = get();
        if (remaining <= 0) {
          set({ restTimer: { active: false, remaining: 0, total: restTimer.total } });
        } else {
          set({ restTimer: { ...restTimer, remaining } });
        }
      },

      nextExercise: () => {
        const { activeWorkout } = get();
        if (!activeWorkout) return;
        if (activeWorkout.currentExerciseIndex < activeWorkout.exercises.length - 1) {
          set({
            activeWorkout: {
              ...activeWorkout,
              currentExerciseIndex: activeWorkout.currentExerciseIndex + 1,
              currentSetIndex: 0,
            }
          });
        }
      },

      prevExercise: () => {
        const { activeWorkout } = get();
        if (!activeWorkout) return;
        if (activeWorkout.currentExerciseIndex > 0) {
          set({
            activeWorkout: {
              ...activeWorkout,
              currentExerciseIndex: activeWorkout.currentExerciseIndex - 1,
              currentSetIndex: 0,
            }
          });
        }
      },

      finishWorkout: () => {
        set({ activeWorkout: null, restTimer: { active: false, remaining: 0, total: 0 } });
      },

      addNote: (exerciseIndex, note) => {
        const { activeWorkout } = get();
        if (!activeWorkout) return;
        const newExercises = activeWorkout.exercises.map((ex, i) =>
          i === exerciseIndex ? { ...ex, notes: note } : ex
        );
        set({ activeWorkout: { ...activeWorkout, exercises: newExercises } });
      },
    }),
    { name: 'ironforge-active-workout' }
  )
);
