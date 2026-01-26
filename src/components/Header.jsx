import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';
import profileImg from '../assets/profileAzar.JPG';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, toggleTheme] = useDarkMode();

    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Simple Scroll Spy logic
            const sections = navLinks.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 100; // Offset for better precision

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                    }
                }
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Work', href: '#work' },
        { name: 'Education', href: '#education' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`fixed w-full z-[100] transition-all duration-500 ${scrolled
                ? 'h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-700/50'
                : 'h-24 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full">
                <div className="flex items-center justify-between h-full">

                    {/* Brand/Logo Section */}
                    <div className="flex-shrink-0">
                        <motion.a
                            href="#"
                            className="flex items-center gap-4 group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="relative">
                                {/* Decorative Glow Background */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

                                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-xl transition-transform duration-500 group-hover:rotate-3">
                                    <img
                                        src={profileImg}
                                        alt="Mohammed Azarin"
                                        className="w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <span className="block text-lg font-bold text-slate-900 dark:text-white leading-none">Azarin</span>
                                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Developer</span>
                            </div>
                        </motion.a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:block">
                        <ul className="flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className={`relative px-4 py-2 text-sm font-semibold transition-colors group ${isActive
                                                ? 'text-indigo-600 dark:text-indigo-400'
                                                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                                                }`}
                                        >
                                            {link.name}
                                            {/* Animated Underline */}
                                            <span className={`absolute inset-x-4 bottom-0 h-0.5 bg-indigo-600 transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                                } origin-left`} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Right side Actions */}
                    <div className="flex items-center gap-3 md:gap-6">
                        {/* Theme Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-indigo-500/50 transition-all cursor-pointer"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </motion.button>

                        {/* Socials - Desktop Only */}
                        <div className="hidden md:flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6">
                            {[
                                { icon: <Github size={20} />, url: "https://github.com/Azarcodex" },
                                { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/mohammed-azarin-v-p-0571bb239" },
                                { icon: <Mail size={20} />, url: "mailto:vpazar2799@gmail.com" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-4">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <a
                                        href={link.href}
                                        onClick={() => {
                                            // Delay closing menu slightly to ensure link navigation starts
                                            setTimeout(() => setIsOpen(false), 300);
                                        }}
                                        className="block text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </motion.div>
                            ))}

                            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex gap-6">
                                <a href="https://github.com/Azarcodex" className="text-slate-400 hover:text-indigo-600"><Github size={24} /></a>
                                <a href="https://linkedin.com/..." className="text-slate-400 hover:text-indigo-600"><Linkedin size={24} /></a>
                                <a href="mailto:..." className="text-slate-400 hover:text-indigo-600"><Mail size={24} /></a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;