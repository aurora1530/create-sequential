'use client';
import { useState } from 'react';

type Theme = 'system' | 'light' | 'dark';

export default function ThemeSwitcher() {
  // LocalStorage に保存されている値を初期値として設定する
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.theme || 'system';
    }
    return 'system';
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Theme;
    setTheme(value);
    localStorage.setItem('theme', value);
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (value === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System が選択された場合は OS の設定を見て切り替える
      document.documentElement.classList.toggle(
        'dark',
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
  };

  return (
    <select value={theme} onChange={handleChange}>
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
