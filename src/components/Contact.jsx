import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    Send,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Phone,
    ArrowUpRight,
    MessageSquare,
    Copy,
    Check
} from 'lucide-react';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://formspree.io/f/xjgwwbaj', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
            {/* Top Border Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

            <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* NARRATIVE SIDE */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[45%] text-center lg:text-left"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter mb-6 italic">
                            Let's spark <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-teal-500">Innovation.</span>
                        </h2>
                        
                        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-0 font-medium max-w-xl mx-auto lg:mx-0">
                            Ready to transform your vision into a scalable digital reality? Fill out the form below and I'll get back to you within 24 hours.
                        </p>
                    </motion.div>

                    {/* FORM SIDE */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-[55%] relative"
                    >
                        <div className="bg-slate-50 dark:bg-slate-900/40 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm font-medium dark:text-white placeholder:text-slate-400"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm font-medium dark:text-white placeholder:text-slate-400"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Brief Narrative</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all text-sm font-medium dark:text-white resize-none placeholder:text-slate-400"
                                        placeholder="Briefly describe your project or inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 ring-offset-2 ring-indigo-500/20 hover:ring-4 ${
                                        status === 'loading' ? 'bg-slate-200 dark:bg-slate-800 text-slate-400' : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700'
                                    }`}
                                >
                                    {status === 'loading' ? (
                                        <Loader2 className="animate-spin" size={16} />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send size={14} />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Status Overlays */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-20"
                                    >
                                        <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">Transmission Successful</h3>
                                        <p className="text-sm text-slate-500 font-medium">Your request has been safely logged.</p>
                                        <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 border-2 border-indigo-600 text-indigo-600 rounded-full text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all tracking-widest">New Session</button>
                                    </motion.div>
                                )}

                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-20"
                                    >
                                        <AlertCircle size={48} className="text-rose-500 mb-4" />
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">System Error</h3>
                                        <p className="text-sm text-slate-500 font-medium">Please re-verify your network protocol.</p>
                                        <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 border-2 border-rose-600 text-rose-600 rounded-full text-[10px] font-black uppercase hover:bg-rose-600 hover:text-white transition-all tracking-widest">Retry Session</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
