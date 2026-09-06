import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Terminal,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
  FileCode,
  Send,
  Loader2,
  FileText,
  BookOpen,
  History,
  Layers,
  HelpCircle,
  Tag,
  Cpu,
  CheckSquare
} from 'lucide-react';
import { runPythonTests } from '../utils/pyodideRunner';
import { getProblemTestSuite } from '../data/testCasesData';
import { getProblemDescription } from '../data/problemDescriptionsData';
import { getEditorialSolution } from '../data/solutionsData';

export default function CodePlaygroundModal({
  isOpen,
  onClose,
  question,
  initialCode = null,
  isDone = false,
  onSubmitSuccess = () => {},
  onOpenEditorial = () => {}
}) {
  const testSuite = useMemo(() => {
    return question ? getProblemTestSuite(question.id) : null;
  }, [question]);

  const problemDesc = useMemo(() => {
    return question ? getProblemDescription(question.id, question, testSuite) : null;
  }, [question, testSuite]);

  const editorial = useMemo(() => {
    return question ? getEditorialSolution(question) : null;
  }, [question]);

  // Left Pane Active Tab: 'description' | 'editorial' | 'submissions'
  const [leftTab, setLeftTab] = useState('description');

  const [code, setCode] = useState('');
  const [activeConsoleTab, setActiveConsoleTab] = useState('testcases'); // 'testcases' | 'result'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedExampleIdx, setCopiedExampleIdx] = useState(null);
  const textareaRef = useRef(null);

  // Initialize starter code when question opens
  useEffect(() => {
    if (isOpen && question && testSuite) {
      setCode(initialCode || testSuite.starterCode || '');
      setRunResult(null);
      setSubmitResult(null);
      setActiveConsoleTab('testcases');
      setSelectedCaseIdx(0);
      setLeftTab('description');
    }
  }, [isOpen, question, testSuite, initialCode]);

  // Keyboard shortcut: Ctrl + Enter to Run Code
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isRunning && !isSubmitting) {
          handleRunCode();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, code, testSuite, isRunning, isSubmitting]);

  if (!isOpen || !question || !testSuite) return null;

  const sampleCases = testSuite.sampleCases || [];
  const hiddenCases = testSuite.hiddenCases || [];
  const allCases = [...sampleCases, ...hiddenCases];

  const handleResetCode = () => {
    if (window.confirm('Reset code to default template? Any unsaved edits will be lost.')) {
      setCode(testSuite.starterCode || '');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyExample = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedExampleIdx(idx);
    setTimeout(() => setCopiedExampleIdx(null), 2000);
  };

  // Run Sample Test Cases
  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveConsoleTab('result');
    setSubmitResult(null);

    try {
      const result = await runPythonTests(code, testSuite.methodName, sampleCases);
      setRunResult(result);
    } catch (err) {
      setRunResult({
        allPassed: false,
        results: [],
        totalTimeMs: 0,
        error: err.message
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code against All Test Cases (Sample + Hidden)
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setActiveConsoleTab('result');
    setRunResult(null);

    try {
      const result = await runPythonTests(code, testSuite.methodName, allCases);
      setSubmitResult(result);

      if (result.allPassed) {
        onSubmitSuccess(question, code);
      }
    } catch (err) {
      setSubmitResult({
        allPassed: false,
        results: [],
        totalTimeMs: 0,
        error: err.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-300 dark:border-rose-800'
  };

  const activeResult = submitResult || runResult;
  const isEvaluating = isRunning || isSubmitting;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 md:p-4 bg-black/80 backdrop-blur-xs overflow-hidden">
      <div className="w-full max-w-7xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden flex flex-col h-[96vh] animate-in fade-in zoom-in-95">
        
        {/* Top Header Bar */}
        <div className="px-3.5 py-2.5 sm:px-5 sm:py-3 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-wrap">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
              #{question.id}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${difficultyColors[question.difficulty] || difficultyColors.Medium}`}>
              {question.difficulty}
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white truncate">
              {question.name}
            </h2>
            <span className="hidden md:inline-flex text-xs font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              {question.topic}
            </span>
            <span className="hidden lg:inline-flex text-xs font-medium px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
              {question.pattern}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                title="Open original problem on LeetCode"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Reset code */}
            <button
              onClick={handleResetCode}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
              title="Reset Code Template"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Copy code */}
            <button
              onClick={handleCopyCode}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
              title="Copy Code"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Split Workstation Pane */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
          
          {/* LEFT PANE: DESCRIPTION / EDITORIAL / SUBMISSIONS (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-0 overflow-hidden">
            
            {/* Left Tabs Bar */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 px-3 sm:px-4 bg-gray-50 dark:bg-slate-950 text-xs font-bold">
              <div className="flex gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setLeftTab('description')}
                  className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                    leftTab === 'description'
                      ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Description</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLeftTab('editorial')}
                  className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                    leftTab === 'editorial'
                      ? 'border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Editorial</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLeftTab('submissions')}
                  className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                    leftTab === 'submissions'
                      ? 'border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Submissions</span>
                </button>
              </div>

              {isDone && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  Solved
                </span>
              )}
            </div>

            {/* Left Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-sm text-gray-800 dark:text-slate-200">
              
              {/* TAB: DESCRIPTION */}
              {leftTab === 'description' && problemDesc && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {/* Problem Statement */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Problem Statement
                    </h3>
                    <div className="text-gray-900 dark:text-slate-100 text-sm leading-relaxed whitespace-pre-line font-sans">
                      {problemDesc.statement}
                    </div>
                  </div>

                  {/* Input & Output Format Specifications (TCS / CodeChef / Competitive Programming Style) */}
                  <div className="grid grid-cols-1 gap-3.5">
                    
                    {/* Input Format Card */}
                    <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wide">
                        <Cpu className="w-3.5 h-3.5 text-blue-500" />
                        <span>Input Format</span>
                      </div>
                      
                      {problemDesc.inputFormat?.functionSignature && (
                        <div className="font-mono text-xs p-2 rounded bg-white dark:bg-slate-950 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300">
                          <code>{problemDesc.inputFormat.functionSignature}</code>
                        </div>
                      )}

                      <p className="text-xs text-gray-700 dark:text-slate-300">
                        {problemDesc.inputFormat?.description}
                      </p>

                      {problemDesc.inputFormat?.standardInput && (
                        <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/50 text-[11px] text-gray-600 dark:text-slate-400 font-sans">
                          <span className="font-bold block mb-0.5 text-gray-800 dark:text-slate-200">
                            Standard Input (TCS / CodeChef / STDIN Format):
                          </span>
                          <pre className="whitespace-pre-line font-sans leading-relaxed">
                            {problemDesc.inputFormat.standardInput}
                          </pre>
                        </div>
                      )}
                    </div>

                    {/* Output Format Card */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide">
                        <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Output Format</span>
                      </div>

                      <div className="font-mono text-xs p-2 rounded bg-white dark:bg-slate-950 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold">
                        Return: <code>{problemDesc.outputFormat?.returnType}</code>
                      </div>

                      <p className="text-xs text-gray-700 dark:text-slate-300">
                        {problemDesc.outputFormat?.description}
                      </p>

                      {problemDesc.outputFormat?.standardOutput && (
                        <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-900/50 text-[11px] text-gray-600 dark:text-slate-400 font-sans">
                          <span className="font-bold block mb-0.5 text-gray-800 dark:text-slate-200">
                            Standard Output (STDOUT):
                          </span>
                          <p>{problemDesc.outputFormat.standardOutput}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Examples Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Examples
                    </h3>

                    {problemDesc.examples?.map((ex, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-950/60 overflow-hidden space-y-2 p-3.5 text-xs"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-slate-800 font-bold text-gray-900 dark:text-white">
                          <span>Example {ex.id || idx + 1}:</span>
                          <button
                            onClick={() => handleCopyExample(`Input: ${ex.input}\nOutput: ${ex.output}`, idx)}
                            className="text-[11px] font-normal text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedExampleIdx === idx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="font-mono space-y-1.5">
                          <div>
                            <span className="font-sans font-bold text-gray-600 dark:text-gray-400">Input: </span>
                            <span className="text-gray-900 dark:text-slate-200 font-semibold">{ex.input}</span>
                          </div>
                          <div>
                            <span className="font-sans font-bold text-gray-600 dark:text-gray-400">Output: </span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ex.output}</span>
                          </div>
                        </div>

                        {ex.explanation && (
                          <div className="pt-2 border-t border-gray-200/70 dark:border-slate-800/80 font-sans text-[11px] text-gray-600 dark:text-slate-400 leading-relaxed">
                            <strong className="text-gray-800 dark:text-slate-200">Explanation: </strong>
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints Section */}
                  <div className="space-y-2.5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Constraints
                    </h3>
                    <ul className="space-y-1.5">
                      {problemDesc.constraints?.map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-mono text-gray-700 dark:text-slate-300">
                          <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
                          <code>{c}</code>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Company Tags */}
                  {problemDesc.companyTags && problemDesc.companyTags.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-slate-800">
                      <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-purple-500" />
                        Target Company & Exam Relevance
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {problemDesc.companyTags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes / Interview Insights */}
                  {problemDesc.notes && (
                    <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Platform & Interview Insights</span>
                      </div>
                      <p className="leading-relaxed opacity-90">{problemDesc.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: EDITORIAL */}
              {leftTab === 'editorial' && (
                <div className="space-y-5 animate-in fade-in text-xs sm:text-sm">
                  {editorial ? (
                    <>
                      {/* Intuition */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5 text-sm">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          Intuition & Thought Process
                        </h3>
                        <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                          {editorial.intuition}
                        </p>
                      </div>

                      {/* Approaches */}
                      <div className="space-y-3">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                          Approaches & Trade-offs
                        </h3>
                        {editorial.approaches?.map((app, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 space-y-1.5 text-xs"
                          >
                            <div className="font-bold text-gray-900 dark:text-white">{app.name}</div>
                            <p className="text-gray-600 dark:text-slate-300">{app.description}</p>
                            <div className="flex gap-4 font-mono text-[11px] pt-1">
                              <span className="text-blue-600 dark:text-blue-400">Time: {app.timeComplexity}</span>
                              <span className="text-purple-600 dark:text-purple-400">Space: {app.spaceComplexity}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Algorithm Steps */}
                      {editorial.algorithmSteps && (
                        <div className="space-y-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                            Step-by-Step Algorithm
                          </h3>
                          <ol className="list-decimal list-inside space-y-1 text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                            {editorial.algorithmSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Complexity Analysis */}
                      {editorial.complexity && (
                        <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 space-y-1.5 text-xs">
                          <div className="font-bold text-gray-900 dark:text-white">Complexity Analysis</div>
                          <div className="text-gray-700 dark:text-slate-300">
                            <strong>Time:</strong> {editorial.complexity.time}
                          </div>
                          <div className="text-gray-700 dark:text-slate-300">
                            <strong>Space:</strong> {editorial.complexity.space}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-12 text-center text-gray-400 text-xs">
                      Editorial for this problem will be rendered shortly.
                    </div>
                  )}
                </div>
              )}

              {/* TAB: SUBMISSIONS */}
              {leftTab === 'submissions' && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Current Status:</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                        isDone
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-400'
                      }`}>
                        {isDone ? '✅ Solved' : '⏳ In Progress'}
                      </span>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-[11px]">
                      Your solution code is automatically saved whenever all test cases pass upon clicking <strong>Submit</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANE: PYTHON 3 WORKSPACE & TEST CONSOLE (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col bg-slate-950 min-h-0 overflow-hidden">
            
            {/* Python 3 Code Editor Area (Top 55-60%) */}
            <div className="flex-1 flex flex-col border-b border-gray-800 min-h-0 overflow-hidden">
              {/* Editor Language Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-300 shrink-0">
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-slate-200">Python 3 (Pyodide Wasm)</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Target: <code className="text-emerald-400">{testSuite.methodName}()</code>
                </span>
              </div>

              {/* Code Input Textarea */}
              <div className="flex-1 relative overflow-hidden flex bg-slate-950">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck="false"
                  className="w-full h-full p-4 font-mono text-xs sm:text-sm text-slate-100 bg-slate-950 resize-none outline-none leading-relaxed selection:bg-blue-600/40"
                  placeholder="# Write your complete Python solution here..."
                  style={{ tabSize: 4 }}
                />
              </div>
            </div>

            {/* Test Cases & Execution Results Console (Bottom 40-45%) */}
            <div className="h-56 sm:h-64 flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden shrink-0 border-t border-gray-200 dark:border-slate-800">
              {/* Console Tabs */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 px-4 bg-gray-100/70 dark:bg-slate-950 text-xs font-bold shrink-0">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab('testcases')}
                    className={`py-2 px-3 border-b-2 transition-colors cursor-pointer ${
                      activeConsoleTab === 'testcases'
                        ? 'border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-400'
                        : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    Testcases
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveConsoleTab('result')}
                    className={`py-2 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeConsoleTab === 'result'
                        ? 'border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-400'
                        : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Test Result</span>
                    {activeResult && (
                      <span className={`w-2 h-2 rounded-full ${activeResult.allPassed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    )}
                  </button>
                </div>

                {activeResult && !isEvaluating && (
                  <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activeResult.totalTimeMs} ms
                  </span>
                )}
              </div>

              {/* Console Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
                
                {/* CONSOLE TAB 1: TESTCASES PREVIEW */}
                {activeConsoleTab === 'testcases' && (
                  <div className="space-y-3 animate-in fade-in text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      {sampleCases.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedCaseIdx(idx)}
                          className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            selectedCaseIdx === idx
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-700'
                          }`}
                        >
                          Case {idx + 1}
                        </button>
                      ))}
                    </div>

                    {sampleCases[selectedCaseIdx] && (
                      <div className="space-y-2.5 font-mono text-xs">
                        <div>
                          <span className="font-sans font-bold text-gray-600 dark:text-slate-400 block mb-0.5">
                            Input:
                          </span>
                          <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 overflow-x-auto">
                            {JSON.stringify(sampleCases[selectedCaseIdx].input)}
                          </div>
                        </div>

                        <div>
                          <span className="font-sans font-bold text-gray-600 dark:text-slate-400 block mb-0.5">
                            Expected Output:
                          </span>
                          <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto">
                            {JSON.stringify(sampleCases[selectedCaseIdx].expected)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* CONSOLE TAB 2: TEST EXECUTION RESULT */}
                {activeConsoleTab === 'result' && (
                  <div className="space-y-3 animate-in fade-in">
                    {/* Loading Spinner */}
                    {isEvaluating && (
                      <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                        <p className="font-bold text-xs text-gray-800 dark:text-slate-200">
                          {isSubmitting ? 'Evaluating All Test Cases (Sample + Hidden)...' : 'Executing in Pyodide WebAssembly Sandbox...'}
                        </p>
                      </div>
                    )}

                    {/* Syntax / Runtime Error */}
                    {!isEvaluating && activeResult && activeResult.error && (
                      <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs space-y-1.5">
                        <div className="font-bold flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          <span>Runtime / Syntax Error</span>
                        </div>
                        <pre className="p-2.5 rounded-lg bg-rose-100/70 dark:bg-rose-950 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap text-[11px]">
                          {activeResult.error}
                        </pre>
                      </div>
                    )}

                    {/* Result Summary */}
                    {!isEvaluating && activeResult && !activeResult.error && (
                      <div className="space-y-3 text-xs">
                        {/* Overall Banner */}
                        <div className={`p-3 rounded-xl border flex items-center justify-between ${
                          activeResult.allPassed
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                        }`}>
                          <div className="flex items-center gap-2">
                            {activeResult.allPassed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                            )}
                            <div>
                              <h3 className="font-extrabold text-xs sm:text-sm">
                                {activeResult.allPassed ? 'Accepted' : 'Wrong Answer'}
                              </h3>
                              <p className="text-[11px] opacity-80">
                                {activeResult.results.filter(r => r.passed).length} / {activeResult.results.length} testcases passed
                              </p>
                            </div>
                          </div>

                          <div className="text-right font-mono text-xs font-bold">
                            <div>Runtime: {activeResult.totalTimeMs} ms</div>
                          </div>
                        </div>

                        {/* Cases Selector */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {activeResult.results.map((res, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedCaseIdx(idx)}
                              className={`px-2.5 py-1 rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                                selectedCaseIdx === idx
                                  ? res.passed
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-rose-600 text-white'
                                  : res.passed
                                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                              }`}
                            >
                              {res.passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                              <span>Case {res.caseIndex}</span>
                            </button>
                          ))}
                        </div>

                        {/* Selected Case Inspection */}
                        {activeResult.results[selectedCaseIdx] && (
                          <div className="p-3 rounded-xl bg-gray-100/80 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 space-y-2 font-mono text-xs">
                            <div>
                              <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                Input:
                              </span>
                              <div className="text-gray-900 dark:text-slate-100 overflow-x-auto">
                                {JSON.stringify(activeResult.results[selectedCaseIdx].input)}
                              </div>
                            </div>

                            <div>
                              <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                Output:
                              </span>
                              <div className={activeResult.results[selectedCaseIdx].passed ? 'text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto' : 'text-rose-600 dark:text-rose-400 font-bold overflow-x-auto'}>
                                {JSON.stringify(activeResult.results[selectedCaseIdx].actual)}
                              </div>
                            </div>

                            <div>
                              <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                Expected:
                              </span>
                              <div className="text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto">
                                {JSON.stringify(activeResult.results[selectedCaseIdx].expected)}
                              </div>
                            </div>

                            {activeResult.results[selectedCaseIdx].stdout && (
                              <div className="pt-2 border-t border-gray-200 dark:border-slate-800">
                                <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                  Stdout:
                                </span>
                                <pre className="text-slate-300 whitespace-pre-wrap text-[11px]">
                                  {activeResult.results[selectedCaseIdx].stdout}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Empty State before running */}
                    {!isEvaluating && !activeResult && (
                      <div className="py-8 text-center text-gray-500 dark:text-gray-400 text-xs space-y-1">
                        <Play className="w-6 h-6 mx-auto text-gray-400 opacity-40" />
                        <p className="font-bold text-xs">No Execution Results Yet</p>
                        <p className="text-[11px]">Click "Run Code" or press Ctrl+Enter to test sample inputs.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls Bar */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">
              💡 Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-slate-800 rounded font-mono text-[10px]">Ctrl + Enter</kbd> to Run, or Submit to validate against the full test suite.
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Run Code Button */}
            <button
              type="button"
              disabled={isEvaluating}
              onClick={handleRunCode}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>Run Code</span>
            </button>

            {/* Submit Button */}
            <button
              type="button"
              disabled={isEvaluating}
              onClick={handleSubmitCode}
              className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold transition-all disabled:opacity-50 cursor-pointer shadow-md active:scale-95"
            >
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
