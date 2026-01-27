import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon, Home, Briefcase, GraduationCap, User, Send } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useDarkMode } from '../hooks/useDarkMode';
import profileImg from '../assets/profileAzar.JPG';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, toggleTheme] = useDarkMode();
    const [activeSection, setActiveSection] = useState('home');

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map(link => link.href.substring(1));
            const scrollPosition = window.scrollY + 100;

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
        { name: 'Home', href: '#home', icon: <Home size={18} /> },
        { name: 'Work', href: '#work', icon: <Briefcase size={18} /> },
        { name: 'Education', href: '#education', icon: <GraduationCap size={18} /> },
        { name: 'About', href: '#about', icon: <User size={18} /> },
        { name: 'Contact', href: '#contact', icon: <Send size={18} /> },
    ];

    const socialLinks = [
        { icon: <Github size={18} />, url: "https://github.com/Azarcodex" },
        { icon: <Linkedin size={18} />, url: "https://linkedin.com/in/mohammed-azarin-v-p-0571bb239" },
    ];

    return (
        <>
            {/* Desktop & Mobile Top Floating Bar */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-6 left-0 right-0 z-100 flex justify-center px-4 pointer-events-none"
            >
                <motion.div
                    layout
                    className="flex items-center gap-2 md:gap-4 p-2 md:p-2.5 rounded-full border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-2xl pointer-events-auto bg-white/70 dark:bg-slate-900/80 transition-shadow duration-300 hover:shadow-indigo-500/20"
                >
                    {/* Brand Avatar */}
                    <a href="#" className="flex-shrink-0 ml-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-500/50 hover:ring-indigo-500 transition-all p-0.5 bg-white dark:bg-slate-800">
                            <img src={profileImg} alt="Azarin" className="w-full h-full object-cover rounded-full" />
                        </div>
                    </a>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-4 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-full ${isActive
                                        ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-600/30'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </nav>

                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

                    {/* Socials & Theme & Menu */}
                    <div className="flex items-center gap-1.5 md:gap-2 mr-1">
                        {socialLinks.map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -2 }}
                                className="hidden md:flex p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                {social.icon}
                            </motion.a>
                        ))}

                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ rotate: 15 }}
                            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                        >
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </motion.button>

                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2.5 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.header>

            {/* Circular Expansion Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, borderRadius: "100%" }}
                        animate={{ opacity: 1, scale: 1, borderRadius: "0%" }}
                        exit={{ opacity: 0, scale: 0, borderRadius: "100%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-center origin-top-right p-8"
                    >
                        <nav className="flex flex-col gap-6 items-center">
                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                    onClick={() => setIsOpen(false)}
                                    className="group flex flex-col items-center"
                                >
                                    <span className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic group-hover:text-indigo-600 transition-colors">
                                        {link.name}
                                    </span>
                                    <div className="h-1 w-0 bg-indigo-600 transition-all group-hover:w-full" />
                                </motion.a>
                            ))}
                        </nav>

                        <div className="mt-12 flex gap-8">
                            {socialLinks.map((social, idx) => (
                                <a key={idx} href={social.url} className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white hover:bg-indigo-600 hover:text-white transition-all">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress Bar (Bottom) */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left z-110"
                style={{ scaleX }}
            />
        </>
    );
};

export default Header;