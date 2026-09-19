import React, { useState, useEffect } from 'react';
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
  Flame,
  Share2,
  Link as LinkIcon
} from 'lucide-react';
import { getEditorialSolution } from '../data/solutionsData';

export default function EditorialModal({
  isOpen,
  onClose,
  question,
  onMarkDone = () => {},
  onScheduleRevision = () => {},
  onOpenPlayground = () => {},
  isDone = false,
  isRevisit = false
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const toSlug = (name) => name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

  const editorial = question ? getEditorialSolution(question) : null;
  const slug = question ? toSlug(question.name) : '';
  const shareableUrl = `https://dsa.adnanahmad.tech/?solution=${slug}`;

  useEffect(() => {
    if (!isOpen || !question || !editorial) return;

    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';

    document.title = `${question.name} Solution & Editorial (Python 3) | DSA Tracker`;

    if (metaDesc) {
      metaDesc.setAttribute('content', `${editorial.overview} Complete working solution in Python 3 with Time Complexity ${editorial.complexity.time} and Space Complexity ${editorial.complexity.space}.`);
    }

    let scriptTag = document.getElementById('editorial-seo-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'editorial-seo-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": shareableUrl
      },
      "headline": `${question.name} - Complete Python Solution & Editorial`,
      "description": editorial.overview,
      "articleSection": question.topic,
      "keywords": `${question.name} python solution, ${question.name} leetcode python, ${question.name} editorial, ${question.topic}, ${question.pattern}, dsa problems`,
      "author": {
        "@type": "Person",
        "name": "Adnan Ahmad",
        "url": "https://adnanahmad.tech"
      },
      "publisher": {
        "@type": "Organization",
        "name": "DSA Mastery Tracker",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dsa.adnanahmad.tech/favicon.svg"
        }
      },
      "about": {
        "@type": "Thing",
        "name": question.name,
        "description": `Optimal algorithm for ${question.name} using ${question.pattern} technique.`
      }
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      const tag = document.getElementById('editorial-seo-jsonld');
      if (tag) tag.remove();
    };
  }, [isOpen, question, editorial, shareableUrl]);

  if (!isOpen || !question || !editorial) return null;

  const currentCode = editorial.code[selectedLanguage] || editorial.code.python || '';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const difficultyStyles = {
    Easy: 'border-emerald-500/40 text-emerald-400',
    Medium: 'border-amber-500/40 text-amber-400',
    Hard: 'border-rose-500/40 text-rose-400'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80">
      <div className="w-full max-w-4xl bg-[#18181b] rounded-md border border-zinc-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-[#18181b] flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5 font-mono text-xs">
              <span className="font-bold px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                #{question.id}
              </span>
              <span className={`px-2 py-0.5 rounded border bg-transparent font-medium ${difficultyStyles[question.difficulty] || difficultyStyles.Medium}`}>
                {question.difficulty}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">
                {question.topic}
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                {question.pattern}
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2 flex-wrap">
              <span>{question.name}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Share Link Button */}
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors cursor-pointer"
              title="Copy shareable link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                title="Open on LeetCode"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Editorial Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-sm text-zinc-200">
          
          {/* Section 1: Problem Overview */}
          <div className="p-4 rounded border border-zinc-800 bg-[#09090b]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2 font-mono">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              Problem Understanding & Constraints
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {editorial.overview}
            </p>
          </div>

          {/* Section 2: Intuition & Approaches */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Intuition & Thought Process
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-sans">
              {editorial.intuition}
            </p>

            {/* Approaches Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {editorial.approaches.map((app, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded border border-zinc-800 bg-[#09090b]"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-xs text-zinc-200">
                      {app.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-emerald-400 font-medium">
                      {app.timeComplexity}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Step-by-Step Algorithm Walkthrough */}
          {editorial.algorithmSteps && editorial.algorithmSteps.length > 0 && (
            <div className="p-4 rounded border border-zinc-800 bg-[#09090b] space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 mb-2 font-mono">
                <Layers className="w-4 h-4 text-indigo-400" />
                Step-by-Step Algorithm Walkthrough
              </h3>
              <ol className="space-y-1.5 text-xs text-zinc-300">
                {editorial.algorithmSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed flex-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Section 4: Complete Python 3 Code Implementation */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Python 3 Optimal Solution</span>
              </h3>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-emerald-400 font-medium border border-emerald-500/40">
                  Python 3 (LeetCode Signature)
                </span>
              </div>
            </div>

            {/* Code Block */}
            <div className="relative rounded border border-zinc-800 bg-[#09090b] text-zinc-100 font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-zinc-800 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-zinc-200 font-mono">Solution.py</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 overflow-x-auto leading-relaxed text-zinc-200 max-h-[420px] font-mono">
                <code>{currentCode}</code>
              </pre>
            </div>
          </div>

          {/* Section 5: Complexity Analysis */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Complexity Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded border border-zinc-800 bg-[#09090b]">
                <div className="flex items-center gap-2 font-semibold text-xs text-zinc-200 mb-1">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  <span>Time Complexity</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  {editorial.complexity.time}
                </p>
              </div>

              <div className="p-3.5 rounded border border-zinc-800 bg-[#09090b]">
                <div className="flex items-center gap-2 font-semibold text-xs text-zinc-200 mb-1">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span>Space Complexity</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  {editorial.complexity.space}
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: Edge Cases & Pitfalls */}
          {editorial.edgeCases && editorial.edgeCases.length > 0 && (
            <div className="p-4 rounded border border-zinc-800 bg-[#09090b]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2 font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Critical Edge Cases & Pitfalls
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400">
                {editorial.edgeCases.map((edge, idx) => (
                  <li key={idx} className="leading-relaxed">{edge}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Section 7: Technical Interview Tips */}
          {editorial.interviewTips && (
            <div className="p-4 rounded border border-zinc-800 bg-[#09090b]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5 font-mono">
                <Flame className="w-4 h-4 text-emerald-400" />
                Interview Insights & Trade-offs
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {editorial.interviewTips}
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-3.5 border-t border-zinc-800 bg-[#18181b] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onMarkDone(question)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium border transition-colors cursor-pointer ${
                isDone
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isDone ? 'Marked as Done' : 'Mark as Done'}</span>
            </button>

            <button
              onClick={() => onScheduleRevision(question)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-medium border transition-colors cursor-pointer ${
                isRevisit
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isRevisit ? 'In SRS Revision' : 'Add to SRS'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenPlayground(question);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded border border-indigo-500/40 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
              <span>Open in Code Arena</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 font-medium hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
