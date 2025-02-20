import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { ColorThemeSelector, type ColorTheme } from "@/components/color-theme-selector";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useEffect, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

const COLOR_THEMES = {
  pink: { name: "🎀 핑크", hsl: "339 90% 63%" },
  blue: { name: "💙 블루", hsl: "207 90% 54%" },
  green: { name: "💚 그린", hsl: "122 39% 49%" },
  purple: { name: "💜 퍼플", hsl: "291 72% 42%" },
};

function App() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => 
    (localStorage.getItem("colorTheme") as ColorTheme) || "pink"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', COLOR_THEMES[colorTheme].hsl);
    localStorage.setItem("colorTheme", colorTheme);
  }, [colorTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <div className="min-h-screen bg-background text-foreground">
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <ColorThemeSelector
              currentTheme={colorTheme}
              onThemeChange={setColorTheme}
            />
            <ThemeToggle />
          </div>
          <Router />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;