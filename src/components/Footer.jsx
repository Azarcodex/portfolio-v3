import React from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 dark:bg-black overflow-hidden py-16 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-slate-300 dark:text-slate-400">
                <h2 className="text-3xl font-bold tracking-tight mb-8 text-white">Let's build something amazing together.</h2>
                <div className="flex items-center justify-center space-x-8 mb-12">
                    <a href="https://github.com/Azarcodex" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 dark:hover:text-indigo-500 transition-colors" aria-label="GitHub">
                        <Github size={24} />
                    </a>
                    <a href="https://linkedin.com/in/mohammed-azarin-v-p-0571bb239" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 dark:hover:text-indigo-500 transition-colors" aria-label="LinkedIn">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://leetcode.com/u/vpazar2799/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 dark:hover:text-indigo-500 transition-colors" aria-label="LeetCode">
                        <Code2 size={24} />
                    </a>
                    <a href="mailto:vpazar2799@gmail.com" className="hover:text-indigo-400 dark:hover:text-indigo-500 transition-colors" aria-label="Email">
                        <Mail size={24} />
                    </a>
                </div>
                <div className="border-t border-slate-800 dark:border-slate-900 pt-8 mt-8 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} Mohammed Azarin. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
