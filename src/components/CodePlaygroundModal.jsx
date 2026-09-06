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
  Loader2
} from 'lucide-react';
import { runPythonTests } from '../utils/pyodideRunner';
import { getProblemTestSuite } from '../data/testCasesData';

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

  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('testcases'); // 'testcases' | 'result'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const textareaRef = useRef(null);

  // Initialize starter code when question opens
  useEffect(() => {
    if (isOpen && question && testSuite) {
      setCode(initialCode || testSuite.starterCode || '');
      setRunResult(null);
      setSubmitResult(null);
      setActiveTab('testcases');
      setSelectedCaseIdx(0);
    }
  }, [isOpen, question, testSuite, initialCode]);

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

  // Run Sample Test Cases
  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveTab('result');
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

  // Submit Code against All Test Cases
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setActiveTab('result');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-hidden">
      <div className="w-full max-w-6xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden flex flex-col h-[94vh] animate-in fade-in zoom-in-95">
        
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
              #{question.id}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${difficultyColors[question.difficulty] || difficultyColors.Medium}`}>
              {question.difficulty}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
              {question.name}
            </h2>
            <span className="hidden md:inline-flex text-xs font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              {question.topic}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Editorial Button */}
            <button
              onClick={() => onOpenEditorial(question)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 text-purple-700 dark:text-purple-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Editorial</span>
            </button>

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

        {/* Split Workstation Pane (Code Editor on Top/Left, Test Cases & Console on Bottom/Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
          
          {/* Left / Top: Code Editor Area (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-slate-800 bg-slate-950">
            {/* Editor Top Language Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-slate-200">Python 3 (CPython 3.11 WebAssembly)</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Method: <code className="text-emerald-400">{testSuite.methodName}()</code>
              </span>
            </div>

            {/* Code Input Area */}
            <div className="flex-1 relative overflow-hidden flex">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="w-full h-full p-4 font-mono text-xs sm:text-sm text-slate-100 bg-slate-950 resize-none outline-none leading-relaxed selection:bg-blue-600/40"
                placeholder="# Write your Python solution here..."
                style={{ tabSize: 4 }}
              />
            </div>
          </div>

          {/* Right / Bottom: Test Cases & Execution Results (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden">
            {/* Console Tab Navigation */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 px-4 bg-gray-100/70 dark:bg-slate-950 text-xs font-bold">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('testcases')}
                  className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'testcases'
                      ? 'border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-400'
                      : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                  }`}
                >
                  Testcases
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('result')}
                  className={`py-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'result'
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

            {/* Panel Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* TAB 1: TESTCASES PREVIEW */}
              {activeTab === 'testcases' && (
                <div className="space-y-4 animate-in fade-in text-xs">
                  {/* Test Case Selector Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {sampleCases.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedCaseIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          selectedCaseIdx === idx
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-700'
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* Selected Case Content */}
                  {sampleCases[selectedCaseIdx] && (
                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <span className="font-sans font-bold text-gray-600 dark:text-slate-400 block mb-1">
                          Input:
                        </span>
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 overflow-x-auto">
                          {JSON.stringify(sampleCases[selectedCaseIdx].input)}
                        </div>
                      </div>

                      <div>
                        <span className="font-sans font-bold text-gray-600 dark:text-slate-400 block mb-1">
                          Expected Output:
                        </span>
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto">
                          {JSON.stringify(sampleCases[selectedCaseIdx].expected)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: TEST EXECUTION RESULT */}
              {activeTab === 'result' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Loading Spinner */}
                  {isEvaluating && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      <p className="font-bold text-sm text-gray-800 dark:text-slate-200">
                        {isSubmitting ? 'Evaluating All Test Cases...' : 'Executing in Pyodide WebAssembly Sandbox...'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Initializing Python 3 runtime and compiling Solution
                      </p>
                    </div>
                  )}

                  {/* Execution Error / Compilation Error */}
                  {!isEvaluating && activeResult && activeResult.error && (
                    <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs space-y-2">
                      <div className="font-bold flex items-center gap-1.5 text-sm">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Runtime / Syntax Error</span>
                      </div>
                      <pre className="p-3 rounded-lg bg-rose-100/70 dark:bg-rose-950 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
                        {activeResult.error}
                      </pre>
                    </div>
                  )}

                  {/* Evaluation Success / Accepted Result */}
                  {!isEvaluating && activeResult && !activeResult.error && (
                    <div className="space-y-4 text-xs">
                      {/* Overall Status Banner */}
                      <div className={`p-4 rounded-xl border flex items-center justify-between ${
                        activeResult.allPassed
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          {activeResult.allPassed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 text-rose-500 shrink-0" />
                          )}
                          <div>
                            <h3 className="font-extrabold text-sm sm:text-base">
                              {activeResult.allPassed ? 'Accepted' : 'Wrong Answer'}
                            </h3>
                            <p className="text-[11px] opacity-80">
                              {activeResult.results.filter(r => r.passed).length} / {activeResult.results.length} testcases passed
                            </p>
                          </div>
                        </div>

                        <div className="text-right font-mono text-xs font-bold">
                          <div>Runtime: {activeResult.totalTimeMs} ms</div>
                          {activeResult.allPassed && submitResult && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-sans">
                              Problem Marked Solved!
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Case by Case Breakdown Tabs */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {activeResult.results.map((res, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setSelectedCaseIdx(idx)}
                              className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
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
                          <div className="p-3.5 rounded-xl bg-gray-100/80 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 space-y-2.5 font-mono text-xs">
                            <div>
                              <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                Input:
                              </span>
                              <div className="text-gray-900 dark:text-slate-100">
                                {JSON.stringify(activeResult.results[selectedCaseIdx].input)}
                              </div>
                            </div>

                            <div>
                              <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                Output:
                              </span>
                              <div className={activeResult.results[selectedCaseIdx].passed ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                                {JSON.stringify(activeResult.results[selectedCaseIdx].actual)}
                              </div>
                            </div>

                            <div>
                              <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                Expected:
                              </span>
                              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                                {JSON.stringify(activeResult.results[selectedCaseIdx].expected)}
                              </div>
                            </div>

                            {activeResult.results[selectedCaseIdx].stdout && (
                              <div className="pt-2 border-t border-gray-200 dark:border-slate-800">
                                <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                  Stdout:
                                </span>
                                <pre className="text-slate-300 whitespace-pre-wrap">
                                  {activeResult.results[selectedCaseIdx].stdout}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Empty State before running */}
                  {!isEvaluating && !activeResult && (
                    <div className="py-12 text-center text-gray-500 dark:text-gray-400 text-xs space-y-2">
                      <Play className="w-8 h-8 mx-auto text-gray-400 opacity-40" />
                      <p className="font-bold text-sm">No Execution Results Yet</p>
                      <p>Click "Run Code" to test sample inputs or "Submit" to validate all test cases.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls Bar */}
        <div className="p-3.5 sm:p-4 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">
              Submission passes if 100% of test cases are valid.
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
