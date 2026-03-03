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

  return (
    <div className="overflow-x-auto scrollbar-hide pb-1">
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

  useEffect(() => {
    /* LeetCode */
    fetch(
      `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/calendar`,
    )
      .then((r) => r.json())
      .then((d) => {
        const raw = d.submissionCalendar;
        const parsed = {};
        const obj = JSON.parse(raw);

        for (const [ts, count] of Object.entries(obj)) {
          const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
          parsed[date] = count;
        }

        setLcCalendar(parsed);
      })
      .catch(() => {});

    /* GitHub */
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`)
      .then((r) => r.json())
      .then((d) => {
        const parsed = {};
        if (d && d.contributions) {
          d.contributions.forEach((day) => {
            parsed[day.date] = day.count;
          });
        }
        setGhCalendar(parsed);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="stats" className="py-24">
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        {/* LeetCode */}
        {lcCalendar && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-orange-400 font-bold mb-4">
              LeetCode · @{LEETCODE_USERNAME}
            </h3>
            <ContributionHeatmap calendarMap={lcCalendar} colors={LC_COLORS} />
          </div>
        )}

        {/* GitHub */}
        {ghCalendar && (
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-emerald-400 font-bold mb-4">
              GitHub · @{GITHUB_USERNAME}
            </h3>
            <ContributionHeatmap calendarMap={ghCalendar} colors={GH_COLORS} />
          </div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
