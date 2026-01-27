import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2,
    Layers,
    Cpu,
    Globe2,
    CheckCircle2,
    Sparkles
} from 'lucide-react';

const skills = [
    {
        category: 'Web Architecture',
        items: ['React', 'Node.js', 'Express', 'MongoDB', 'Next.js', 'TypeScript'],
        icon: <Layers className="w-4 h-4 text-indigo-500" />
    },
    {
        category: 'AI & Data Engineering',
        items: ['Generative AI', 'OpenAI', 'LangChain', 'SQL/NoSQL'],
        icon: <Cpu className="w-4 h-4 text-teal-500" />
    },
    {
        category: 'Systems & DevOps',
        items: ['AWS', 'Docker', 'CI/CD', 'Git', 'Linux'],
        icon: <Globe2 className="w-4 h-4 text-blue-500" />
    }
];

const About = () => {
    return (
        <section id="about" className="py-20 bg-transparent transition-colors duration-300 relative overflow-hidden">
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                    {/* Narrative Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 space-y-8"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">
                                <Sparkles size={12} className="text-indigo-500" />
                                Software Engineer
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
                                Designing for the <br />
                                <span className="text-indigo-600 dark:text-indigo-400">Future.</span>
                            </h2>
                        </div>

                        <div className="space-y-4 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
                            <p>
                                I specialize in building <span className="text-slate-900 dark:text-white font-semibold">robust digital infrastructures</span> that bridge the gap between complex engineering and elegant user experiences.
                            </p>
                            <p>
                                With a focus on <span className="text-indigo-600 dark:text-indigo-400 font-medium whitespace-nowrap">AI-integrated systems</span> and high-performance web applications, I help transform ambitious ideas into scalable realities using modern architectural patterns.
                            </p>
                        </div>

                        {/* Value Propositions */}
                        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                            {["Scalability Focused", "Clean Architecture", "AI Integration"].map((text, i) => (
                                <div key={i} className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                    <CheckCircle2 size={16} className="text-indigo-500" />
                                    <span className="text-xs font-bold uppercase tracking-wide">{text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Technical Stack Card - More Compact */}
                    <motion.div
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-[400px]"
                    >
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                Technical Proficiency
                            </h3>

                            <div className="space-y-6">
                                {skills.map((group, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            {group.icon}
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                {group.category}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2.5 py-1 text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
