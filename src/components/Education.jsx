import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen, Star, Sparkles } from 'lucide-react';

const educationData = [
    {
        id: 1,
        year: '2025 - Present',
        title: 'Software Engineer Trainee',
        institution: 'Brototype',
        description: 'Accelerated industrial residency focusing on full-stack architecture, MERN ecosystem, and distributed systems. Engineering production-grade initiatives with high availability.',
        icon: <BookOpen className="w-6 h-6" />,
        color: 'from-indigo-600 to-violet-600',
        tags: ['System Design', 'Algorithms', 'Full Stack']
    },
    {
        id: 2,
        year: '2022 - 2025',
        title: 'BSc Computer Science',
        institution: 'NAM College',
        grade: 'A Grade Excellence',
        description: 'In-depth study of computation theory, database management, and operating systems. Achieved academic distinction through rigorous analytical projects.',
        icon: <GraduationCap className="w-6 h-6" />,
        color: 'from-teal-500 to-emerald-600',
        tags: ['Core CS', 'Database Systems', 'Software Eng']
    },
    {
        id: 3,
        year: '2020 - 2022',
        title: 'Higher Secondary Education',
        institution: 'GVHSS Kadirur',
        grade: '1151 / 1200 (96%)',
        description: 'Advanced mathematics and computer science track. Graduated as school topper with an exceptional academic record in STEM subjects.',
        icon: <Award className="w-6 h-6" />,
        color: 'from-rose-500 to-orange-500',
        tags: ['Mathematics', 'School Topper']
    }
];

const Education = () => {
    return (
        <section id="education" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
            {/* Top boundary line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-6"
                    >
                        <Star size={12} className="fill-indigo-500 text-indigo-500" />
                        Academic Journey
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter"
                    >
                        Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400">Excellence.</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Architectural Timeline Line */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-indigo-100 dark:bg-slate-800 -translate-x-1/2 overflow-hidden">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full bg-gradient-to-b from-indigo-500 via-teal-500 to-indigo-500"
                        />
                    </div>

                    <div className="space-y-12 lg:space-y-24">
                        {educationData.map((item, index) => (
                            <div key={item.id} className="relative">
                                {/* Timeline Dot (Desktop Only) */}
                                <div className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />

                                <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                                    {/* Content Card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        whileHover={{ y: -5 }}
                                        className="w-full lg:w-[45%] group"
                                    >
                                        <div className="bg-white dark:bg-slate-900/60 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden backdrop-blur-sm">
                                            {/* Hover Glow */}
                                            <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />

                                            <div className="flex items-start justify-between mb-6">
                                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-12`}>
                                                    {item.icon}
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800/50 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                                                    {item.year}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4">{item.institution}</p>

                                            {item.grade && (
                                                <div className="mb-4 inline-flex items-center gap-2 text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-widest px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
                                                    <Sparkles size={12} />
                                                    {item.grade}
                                                </div>
                                            )}

                                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                                                {item.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                                                {item.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800/80 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider rounded-lg border border-slate-200 dark:border-slate-700/50 group-hover:border-indigo-500/20 transition-all">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Invisible Spacer for Desktop Alignment */}
                                    <div className="hidden lg:block w-[45%]" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
