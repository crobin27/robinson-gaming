"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sun02Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  // Lazy initializer reads localStorage once on mount (client-only island).
  // Defaults to dark — matches the BaseLayout inline script behavior.
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <HugeiconsIcon
              icon={isDark ? Moon02Icon : Sun02Icon}
              size={18}
              color="currentColor"
              strokeWidth={1.5}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDark ? "Light mode" : "Dark mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
