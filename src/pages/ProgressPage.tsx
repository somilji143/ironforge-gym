import React, { useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { useHistoryStore } from '../store/historyStore';
import { ProgressChart } from '../components/ProgressChart';
import { getExercise } from '../data/exercises';
import { Target, Trophy, TrendingUp, Scale } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { settings, updateSetting, addBodyWeight } = useSettingsStore();
  const { personalRecords, workoutLogs } = useHistoryStore();
  const [weightInput, setWeightInput] = useState('');
  const [showWeightModal, setShowWeightModal] = useState(false);

  const bodyWeightData = settings.bodyWeightHistory.map(e => ({
    date: e.date,
    value: e.weight,
  }));

  const goalProgress = settings.currentBodyWeight > 0 && settings.bodyWeightGoal > 0
    ? Math.min(100, Math.max(0, ((settings.currentBodyWeight - 40) / (settings.bodyWeightGoal - 40)) * 100))
    : 0;

  // Calculate total volume per workout
  const volumeData = workoutLogs.slice(-10).map(log => {
    const vol = log.exercises.reduce((t, ex) =>
      t + ex.sets.reduce((st, s) => st + (s.completed ? s.weight * s.reps : 0), 0), 0);
    return { date: log.date, value: vol };
  });

  const handleLogWeight = () => {
    const w = parseFloat(weightInput);
    if (w > 0) {
      const today = new Date().toISOString().split('T')[0];
      updateSetting('currentBodyWeight', w);
      updateSetting('bodyWeightHistory', [
        ...settings.bodyWeightHistory,
        { date: today, weight: w }
      ]);
      setWeightInput('');
      setShowWeightModal(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <header className="pt-14 mb-6">
        <h1 className="text-3xl font-bold text-white">Progress</h1>
        <p className="text-text-secondary text-sm mt-1">Track your gains</p>
      </header>

      {/* Body Weight Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">Body Weight</h2>
          <button
            onClick={() => setShowWeightModal(true)}
            className="text-accent text-sm font-semibold bg-accent/10 px-3 py-1.5 rounded-full"
          >
            + Log Weight
          </button>
        </div>

        {/* Goal Progress */}
        <div className="bg-bg-card border border-border rounded-[14px] p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-muted text-sm">Goal Progress</span>
            <span className="text-white font-bold">
              {settings.currentBodyWeight}
              <span className="text-text-muted font-normal ml-1">/ {settings.bodyWeightGoal} kg</span>
            </span>
          </div>
          <div className="w-full bg-border h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-500 rounded-full" style={{ width: `${goalProgress}%` }} />
          </div>
          <p className="text-text-muted text-xs mt-3">
            Focus on consistent training, nutrition, and recovery.
          </p>
        </div>

        {bodyWeightData.length > 1 && (
          <ProgressChart data={bodyWeightData} label="Weight (kg)" color="#22c55e" />
        )}
      </section>

      {/* Volume Trend */}
      {volumeData.length > 1 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Training Volume</h2>
          <ProgressChart data={volumeData} label="Volume (kg)" color="#6366f1" />
        </section>
      )}

      {/* Personal Records */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">Personal Records</h2>
        {personalRecords.length === 0 ? (
          <div className="bg-bg-card border border-border rounded-[14px] p-6 text-center">
            <Trophy className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-text-secondary text-sm">No records yet. Complete workouts to set PRs!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {personalRecords.map((pr, i) => {
              const ex = getExercise(pr.exerciseId);
              return (
                <div key={i} className="bg-bg-card border border-border rounded-[14px] p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/15 flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{ex.name}</p>
                    <p className="text-sm text-text-secondary">{pr.weight}kg × {pr.reps}</p>
                  </div>
                  <span className="text-xs text-text-muted">{pr.date}</span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Weight Input Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-bg-card border-t border-border w-full max-w-md rounded-t-3xl p-6 space-y-4">
            <div className="w-12 h-1.5 bg-border rounded-full mx-auto" />
            <h3 className="text-lg font-bold text-white">Log Body Weight</h3>
            <input
              type="number"
              inputMode="decimal"
              step="0.1"
              placeholder="e.g. 47.5"
              value={weightInput}
              onChange={e => setWeightInput(e.target.value)}
              className="w-full bg-bg border border-border rounded-xl py-4 px-4 text-white text-lg font-mono focus:outline-none focus:border-accent text-center"
              autoFocus
            />
            <div className="flex gap-3">
              <button onClick={() => setShowWeightModal(false)}
                className="flex-1 py-3 rounded-xl border border-border text-text-secondary font-semibold">
                Cancel
              </button>
              <button onClick={handleLogWeight}
                className="flex-1 py-3 rounded-xl bg-accent text-white font-bold">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
