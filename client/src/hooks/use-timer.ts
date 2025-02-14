import { useState, useEffect, useCallback, useRef } from "react";
import { playNotification, type SoundType } from "@/lib/audio";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export function useTimer(initialMinutes = 25) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [soundType, setSoundType] = useState<SoundType>('bell');
  const intervalRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const completeSession = useCallback(async () => {
    if (currentSessionId) {
      try {
        await apiRequest(
          'POST',
          `/api/pomodoro-sessions/${currentSessionId}/complete`
        );
      } catch (error) {
        console.error('Failed to complete session:', error);
      }
    }
  }, [currentSessionId]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          cleanup();
          setIsRunning(false);
          playNotification(soundType);
          completeSession();
          toast({
            title: "Time's up!",
            description: "Your pomodoro session has ended.",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return cleanup;
  }, [isRunning, cleanup, toast, completeSession, soundType]);

  const start = useCallback(async () => {
    try {
      const res = await apiRequest('POST', '/api/pomodoro-sessions', {
        minutes,
        startedAt: new Date().toISOString(),
      });
      const session = await res.json();
      setCurrentSessionId(session.id);

      if (secondsLeft === 0) {
        setSecondsLeft(minutes * 60);
      }
      setIsRunning(true);
    } catch (error) {
      console.error('Failed to start session:', error);
      toast({
        title: "Error",
        description: "Failed to start timer session",
        variant: "destructive",
      });
    }
  }, [minutes, secondsLeft, toast]);

  const pause = useCallback(async () => {
    setIsRunning(false);
    if (currentSessionId) {
      try {
        await completeSession();
        setCurrentSessionId(null);
      } catch (error) {
        console.error('Failed to pause session:', error);
      }
    }
  }, [currentSessionId, completeSession]);

  const reset = useCallback(() => {
    cleanup();
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
    setCurrentSessionId(null);
  }, [minutes, cleanup]);

  const updateMinutes = useCallback((newMinutes: number) => {
    setMinutes(newMinutes);
    setSecondsLeft(newMinutes * 60);
  }, []);

  const minutesLeft = Math.floor(secondsLeft / 60);
  const displaySeconds = secondsLeft % 60;
  const timeLeft = `${minutesLeft}:${displaySeconds.toString().padStart(2, '0')}`;
  const progress = secondsLeft / (minutes * 60);

  return {
    timeLeft,
    progress,
    isRunning,
    minutes,
    soundType,
    start,
    pause,
    reset,
    setMinutes: updateMinutes,
    setSoundType,
  };
}