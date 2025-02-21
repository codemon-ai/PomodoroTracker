import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div className="flex gap-4">
      <Button
        size="lg"
        onClick={isRunning ? onPause : onStart}
        className="w-32"
      >
        {isRunning ? (
          <>
            <Pause className="mr-2 h-5 w-5" />
            Pause
          </>
        ) : (
          <>
            <Play className="mr-2 h-5 w-5" />
            Start
          </>
        )}
      </Button>

      <Button
        size="lg"
        variant="outline"
        onClick={onReset}
      >
        <RotateCcw className="h-5 w-5" />
      </Button>
    </div>
  );
}
