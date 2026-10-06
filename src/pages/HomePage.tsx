import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/settingsStore';
import { useHistoryStore } from '../store/historyStore';
import { useWorkoutStore } from '../store/workoutStore';
import { useToday } from '../hooks/useToday';
import { weekProgram, dayNames, dayAbbrev } from '../data/workouts';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { Dumbbell, Flame, Trophy, Activity, Play, Clock, ChevronRight, Moon } from 'lucide-react';
import { format } from 'date-fns';

export default function HomePage() {
  const navigate = useNavigate();
  const { settings } = useSettingsStore();
  const historyStore = useHistoryStore();
  const workoutStore = useWorkoutStore();
  const { today, dayIndex, dayName, workout, greeting } = useToday();

  const workoutsThisWeek = historyStore.getWeeklyCount();
  const streak = historyStore.getCurrentStreak();
  const completedDates = historyStore.getCompletedDates();
  const isSunday = dayIndex === 6;

  const handleStartWorkout = () => {
    if (workout && !workoutStore.activeWorkout) {
      workoutStore.startWorkout(workout, settings.beginnerMode);
    }
    navigate('/workout');
  };

  const estimatedTime = workout
    ? Math.round(workout.exercises.reduce((t, e) => t + e.sets * (40 + e.restSeconds), 0) / 60)
    : 0;

  return (
    <div className="min-h-screen pb-24 px-4">
      {/* Greeting */}
      <div className="pt-14 pb-6">
        <p className="text-text-muted text-sm font-medium uppercase tracking-wider">{greeting}</p>
        <h1 className="text-3xl font-bold text-white mt-1">
          {format(today, 'EEEE, MMMM d')}
        </h1>
      </div>

      {/* Beginner Banner */}
      {settings.beginnerMode && (
        <div className="bg-accent/10 border border-accent/20 rounded-[14px] p-4 mb-6">
          <p className="text-accent-light font-semibold text-sm">Beginner Mode Active</p>
          <p className="text-text-secondary text-xs mt-1">
            Focus on technique — not heavy weights. 2 working sets per exercise.
          </p>
        </div>
      )}

      {/* Today's Workout Card */}
      {isSunday ? (
        <div className="bg-bg-card border border-border rounded-[14px] p-6 mb-6 text-center">
          <Moon className="w-12 h-12 text-accent mx-auto mb-3 opacity-60" />
          <h2 className="text-2xl font-bold text-white">Recovery Day</h2>
          <p className="text-text-secondary mt-2 text-sm">Rest, stretch, eat well, hydrate, sleep.</p>
          <div className="grid grid-cols-2 gap-3 mt-5 text-left">
            {['Light walking', 'Stretching', 'Good nutrition', 'Quality sleep'].map(tip => (
              <div key={tip} className="flex items-center gap-2 text-text-muted text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {tip}
              </div>
            ))}
          </div>
        </div>
      ) : workout ? (
        <div className="bg-bg-card border border-border rounded-[14px] p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{workout.name}</h2>
              <p className="text-text-secondary text-sm mt-1">{workout.label}</p>
            </div>
            <div className="bg-accent/10 rounded-xl px-3 py-1.5">
              <span className="text-accent text-xs font-bold">{dayAbbrev[dayIndex]}</span>
            </div>
          </div>

          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Dumbbell className="w-4 h-4" />
              <span>{workout.exercises.length} exercises</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <Clock className="w-4 h-4" />
              <span>~{estimatedTime} min</span>
            </div>
          </div>

          <button
            onClick={handleStartWorkout}
            className="w-full bg-accent hover:bg-accent-dark text-white font-bold text-lg py-4 rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-white" />
            {workoutStore.activeWorkout ? 'Resume Workout' : 'Start Workout'}
          </button>
        </div>
      ) : null}

      {/* Weekly Calendar */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">This Week</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {weekProgram.days.map((day, i) => {
            const isToday = i === dayIndex;
            const isCompleted = completedDates.some(d => {
              const date = new Date(d);
              return (date.getDay() + 6) % 7 === i;
            });
            return (
              <div
                key={i}
                className={`flex-shrink-0 w-[72px] rounded-xl p-3 text-center border transition-colors ${
                  isToday
                    ? 'bg-accent/10 border-accent/30'
                    : 'bg-bg-card border-border'
                }`}
              >
                <div className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-accent' : 'text-text-muted'}`}>
                  {dayAbbrev[i]}
                </div>
                <div className={`text-xs font-semibold mt-1 ${isToday ? 'text-white' : 'text-text-secondary'}`}>
                  {day ? day.name : 'Rest'}
                </div>
                {isCompleted && (
                  <div className="mt-1.5 text-green-400 text-[10px] font-bold">✓</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Stats</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-bg-card border border-border rounded-[14px] p-4">
          <Flame className="w-5 h-5 text-orange-400 mb-2" />
          <div className="text-2xl font-bold">{streak}</div>
          <div className="text-text-muted text-xs">Day Streak</div>
        </div>
        <div className="bg-bg-card border border-border rounded-[14px] p-4">
          <Activity className="w-5 h-5 text-accent mb-2" />
          <div className="text-2xl font-bold">{workoutsThisWeek}</div>
          <div className="text-text-muted text-xs">This Week</div>
        </div>
        <div className="bg-bg-card border border-border rounded-[14px] p-4">
          <Dumbbell className="w-5 h-5 text-text-secondary mb-2" />
          <div className="text-2xl font-bold">{settings.currentBodyWeight}<span className="text-sm text-text-muted ml-1">kg</span></div>
          <div className="text-text-muted text-xs">Body Weight</div>
        </div>
        <div className="bg-bg-card border border-border rounded-[14px] p-4 cursor-pointer" onClick={() => navigate('/progress')}>
          <Trophy className="w-5 h-5 text-yellow-400 mb-2" />
          <div className="text-2xl font-bold">{historyStore.personalRecords.length}</div>
          <div className="text-text-muted text-xs">Personal Records</div>
        </div>
      </div>

      {/* Form Safety */}
      <div className="bg-bg-card border border-border rounded-[14px] p-4 mb-6">
        <p className="text-text-secondary text-xs">
          💡 Technique first. Stop if you experience sharp pain. If unsure, ask a trainer to check your form.
        </p>
      </div>
    </div>
  );
}
