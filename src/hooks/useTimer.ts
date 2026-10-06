import { useState, useEffect, useRef, useCallback } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export const useTimer = (initialSeconds: number, onComplete?: () => void) => {
  const [remaining, setRemaining] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number>();
  const expectedEndTimeRef = useRef<number>(0);
  
  const { settings } = useSettingsStore();

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.error('Audio playback failed', e);
    }
  };

  const handleComplete = useCallback(() => {
    setIsActive(false);
    setRemaining(0);
    
    if (settings.restTimerVibrate && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    
    if (settings.restTimerSound) {
      playSound();
    }
    
    if (onComplete) onComplete();
  }, [settings.restTimerVibrate, settings.restTimerSound, onComplete]);

  const tick = useCallback(() => {
    if (!isActive) return;
    
    const now = Date.now();
    const timeLeft = Math.ceil((expectedEndTimeRef.current - now) / 1000);
    
    if (timeLeft <= 0) {
      handleComplete();
    } else {
      setRemaining(timeLeft);
      requestRef.current = requestAnimationFrame(tick);
    }
  }, [isActive, handleComplete]);

  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, tick]);

  const start = useCallback(() => {
    expectedEndTimeRef.current = Date.now() + remaining * 1000;
    setIsActive(true);
  }, [remaining]);

  const pause = useCallback(() => {
    setIsActive(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, []);

  const resume = useCallback(() => {
    start();
  }, [start]);

  const reset = useCallback(() => {
    setIsActive(false);
    setRemaining(initialSeconds);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
  }, [initialSeconds]);

  const addTime = useCallback((seconds: number) => {
    setRemaining((prev) => prev + seconds);
    expectedEndTimeRef.current += seconds * 1000;
  }, []);

  const skip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  return { remaining, isActive, start, pause, resume, reset, addTime, skip };
};
