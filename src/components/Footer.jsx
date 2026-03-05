import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Code2,
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";
// import profileImg from '../assets/profileAzar.JPG';

const Footer = () => {
  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: "https://github.com/Azarcodex",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/mohammed-azarin-v-p-0571bb239",
      label: "LinkedIn",
    },
    {
      icon: <Code2 size={20} />,
      url: "https://leetcode.com/u/vpazar2799/",
      label: "LeetCode",
    },
    {
      icon: <Mail size={20} />,
      url: "mailto:vpazar2799@gmail.com",
      label: "Email",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative section-padding pb-10 overflow-hidden">
      {/* Top Divider with Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              {/* <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500 p-0.5 bg-white dark:bg-slate-900 shadow-xl">
                                <img src={profileImg} alt="Azarin" className="w-full h-full object-cover rounded-full" />
                            </div> */}
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                  Azarin.
                </h3>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
                  Build the future.
                </p>
              </div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Crafting high-performance web architectures and AI-driven
              solutions with precision and passion.
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Contact Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="relative group p-8 rounded-3xl bg-linear-to-br from-indigo-600 to-purple-700 text-white shadow-2xl shadow-indigo-500/20 overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            {/* Decorative Background Blobs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 blur-xl" />

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-2">
                <Sparkles className="w-8 h-8 text-indigo-200 mb-4" />
                <h4 className="text-3xl font-black tracking-tighter italic">
                  HAVE A PROJECT IN MIND?
                </h4>
                <p className="text-indigo-100 font-medium opacity-80">
                  Let's turn your ideas into digital reality.
                </p>
              </div>

              <a
                href="#contact"
                className="mt-8 flex items-center justify-between group/btn bg-white text-indigo-600 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-50 transition-all"
              >
                Start a Conversation
                <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800/50 pt-8 flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-slate-500 dark:text-slate-500 font-medium">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>© {currentYear} Mohammed Azarin</span>
            <div className="hidden md:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Engineered with{" "}
              <Heart
                size={14}
                className="text-red-500 fill-red-500 animate-pulse"
              />{" "}
              and <Code2 size={14} />
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Gradient Glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] pointer-events-none" />
    </footer>
  );
};

export default Footer;
