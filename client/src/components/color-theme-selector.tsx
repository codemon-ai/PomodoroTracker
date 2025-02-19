import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";

const COLOR_THEMES = {
  pink: { name: "🎀 핑크", hsl: "339 90% 63%" },
  blue: { name: "💙 블루", hsl: "207 90% 54%" },
  green: { name: "💚 그린", hsl: "122 39% 49%" },
  purple: { name: "💜 퍼플", hsl: "291 72% 42%" },
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
            color: `hsl(${COLOR_THEMES[currentTheme].hsl})`,
          }}
        >
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">컬러 테마 선택</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.entries(COLOR_THEMES) as [ColorTheme, typeof COLOR_THEMES[ColorTheme]][]).map(
          ([theme, { name, hsl }]) => (
            <DropdownMenuItem
              key={theme}
              onClick={() => onThemeChange(theme)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: `hsl(${hsl})` }}
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