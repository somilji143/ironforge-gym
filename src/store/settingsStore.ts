import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings } from '../types';
import { exportAllData, importAllData } from '../utils/storage';

interface SettingsStore {
  settings: UserSettings;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  addBodyWeight: (weight: number) => void;
  toggleBeginnerMode: () => void;
  isBeginnerPeriod: () => boolean;
  resetProgram: () => void;
  exportData: () => string;
  importData: (jsonString: string) => void;
}

const defaultSettings: UserSettings = {
  beginnerMode: true,
  bodyWeightGoal: 52,
  currentBodyWeight: 47,
  bodyWeightHistory: [],
  theme: 'dark',
  restTimerSound: true,
  restTimerVibrate: true,
  unitSystem: 'metric',
  beginnerStartDate: new Date().toISOString()
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,

      updateSetting: (key, value) => {
        set((state) => ({
          settings: { ...state.settings, [key]: value }
        }));
      },

      addBodyWeight: (weight) => {
        set((state) => ({
          settings: { ...state.settings, currentBodyWeight: weight }
        }));
      },

      toggleBeginnerMode: () => {
        set((state) => ({
          settings: { ...state.settings, beginnerMode: !state.settings.beginnerMode }
        }));
      },

      isBeginnerPeriod: () => {
        const { settings } = get();
        if (!settings.beginnerStartDate) return false;
        const startDate = new Date(settings.beginnerStartDate).getTime();
        const now = new Date().getTime();
        const twoWeeks = 14 * 24 * 60 * 60 * 1000;
        return now - startDate <= twoWeeks;
      },

      resetProgram: () => {
        set({ settings: { ...defaultSettings, beginnerStartDate: new Date().toISOString() } });
      },

      exportData: () => {
        return exportAllData();
      },

      importData: (jsonString) => {
        importAllData(jsonString);
      }
    }),
    {
      name: 'ironforge-settings'
    }
  )
);
