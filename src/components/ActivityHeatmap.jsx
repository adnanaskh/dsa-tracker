import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Flame, Award, Calendar, ChevronLeft, ChevronRight, History, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

// Helper to format date in local YYYY-MM-DD to avoid timezone shifting
function formatLocalYYYYMMDD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function ActivityHeatmap({ questionsProgress = {}, revisionLogs = {} }) {
  const scrollContainerRef = useRef(null);

  // Aggregate activity counts by YYYY-MM-DD and compute overall stats
  const { dateCounts, currentStreak, maxStreak, totalActiveDays, allRecordedYears } = useMemo(() => {
    const counts = {};
    const yearsSet = new Set();

    // From questions progress
    Object.values(questionsProgress).forEach(q => {
      if (q.status === '✅ Done') {
        const rawDate = q.completedAt || q.date || '';
        const dateStr = rawDate.split('T')[0];
        if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          counts[dateStr] = (counts[dateStr] || 0) + 1;
          const y = parseInt(dateStr.split('-')[0], 10);
          if (!isNaN(y)) yearsSet.add(y);
        }
      }
    });

    // From revision logs
    Object.values(revisionLogs).forEach(r => {
      ['attempt1', 'attempt2', 'attempt3', 'lastReviewedAt', 'flaggedAt'].forEach(field => {
        const val = r[field];
        if (val) {
          const dateStr = val.split('T')[0];
          if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
            counts[dateStr] = (counts[dateStr] || 0) + 1;
            const y = parseInt(dateStr.split('-')[0], 10);
            if (!isNaN(y)) yearsSet.add(y);
          }
        }
      });
    });

    // Calculate streaks
    const today = new Date();
    const todayStr = formatLocalYYYYMMDD(today);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = formatLocalYYYYMMDD(yesterday);

    let curr = 0;
    let max = 0;

    // Check if active today or yesterday
    if (counts[todayStr]) {
      curr = 1;
      let checkDate = new Date(today);
      for (let i = 1; i <= 1000; i++) {
        checkDate.setDate(today.getDate() - i);
        const s = formatLocalYYYYMMDD(checkDate);
        if (counts[s]) {
          curr++;
        } else {
          break;
        }
      }
    } else if (counts[yesterdayStr]) {
      curr = 1;
      let checkDate = new Date(yesterday);
      for (let i = 1; i <= 1000; i++) {
        checkDate.setDate(yesterday.getDate() - i);
        const s = formatLocalYYYYMMDD(checkDate);
        if (counts[s]) {
          curr++;
        } else {
          break;
        }
      }
    }

    // Longest streak calculation across all time
    const sortedDates = Object.keys(counts).sort();
    let tempStreak = 0;
    let prevDate = null;

    sortedDates.forEach(dStr => {
      const parts = dStr.split('-').map(Number);
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      if (prevDate) {
        const diffDays = Math.round((d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
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
      totalActiveDays: Object.keys(counts).length,
      allRecordedYears: Array.from(yearsSet)
    };
  }, [questionsProgress, revisionLogs]);

  // Determine available years: First year is always 2026
  const currentCalendarYear = new Date().getFullYear();
  const baseYear = 2026;
  const maxYear = Math.max(baseYear, currentCalendarYear, ...(allRecordedYears.length > 0 ? allRecordedYears : [baseYear]));
  
  // Available years array sorted ascending (e.g., [2026, 2027, ...])
  const availableYears = useMemo(() => {
    const list = [];
    for (let y = baseYear; y <= maxYear; y++) {
      list.push(y);
    }
    return list;
  }, [baseYear, maxYear]);

  // Selected year state
  const [selectedYear, setSelectedYear] = useState(() => {
    return Math.max(baseYear, currentCalendarYear);
  });

  // Ensure selected year stays valid if maxYear increases
  useEffect(() => {
    if (selectedYear < baseYear) {
      setSelectedYear(baseYear);
    }
  }, [selectedYear, baseYear]);

  // Stats specific to the selected year
  const yearStats = useMemo(() => {
    let yearTotalActivity = 0;
    let yearActiveDays = 0;
    const prefix = `${selectedYear}-`;

    Object.entries(dateCounts).forEach(([dateStr, count]) => {
      if (dateStr.startsWith(prefix)) {
        yearTotalActivity += count;
        if (count > 0) yearActiveDays++;
      }
    });

    return {
      yearTotalActivity,
      yearActiveDays
    };
  }, [dateCounts, selectedYear]);

  // Build full-year grid (Jan 1 to Dec 31) for the selected year
  const { weeks, monthLabels, currentWeekIndex } = useMemo(() => {
    const today = new Date();
    const todayStr = formatLocalYYYYMMDD(today);

    // Jan 1 and Dec 31 of selected year
    const jan1 = new Date(selectedYear, 0, 1);
    const dec31 = new Date(selectedYear, 11, 31);

    // Grid starts on Sunday of the week containing Jan 1
    const startDate = new Date(selectedYear, 0, 1);
    startDate.setDate(jan1.getDate() - jan1.getDay());

    // Grid ends on Saturday of the week containing Dec 31
    const endDate = new Date(selectedYear, 11, 31);
    endDate.setDate(dec31.getDate() + (6 - dec31.getDay()));

    const resultWeeks = [];
    const months = [];
    let curMonthIndex = -1;
    let curWeekIdx = -1;

    let iterDate = new Date(startDate);
    let weekIndex = 0;

    while (iterDate <= endDate || resultWeeks.length < 52) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const cellDate = new Date(iterDate);
        const dateStr = formatLocalYYYYMMDD(cellDate);
        const cellYear = cellDate.getFullYear();
        const isInSelectedYear = cellYear === selectedYear;
        const count = isInSelectedYear ? (dateCounts[dateStr] || 0) : 0;
        const isFuture = cellDate > today;
        const isToday = dateStr === todayStr;

        // Track current week index for auto-scrolling
        if (isToday && selectedYear === today.getFullYear()) {
          curWeekIdx = weekIndex;
        }

        // Track month label on the week where the month first appears in this year
        if (isInSelectedYear && cellDate.getMonth() !== curMonthIndex && cellDate.getDate() <= 7) {
          curMonthIndex = cellDate.getMonth();
          const monthShort = cellDate.toLocaleString('default', { month: 'short' });
          months.push({
            weekIndex,
            label: monthShort
          });
        }

        week.push({
          dateStr,
          count,
          isInSelectedYear,
          isFuture,
          isToday,
          displayDate: cellDate.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        });

        // Advance to next day
        iterDate.setDate(iterDate.getDate() + 1);
      }
      resultWeeks.push(week);
      weekIndex++;

      if (iterDate > endDate && resultWeeks.length >= 52) {
        break;
      }
    }

    return {
      weeks: resultWeeks,
      monthLabels: months,
      currentWeekIndex: curWeekIdx >= 0 ? curWeekIdx : Math.floor(resultWeeks.length / 2)
    };
  }, [selectedYear, dateCounts]);

  // Auto-scroll on year change or mount: if current year, scroll towards today or start
  useEffect(() => {
    if (scrollContainerRef.current) {
      if (selectedYear === currentCalendarYear && currentWeekIndex > 10) {
        const targetScroll = Math.max(0, (currentWeekIndex - 8) * 16);
        scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }, [selectedYear, currentCalendarYear, currentWeekIndex]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  const getColorClass = (count, isFuture, isInYear, isToday) => {
    if (!isInYear) {
      return 'opacity-0 pointer-events-none';
    }
    if (isFuture) {
      return 'bg-gray-50/50 dark:bg-slate-800/20 border border-dashed border-gray-200 dark:border-slate-800/80 cursor-not-allowed';
    }
    if (!count || count === 0) {
      return `bg-gray-100 dark:bg-slate-800/80 border border-transparent hover:border-gray-400 dark:hover:border-slate-600 ${
        isToday ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900' : ''
      }`;
    }
    if (count === 1) {
      return `bg-emerald-200 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800/60 hover:ring-1 hover:ring-emerald-500 ${
        isToday ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900' : ''
      }`;
    }
    if (count <= 3) {
      return `bg-emerald-400 dark:bg-emerald-700 text-emerald-950 dark:text-emerald-100 border border-emerald-500 dark:border-emerald-600 hover:ring-1 hover:ring-emerald-500 ${
        isToday ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900' : ''
      }`;
    }
    if (count <= 5) {
      return `bg-emerald-600 dark:bg-emerald-500 text-white border border-emerald-600 dark:border-emerald-400 hover:ring-1 hover:ring-emerald-400 ${
        isToday ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900' : ''
      }`;
    }
    return `bg-emerald-700 dark:bg-emerald-400 text-white border border-emerald-800 dark:border-emerald-300 shadow-xs hover:ring-1 hover:ring-emerald-300 ${
      isToday ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900' : ''
    }`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-xl p-5 shadow-xs mb-6 transition-colors">
      {/* Top Banner Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-gray-900 dark:text-slate-100">
              Study Activity & Practice Heatmap
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              Full Year: Jan – Dec {selectedYear}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {yearStats.yearTotalActivity} {yearStats.yearTotalActivity === 1 ? 'submission' : 'submissions'} in {selectedYear} • {yearStats.yearActiveDays} active {yearStats.yearActiveDays === 1 ? 'day' : 'days'}
          </p>
        </div>

        {/* Global Streak & Best Streak Indicators */}
        <div className="flex items-center gap-4 sm:gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50">
              <Flame className="w-5 h-5 fill-amber-500 animate-pulse" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Current Streak</div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-slate-100">
                {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/50">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Best Streak</div>
              <div className="text-lg font-extrabold text-gray-900 dark:text-slate-100">
                {maxStreak} Days
              </div>
            </div>
          </div>

          <div className="hidden md:block text-right pl-2 border-l border-gray-200 dark:border-slate-800">
            <div className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">All-Time Active</div>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {totalActiveDays} Days
            </div>
          </div>
        </div>
      </div>

      {/* Year Selection and Scroll Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        {/* Year Tabs & Stepper */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mr-1">
            <History className="w-3.5 h-3.5 text-emerald-500" />
            Year History:
          </span>

          <button
            type="button"
            onClick={() => setSelectedYear(prev => Math.max(baseYear, prev - 1))}
            disabled={selectedYear <= baseYear}
            className={`p-1.5 rounded-md border text-xs flex items-center justify-center transition-all ${
              selectedYear <= baseYear
                ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-slate-800 text-gray-400'
                : 'border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 cursor-pointer active:scale-95'
            }`}
            title="Previous Year"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800/80 p-0.5 rounded-lg border border-gray-200 dark:border-slate-700/80">
            {availableYears.map(year => {
              const isSelected = year === selectedYear;
              const hasActivity = Object.keys(dateCounts).some(d => d.startsWith(`${year}-`));

              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white shadow-xs'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span>{year}</span>
                  {hasActivity && !isSelected && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5 align-middle" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setSelectedYear(prev => Math.min(maxYear, prev + 1))}
            disabled={selectedYear >= maxYear}
            className={`p-1.5 rounded-md border text-xs flex items-center justify-center transition-all ${
              selectedYear >= maxYear
                ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-slate-800 text-gray-400'
                : 'border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 cursor-pointer active:scale-95'
            }`}
            title="Next Year"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {selectedYear !== currentCalendarYear && currentCalendarYear >= baseYear && (
            <button
              type="button"
              onClick={() => setSelectedYear(currentCalendarYear)}
              className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 hover:underline ml-1 cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Current Year ({currentCalendarYear})
            </button>
          )}
        </div>

        {/* Horizontal Scroll Hint and Buttons */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="hidden sm:inline text-[11px]">Scroll Left ⇄ Right (Past to Current)</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleScrollLeft}
              className="p-1 rounded bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 cursor-pointer active:scale-95"
              title="Scroll Left (Earlier in Year)"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleScrollRight}
              className="p-1 rounded bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 cursor-pointer active:scale-95"
              title="Scroll Right (Later in Year)"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Heatmap Full-Year Grid (Jan to Dec) */}
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto pb-3 pt-1 scroll-smooth focus:outline-none"
        tabIndex={0}
      >
        <div className="inline-block min-w-[850px] select-none">
          {/* Months header */}
          <div className="flex text-[11px] text-gray-400 font-medium mb-1.5 pl-8 relative h-4">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                className="absolute transform -translate-x-1"
                style={{ left: `${32 + m.weekIndex * 15}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid rows */}
          <div className="flex gap-1">
            {/* Days of week labels (Sun - Sat) */}
            <div className="flex flex-col justify-between text-[9px] text-gray-400 font-semibold pr-2 h-[96px] select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Heatmap columns by week */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      title={
                        day.isInSelectedYear
                          ? `${day.displayDate}: ${day.count} ${day.count === 1 ? 'problem' : 'problems'} solved/reviewed${
                              day.isToday ? ' (Today)' : ''
                            }`
                          : ''
                      }
                      className={`w-[12px] h-[12px] rounded-[2px] transition-all duration-150 ${getColorClass(
                        day.count,
                        day.isFuture,
                        day.isInSelectedYear,
                        day.isToday
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Info Bar & Legend */}
          <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 mt-4 pt-2.5 border-t border-gray-100 dark:border-slate-800/80 gap-3">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="font-semibold text-gray-600 dark:text-gray-300">
                Jan 1, {selectedYear} – Dec 31, {selectedYear}
              </span>
              <span className="text-gray-300 dark:text-slate-700">•</span>
              <span>52 Weeks (Entire Year)</span>
              {selectedYear === currentCalendarYear && (
                <>
                  <span className="text-gray-300 dark:text-slate-700">•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Active Calendar Year</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px]">Less</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-[2px] bg-gray-100 dark:bg-slate-800 border border-transparent" title="0 submissions" />
                <div className="w-3 h-3 rounded-[2px] bg-emerald-200 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-800/60" title="1 submission" />
                <div className="w-3 h-3 rounded-[2px] bg-emerald-400 dark:bg-emerald-700 border border-emerald-500 dark:border-emerald-600" title="2-3 submissions" />
                <div className="w-3 h-3 rounded-[2px] bg-emerald-600 dark:bg-emerald-500 border border-emerald-600 dark:border-emerald-400" title="4-5 submissions" />
                <div className="w-3 h-3 rounded-[2px] bg-emerald-700 dark:bg-emerald-400 border border-emerald-800 dark:border-emerald-300" title="6+ submissions" />
              </div>
              <span className="text-[11px]">More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

