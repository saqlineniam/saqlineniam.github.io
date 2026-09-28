import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

// The initial class is set by the inline script in index.html before first paint.
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* storage unavailable */ }
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      className="grid place-items-center w-10 h-10 rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900/[.06] dark:hover:bg-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
