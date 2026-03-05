import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ───────────────────────────────────────────── */

const LEETCODE_USERNAME = "vpazar2799";
const GITHUB_USERNAME = "Azarcodex";

/* ─── Color Themes ─────────────────────────── */

const LC_COLORS = [
  "bg-slate-800/60",
  "bg-orange-900/70",
  "bg-orange-700/80",
  "bg-orange-500/90",
  "bg-orange-400",
];

const GH_COLORS = [
  "bg-slate-800/60",
  "bg-emerald-900/70",
  "bg-emerald-700/80",
  "bg-emerald-500/90",
  "bg-emerald-400",
];

function getColor(count, colors) {
  if (count <= 0) return colors[0];
  if (count === 1) return colors[1];
  if (count <= 3) return colors[2];
  if (count <= 6) return colors[3];
  return colors[4];
}

/* ─── Grid Builder (Reusable) ───────────────── */

function buildGrid(calendarMap) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - 52 * 7 + 1);
  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  const cur = new Date(start);

  while (cur <= today) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const key = cur.toISOString().slice(0, 10);
      const isFuture = cur > today;

      week.push({
        key,
        count: isFuture ? -1 : calendarMap[key] || 0,
        label: isFuture
          ? ""
          : `${cur.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}: ${calendarMap[key] || 0} contribution${
              (calendarMap[key] || 0) !== 1 ? "s" : ""
            }`,
      });

      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

function getMonthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;

  weeks.forEach((week, i) => {
    const month = new Date(week[0].key).getMonth();
    if (month !== lastMonth) {
      labels.push({
        col: i,
        label: new Date(week[0].key).toLocaleString("default", {
          month: "short",
        }),
      });
      lastMonth = month;
    }
  });

  return labels;
}

/* ─── Heatmap Component ───────────────────── */

