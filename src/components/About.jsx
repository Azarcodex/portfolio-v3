import React from "react";
import { motion } from "framer-motion";

const skillsData = [
  {
    id: 1,
    title: "FRONTEND CORE",
    color: "from-blue-500 to-cyan-500",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "TypeScript",
      "Next.js 14+",
      "React",
      "Tailwind CSS",
      "shadcn/ui",
      "Redux",
      "Zustand",
      "TanStack Query",
      "Framer Motion",
      "GSAP",
      "CSS Animations",
      "Zod",
      "Vite",
    ],
  },
  {
    id: 2,
    title: "AI & AUTOMATION",
    color: "from-violet-500 to-purple-500",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    skills: [
      "Claude AI",
      "Claude Code",
      "Cursor IDE",
      "GitHub Copilot",
      "DeepSeek",
      "Llama",
      "OpenAI API",
      "Gemini API",
      "Prompt Engineering",
      "Multi-Agent Systems",
      "AI Agents",
      "RAG Pipelines",
      "LangChain",
      "Ollama",
      "MCP Integrations",
      "OpenRouter",
      "Hugging Face",
      "nBn",
      "Make",
      "Tripo3D",
      "Meshy AI",
    ],
  },
  {
    id: 3,
    title: "BACKEND & DATABASE",
    color: "from-green-500 to-emerald-500",
    accentColor: "text-green-400",
    borderColor: "border-green-500/30",
    skills: [
      "Node.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST APIs",
      "Prisma ORM",
      "Drizzle ORM",
      "tRPC",
    ],
  },
  {
    id: 4,
    title: "TOOLS & WORKFLOW",
    color: "from-amber-500 to-orange-500",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    skills: [
      "Git / GitHub",
      "GitHub Actions",
      "npm / pnpm / yarn",
      "Webpack",
      "Figma",
      "Playwright",
      "Vercel",
      "Docker",
      "Context7 MCP",
      "Postman",
    ],
  },
  {
    id: 5,
    title: "DEVOPS & INFRA",
    color: "from-red-500 to-pink-500",
    accentColor: "text-red-400",
    borderColor: "border-red-500/30",
    skills: [
      "Linux",
      "Docker",
      "Kubernetes",
      "AWS",
      "Vercel",
      "Cloudflare Workers",
      "Nginx",
      "CI/CD",
      "GitHub Actions",
    ],
  },
  {
    id: 6,
    title: "TESTING & QUALITY",
    color: "from-cyan-500 to-blue-500",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/30",
    skills: [
      "Playwright",
      "Cypress",
      "Vitest",
      "Jest",
      "Testing Library",
      "ESLint",
      "Prettier",
      "Storybook",
    ],
  },
];

const SkillCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className="h-full group"
    >
      <div
        className={`
          relative h-full bg-slate-900/40 
          border border-slate-800/60 rounded-3xl p-6 md:p-8
          backdrop-blur-xl overflow-hidden
          hover:border-slate-700 transition-all duration-500
          shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]
          hover:-translate-y-1
        `}
      >
        {/* Animated Gradient Background Effect */}
        <div
          className={`
            absolute -top-32 -right-32 w-64 h-64 
            bg-linear-to-br ${category.color} opacity-[0.03] 
            group-hover:opacity-20 transition-all duration-700 rounded-full blur-3xl
            group-hover:scale-150
          `}
        />
        <div
          className={`
            absolute -bottom-32 -left-32 w-64 h-64 
            bg-linear-to-br ${category.color} opacity-[0.02] 
            group-hover:opacity-15 transition-all duration-700 rounded-full blur-3xl
            group-hover:scale-150
          `}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Category Title */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-12 h-12 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-linear-to-br ${category.color} shadow-[0_0_20px_rgba(0,0,0,0.4)]`}
              />
            </div>
            <h3
              className={`text-lg md:text-xl font-black uppercase tracking-widest ${category.accentColor} drop-shadow-sm`}
            >
              {category.title}
            </h3>
          </div>

          {/* Skills Grid */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {category.skills.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.03 * idx, duration: 0.3 }}
                viewport={{ once: true }}
                className={`
                  relative px-3 md:px-4 py-1.5 md:py-2
                  text-xs md:text-sm font-semibold
                  bg-slate-800/40 hover:bg-slate-700/60
                  text-slate-300 hover:text-white
                  border border-slate-700/50 hover:border-slate-500
                  rounded-xl
                  transition-all duration-300
                  cursor-default hover:scale-105 active:scale-95
                  whitespace-nowrap overflow-hidden
                `}
              >
                <span className="relative z-10">{skill}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsShowcase = () => {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 bg-transparent transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28 text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Expertise
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Skills
            </span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed px-4">
            A comprehensive overview of my technical stack, tools, and areas of
            expertise built through continuous learning and hands-on experience.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {skillsData.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
