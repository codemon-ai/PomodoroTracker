import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

const COLOR_THEMES = {
  pink: { name: "🎀 핑크", color: "#FF4081" },
  blue: { name: "💙 블루", color: "#2196F3" },
  green: { name: "💚 그린", color: "#4CAF50" },
  purple: { name: "💜 퍼플", color: "#9C27B0" },
};

type ColorTheme = keyof typeof COLOR_THEMES;

interface ColorThemeSelectorProps {
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

export function ColorThemeSelector({
  currentTheme,
  onThemeChange,
}: ColorThemeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          style={{
            color: COLOR_THEMES[currentTheme].color,
          }}
        >
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">컬러 테마 선택</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.entries(COLOR_THEMES) as [ColorTheme, typeof COLOR_THEMES[ColorTheme]][]).map(
          ([theme, { name, color }]) => (
            <DropdownMenuItem
              key={theme}
              onClick={() => onThemeChange(theme)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className={currentTheme === theme ? "font-bold" : ""}>
                  {name}
                </span>
              </div>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type { ColorTheme };
