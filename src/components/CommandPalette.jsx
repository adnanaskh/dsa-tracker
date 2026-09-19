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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80">
      <div 
        className="w-full max-w-2xl bg-[#18181b] rounded-md border border-zinc-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
          <Search className="w-5 h-5 text-zinc-500" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none font-sans"
            placeholder="Search problems, topics, patterns, or commands... (Esc to close)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 rounded border border-zinc-700">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="p-1 rounded text-zinc-400 hover:text-zinc-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-1.5 divide-y divide-zinc-850">
          {filteredResults.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-xs">
              No results found for "<span className="font-semibold text-zinc-300">{query}</span>"
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
                    className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition-colors text-xs ${
                      isSelected
                        ? 'bg-zinc-800 text-zinc-100 font-medium'
                        : 'text-zinc-300 hover:bg-zinc-850'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 text-zinc-500" />
                    <span className="flex-1">{item.title}</span>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Action</span>
                  </div>
                );
              }

              // Question item - clean font-medium difficulty badge
              const diffStyles = {
                Easy: 'text-emerald-400',
                Medium: 'text-amber-400',
                Hard: 'text-rose-400'
              };

              return (
                <div
                  key={`q-${item.id}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between gap-3 px-3 py-2 rounded cursor-pointer transition-colors text-xs ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'hover:bg-zinc-850 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-zinc-500 w-7">#{item.id}</span>
                    <span className="font-medium text-xs truncate">{item.name}</span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hidden sm:inline font-mono">
                      Day {item.day} • {item.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-zinc-500 hidden md:inline font-mono">{item.pattern}</span>
                    <span className={`text-[11px] font-medium font-mono ${diffStyles[item.difficulty] || ''}`}>
                      {item.difficulty}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#09090b] border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[10px]">↑</kbd> <kbd className="font-mono bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[10px]">↓</kbd> Navigate</span>
            <span><kbd className="font-mono bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded text-[10px]">↵</kbd> Select</span>
          </div>
          <span className="font-mono text-[11px]">305 Problems</span>
        </div>
      </div>
    </div>
  );
}
