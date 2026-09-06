/**
 * Unified Multi-Language Code Execution Engine
 * Supports:
 * - Python 3 (Fast Client-Side WebAssembly via Pyodide + Remote Fallback)
 * - Java (OpenJDK with auto class name normalization & STDIN/STDOUT piping)
 * - C++ (GCC/G++ C++17 with full STL headers & error diagnostics)
 * - JavaScript (Node.js engine)
 */
import { runPythonTests } from './pyodideRunner.js';
import { runRemoteTests } from './remoteCodeRunner.js';

export const SUPPORTED_LANGUAGES = [
  {
    id: 'python3',
    name: 'Python 3',
    engine: 'Pyodide WASM / CPython',
    icon: '🐍',
    extension: 'py',
    monacoLang: 'python'
  },
  {
    id: 'java',
    name: 'Java',
    engine: 'OpenJDK 17+',
    icon: '☕',
    extension: 'java',
    monacoLang: 'java'
  },
  {
    id: 'cpp',
    name: 'C++',
    engine: 'GCC / Clang C++17',
    icon: '⚙️',
    extension: 'cpp',
    monacoLang: 'cpp'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    engine: 'Node.js LTS',
    icon: '📜',
    extension: 'js',
    monacoLang: 'javascript'
  }
];

/**
 * Executes user code against test cases in the specified language
 * 
 * @param {string} language - 'python3' | 'python' | 'java' | 'cpp' | 'javascript'
 * @param {string} userCode - Source code entered by user
 * @param {string} methodName - LeetCode class Solution method name (for Python fallback)
 * @param {Array} testCases - Array of test case objects with input, stdin, expectedStdout, expected
 */
export async function runCodeTests(language, userCode, methodName, testCases) {
  const lang = (language || 'python3').toLowerCase().trim();

  // 1. Python Execution: Pyodide WebAssembly (with remote fallback)
  if (lang === 'python3' || lang === 'python' || lang === 'py') {
    try {
      if (typeof window !== 'undefined') {
        const pyResult = await runPythonTests(userCode, methodName, testCases);
        // If Pyodide produced results or a clean runtime error, return it
        if (pyResult && (pyResult.results?.length > 0 || pyResult.error)) {
          return pyResult;
        }
      }
    } catch (wasmErr) {
      console.warn('Pyodide local execution failed, falling back to remote runner:', wasmErr);
    }

    // Remote fallback for Python
    return runRemoteTests('python3', userCode, testCases);
  }

  // 2. Java Execution
  if (lang === 'java') {
    return runRemoteTests('java', userCode, testCases);
  }

  // 3. C++ Execution
  if (lang === 'cpp' || lang === 'c++' || lang === 'c') {
    return runRemoteTests('cpp', userCode, testCases);
  }

  // 4. JavaScript / Node.js Execution
  if (lang === 'javascript' || lang === 'js' || lang === 'node') {
    return runRemoteTests('javascript', userCode, testCases);
  }

  // Fallback to C++ runner
  return runRemoteTests('cpp', userCode, testCases);
}
