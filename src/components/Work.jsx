import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "FYM – Fitness & Gym App",
    description: "A modern fitness tracking and gym management web app.",
    tags: ["React", "Tailwind", "Vercel"],
    live: "https://corefitness-one.vercel.app",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=640&h=400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Gym E-Commerce",
    description: "Full-featured e-commerce store for gym equipment and supplements.",
    tags: ["React", "E-Commerce", "Vercel"],
    live: "https://badger-sigma.vercel.app/",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef03a74715?q=80&w=640&h=400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Mr. Crispy – Restaurant Site",
    description: "A sleek restaurant website with menu, branding and online presence.",
    tags: ["React", "UI/UX", "Vercel"],
    live: "https://mrcrispy.vercel.app/",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=640&h=400&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Adam Clinic – Clinic Booking System",
    description: "Online appointment booking system for a medical clinic.",
    tags: ["React", "Booking System", "Vercel"],
    live: "https://adam-clinic.vercel.app/",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=640&h=400&auto=format&fit=crop",
  },
];

const ProjectCard = ({ project }) => {
  return (
    <div className="w-[320px] md:w-[360px] h-[420px] shrink-0 group">
      <div className="glass-panel h-full overflow-hidden flex flex-col transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 group-hover:border-indigo-500/30">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        {/* Project Info */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold text-indigo-300 uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white group/btn"
            >
              <span className="relative">
                Live Demo
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 transition-all duration-300 group-hover/btn:w-full"></span>
              </span>
              <ArrowRight
                size={14}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  // Duplicate projects for infinite scroll
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section id="work" className="section-padding overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-indigo-500"></span>
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                Featured Projects
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Selected <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-teal-400">
                Work.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-slate-400 text-sm md:text-base font-medium">
            A collection of production-ready digital solutions delivered for
            clients in fitness, e-commerce, and healthcare.
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-linear-to-l from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Content */}
        <div className="flex gap-6 animate-scroll w-max px-6">
          {duplicatedProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </div>
      </motion.div>

      {/* Responsive Note for Mobile */}
      <div className="mt-12 text-center md:hidden">
        <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
          Swipe to explore or wait to scroll
        </p>
      </div>
    </section>
  );
};

export default Work;
