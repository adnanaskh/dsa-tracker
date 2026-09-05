import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Code2, 
  Clock, 
  Database, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw,
  Layers,
  HelpCircle,
  FileCode,
  Flame
} from 'lucide-react';
import { getEditorialSolution } from '../data/solutionsData';

export default function EditorialModal({
  isOpen,
  onClose,
  question,
  onMarkDone = () => {},
  onScheduleRevision = () => {},
  isDone = false,
  isRevisit = false
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('python'); // 'python' | 'java' | 'cpp' | 'javascript'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !question) return null;

  const editorial = getEditorialSolution(question);
  if (!editorial) return null;

  const currentCode = editorial.code[selectedLanguage] || editorial.code.python || '';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-300 dark:border-rose-800'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-900/80 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                #{question.id}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${difficultyColors[question.difficulty] || difficultyColors.Medium}`}>
                {question.difficulty}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                {question.topic}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                {question.pattern}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <span>{question.name}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                GFG-Style Editorial
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                title="Open original problem on LeetCode"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Editorial Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-gray-800 dark:text-slate-200">
          
          {/* Section 1: Problem Overview */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-2">
              <HelpCircle className="w-4 h-4 text-blue-500" />
              Problem Understanding & Constraints
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
              {editorial.overview}
            </p>
          </div>

          {/* Section 2: Intuition & Approaches */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Intuition & Thought Process
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-slate-300">
              {editorial.intuition}
            </p>

            {/* Approaches Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {editorial.approaches.map((app, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-gray-900 dark:text-white">
                      {app.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      {app.timeComplexity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Complete Code Implementation (Multi-Language) */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-500" />
                Complete Working Code
              </h3>

              {/* Language Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                {[
                  { id: 'python', label: 'Python 3' },
                  { id: 'java', label: 'Java' },
                  { id: 'cpp', label: 'C++' },
                  { id: 'javascript', label: 'JavaScript' }
                ].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                      selectedLanguage === lang.id
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-emerald-400 shadow-xs'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Block */}
            <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="uppercase font-bold tracking-wider">{selectedLanguage}</span>
                  <span>• Optimal Solution</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 overflow-x-auto leading-relaxed text-slate-200 max-h-[380px]">
                <code>{currentCode}</code>
              </pre>
            </div>
          </div>

          {/* Section 4: Complexity Analysis */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              Complexity Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-800/40">
                <div className="flex items-center gap-2 font-bold text-xs text-gray-900 dark:text-white mb-1">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Time Complexity</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                  {editorial.complexity.time}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-800/40">
                <div className="flex items-center gap-2 font-bold text-xs text-gray-900 dark:text-white mb-1">
                  <Database className="w-4 h-4 text-purple-500" />
                  <span>Space Complexity</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-mono">
                  {editorial.complexity.space}
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Edge Cases & Pitfalls */}
          {editorial.edgeCases && editorial.edgeCases.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Critical Edge Cases & Pitfalls
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-amber-950 dark:text-amber-200">
                {editorial.edgeCases.map((edge, idx) => (
                  <li key={idx} className="leading-relaxed">{edge}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 6: FAANG Interview Tips */}
          {editorial.interviewTips && (
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1.5">
                <Flame className="w-4 h-4 text-emerald-600" />
                FAANG Interview Pro Tip
              </h3>
              <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                {editorial.interviewTips}
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onMarkDone(question)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                isDone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-500 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isDone ? 'Marked as Done' : 'Mark as Done'}</span>
            </button>

            <button
              onClick={() => onScheduleRevision(question)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                isRevisit
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isRevisit ? 'In Spaced Revision' : 'Add to Revision (SRS)'}</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close Editorial
          </button>
        </div>
      </div>
    </div>
  );
}
