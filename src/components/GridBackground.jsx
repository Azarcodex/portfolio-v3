import React from 'react';
import { motion } from 'framer-motion';

const GridBackground = () => {
    return (
        <>
            {/* Deepest Layer: Background Color & Moving Blobs */}
            <div className="fixed inset-0 z-[-3] overflow-hidden pointer-events-none bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
                <motion.div
                    animate={{
                        x: [0, 100, -100, 0],
                        y: [0, -50, 50, 0],
                        filter: ["hue-rotate(0deg) blur(100px)", "hue-rotate(360deg) blur(100px)"]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[60%] h-[60%] rounded-full bg-indigo-500/20 dark:bg-indigo-500/10"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 100, 0],
                        y: [0, 50, -50, 0],
                        filter: ["hue-rotate(0deg) blur(100px)", "hue-rotate(-360deg) blur(100px)"]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-[70%] h-[70%] rounded-full bg-teal-500/20 dark:bg-teal-500/10"
                />
            </div>

            {/* Top Background Layer: Fixed Grid & Scanning Lines */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                {/* Soothing Scanning Lines */}
                <motion.div
                    animate={{
                        y: ["0vh", "100vh"],
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-full h-px bg-indigo-500/20 dark:bg-indigo-400/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                />
                <motion.div
                    animate={{
                        x: ["0vw", "100vw"],
                        opacity: [0, 0.3, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-0 left-0 h-full w-px bg-teal-500/20 dark:bg-teal-400/20 shadow-[0_0_15px_rgba(20,184,166,0.2)]"
                />

                {/* Ambient Vignette Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(248,250,252,0.4)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,6,23,0.4)_100%)]" />

                {/* FIXED OVERLAY GRID (Graph Paper Style) */}
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-size-[32px_32px] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]"
                />
                <motion.div
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-size-[128px_128px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
                />
            </div>
        </>
    );
};

export default GridBackground;
