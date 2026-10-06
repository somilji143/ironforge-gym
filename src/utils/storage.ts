export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return defaultValue;
  }
};

export const exportAllData = (): string => {
  const data: Record<string, string | null> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('ironforge-')) {
      data[key] = localStorage.getItem(key);
    }
  }
  return JSON.stringify(data, null, 2);
};

export const importAllData = (jsonString: string): void => {
  try {
    const data = JSON.parse(jsonString);
    Object.keys(data).forEach(key => {
      if (data[key] !== null) {
        localStorage.setItem(key, data[key]);
      }
    });
  } catch (error) {
    console.error('Error importing data', error);
  }
};

export const clearAllData = (): void => {
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('ironforge-')) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key));
};
