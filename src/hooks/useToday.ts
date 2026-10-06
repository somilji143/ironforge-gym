import { useState, useEffect, useMemo } from 'react';
import { getTodayWorkout, getTodayIndex, dayNames } from '../data/workouts';
import { WorkoutDay } from '../types';

export const useToday = () => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== today.getDate()) {
        setToday(now);
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [today]);

  const dayIndex = getTodayIndex();
  const dayName = dayNames[dayIndex];

  const workout: WorkoutDay | null = useMemo(() => {
    return getTodayWorkout();
  }, [today]);

  const greeting = useMemo(() => {
    const hour = today.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }, [today]);

  return { today, dayIndex, dayName, workout, greeting };
};
