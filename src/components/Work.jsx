import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Database, Layout, Sparkles } from 'lucide-react';

const projects = [
    {
        title: 'React Blog Platform',
        shortDesc: 'Redux & Firebase',
        description: 'A feature-rich blogging application with React and Redux Toolkit. Integrated Firebase for secure authentication.',
        tags: ['React', 'Firebase', 'Redux'],
        links: { github: 'https://github.com/Azarcodex/BlogApp' },
        image: 'https://images.unsplash.com/photo-1546074177-ffdda98d214f?auto=format&fit=crop&w=800&q=80',
        color: 'from-blue-600 to-indigo-600',
        icon: <Layout className="w-3.5 h-3.5" />
    },
    {
        title: 'Food Expense Tracker',
        shortDesc: 'MERN Stack',
        description: 'Manage food budgets with real-time calculations and MongoDB persistence.',
        tags: ['MERN', 'Node.js', 'Chart.js'],
        links: { github: 'https://github.com/Azarcodex/Food-Expense-Track' },
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
        color: 'from-emerald-500 to-teal-600',
        icon: <Database className="w-3.5 h-3.5" />
    },
    {
        title: 'Disease Prediction',
        shortDesc: 'ML & Django Health AI',
        description: 'AI-driven application predicting health risks via machine learning.',
        tags: ['Django', 'Python', 'ML'],
        links: { github: 'https://github.com/Azarcodex/Lifestyledisease_predicting' },
        image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
        color: 'from-rose-500 to-pink-600',
        icon: <Sparkles className="w-3.5 h-3.5" />
    },
];

const Work = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="work" className="py-12 bg-transparent transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-2 -left-2 text-[5rem] md:text-[6rem] font-bold text-slate-200/20 dark:text-slate-900/30 pointer-events-none select-none tracking-tighter">
                WORK
            </div>

            <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="mb-8">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-0.5 bg-indigo-600 rounded-full"></span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold text-[9px] tracking-widest uppercase">Portfolio</span>
                    </motion.div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        Featured <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">Work.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* Compact Navigation */}
                    <div className="lg:col-span-4 order-2 lg:order-1 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
                        {projects.map((project, index) => (
                            <button
                                key={index}
                                onMouseEnter={() => setActiveIndex(index)}
                                onClick={() => setActiveIndex(index)}
                                className={`p-2.5 rounded-lg transition-all duration-200 border flex-shrink-0 w-[180px] lg:w-full text-left ${activeIndex === index
                                    ? 'bg-white dark:bg-slate-900 border-indigo-500/40 shadow-sm'
                                    : 'bg-transparent border-transparent hover:bg-slate-200/40 dark:hover:bg-slate-900/40'
                                    }`}
                            >
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-6 h-6 rounded flex items-center justify-center ${activeIndex === index ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                        {project.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className={`font-bold text-xs truncate ${activeIndex === index ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                            {project.title}
                                        </h3>
                                        <p className="text-[8px] text-slate-400 uppercase tracking-tight">{project.shortDesc}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Compact Display Area */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md"
                            >
                                {/* Slimmer Aspect Ratio */}
                                <div className="relative aspect-[21/9] overflow-hidden">
                                    <img
                                        src={projects[activeIndex].image}
                                        alt={projects[activeIndex].title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {projects[activeIndex].tags.map((tag) => (
                                            <span key={tag} className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[7px] font-bold rounded uppercase tracking-tighter border border-indigo-100 dark:border-indigo-800/40">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed mb-4 max-w-xl">
                                        {projects[activeIndex].description}
                                    </p>

                                    <a
                                        href={projects[activeIndex].links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-linear-to-r ${projects[activeIndex].color} text-white text-[9px] font-bold hover:brightness-105 active:scale-95 transition-all`}
                                    >
                                        GitHub Source <Github size={12} />
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;