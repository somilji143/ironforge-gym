import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../store/workoutStore';
import { useHistoryStore } from '../store/historyStore';
import { ExerciseAnimation } from '../components/animations/ExerciseAnimation';
import { getExercise } from '../data/exercises';
import { weekProgram } from '../data/workouts';
import { formatTime, formatDuration, totalVolume, generateWorkoutId } from '../utils/calculations';
import { WorkoutSummary } from '../components/WorkoutSummary';
import { Check, X, ChevronLeft, ChevronRight, Clock, MessageSquare, Plus, Minus, SkipForward } from 'lucide-react';
import { WorkoutLog, ExerciseLog, SetLog } from '../types';

export default function WorkoutPage() {
  const navigate = useNavigate();
  const store = useWorkoutStore();
  const historyStore = useHistoryStore();
  const { activeWorkout, restTimer } = store;

  const [elapsed, setElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Elapsed time tracker
  useEffect(() => {
    if (!activeWorkout) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - activeWorkout.startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [activeWorkout?.startTime]);

  // Rest timer countdown
  useEffect(() => {
    if (!restTimer.active || restTimer.remaining <= 0) return;
    const interval = setInterval(() => {
      store.updateRestTimer(restTimer.remaining - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [restTimer.active, restTimer.remaining]);

  // Redirect if no active workout and not showing summary
  useEffect(() => {
    if (!activeWorkout && !isFinished) {
      navigate('/');
    }
  }, [activeWorkout, isFinished, navigate]);

  if (isFinished) {
    // Calculate summary from the last workout
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-sm">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold">Workout Complete</h1>
          <p className="text-text-secondary">
            Great work. Recover, eat well, and come back stronger.
          </p>
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="bg-bg-card border border-border rounded-[14px] p-4">
              <div className="text-text-muted text-xs">Duration</div>
              <div className="text-xl font-bold">{formatDuration(elapsed)}</div>
            </div>
            <div className="bg-bg-card border border-border rounded-[14px] p-4">
              <div className="text-text-muted text-xs">Exercises</div>
              <div className="text-xl font-bold">{activeWorkout?.exercises.length ?? 0}</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-accent text-white font-bold py-4 rounded-xl mt-4"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  if (!activeWorkout) return null;

  const exerciseIdx = activeWorkout.currentExerciseIndex;
  const currentEx = activeWorkout.exercises[exerciseIdx];
  const exerciseDef = getExercise(currentEx.exerciseId);
  const workoutDay = weekProgram.days.find(d => d?.id === activeWorkout.workoutDayId);
  const workoutExDef = workoutDay?.exercises[exerciseIdx];
  const restDuration = workoutExDef?.restSeconds ?? 90;
  const progress = ((exerciseIdx + 1) / activeWorkout.exercises.length) * 100;

  // Get previous workout data for this exercise
  const lastWorkout = historyStore.getLastWorkout(activeWorkout.workoutDayId);
  const lastExerciseSets = lastWorkout?.exercises.find(
    e => e.exerciseId === currentEx.exerciseId
  )?.sets;

  const handleCompleteSet = (setIdx: number) => {
    const s = currentEx.sets[setIdx];
    if (s.completed) return;
    store.completeSet(exerciseIdx, setIdx, s.weight, s.reps, restDuration);
  };

  const handleFinish = () => {
    // Build workout log
    const log: WorkoutLog = {
      id: generateWorkoutId(),
      workoutDayId: activeWorkout.workoutDayId,
      date: new Date().toISOString().split('T')[0],
      startTime: activeWorkout.startTime,
      endTime: Date.now(),
      completed: true,
      exercises: activeWorkout.exercises.map(ex => ({
        exerciseId: ex.exerciseId,
        sets: ex.sets.filter(s => s.completed).map(s => ({
          weight: s.weight,
          reps: s.reps,
          completed: true,
        })),
        notes: ex.notes,
      })),
    };
    historyStore.saveWorkout(log);

    // Check PRs
    log.exercises.forEach(ex => {
      historyStore.checkAndUpdatePRs(ex.exerciseId, ex.sets, log.date);
    });

    setIsFinished(true);
    store.finishWorkout();
  };

  const allSetsComplete = currentEx.sets.every(s => s.completed);
  const isLastExercise = exerciseIdx === activeWorkout.exercises.length - 1;

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div>
          <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
            {workoutDay?.name ?? 'Workout'}
          </p>
          <p className="font-mono text-lg font-bold text-white">{formatTime(elapsed)}</p>
        </div>
        <button
          onClick={handleFinish}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors"
        >
          FINISH
        </button>
      </div>

      {/* Progress + Nav */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <button onClick={() => store.prevExercise()} disabled={exerciseIdx === 0}
            className="p-2 rounded-full hover:bg-bg-elevated disabled:opacity-20 text-text-secondary">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-text-muted">
            Exercise {exerciseIdx + 1} of {activeWorkout.exercises.length}
          </span>
          <button onClick={() => store.nextExercise()} disabled={exerciseIdx === activeWorkout.exercises.length - 1}
            className="p-2 rounded-full hover:bg-bg-elevated disabled:opacity-20 text-text-secondary">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full bg-border h-1 rounded-full overflow-hidden">
          <div className="bg-accent h-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-32 space-y-4">
        {/* Animation + Name */}
        <div className="flex items-center gap-4 mt-2">
          <div className="w-20 h-20 bg-bg-elevated rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
            <ExerciseAnimation exerciseId={currentEx.exerciseId} size={64} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{exerciseDef.name}</h2>
            <span className="inline-block mt-1 text-[10px] px-2 py-1 bg-accent/15 text-accent-light rounded-full uppercase tracking-wider font-bold">
              {exerciseDef.muscleGroup}
            </span>
          </div>
        </div>

        {/* Sets Table */}
        <div className="bg-bg-card rounded-2xl border border-border overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[2.5rem_1fr_4.5rem_4rem_2.5rem] gap-1 px-3 py-2.5 border-b border-border text-[10px] font-bold text-text-muted uppercase tracking-wider text-center">
            <div>Set</div>
            <div className="text-left pl-1">Previous</div>
            <div>kg</div>
            <div>Reps</div>
            <div></div>
          </div>

          {/* Sets */}
          {currentEx.sets.map((set, idx) => {
            const prev = lastExerciseSets?.[idx];
            return (
              <div key={idx}
                className={`grid grid-cols-[2.5rem_1fr_4.5rem_4rem_2.5rem] gap-1 px-3 py-2.5 items-center text-center border-b border-border/50 last:border-0 ${
                  set.completed ? 'bg-green-500/5' : ''
                }`}
              >
                <div className={`text-sm font-bold ${set.completed ? 'text-green-400' : 'text-text-muted'}`}>
                  {idx + 1}
                </div>
                <div className="text-left text-xs text-text-muted pl-1 truncate">
                  {prev ? `${prev.weight}×${prev.reps}` : '—'}
                </div>

                {set.completed ? (
                  <>
                    <div className="font-mono text-sm text-white">{set.weight}</div>
                    <div className="font-mono text-sm text-white">{set.reps}</div>
                    <div className="flex justify-center text-green-400">
                      <Check className="w-4 h-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      inputMode="decimal"
                      className="w-full bg-bg border border-border rounded-lg py-2 text-center font-mono text-sm text-white focus:border-accent focus:outline-none"
                      placeholder={prev ? String(prev.weight) : '0'}
                      value={set.weight || ''}
                      onChange={e => store.updateSetWeight(exerciseIdx, idx, parseFloat(e.target.value) || 0)}
                    />
                    <input
                      inputMode="numeric"
                      className="w-full bg-bg border border-border rounded-lg py-2 text-center font-mono text-sm text-white focus:border-accent focus:outline-none"
                      placeholder={workoutExDef ? `${workoutExDef.minReps}` : '0'}
                      value={set.reps || ''}
                      onChange={e => store.updateSetReps(exerciseIdx, idx, parseInt(e.target.value) || 0)}
                    />
                    <button
                      onClick={() => handleCompleteSet(idx)}
                      className="w-9 h-9 rounded-lg bg-bg-elevated hover:bg-green-500/20 hover:text-green-400 text-text-muted flex items-center justify-center transition-colors mx-auto"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Notes */}
        <div className="bg-bg-card rounded-xl border border-border p-3 flex gap-3">
          <MessageSquare className="w-4 h-4 text-text-muted shrink-0 mt-1" />
          <textarea
            placeholder="Add notes (e.g. seat level 4, left shoulder tight)..."
            className="w-full bg-transparent resize-none focus:outline-none text-sm text-white placeholder-text-muted min-h-[40px]"
            value={currentEx.notes}
            onChange={e => store.addNote(exerciseIdx, e.target.value)}
          />
        </div>

        {/* Next Exercise / Finish */}
        {allSetsComplete && (
          <button
            onClick={isLastExercise ? handleFinish : () => store.nextExercise()}
            className="w-full bg-accent text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2"
          >
            {isLastExercise ? 'Finish Workout' : 'Next Exercise →'}
          </button>
        )}
      </div>

      {/* Rest Timer Overlay */}
      {restTimer.active && restTimer.remaining > 0 && (
        <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-lg flex flex-col items-center justify-center">
          <p className="text-text-muted text-sm font-semibold uppercase tracking-wider mb-2">Rest</p>
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#2a2a35" strokeWidth="6" />
              <circle cx="60" cy="60" r="54" fill="none" stroke="#6366f1" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - restTimer.remaining / restTimer.total)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-mono font-bold text-white">{formatTime(restTimer.remaining)}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => store.updateRestTimer(restTimer.remaining + 15)}
              className="bg-bg-card border border-border px-5 py-3 rounded-xl text-sm font-semibold">
              +15s
            </button>
            <button onClick={() => store.skipRestTimer()}
              className="bg-accent px-8 py-3 rounded-xl text-sm font-bold">
              Skip
            </button>
            <button onClick={() => store.updateRestTimer(Math.max(0, restTimer.remaining - 15))}
              className="bg-bg-card border border-border px-5 py-3 rounded-xl text-sm font-semibold">
              -15s
            </button>
          </div>
          <p className="text-text-muted text-xs mt-6">
            Next: {exerciseIdx < activeWorkout.exercises.length - 1
              ? getExercise(activeWorkout.exercises[exerciseIdx + 1].exerciseId).name
              : 'Last exercise!'}
          </p>
        </div>
      )}
    </div>
  );
}
