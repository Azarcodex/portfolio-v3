import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        try {
            return localStorage.getItem('theme') || 'dark';
        } catch (e) {
            return 'dark';
        }
    });

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        try {
            localStorage.setItem('theme', nextTheme);
        } catch (e) {
            console.error('Failed to save theme to localStorage:', e);
        }
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return [theme, toggleTheme];
};
