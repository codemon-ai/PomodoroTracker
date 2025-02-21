import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInputProps {
  minutes: number;
  onMinutesChange: (minutes: number) => void;
  disabled?: boolean;
}

export function TimeInput({
  minutes,
  onMinutesChange,
  disabled,
}: TimeInputProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Label htmlFor="minutes">Minutes</Label>
      <Input
        id="minutes"
        type="number"
        min={1}
        max={60}
        value={minutes}
        onChange={(e) => onMinutesChange(parseInt(e.target.value) || 1)}
        disabled={disabled}
        className="w-32 text-center"
      />
    </div>
  );
}
