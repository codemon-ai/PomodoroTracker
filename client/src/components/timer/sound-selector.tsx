import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Volume2 } from "lucide-react";
import { SOUND_NAMES, playNotification, type SoundType } from "@/lib/audio";

interface SoundSelectorProps {
  currentSound: SoundType;
  onSoundChange: (sound: SoundType) => void;
}

export function SoundSelector({
  currentSound,
  onSoundChange,
}: SoundSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Volume2 className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">알림음 선택</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.entries(SOUND_NAMES) as [SoundType, string][]).map(
          ([type, name]) => (
            <DropdownMenuItem
              key={type}
              onClick={() => {
                onSoundChange(type);
                playNotification(type);
              }}
            >
              <span className={currentSound === type ? "font-bold" : ""}>
                {name}
              </span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
