import React, { useMemo } from 'react';
import { Flame, Award, Calendar } from 'lucide-react';

export default function ActivityHeatmap({ questionsProgress = {}, revisionLogs = {} }) {
  // Aggregate activity counts by YYYY-MM-DD
  const { dateCounts, currentStreak, maxStreak, totalActiveDays } = useMemo(() => {
    const counts = {};

    // From questions progress
    Object.values(questionsProgress).forEach(q => {
      if (q.status === '✅ Done') {
        const dateStr = (q.completedAt || q.date || '').split('T')[0];
        if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          counts[dateStr] = (counts[dateStr] || 0) + 1;
        }
      }
    });

    // From revision logs
    Object.values(revisionLogs).forEach(r => {
      ['attempt1', 'attempt2', 'attempt3', 'flaggedAt'].forEach(field => {
        const val = r[field];
        if (val) {
          const dateStr = val.split('T')[0];
          if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            counts[dateStr] = (counts[dateStr] || 0) + 1;
          }
        }
      });
    });

    // Calculate streaks
    const today = new Date();
    let curr = 0;
    let max = 0;
    let checkDate = new Date(today);
    
    // Check if activity today
    const todayStr = today.toISOString().split('T')[0];
    if (counts[todayStr]) {
      curr++;
    }

    // Check past days consecutively
    for (let i = 1; i <= 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const s = d.toISOString().split('T')[0];
      if (counts[s]) {
        curr++;
      } else {
        break;
      }
    }

    // Longest streak calculation
    const sortedDates = Object.keys(counts).sort();
    let tempStreak = 0;
    let prevDate = null;

    sortedDates.forEach(dStr => {
      const d = new Date(dStr);
      if (prevDate) {
        const diffDays = Math.round((d - prevDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          tempStreak++;
        } else if (diffDays > 1) {
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      if (tempStreak > max) max = tempStreak;
      prevDate = d;
    });

    return {
      dateCounts: counts,
      currentStreak: curr,
      maxStreak: Math.max(max, curr),
      totalActiveDays: Object.keys(counts).length
    };
  }, [questionsProgress, revisionLogs]);

  // Build grid of 20 weeks (140 days) ending on the current week's Saturday/Sunday
  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sun, 6 is Sat
    
    // We want 20 columns (weeks), each 7 days
    const totalDays = 20 * 7;
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (totalDays - 1 - (6 - dayOfWeek)));

    const resultWeeks = [];
    const months = [];
    let curMonth = '';

    for (let w = 0; w < 20; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(startDate);
        cellDate.setDate(startDate.getDate() + (w * 7 + d));
        const dateStr = cellDate.toISOString().split('T')[0];
        const count = dateCounts[dateStr] || 0;
        const isFuture = cellDate > today;

        const mName = cellDate.toLocaleString('default', { month: 'short' });
        if (d === 0 && mName !== curMonth) {
          months.push({ weekIndex: w, label: mName });
          curMonth = mName;
        }

        week.push({
          dateStr,
          count,
          isFuture,
          displayDate: cellDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
        });
      }
      resultWeeks.push(week);
    }

    return { weeks: resultWeeks, monthLabels: months };
  }, [dateCounts]);

  const getColorClass = (count, isFuture) => {
    if (isFuture) return 'bg-gray-100 dark:bg-slate-800/30 border-dashed border-gray-200 dark:border-slate-800 cursor-not-allowed';
    if (!count || count === 0) return 'bg-gray-100 dark:bg-slate-800/80 hover:ring-1 hover:ring-gray-400';
    if (count === 1) return 'bg-emerald-200 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 hover:ring-1 hover:ring-emerald-500';
    if (count <= 3) return 'bg-emerald-400 dark:bg-emerald-700 text-emerald-950 dark:text-emerald-100 hover:ring-1 hover:ring-emerald-500';
    if (count <= 5) return 'bg-emerald-600 dark:bg-emerald-500 text-white hover:ring-1 hover:ring-emerald-400';
    return 'bg-emerald-700 dark:bg-emerald-400 text-white hover:ring-1 hover:ring-emerald-300';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg p-5 shadow-sm mb-6">
      {/* Top Banner Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4 mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-500" />
            Study Activity & Consistency
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time daily problem solving and spaced repetition reviews
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Streak</div>
              <div className="text-lg font-bold text-gray-800 dark:text-slate-100">
                {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Best Streak</div>
              <div className="text-lg font-bold text-gray-800 dark:text-slate-100">
                {maxStreak} Days
              </div>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Active Days</div>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {totalActiveDays}
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-[650px]">
          {/* Months header */}
          <div className="flex text-[11px] text-gray-400 font-medium mb-1.5 pl-7">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{ marginLeft: idx === 0 ? `${m.weekIndex * 15}px` : `${Math.max(0, (m.weekIndex - (monthLabels[idx-1]?.weekIndex || 0) - 1) * 15)}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid rows */}
          <div className="flex gap-1">
            {/* Days of week labels */}
            <div className="flex flex-col justify-between text-[9px] text-gray-400 font-semibold pr-1 h-[90px] select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Heatmap column by week */}
            <div className="flex gap-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      title={`${day.displayDate}: ${day.count} problem${day.count === 1 ? '' : 's'} solved/reviewed`}
                      className={`w-3 h-3 rounded-xs transition-all ${getColorClass(day.count, day.isFuture)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100 dark:border-slate-800/80">
            <span>Past 20 Weeks</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-xs bg-gray-100 dark:bg-slate-800" />
              <div className="w-2.5 h-2.5 rounded-xs bg-emerald-200 dark:bg-emerald-950" />
              <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400 dark:bg-emerald-700" />
              <div className="w-2.5 h-2.5 rounded-xs bg-emerald-600 dark:bg-emerald-500" />
              <div className="w-2.5 h-2.5 rounded-xs bg-emerald-700 dark:bg-emerald-400" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
