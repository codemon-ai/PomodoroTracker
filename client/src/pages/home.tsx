import { CircularTimer } from "@/components/timer/circular-timer";
import { TimerControls } from "@/components/timer/timer-controls";
import { TimeInput } from "@/components/timer/time-input";
import { useTimer } from "@/hooks/use-timer";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const timer = useTimer();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Pomodoro Timer
            </h1>
            <p className="text-muted-foreground">
              Stay focused and productive with time management
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <CircularTimer
              progress={timer.progress}
              timeLeft={timer.timeLeft}
              size={300}
            />
            
            <TimerControls
              isRunning={timer.isRunning}
              onStart={timer.start}
              onPause={timer.pause}
              onReset={timer.reset}
            />

            <TimeInput
              minutes={timer.minutes}
              onMinutesChange={timer.setMinutes}
              disabled={timer.isRunning}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
