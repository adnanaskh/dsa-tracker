import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  RotateCcw, 
  BookOpen, 
  BarChart, 
  Moon, 
  Sun,
  Shuffle,
  X,
  Trophy,
  Crown
} from 'lucide-react';
import { INITIAL_QUESTIONS } from '../data/questionsData';

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectQuestion,
  onToggleTheme,
  isDark,
  onPickRandom,
  onOpenProfile
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Actions list
  const quickActions = [
    { id: 'tab-leaderboard', type: 'action', title: 'Go to Global Leaderboard', icon: Trophy, action: () => onNavigateTab('leaderboard') },
    { id: 'view-profile', type: 'action', title: 'View My Profile, Rank & Achievements', icon: Crown, action: () => onOpenProfile?.() },
    { id: 'tab-dashboard', type: 'action', title: 'Go to Dashboard', icon: BarChart, action: () => onNavigateTab('dashboard') },
    { id: 'tab-questions', type: 'action', title: 'Go to Questions Tracker', icon: CheckCircle2, action: () => onNavigateTab('questions') },
    { id: 'tab-planner', type: 'action', title: 'Go to Daily Planner (60 Days)', icon: Calendar, action: () => onNavigateTab('planner') },
    { id: 'tab-revision', type: 'action', title: 'Go to Spaced Revision Log', icon: RotateCcw, action: () => onNavigateTab('revision') },
    { id: 'tab-patterns', type: 'action', title: 'Go to DSA Patterns Guide', icon: BookOpen, action: () => onNavigateTab('patterns') },
    { id: 'random-q', type: 'action', title: 'Pick a Random Problem (Roulette)', icon: Shuffle, action: () => onPickRandom?.() },
    { id: 'toggle-theme', type: 'action', title: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`, icon: isDark ? Sun : Moon, action: () => onToggleTheme?.() },
  ];

  // Filter questions and actions
  const filteredResults = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return quickActions;
    }

    const matchedActions = quickActions.filter(a => a.title.toLowerCase().includes(q));

    const matchedQuestions = INITIAL_QUESTIONS.filter(item => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.pattern.toLowerCase().includes(q) ||
        item.difficulty.toLowerCase().includes(q) ||
        `day ${item.day}`.includes(q) ||
        `#${item.id}`.includes(q)
      );
    }).slice(0, 15); // Max 15 results

    return [...matchedActions, ...matchedQuestions];
  }, [query, isDark]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredResults[selectedIndex];
        if (selected) {
          handleSelect(selected);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Auto scroll to active item
  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;
    const activeItem = listEl.children[selectedIndex];
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleSelect = (item) => {
    if (item.type === 'action') {
      item.action();
    } else {
      // Question selected
      onSelectQuestion(item);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-gray-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none"
            placeholder="Search problems, topics, patterns, or quick commands... (Esc to close)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-800 rounded border border-gray-300 dark:border-slate-700">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-slate-800/40">
          {filteredResults.length === 0 ? (
            <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
              No results found for "<span className="font-semibold text-gray-600 dark:text-gray-300">{query}</span>"
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isAction = item.type === 'action';

              if (isAction) {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                    <span className="flex-1">{item.title}</span>
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">Action</span>
                  </div>
                );
              }

              // Question item
              const diffColors = {
                Easy: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
                Medium: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
                Hard: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800'
              };

              return (
                <div
                  key={`q-${item.id}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-gray-900 dark:text-white'
                      : 'hover:bg-gray-50 dark:hover:bg-slate-800/50 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-mono text-gray-400 w-8">#{item.id}</span>
                    <span className="font-medium text-sm truncate">{item.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 hidden sm:inline">
                      Day {item.day} • {item.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-gray-400 hidden md:inline">{item.pattern}</span>
                    <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${diffColors[item.difficulty] || ''}`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 px-1.5 py-0.5 rounded text-[10px]">↑</kbd> <kbd className="font-mono bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 px-1.5 py-0.5 rounded text-[10px]">↓</kbd> Navigate</span>
            <span><kbd className="font-mono bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 px-1.5 py-0.5 rounded text-[10px]">↵</kbd> Select</span>
          </div>
          <span>305 Curated DSA Problems</span>
        </div>
      </div>
    </div>
  );
}
