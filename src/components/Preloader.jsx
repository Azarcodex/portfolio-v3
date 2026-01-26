import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
    "Compiling ideas...",
    "Optimizing performance...",
    "Scaling innovation...",
    "Building experiences...",
    "Azarcodex.init()"
];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const wordInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 400);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 25);

        return () => {
            clearInterval(wordInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-950 text-white"
        >
            {/* Background Grain/Noise Effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <div className="relative flex flex-col items-center max-w-xs w-full px-6">
                {/* Floating "System Code" Decoration */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px]"></div>

                {/* Main Text Area */}
                <div className="h-12 flex items-center justify-center mb-8 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-indigo-400 font-mono text-sm tracking-widest uppercase"
                        >
                            {words[index]}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* Stylish Geometric Loader */}
                <div className="relative w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="absolute h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-gradient shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    />
                </div>

                {/* Progress Details */}
                <div className="w-full flex justify-between items-center font-mono text-[10px] text-slate-500">
                    <span className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></span>
                        SYSTEM_READY
                    </span>
                    <span>{progress}%</span>
                </div>
            </div>

            {/* Aesthetic SVG Decoration */}
            <svg className="absolute bottom-10 opacity-10 w-32 h-32" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" className="animate-[spin_20s_linear_infinite]" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" className="animate-[spin_15s_linear_infinite_reverse]" />
            </svg>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </motion.div>
    );
};

export default Preloader;
