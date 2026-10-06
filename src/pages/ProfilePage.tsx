import React, { useState, useRef } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { Download, Upload, Trash2, Info, RotateCcw, Bell, Smartphone } from 'lucide-react';
import { exportAllData, importAllData, clearAllData } from '../utils/storage';

export const ProfilePage: React.FC = () => {
  const { settings, updateSetting, toggleBeginnerMode, isBeginnerPeriod, resetProgram } = useSettingsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [bodyWeightInput, setBodyWeightInput] = useState(String(settings.currentBodyWeight));
  const [goalWeightInput, setGoalWeightInput] = useState(String(settings.bodyWeightGoal));

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ironforge-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      importAllData(reader.result as string);
      window.location.reload();
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    clearAllData();
    resetProgram();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <header className="pt-14 mb-6">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </header>

      {/* Beginner Mode */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">Training</h2>
        <div className="bg-bg-card border border-border rounded-[14px] overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1 mr-4">
              <p className="text-white font-semibold">Beginner Mode</p>
              <p className="text-xs text-text-muted mt-1">
                2 working sets per exercise. Focus on technique.
                {isBeginnerPeriod() && ' You are in your adaptation phase.'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.beginnerMode}
                onChange={toggleBeginnerMode} />
              <div className="w-11 h-6 bg-bg-elevated rounded-full peer peer-checked:after:translate-x-full
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
            </label>
          </div>
        </div>
      </section>

      {/* Body Weight */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">Body Weight</h2>
        <div className="bg-bg-card border border-border rounded-[14px] p-4 space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary w-24">Current</label>
            <input
              type="number" inputMode="decimal" step="0.1"
              value={bodyWeightInput}
              onChange={e => setBodyWeightInput(e.target.value)}
              onBlur={() => updateSetting('currentBodyWeight', parseFloat(bodyWeightInput) || 0)}
              className="flex-1 bg-bg border border-border rounded-lg py-2 px-3 text-white font-mono text-center focus:outline-none focus:border-accent"
            />
            <span className="text-text-muted text-sm">kg</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary w-24">Goal</label>
            <input
              type="number" inputMode="decimal" step="0.1"
              value={goalWeightInput}
              onChange={e => setGoalWeightInput(e.target.value)}
              onBlur={() => updateSetting('bodyWeightGoal', parseFloat(goalWeightInput) || 0)}
              className="flex-1 bg-bg border border-border rounded-lg py-2 px-3 text-white font-mono text-center focus:outline-none focus:border-accent"
            />
            <span className="text-text-muted text-sm">kg</span>
          </div>
        </div>
      </section>

      {/* Timer Settings */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">Rest Timer</h2>
        <div className="bg-bg-card border border-border rounded-[14px] overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-text-muted" />
              <span className="text-white font-medium">Sound</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.restTimerSound}
                onChange={() => updateSetting('restTimerSound', !settings.restTimerSound)} />
              <div className="w-11 h-6 bg-bg-elevated rounded-full peer peer-checked:after:translate-x-full
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
            </label>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-text-muted" />
              <span className="text-white font-medium">Vibrate</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.restTimerVibrate}
                onChange={() => updateSetting('restTimerVibrate', !settings.restTimerVibrate)} />
              <div className="w-11 h-6 bg-bg-elevated rounded-full peer peer-checked:after:translate-x-full
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
            </label>
          </div>
        </div>
      </section>

      {/* Data Management */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-text-muted">Data</h2>
        <div className="bg-bg-card border border-border rounded-[14px] overflow-hidden">
          <button onClick={handleExport}
            className="w-full p-4 flex items-center gap-3 hover:bg-bg-elevated transition-colors text-left border-b border-border">
            <Download className="w-5 h-5 text-accent" />
            <span className="text-white font-medium">Export Data (JSON)</span>
          </button>
          <button onClick={() => fileInputRef.current?.click()}
            className="w-full p-4 flex items-center gap-3 hover:bg-bg-elevated transition-colors text-left border-b border-border">
            <Upload className="w-5 h-5 text-accent" />
            <span className="text-white font-medium">Import Data</span>
          </button>
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
          <button onClick={() => setShowResetConfirm(true)}
            className="w-full p-4 flex items-center gap-3 hover:bg-bg-elevated transition-colors text-left">
            <Trash2 className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-medium">Reset All Data</span>
          </button>
        </div>
      </section>

      {/* Apple Health */}
      <div className="bg-bg-card border border-border rounded-[14px] p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
        <p className="text-sm text-text-secondary">
          Apple Health integration requires a native iOS companion app. This web app stores all data locally on your device.
        </p>
      </div>

      <div className="text-center pb-8 pt-2 text-text-muted text-xs">
        <p>IronForge v1.0.0</p>
      </div>

      {/* Reset Confirmation */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-bg-card border border-border rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Reset All Data?</h3>
            <p className="text-text-secondary text-sm">This will permanently delete all workout history, records, and settings.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-border text-text-secondary font-semibold">
                Cancel
              </button>
              <button onClick={handleReset}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold">
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
