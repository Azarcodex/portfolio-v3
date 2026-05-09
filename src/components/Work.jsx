import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { ArrowRight, Sparkle } from "lucide-react";

import gymAppImg from "../assets/gym-app.png";
import gymShopImg from "../assets/gym-shop.png";
import restaurantImg from "../assets/restaurant.png";
import clinicImg from "../assets/clinic.png";

const projects = [
  {
    id: 1,
    title: "FYM – Fitness & Gym App",
    description:
      "A premium fitness tracking ecosystem with real-time stats and personalized training plans.",
    tags: ["React", "Tailwind", "Framer Motion"],
    live: "https://corefitness-one.vercel.app",
    image: gymAppImg,
  },
  {
    id: 2,
    title: "Gym E-Commerce",
    description:
      "High-performance storefront for premium gym equipment and supplements with seamless checkout.",
    tags: ["React", "E-Commerce", "UI/UX"],
    live: "https://badger-sigma.vercel.app/",
    image: gymShopImg,
  },
  {
    id: 3,
    title: "Mr. Crispy – Restaurant",
    description:
      "A sophisticated culinary platform with dynamic menu management and brand storytelling.",
    tags: ["React", "UI/UX", "Brand"],
    live: "https://mrcrispy.vercel.app/",
    image: restaurantImg,
  },
  {
    id: 4,
    title: "Adam Clinic – Booking",
    description:
      "High-reliability medical appointment system with intuitive scheduling and patient flow.",
    tags: ["React", "Healthcare", "UX"],
    live: "https://adam-clinic.vercel.app/",
    image: clinicImg,
  },
];

// Use 3 copies: render middle copy, wrap to it from either side
const COPIES = 3;
const duplicatedProjects = Array.from({ length: COPIES }, () => projects).flat();

const ProjectCard = ({ project }) => {
  return (
    <div className="w-[320px] md:w-[420px] h-[480px] shrink-0 group">
      <div className="glass-panel h-full overflow-hidden flex flex-col transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-[0_30px_60px_rgba(79,70,229,0.25)] group-hover:border-indigo-500/50">
        {/* Project Image */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-indigo-500/10 transition-colors duration-700"></div>

          {/* Badge */}
          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100">
            <div className="bg-indigo-600/90 backdrop-blur-xl text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg border border-white/20">
              Selected Work
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-8 flex flex-col flex-grow relative overflow-hidden bg-gradient-to-b from-transparent to-slate-900/20">
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-indigo-300 transition-colors tracking-tighter leading-none">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 mb-8 line-clamp-2 font-medium leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-lg text-[9px] font-black text-indigo-300 uppercase tracking-[0.2em] group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-indigo-500/20 transition-all duration-500">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-white group/btn"
            >
              <span className="relative">
                Experience Demo
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-indigo-500 transition-all duration-500 group-hover/btn:w-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
              </span>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:border-indigo-600 group-hover/btn:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-500">
                <ArrowRight
                  size={16}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ready, setReady] = useState(false);
  const x = useMotionValue(0);

  const speed = 0.6;
  // Track x in a ref so useAnimationFrame always reads fresh value
  const xRef = useRef(0);
  useEffect(() => {
    const unsub = x.on("change", (v) => { xRef.current = v; });
    return unsub;
  }, [x]);

  // Initialize: start at the first copy so wrapping is symmetric
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // Wait one frame so layout is complete
    requestAnimationFrame(() => {
      const setWidth = el.scrollWidth / COPIES;
      x.set(-setWidth); // Start at copy index 1 (middle)
      xRef.current = -setWidth;
      setReady(true);
    });
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (!ready) return;
    const el = carouselRef.current;
    if (!el || isDragging || isHovered) return;

    const setWidth = el.scrollWidth / COPIES;
    let nextX = xRef.current - speed * (delta / 16);

    // When we've scrolled past the last copy start, jump back by one set
    if (nextX <= -setWidth * (COPIES - 1)) {
      nextX += setWidth;
    }
    // Guard against dragging too far right
    if (nextX > 0) {
      nextX = -setWidth;
    }

    x.set(nextX);
  });

  const handleDragEnd = () => {
    setIsDragging(false);
    const el = carouselRef.current;
    if (!el) return;
    const setWidth = el.scrollWidth / COPIES;
    const currentX = xRef.current;
    if (currentX <= -setWidth * (COPIES - 1)) {
      x.set(currentX + setWidth);
    } else if (currentX > 0) {
      x.set(-setWidth);
    }
  };

  return (
    <section
      id="work"
      className="py-32 overflow-hidden bg-transparent relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse [animation-duration:8s]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gradient-to-r from-indigo-500 to-transparent"></div>
              <span className="text-indigo-400 text-[11px] font-black uppercase tracking-[0.5em] flex items-center gap-2">
                <Sparkle size={10} className="fill-indigo-400" />
                Featured Portfolio
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85]">
              Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-200 to-teal-300">
                Craftsmanship.
              </span>
            </h2>
          </div>
          <div className="max-w-sm space-y-6">
            <div className="w-full h-px bg-white/5"></div>
            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed tracking-tight italic">
              "Every project is an opportunity to push the boundaries of digital
              experience and technical performance."
            </p>
          </div>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div
        className="relative group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-80 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-80 bg-gradient-to-l from-[#0f172a] via-[#0f172a]/90 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Content */}
        <motion.div
          ref={carouselRef}
          className="flex gap-10 w-max px-24 cursor-grab active:cursor-grabbing py-12"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: 0 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          dragElastic={0.05}
          dragTransition={{ power: 0.3, timeConstant: 250 }}
        >
          {duplicatedProjects.map((project, index) => (
            <ProjectCard key={`${project.id}-${index}`} project={project} />
          ))}
        </motion.div>
      </div>

      {/* Navigation Instruction */}
      <div className="mt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="inline-flex items-center gap-6 px-8 py-4 rounded-full bg-slate-900/40 border border-white/5 backdrop-blur-xl shadow-2xl shadow-black/20"
        >
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse [animation-delay:200ms]"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse [animation-delay:400ms]"></div>
          </div>
          <p className="text-slate-400 text-[11px] uppercase tracking-[0.4em] font-black italic">
            Drag to Navigate or Hover to Freeze
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;