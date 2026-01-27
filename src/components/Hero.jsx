import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    const [showContent, setShowContent] = useState(false);
    const [introComplete, setIntroComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
            setIntroComplete(true);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    const name = "Mohammed Azarin";

    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden pt-28 pb-32 transition-colors duration-300">

            {/* Entrance Overlay */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeInOut" }}
                className="fixed inset-0 bg-black z-60 pointer-events-none"
            />

            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 dark:bg-indigo-900/10 blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-teal-50/50 dark:bg-teal-900/10 blur-3xl animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-50 w-full flex justify-center text-center">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={showContent ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide mb-6 border border-indigo-100/50 dark:border-indigo-800/50 cursor-pointer hover:scale-105 transition-transform">
                            Available for new opportunities
                        </span>
                    </motion.div>

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8 cursor-default text-slate-900 dark:text-white px-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="block mb-2 text-xl md:text-3xl text-slate-500 font-medium"
                        >
                            Hi, I'm
                        </motion.span>

                        <div className="flex flex-wrap justify-center overflow-hidden py-2 gap-x-[0.3em]">
                            {name.split(" ").map((word, wordIdx) => (
                                <div key={wordIdx} className="flex flex-nowrap whitespace-nowrap">
                                    {Array.from(word).map((letter, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ y: 150 }}
                                            animate={{ y: 0 }}
                                            transition={{
                                                duration: 1,
                                                delay: (wordIdx * word.length + index) * 0.05 + 0.5,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                            className={`inline-block hover:scale-110 transition-transform origin-bottom cursor-none ${!introComplete ? "text-white" : "text-slate-900 dark:text-white"
                                                }`}
                                        >
                                            {letter}
                                        </motion.span>
                                    ))}
                                    {wordIdx < name.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
                                </div>
                            ))}
                        </div>

                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={showContent ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            className="text-slate-400 dark:text-slate-500 font-medium text-2xl sm:text-4xl md:text-6xl mt-4 block"
                        >
                            Full Stack Engineer & <span className="text-teal-500 dark:text-teal-400">AI Architect.</span>
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={showContent ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mb-10 mx-auto"
                    >
                        I build <span className="text-indigo-600 dark:text-indigo-400 font-semibold">scalable web applications</span> with the MERN stack and integrate cutting-edge <span className="text-teal-600 dark:text-teal-400 font-semibold">Generative AI</span> solutions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={showContent ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a
                            href="#work"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 group cursor-pointer"
                        >
                            View Projects
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-slate-700 dark:text-slate-200 transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 cursor-pointer"
                        >
                            Contact Me
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;