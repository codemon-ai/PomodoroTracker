import { useState, useEffect, useCallback, useRef } from "react";
import { playNotification } from "@/lib/audio";
import { useToast } from "@/hooks/use-toast";

export function useTimer(initialMinutes = 25) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number>();
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

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          cleanup();
          setIsRunning(false);
          playNotification();
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
  }, [isRunning, cleanup, toast]);

  const start = useCallback(() => {
    if (secondsLeft === 0) {
      setSecondsLeft(minutes * 60);
    }
    setIsRunning(true);
  }, [minutes, secondsLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    cleanup();
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
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
    start,
    pause,
    reset,
    setMinutes: updateMinutes,
  };
}
