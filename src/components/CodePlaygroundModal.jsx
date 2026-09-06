import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  Calendar,
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
  CheckSquare,
  Maximize2,
  Minimize2,
  Columns,
  GripVertical,
  GripHorizontal,
  ChevronUp,
  ChevronDown,
  Type,
  WrapText,
  Save,
  ArrowUpRight,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { runPythonTests } from '../utils/pyodideRunner';
import { getProblemTestSuite } from '../data/testCasesData';
import { getProblemDescription } from '../data/problemDescriptionsData';
import { getEditorialSolution } from '../data/solutionsData';

const DEFAULT_CLEAN_PLACEHOLDER = `# Write your code here\n`;

export default function CodePlaygroundModal({
  isOpen,
  onClose,
  question,
  initialCode = null,
  isDone = false,
  onSaveCode = () => {},
  onRunCode = () => {},
  onSubmitSuccess = () => {},
  onSubmitAttempt = () => {},
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

  // Selected Language: 'python3' | 'python'
  const [selectedLanguage, setSelectedLanguage] = useState('python3');

  // Dynamic Workspace Layout State
  const [leftWidthPercent, setLeftWidthPercent] = useState(48); // 15% to 85%
  const [consoleHeightPx, setConsoleHeightPx] = useState(250); // 40px to 600px
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(13); // 12, 13, 14, 16
  const [isWordWrap, setIsWordWrap] = useState(false);
  const [isConsoleMinimized, setIsConsoleMinimized] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);

  const [code, setCode] = useState(DEFAULT_CLEAN_PLACEHOLDER);
  const [activeConsoleTab, setActiveConsoleTab] = useState('testcases'); // 'testcases' | 'result'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedExampleIdx, setCopiedExampleIdx] = useState(null);
  const [saveToast, setSaveToast] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [expandedSubmissionId, setExpandedSubmissionId] = useState(null);
  const [copiedSubmissionId, setCopiedSubmissionId] = useState(null);

  const containerRef = useRef(null);
  const rightPaneRef = useRef(null);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // Dragging states
  const isDraggingHorizontal = useRef(false);
  const isDraggingVertical = useRef(false);

  // Initialize clean code and load latest saved version or submission history
  useEffect(() => {
    if (isOpen && question && testSuite) {
      // 1. Check if user already has saved code in localStorage
      const localSaved = localStorage.getItem(`dsa_user_code_${question.id}`);
      let codeToUse = DEFAULT_CLEAN_PLACEHOLDER;

      if (localSaved && localSaved.trim().length > 0) {
        codeToUse = localSaved;
      } else if (
        initialCode &&
        initialCode.trim().length > 0 &&
        !initialCode.includes('class Solution:\n    def ') &&
        !initialCode.includes('def solve():\n    pass')
      ) {
        codeToUse = initialCode;
      }

      setCode(codeToUse);
      setRunResult(null);
      setSubmitResult(null);
      setActiveConsoleTab('testcases');
      setSelectedCaseIdx(0);
      setLeftTab('description');
      setExpandedSubmissionId(null);

      // Load previous submissions from localStorage & include saved solution
      try {
        const rawSubs = localStorage.getItem(`dsa_submissions_${question.id}`);
        let parsed = rawSubs ? JSON.parse(rawSubs) : [];
        if (
          parsed.length === 0 && 
          initialCode && 
          initialCode.trim().length > 0 && 
          !initialCode.includes('class Solution:\n    def ') && 
          !initialCode.includes('def solve():\n    pass')
        ) {
          parsed = [{
            id: 'sub_saved_' + question.id,
            timestamp: new Date().toISOString(),
            formattedDate: 'Saved Code',
            formattedTime: 'Synced',
            status: 'Accepted',
            allPassed: true,
            passedCount: testSuite.sampleCases?.length || 1,
            totalCount: testSuite.sampleCases?.length || 1,
            runtimeMs: 0,
            language: 'Python 3',
            code: initialCode
          }];
        }
        setSubmissions(parsed);
      } catch (e) {
        setSubmissions([]);
      }
    }
  }, [isOpen, question, testSuite, initialCode]);

  // Save code helper
  const handleSaveCode = useCallback((codeToSave = code, showToast = true) => {
    if (!question) return;
    try {
      localStorage.setItem(`dsa_user_code_${question.id}`, codeToSave);
    } catch (e) {
      console.error('Failed to save code to localStorage', e);
    }
    onSaveCode(question, codeToSave);
    if (showToast) {
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2000);
    }
  }, [code, question, onSaveCode]);

  // Debounced auto-save on code change (1.5s after user stops typing)
  useEffect(() => {
    if (!isOpen || !question) return;
    if (code === DEFAULT_CLEAN_PLACEHOLDER) return;

    const timer = setTimeout(() => {
      handleSaveCode(code, false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [code, isOpen, question, handleSaveCode]);

  // Sync line numbers scrolling with code textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Tab key indentation support (inserts 4 spaces)
  const handleKeyDownTextarea = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  // Keyboard shortcut: Ctrl + Enter to Run Code, Ctrl + S to Save Code
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isRunning && !isSubmitting) {
          handleRunCode();
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleSaveCode(code, true);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, code, testSuite, isRunning, isSubmitting, handleSaveCode]);

  // Horizontal Resizer (Left Width Adjustment)
  const startHorizontalDrag = useCallback((e) => {
    e.preventDefault();
    isDraggingHorizontal.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onPointerMove = (moveEvent) => {
      if (!isDraggingHorizontal.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((moveEvent.clientX - rect.left) / rect.width) * 100;
      if (newWidth >= 18 && newWidth <= 82) {
        setLeftWidthPercent(newWidth);
        setIsLeftCollapsed(false);
      }
    };

    const onPointerUp = () => {
      isDraggingHorizontal.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, []);

  // Vertical Resizer (Console Height Adjustment)
  const startVerticalDrag = useCallback((e) => {
    e.preventDefault();
    isDraggingVertical.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';

    const onPointerMove = (moveEvent) => {
      if (!isDraggingVertical.current || !rightPaneRef.current) return;
      const rect = rightPaneRef.current.getBoundingClientRect();
      const newHeight = rect.bottom - moveEvent.clientY;
      if (newHeight >= 60 && newHeight <= rect.height - 80) {
        setConsoleHeightPx(newHeight);
        setIsConsoleMinimized(false);
      }
    };

    const onPointerUp = () => {
      isDraggingVertical.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }, []);

  if (!isOpen || !question || !testSuite) return null;

  const sampleCases = testSuite.sampleCases || [];
  const hiddenCases = testSuite.hiddenCases || [];
  const allCases = [...sampleCases, ...hiddenCases];

  const handleResetCode = () => {
    if (window.confirm('Clear editor and start fresh? Any unsaved edits will be cleared.')) {
      setCode(DEFAULT_CLEAN_PLACEHOLDER);
      handleSaveCode(DEFAULT_CLEAN_PLACEHOLDER, true);
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
    handleSaveCode(code, false); // Auto-save latest code
    onRunCode?.(question, code);
    setIsRunning(true);
    setActiveConsoleTab('result');
    setSubmitResult(null);
    if (isConsoleMinimized) setIsConsoleMinimized(false);

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
    handleSaveCode(code, false); // Auto-save latest code
    setIsSubmitting(true);
    setActiveConsoleTab('result');
    setRunResult(null);
    if (isConsoleMinimized) setIsConsoleMinimized(false);

    try {
      const result = await runPythonTests(code, testSuite.methodName, allCases);
      setSubmitResult(result);

      // Record new submission entry
      const now = new Date();
      const newSubmission = {
        id: 'sub_' + Date.now(),
        timestamp: now.toISOString(),
        formattedDate: now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        formattedTime: now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
        status: result.allPassed ? 'Accepted' : (result.error ? 'Runtime Error' : 'Wrong Answer'),
        allPassed: result.allPassed,
        passedCount: result.results ? result.results.filter(r => r.passed).length : 0,
        totalCount: result.results ? result.results.length : allCases.length,
        runtimeMs: result.totalTimeMs || 0,
        language: selectedLanguage === 'python' ? 'Python' : 'Python 3',
        code: code
      };

      const updatedSubs = [newSubmission, ...submissions].slice(0, 50);
      setSubmissions(updatedSubs);
      try {
        localStorage.setItem(`dsa_submissions_${question.id}`, JSON.stringify(updatedSubs));
      } catch (e) {}

      if (result.allPassed) {
        onSubmitSuccess(question, code);
      } else {
        onSubmitAttempt?.(question, code, false);
      }
    } catch (err) {
      const now = new Date();
      const newSubmission = {
        id: 'sub_' + Date.now(),
        timestamp: now.toISOString(),
        formattedDate: now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
        formattedTime: now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
        status: 'Runtime Error',
        allPassed: false,
        passedCount: 0,
        totalCount: allCases.length,
        runtimeMs: 0,
        language: selectedLanguage === 'python' ? 'Python' : 'Python 3',
        code: code,
        error: err.message
      };
      const updatedSubs = [newSubmission, ...submissions].slice(0, 50);
      setSubmissions(updatedSubs);
      try {
        localStorage.setItem(`dsa_submissions_${question.id}`, JSON.stringify(updatedSubs));
      } catch (e) {}

      onSubmitAttempt?.(question, code, false);

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

  // Restore past submission code into the editor
  const handleLoadSubmissionCode = (subCode) => {
    setCode(subCode);
    handleSaveCode(subCode, true);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Clear submission history
  const handleClearSubmissions = () => {
    if (window.confirm('Clear all submission records for this problem?')) {
      setSubmissions([]);
      try {
        localStorage.removeItem(`dsa_submissions_${question.id}`);
      } catch (e) {}
    }
  };

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
    Medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-800',
    Hard: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-300 dark:border-rose-800'
  };

  const activeResult = submitResult || runResult;
  const isEvaluating = isRunning || isSubmitting;

  // Calculate line numbers
  const lineCount = Math.max(1, code.split('\n').length);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const effectiveLeftWidth = isLeftCollapsed ? 0 : leftWidthPercent;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-1 sm:p-2 md:p-3'} bg-black/85 backdrop-blur-xs overflow-hidden`}>
      <div className={`w-full ${isFullscreen ? 'h-screen rounded-none' : 'max-w-[98vw] h-[98vh] rounded-2xl'} bg-white dark:bg-slate-900 shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in fade-in zoom-in-95`}>
        
        {/* Top Header Bar */}
        <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-wrap">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
              #{question.id}
            </span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${difficultyColors[question.difficulty] || difficultyColors.Medium}`}>
              {question.difficulty}
            </span>
            <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-gray-900 dark:text-white truncate">
              {question.name}
            </h2>
            <span className="hidden md:inline-flex text-xs font-medium px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
              {question.topic}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Split Presets */}
            <div className="hidden xl:flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-gray-200/80 dark:bg-slate-800 text-[11px] font-bold text-gray-600 dark:text-gray-300">
              <button
                onClick={() => { setLeftWidthPercent(30); setIsLeftCollapsed(false); }}
                className={`px-1.5 py-0.5 rounded ${leftWidthPercent === 30 && !isLeftCollapsed ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'hover:text-gray-900'}`}
                title="Code Focus (30% Description / 70% Code)"
              >
                30/70
              </button>
              <button
                onClick={() => { setLeftWidthPercent(50); setIsLeftCollapsed(false); }}
                className={`px-1.5 py-0.5 rounded ${leftWidthPercent === 50 && !isLeftCollapsed ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'hover:text-gray-900'}`}
                title="Balanced (50% Description / 50% Code)"
              >
                50/50
              </button>
              <button
                onClick={() => { setLeftWidthPercent(70); setIsLeftCollapsed(false); }}
                className={`px-1.5 py-0.5 rounded ${leftWidthPercent === 70 && !isLeftCollapsed ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs' : 'hover:text-gray-900'}`}
                title="Reading Focus (70% Description / 30% Code)"
              >
                70/30
              </button>
            </div>

            {/* Toggle Left Sidebar */}
            <button
              onClick={() => setIsLeftCollapsed(!isLeftCollapsed)}
              className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${isLeftCollapsed ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-slate-700'}`}
              title={isLeftCollapsed ? "Show Description Panel" : "Maximize Code Workspace"}
            >
              <Columns className="w-3.5 h-3.5" />
            </button>

            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300 text-xs font-semibold transition-colors"
                title="Open on LeetCode"
              >
                <span>LeetCode</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen IDE"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
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

        {/* Dynamic Split Workstation Body */}
        <div ref={containerRef} className="flex-1 flex min-h-0 overflow-hidden relative select-auto">
          
          {/* LEFT PANE: DESCRIPTION / EDITORIAL / SUBMISSIONS */}
          {!isLeftCollapsed && (
            <div 
              style={{ width: `${effectiveLeftWidth}%` }}
              className="flex flex-col border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 min-h-0 overflow-hidden shrink-0"
            >
              {/* Left Tabs Bar */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 px-3 bg-gray-50 dark:bg-slate-950 text-xs font-bold shrink-0">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setLeftTab('description')}
                    className={`py-2 px-2.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
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
                    className={`py-2 px-2.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
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
                    className={`py-2 px-2.5 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                      leftTab === 'submissions'
                        ? 'border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400'
                        : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Submissions</span>
                    {submissions.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold ml-0.5">
                        {submissions.length}
                      </span>
                    )}
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
                
                {/* TAB 1: DESCRIPTION */}
                {leftTab === 'description' && problemDesc && (
                  <div className="space-y-5 animate-in fade-in">
                    
                    {/* Problem Statement */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Problem Statement
                      </h3>
                      <div className="text-gray-900 dark:text-slate-100 text-sm leading-relaxed whitespace-pre-line font-sans">
                        {problemDesc.statement}
                      </div>
                    </div>

                    {/* Standard Input & Output Format Specifications */}
                    <div className="grid grid-cols-1 gap-3">
                      
                      {/* Input Format Card */}
                      <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wide">
                          <Cpu className="w-3.5 h-3.5 text-blue-500" />
                          <span>Input Format (STDIN)</span>
                        </div>

                        <pre className="whitespace-pre-line font-sans text-xs text-gray-800 dark:text-slate-200 leading-relaxed">
                          {problemDesc.inputFormat?.standardInput}
                        </pre>

                        {problemDesc.inputFormat?.explanation && (
                          <p className="text-[11px] text-gray-600 dark:text-slate-400 pt-1 border-t border-blue-200/50 dark:border-blue-900/50">
                            {problemDesc.inputFormat.explanation}
                          </p>
                        )}
                      </div>

                      {/* Output Format Card */}
                      <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wide">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Output Format (STDOUT)</span>
                        </div>

                        <p className="text-xs text-gray-800 dark:text-slate-200 leading-relaxed font-sans">
                          {problemDesc.outputFormat?.standardOutput}
                        </p>

                        {problemDesc.outputFormat?.explanation && (
                          <p className="text-[11px] text-gray-600 dark:text-slate-400 pt-1 border-t border-emerald-200/50 dark:border-emerald-900/50">
                            {problemDesc.outputFormat.explanation}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Examples Section */}
                    <div className="space-y-3.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Examples
                      </h3>

                      {problemDesc.examples?.map((ex, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-slate-950/60 overflow-hidden space-y-2 p-3 text-xs"
                        >
                          <div className="flex items-center justify-between pb-1.5 border-b border-gray-200 dark:border-slate-800 font-bold text-gray-900 dark:text-white">
                            <span>Example {ex.id || idx + 1}:</span>
                            <button
                              onClick={() => handleCopyExample(`Input:\n${ex.input}\n\nOutput:\n${ex.output}`, idx)}
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
                              <span className="font-sans font-bold text-gray-600 dark:text-gray-400 block mb-0.5">
                                Input:
                              </span>
                              <pre className="p-2 rounded bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-200 whitespace-pre-wrap">
                                {ex.input}
                              </pre>
                            </div>
                            <div>
                              <span className="font-sans font-bold text-gray-600 dark:text-gray-400 block mb-0.5">
                                Output:
                              </span>
                              <pre className="p-2 rounded bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold whitespace-pre-wrap">
                                {ex.output}
                              </pre>
                            </div>
                          </div>

                          {ex.explanation && (
                            <div className="pt-1.5 border-t border-gray-200/70 dark:border-slate-800/80 font-sans text-[11px] text-gray-600 dark:text-slate-400 leading-relaxed">
                              <strong className="text-gray-800 dark:text-slate-200">Explanation: </strong>
                              {ex.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Constraints Section */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Constraints
                      </h3>
                      <ul className="space-y-1">
                        {problemDesc.constraints?.map((c, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs font-mono text-gray-700 dark:text-slate-300">
                            <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
                            <code>{c}</code>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Notes */}
                    {problemDesc.notes && (
                      <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Algorithm Insights</span>
                        </div>
                        <p className="leading-relaxed opacity-90">{problemDesc.notes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: EDITORIAL */}
                {leftTab === 'editorial' && (
                  <div className="space-y-4 animate-in fade-in text-xs sm:text-sm">
                    {editorial ? (
                      <>
                        <div className="space-y-1.5">
                          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5 text-sm">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            Intuition & Thought Process
                          </h3>
                          <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                            {editorial.intuition}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                            Approaches & Trade-offs
                          </h3>
                          {editorial.approaches?.map((app, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 space-y-1 text-xs"
                            >
                              <div className="font-bold text-gray-900 dark:text-white">{app.name}</div>
                              <p className="text-gray-600 dark:text-slate-300">{app.description}</p>
                              <div className="flex gap-4 font-mono text-[11px] pt-0.5">
                                <span className="text-blue-600 dark:text-blue-400">Time: {app.timeComplexity}</span>
                                <span className="text-purple-600 dark:text-purple-400">Space: {app.spaceComplexity}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {editorial.algorithmSteps && (
                          <div className="space-y-1.5">
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

                        {editorial.complexity && (
                          <div className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 space-y-1 text-xs">
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

                {/* TAB 3: SUBMISSIONS HISTORY & TIMESTAMPS */}
                {leftTab === 'submissions' && (
                  <div className="space-y-4 animate-in fade-in text-xs">
                    
                    {/* Header Summary Banner */}
                    <div className="p-3 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/80 dark:bg-slate-950 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-gray-800 dark:text-white text-xs">
                          Submission History ({submissions.length})
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {submissions.length > 0
                            ? `Latest submitted code is saved automatically.`
                            : 'Submit your solution to track execution status, date & time.'}
                        </p>
                      </div>

                      {submissions.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearSubmissions}
                          className="px-2 py-1 rounded-lg text-[11px] text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Clear Submissions History"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

                    {/* Submissions List */}
                    {submissions.length > 0 ? (
                      <div className="space-y-2.5">
                        {submissions.map((sub, idx) => {
                          const isExpanded = expandedSubmissionId === sub.id;
                          return (
                            <div
                              key={sub.id || idx}
                              className={`rounded-xl border transition-all overflow-hidden ${
                                sub.allPassed
                                  ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                                  : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20'
                              }`}
                            >
                              {/* Submission Header Row */}
                              <div className="p-3 flex items-center justify-between gap-2.5">
                                <div className="flex items-center gap-2 min-w-0">
                                  {sub.allPassed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                  ) : sub.status === 'Runtime Error' ? (
                                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                                  )}

                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`font-extrabold text-xs ${
                                        sub.allPassed
                                          ? 'text-emerald-700 dark:text-emerald-400'
                                          : sub.status === 'Runtime Error'
                                          ? 'text-amber-700 dark:text-amber-400'
                                          : 'text-rose-700 dark:text-rose-400'
                                      }`}>
                                        {sub.status || (sub.allPassed ? 'Accepted' : 'Wrong Answer')}
                                      </span>

                                      <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                                        ({sub.passedCount ?? (sub.allPassed ? allCases.length : 0)}/{sub.totalCount || allCases.length} passed)
                                      </span>
                                    </div>

                                    {/* Date & Time Timestamp */}
                                    <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium flex-wrap">
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3 text-gray-400" />
                                        {sub.formattedDate || new Date(sub.timestamp).toLocaleDateString()}
                                      </span>
                                      <span>•</span>
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        {sub.formattedTime || new Date(sub.timestamp).toLocaleTimeString()}
                                      </span>
                                      {sub.runtimeMs !== undefined && (
                                        <>
                                          <span>•</span>
                                          <span className="font-mono">{sub.runtimeMs} ms</span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => setExpandedSubmissionId(isExpanded ? null : sub.id)}
                                    className="px-2 py-1 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 text-[11px] font-bold transition-colors cursor-pointer"
                                  >
                                    {isExpanded ? 'Hide Code' : 'View Code'}
                                  </button>
                                </div>
                              </div>

                              {/* Expanded Code View */}
                              {isExpanded && (
                                <div className="border-t border-gray-200 dark:border-slate-800 bg-slate-950 p-3 space-y-2 animate-in fade-in">
                                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                                    <span className="flex items-center gap-1 text-slate-300 font-bold">
                                      <FileCode className="w-3 h-3 text-emerald-400" />
                                      {sub.language || 'Python 3'} Snapshot
                                    </span>

                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          navigator.clipboard.writeText(sub.code);
                                          setCopiedSubmissionId(sub.id);
                                          setTimeout(() => setCopiedSubmissionId(null), 2000);
                                        }}
                                        className="hover:text-white flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer"
                                      >
                                        {copiedSubmissionId === sub.id ? (
                                          <>
                                            <Check className="w-3 h-3 text-emerald-400" />
                                            <span className="text-emerald-400">Copied</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy</span>
                                          </>
                                        )}
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => handleLoadSubmissionCode(sub.code)}
                                        className="px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                                        title="Restore this submission code into the active editor"
                                      >
                                        <ArrowLeft className="w-3 h-3" />
                                        <span>Load into Editor</span>
                                      </button>
                                    </div>
                                  </div>

                                  <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed max-h-60">
                                    {sub.code}
                                  </pre>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center justify-center text-center space-y-2 border border-dashed border-gray-300 dark:border-slate-800 rounded-xl p-6">
                        <History className="w-8 h-8 text-gray-400 opacity-40" />
                        <div className="font-bold text-gray-700 dark:text-gray-300 text-xs">No Submissions Yet</div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-xs">
                          Write your Python solution in the code editor and click <strong>Submit</strong> to evaluate all test cases and record your submission history.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* HORIZONTAL DRAGGABLE RESIZER HANDLE */}
          {!isLeftCollapsed && (
            <div
              onPointerDown={startHorizontalDrag}
              className="w-2 hover:w-2.5 bg-gray-200 dark:bg-slate-800 hover:bg-blue-500 dark:hover:bg-blue-500 transition-colors cursor-col-resize flex items-center justify-center shrink-0 group z-10 select-none"
              title="Drag horizontally to resize width (Double-click to reset 50%)"
              onDoubleClick={() => setLeftWidthPercent(50)}
            >
              <GripVertical className="w-3 h-3 text-gray-400 group-hover:text-white" />
            </div>
          )}

          {/* RIGHT PANE: PYTHON WORKSPACE & TEST CONSOLE */}
          <div 
            ref={rightPaneRef}
            style={{ width: isLeftCollapsed ? '100%' : `${100 - effectiveLeftWidth}%` }}
            className="flex-1 flex flex-col bg-slate-950 min-h-0 overflow-hidden"
          >
            
            {/* Python Code Editor Area */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
              {/* Editor Toolbar */}
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-300 shrink-0">
                <div className="flex items-center gap-2">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  
                  {/* Language Selector */}
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded px-2 py-0.5 outline-none cursor-pointer hover:border-slate-600"
                  >
                    <option value="python3">Python 3 (CPython 3.11)</option>
                    <option value="python">Python</option>
                  </select>

                  {/* Saved Status Indicator */}
                  {saveToast && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 animate-in fade-in">
                      <Check className="w-3 h-3" />
                      <span>Code Saved</span>
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1.5">
                  {/* Font Size Adjuster */}
                  <div className="flex items-center gap-1 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-[11px]">
                    <Type className="w-3 h-3 text-slate-400" />
                    <button
                      onClick={() => setFontSize(Math.max(11, fontSize - 1))}
                      className="px-1 hover:text-white font-bold"
                      title="Decrease Font Size"
                    >
                      -
                    </button>
                    <span className="font-mono text-slate-300">{fontSize}px</span>
                    <button
                      onClick={() => setFontSize(Math.min(18, fontSize + 1))}
                      className="px-1 hover:text-white font-bold"
                      title="Increase Font Size"
                    >
                      +
                    </button>
                  </div>

                  {/* Word Wrap Toggle */}
                  <button
                    onClick={() => setIsWordWrap(!isWordWrap)}
                    className={`p-1 rounded border text-[11px] font-semibold transition-colors cursor-pointer ${isWordWrap ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'}`}
                    title={isWordWrap ? "Disable Word Wrap" : "Enable Word Wrap"}
                  >
                    <WrapText className="w-3 h-3" />
                  </button>

                  {/* Clear / Reset Code */}
                  <button
                    onClick={handleResetCode}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    title="Clear Editor & Start Fresh"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>

                  {/* Copy Code */}
                  <button
                    onClick={handleCopyCode}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                    title="Copy Code"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {/* Code Editor Container with Synchronized Line Numbers */}
              <div className="flex-1 relative flex bg-slate-950 overflow-hidden">
                {/* Line Numbers Gutter */}
                <div
                  ref={lineNumbersRef}
                  className="w-10 sm:w-12 py-3 bg-slate-950 text-slate-600 text-right pr-2.5 font-mono select-none overflow-hidden shrink-0 border-r border-slate-900 leading-relaxed"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {lineNumbers.map(n => (
                    <div key={n}>{n}</div>
                  ))}
                </div>

                {/* Textarea Code Input */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onScroll={handleScroll}
                  onKeyDown={handleKeyDownTextarea}
                  spellCheck="false"
                  className={`flex-1 h-full p-3 font-mono text-slate-100 bg-slate-950 resize-none outline-none leading-relaxed selection:bg-blue-600/40 ${isWordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'}`}
                  placeholder="# Write your code from here (import sys ... print)"
                  style={{ tabSize: 4, fontSize: `${fontSize}px` }}
                />
              </div>
            </div>

            {/* VERTICAL DRAGGABLE RESIZER HANDLE */}
            <div
              onPointerDown={startVerticalDrag}
              className="h-2 hover:h-2.5 bg-slate-900 hover:bg-blue-500 transition-colors cursor-row-resize flex items-center justify-center shrink-0 group z-10 select-none border-t border-slate-800"
              title="Drag vertically to resize console height (Double-click to reset)"
              onDoubleClick={() => setConsoleHeightPx(250)}
            >
              <GripHorizontal className="w-4 h-3 text-slate-600 group-hover:text-white" />
            </div>

            {/* Test Cases & Execution Results Console */}
            <div 
              style={{ height: isConsoleMinimized ? '38px' : `${consoleHeightPx}px` }}
              className="flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden shrink-0 transition-[height] duration-75"
            >
              {/* Console Toolbar */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 px-3 bg-gray-100/80 dark:bg-slate-950 text-xs font-bold shrink-0">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setActiveConsoleTab('testcases'); if (isConsoleMinimized) setIsConsoleMinimized(false); }}
                    className={`py-1.5 px-2.5 border-b-2 transition-colors cursor-pointer ${
                      activeConsoleTab === 'testcases' && !isConsoleMinimized
                        ? 'border-blue-600 dark:border-emerald-400 text-blue-600 dark:text-emerald-400'
                        : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400'
                    }`}
                  >
                    Testcases
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveConsoleTab('result'); if (isConsoleMinimized) setIsConsoleMinimized(false); }}
                    className={`py-1.5 px-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                      activeConsoleTab === 'result' && !isConsoleMinimized
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

                <div className="flex items-center gap-2">
                  {activeResult && !isEvaluating && (
                    <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activeResult.totalTimeMs} ms
                    </span>
                  )}

                  {/* Toggle Minimize/Maximize Console */}
                  <button
                    onClick={() => setIsConsoleMinimized(!isConsoleMinimized)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded text-gray-500 dark:text-gray-400 cursor-pointer"
                    title={isConsoleMinimized ? "Expand Console" : "Minimize Console"}
                  >
                    {isConsoleMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Console Body */}
              {!isConsoleMinimized && (
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  
                  {/* CONSOLE TAB 1: TESTCASES PREVIEW */}
                  {activeConsoleTab === 'testcases' && (
                    <div className="space-y-2.5 animate-in fade-in text-xs">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {sampleCases.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setSelectedCaseIdx(idx)}
                            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
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
                        <div className="space-y-2 font-mono text-xs">
                          <div>
                            <span className="font-sans font-bold text-gray-600 dark:text-slate-400 block mb-0.5">
                              Standard Input (STDIN):
                            </span>
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 overflow-x-auto whitespace-pre-wrap">
                              {sampleCases[selectedCaseIdx].stdin || (
                                Array.isArray(sampleCases[selectedCaseIdx].input)
                                  ? sampleCases[selectedCaseIdx].input.map(x => Array.isArray(x) ? `${x.length}\n${x.join(' ')}` : String(x)).join('\n')
                                  : JSON.stringify(sampleCases[selectedCaseIdx].input)
                              )}
                            </div>
                          </div>

                          <div>
                            <span className="font-sans font-bold text-gray-600 dark:text-slate-400 block mb-0.5">
                              Expected Output (STDOUT):
                            </span>
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto whitespace-pre-wrap">
                              {sampleCases[selectedCaseIdx].expectedStdout || (
                                sampleCases[selectedCaseIdx].expected === true ? 'true' : sampleCases[selectedCaseIdx].expected === false ? 'false' : String(sampleCases[selectedCaseIdx].expected)
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CONSOLE TAB 2: TEST EXECUTION RESULT */}
                  {activeConsoleTab === 'result' && (
                    <div className="space-y-2.5 animate-in fade-in">
                      {/* Loading Spinner */}
                      {isEvaluating && (
                        <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                          <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                          <p className="font-bold text-xs text-gray-800 dark:text-slate-200">
                            {isSubmitting ? 'Evaluating All Test Cases...' : 'Executing in Python Sandbox (Pyodide Wasm)...'}
                          </p>
                        </div>
                      )}

                      {/* Syntax / Runtime Error */}
                      {!isEvaluating && activeResult && activeResult.error && (
                        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs space-y-1">
                          <div className="font-bold flex items-center gap-1.5">
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                            <span>Runtime / Syntax Error</span>
                          </div>
                          <pre className="p-2 rounded-lg bg-rose-100/70 dark:bg-rose-950 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap text-[11px]">
                            {activeResult.error}
                          </pre>
                        </div>
                      )}

                      {/* Result Summary */}
                      {!isEvaluating && activeResult && !activeResult.error && (
                        <div className="space-y-2.5 text-xs">
                          {/* Overall Banner */}
                          <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
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
                          <div className="flex items-center gap-1 flex-wrap">
                            {activeResult.results.map((res, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedCaseIdx(idx)}
                                className={`px-2 py-0.5 rounded-lg font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
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
                            <div className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 space-y-1.5 font-mono text-xs">
                              <div>
                                <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                  STDIN Input:
                                </span>
                                <div className="text-gray-900 dark:text-slate-100 overflow-x-auto whitespace-pre-wrap">
                                  {activeResult.results[selectedCaseIdx].stdin || JSON.stringify(activeResult.results[selectedCaseIdx].input)}
                                </div>
                              </div>

                              <div>
                                <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                  Your Output (STDOUT):
                                </span>
                                <div className={activeResult.results[selectedCaseIdx].passed ? 'text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto whitespace-pre-wrap' : 'text-rose-600 dark:text-rose-400 font-bold overflow-x-auto whitespace-pre-wrap'}>
                                  {activeResult.results[selectedCaseIdx].stdout || JSON.stringify(activeResult.results[selectedCaseIdx].actual)}
                                </div>
                              </div>

                              <div>
                                <span className="font-sans font-bold text-gray-500 dark:text-gray-400 block mb-0.5">
                                  Expected Output:
                                </span>
                                <div className="text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto whitespace-pre-wrap">
                                  {activeResult.results[selectedCaseIdx].expectedStdout || (
                                    activeResult.results[selectedCaseIdx].expected === true ? 'true' : activeResult.results[selectedCaseIdx].expected === false ? 'false' : String(activeResult.results[selectedCaseIdx].expected)
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Empty State */}
                      {!isEvaluating && !activeResult && (
                        <div className="py-6 text-center text-gray-500 dark:text-gray-400 text-xs space-y-1">
                          <Play className="w-5 h-5 mx-auto text-gray-400 opacity-40" />
                          <p className="font-bold text-xs">No Execution Results Yet</p>
                          <p className="text-[11px]">Click "Run Code" or press Ctrl+Enter to test sample inputs.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Bottom Controls Bar */}
        <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">
              💡 Write your code from scratch (<code className="text-purple-600 dark:text-purple-400 font-mono font-bold">import</code> to <code className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">print()</code>). Press <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-slate-800 rounded font-mono text-[10px]">Ctrl + Enter</kbd> to Run or <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-slate-800 rounded font-mono text-[10px]">Ctrl + S</kbd> to Save.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Save Code Button */}
            <button
              type="button"
              onClick={() => handleSaveCode(code, true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-bold transition-all cursor-pointer shadow-xs"
              title="Save Code (Ctrl + S)"
            >
              <Save className="w-3.5 h-3.5 text-blue-500" />
              <span>Save</span>
            </button>

            {/* Run Code Button */}
            <button
              type="button"
              disabled={isEvaluating}
              onClick={handleRunCode}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gray-200 dark:bg-slate-800 hover:bg-gray-300 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>Run Code</span>
            </button>

            {/* Submit Button */}
            <button
              type="button"
              disabled={isEvaluating}
              onClick={handleSubmitCode}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold transition-all disabled:opacity-50 cursor-pointer shadow-md active:scale-95"
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

