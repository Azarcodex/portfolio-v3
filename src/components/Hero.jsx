import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import profileImg from "../assets/profile.jpeg";

const Hero = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100); // reduced delay for faster professional feel
    return () => clearTimeout(timer);
  }, []);

  const name = "Mohammed Azarin";

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden pt-28 pb-32 transition-colors duration-300"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 dark:bg-indigo-900/20 blur-[120px] animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-teal-50/50 dark:bg-teal-900/20 blur-[100px] animate-pulse pointer-events-none delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center py-1.5 px-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold tracking-wide mb-6 border border-indigo-100/50 dark:border-indigo-800/50">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-teal-500 dark:from-indigo-400 dark:to-teal-400">
                {name}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-6"
            >
              Full-Stack Software Engineer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-xl"
            >
              I build scalable web applications and intuitive interfaces.
              Specializing in the{" "}
              <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">
                MERN stack
              </strong>{" "}
              with a strong passion for integrating modern{" "}
              <strong className="text-teal-600 dark:text-teal-400 font-semibold">
                AI solutions
              </strong>{" "}
              into everyday products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#work"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 group"
              >
                View My Work
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex gap-4 justify-center sm:justify-start">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center p-4 text-slate-700 dark:text-slate-300 transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 hover:text-indigo-600 dark:hover:text-indigo-400 group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center p-4 text-slate-700 dark:text-slate-300 transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 hover:text-indigo-600 dark:hover:text-indigo-400 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={showContent ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Decorative background shape behind the image */}
              <div className="absolute inset-0 bg-linear-to-tr from-indigo-500 to-teal-400 rounded-4xl rotate-6 opacity-20 dark:opacity-40 animate-pulse"></div>
              <div className="absolute inset-0 bg-linear-to-bl from-indigo-600 to-teal-500 rounded-4xl -rotate-6 opacity-20 dark:opacity-40"></div>

              {/* Image Container */}
              <div className="absolute inset-0 rounded-4xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl z-10 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={profileImg}
                  alt="Mohammed Azarin"
                  className="w-full h-full object-cover object-center"
                />
                {/* Overlay gradient for better blending */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent mix-blend-multiply pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
