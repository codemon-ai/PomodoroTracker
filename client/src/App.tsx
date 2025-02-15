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

function App() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>("pink");

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', COLOR_THEMES[colorTheme].color);
  }, [colorTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
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

const COLOR_THEMES = {
  pink: { name: "🎀 핑크", color: "#FF4081" },
  blue: { name: "💙 블루", color: "#2196F3" },
  green: { name: "💚 그린", color: "#4CAF50" },
  purple: { name: "💜 퍼플", color: "#9C27B0" },
};

export default App;