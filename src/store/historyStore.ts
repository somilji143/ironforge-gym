import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WorkoutLog, PersonalRecord, SetLog, ExerciseLog } from '../types';
import { estimated1RM } from '../utils/calculations';

interface HistoryStore {
  workoutLogs: WorkoutLog[];
  personalRecords: PersonalRecord[];
  saveWorkout: (log: WorkoutLog) => void;
  getWorkoutsByDate: (date: string) => WorkoutLog[];
  getLastWorkout: (workoutDayId: string) => WorkoutLog | undefined;
  getExerciseHistory: (exerciseId: string) => { date: string; sets: SetLog[] }[];
  getExercisePRs: (exerciseId: string) => PersonalRecord[];
  checkAndUpdatePRs: (exerciseId: string, sets: SetLog[], date: string) => PersonalRecord[];
  isProgressionReady: (sets: SetLog[], maxReps: number) => boolean;
  getCompletedDates: () => string[];
  getWeeklyCount: () => number;
  getCurrentStreak: () => number;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      workoutLogs: [],
      personalRecords: [],

      saveWorkout: (log) => {
        set((state) => ({
          workoutLogs: [...state.workoutLogs, log]
        }));
      },

      getWorkoutsByDate: (date) => {
        return get().workoutLogs.filter(log => log.date === date);
      },

      getLastWorkout: (workoutDayId) => {
        const logs = get().workoutLogs.filter(log => log.workoutDayId === workoutDayId);
        return logs.length ? logs[logs.length - 1] : undefined;
      },

      getExerciseHistory: (exerciseId) => {
        const results: { date: string; sets: SetLog[] }[] = [];
        get().workoutLogs.forEach(log => {
          log.exercises.forEach(ex => {
            if (ex.exerciseId === exerciseId) {
              results.push({ date: log.date, sets: ex.sets });
            }
          });
        });
        return results;
      },

      getExercisePRs: (exerciseId) => {
        return get().personalRecords.filter(pr => pr.exerciseId === exerciseId);
      },

      checkAndUpdatePRs: (exerciseId, sets, date) => {
        const { personalRecords } = get();
        const newPRs: PersonalRecord[] = [];
        const existingPR = personalRecords.find(pr => pr.exerciseId === exerciseId);

        for (const s of sets) {
          if (!s.completed || s.weight <= 0) continue;
          const e1rm = estimated1RM(s.weight, s.reps);

          if (!existingPR || e1rm > existingPR.estimated1RM) {
            const pr: PersonalRecord = {
              exerciseId,
              weight: s.weight,
              reps: s.reps,
              date,
              estimated1RM: e1rm,
            };
            newPRs.push(pr);
          }
        }

        if (newPRs.length > 0) {
          const bestNew = newPRs.reduce((a, b) => a.estimated1RM > b.estimated1RM ? a : b);
          set((state) => ({
            personalRecords: [
              ...state.personalRecords.filter(pr => pr.exerciseId !== exerciseId),
              bestNew,
            ]
          }));
        }
        return newPRs;
      },

      isProgressionReady: (sets, maxReps) => {
        if (!sets.length) return false;
        return sets.filter(s => s.completed).every(s => s.reps >= maxReps);
      },

      getCompletedDates: () => {
        return [...new Set(get().workoutLogs.filter(l => l.completed).map(l => l.date))];
      },

      getWeeklyCount: () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
        startOfWeek.setHours(0, 0, 0, 0);
        const startStr = startOfWeek.toISOString().split('T')[0];
        return get().workoutLogs.filter(l => l.completed && l.date >= startStr).length;
      },

      getCurrentStreak: () => {
        const dates = get().getCompletedDates().sort().reverse();
        if (dates.length === 0) return 0;
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 60; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          const dayOfWeek = checkDate.getDay();
          if (dayOfWeek === 0) continue; // Skip Sundays
          const dateStr = checkDate.toISOString().split('T')[0];
          if (dates.includes(dateStr)) {
            streak++;
          } else if (i > 0) {
            break;
          }
        }
        return streak;
      },
    }),
    { name: 'ironforge-history' }
  )
);