const ROW_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function ContributionHeatmap({ calendarMap, colors }) {
  const weeks = buildGrid(calendarMap);
  const monthLabels = getMonthLabels(weeks);
  const [tip, setTip] = useState("");
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [weeks]);

  return (
    <div ref={scrollRef} className="overflow-x-auto scrollbar-hide pb-1">
      <div style={{ minWidth: `${weeks.length * 14}px` }}>
        {/* Month labels */}
        <div className="flex mb-1" style={{ paddingLeft: "28px" }}>
          {weeks.map((_, wi) => {
            const ml = monthLabels.find((m) => m.col === wi);
            return (
              <div
                key={wi}
                className="text-slate-500 font-medium"
                style={{
                  width: "12px",
                  marginRight: "2px",
                  fontSize: "9px",
                }}
              >
                {ml ? ml.label : ""}
              </div>
            );
          })}
        </div>

        <div className="flex">
          {/* Day labels */}
          <div className="flex flex-col mr-1" style={{ gap: "2px" }}>
            {ROW_LABELS.map((lbl, i) => (
              <div
                key={i}
                className="text-slate-500 text-right"
                style={{
                  height: "12px",
                  width: "24px",
                  fontSize: "9px",
                  lineHeight: "12px",
                }}
              >
                {lbl}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex" style={{ gap: "2px" }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: "2px" }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day.label}
                    onMouseEnter={() => setTip(day.label)}
                    onMouseLeave={() => setTip("")}
                    className={`rounded-[2px] transition-all duration-150
                      ${day.count < 0 ? "opacity-0" : ""}
                      ${getColor(day.count, colors)}`}
                    style={{ width: "12px", height: "12px" }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {tip && (
          <p className="text-slate-400 text-xs mt-2 text-right truncate">
            {tip}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────── */

const StatsSection = () => {
  const [lcCalendar, setLcCalendar] = useState(null);
  const [ghCalendar, setGhCalendar] = useState(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [ghLoading, setGhLoading] = useState(true);
  const [lcError, setLcError] = useState(false);
  const [ghError, setGhError] = useState(false);

  useEffect(() => {
    /* LeetCode */
    setLcLoading(true);
    setLcError(false);
    fetch(
      `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/calendar`,
    )
      .then((r) => {
        if (!r.ok) throw new Error("API rate limited");
        return r.json();
      })
      .then((d) => {
        const raw = d.submissionCalendar;
        if (!raw) throw new Error("No data");
        const parsed = {};
        const obj = typeof raw === "string" ? JSON.parse(raw) : raw;

        for (const [ts, count] of Object.entries(obj)) {
          const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
          parsed[date] = count;
        }

        setLcCalendar(parsed);
      })
      .catch((err) => {
        console.error("LeetCode fetch error:", err);
        setLcError(true);
      })
      .finally(() => setLcLoading(false));

    /* GitHub */
    setGhLoading(true);
    setGhError(false);
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`)
      .then((r) => {
        if (!r.ok) throw new Error("API failure");
        return r.json();
      })
      .then((d) => {
        const parsed = {};
        if (d && d.contributions) {
          d.contributions.forEach((day) => {
            parsed[day.date] = day.count;
          });
        }
        setGhCalendar(parsed);
      })
      .catch((err) => {
        console.error("GitHub fetch error:", err);
        setGhError(true);
      })
      .finally(() => setGhLoading(false));
  }, []);

  return (
    <section
      id="stats"
      className="section-padding bg-transparent transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] rounded-full bg-orange-500/5 dark:bg-orange-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[30%] h-[30%] rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] pointer-events-none"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter"
          >
            Metrics &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-emerald-400">
              Contributions.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl font-medium"
          >
            A real-time overview of my continuous coding activity and
            problem-solving metrics across platforms.
          </motion.p>
        </div>

        <div className="space-y-8">
          {/* LeetCode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass-panel p-6 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <div className="w-5 h-5 rounded-sm bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.4)]"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                LeetCode{" "}
                <span className="text-slate-400 dark:text-slate-500 font-medium text-sm ml-2">
                  @{LEETCODE_USERNAME}
                </span>
              </h3>
            </div>

            <div className="bg-white/50 dark:bg-slate-950/50 rounded-2xl p-4 md:p-6 border border-slate-100 dark:border-slate-800 min-h-[150px] flex items-center justify-center">
              {lcLoading ? (
                <div className="text-slate-400 text-xs animate-pulse">
                  Syncing LeetCode data...
                </div>
              ) : lcError ? (
                <div className="text-slate-500 text-xs italic">
                  LeetCode API temporarily rate-limited. Please view directly on{" "}
                  <a
                    href={`https://leetcode.com/${LEETCODE_USERNAME}`}
                    target="_blank"
                    className="text-orange-400 underline"
                  >
                    LeetCode profile
                  </a>
                  .
                </div>
              ) : (
                <ContributionHeatmap
                  calendarMap={lcCalendar}
                  colors={LC_COLORS}
                />
              )}
            </div>
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="glass-panel p-6 md:p-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                GitHub{" "}
                <span className="text-slate-400 dark:text-slate-500 font-medium text-sm ml-2">
                  @{GITHUB_USERNAME}
                </span>
              </h3>
            </div>

            <div className="bg-white/50 dark:bg-slate-950/50 rounded-2xl p-4 md:p-6 border border-slate-100 dark:border-slate-800 min-h-[150px] flex items-center justify-center">
              {ghLoading ? (
                <div className="text-slate-400 text-xs animate-pulse">
                  Syncing GitHub data...
                </div>
              ) : ghError ? (
                <div className="text-slate-500 text-xs italic">
                  GitHub API unreachable. Please view directly on{" "}
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    className="text-emerald-400 underline"
                  >
                    GitHub profile
                  </a>
                  .
                </div>
              ) : (
                <ContributionHeatmap
                  calendarMap={ghCalendar}
                  colors={GH_COLORS}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
