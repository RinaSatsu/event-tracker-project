'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NightDayFull from "/public/night-day-full.svg";
import NightDay from "/public/night-day.svg";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleThemeSwitch = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <button onClick={handleThemeSwitch}>
      {theme === 'dark' ? <NightDayFull /> : <NightDay />}
    </button>
  );
}