// Client-Side Python 3 WebAssembly Execution Engine powered by Pyodide
let pyodideInstance = null;
let pyodideLoadingPromise = null;

/**
 * Loads and initializes the Pyodide WebAssembly runtime from CDN
 */
export async function loadPyodideEngine() {
  if (pyodideInstance) return pyodideInstance;

  if (pyodideLoadingPromise) return pyodideLoadingPromise;

  pyodideLoadingPromise = (async () => {
    // Inject Pyodide script tag if not already present
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide WebAssembly script. Please check your network connection.'));
        document.head.appendChild(script);
      });
    }

    const pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
    });

    pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoadingPromise;
}

/**
 * Converts structured input (array/object/string) to standard STDIN text
 */
export function formatStdinFromInput(input) {
  if (input === null || input === undefined) return '';
  if (typeof input === 'string') return input;

  if (Array.isArray(input)) {
    const lines = [];
    for (const arg of input) {
      if (Array.isArray(arg)) {
        if (arg.length > 0 && Array.isArray(arg[0])) {
          // 2D Array / Matrix (e.g. Sudoku or Grid)
          for (const row of arg) {
            lines.push(row.join(' '));
          }
        } else {
          // 1D Array: Line 1 = length N, Line 2 = space separated elements
          lines.push(String(arg.length));
          lines.push(arg.join(' '));
        }
      } else if (typeof arg === 'object' && arg !== null) {
        lines.push(JSON.stringify(arg));
      } else {
        lines.push(String(arg));
      }
    }
    return lines.join('\n');
  }

  return String(input);
}

/**
 * Runs Python code against a set of test cases inside Pyodide sandbox
 * Supports full STDIN -> STDOUT execution model and class Solution method invocation.
 */
export async function runPythonTests(userCode, methodName, testCases) {
  const startTime = performance.now();
  try {
    const pyodide = await loadPyodideEngine();

    const results = [];
    let allPassed = true;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const caseStartTime = performance.now();

      // Determine standard input string
      const stdinContent = tc.stdin !== undefined ? tc.stdin : formatStdinFromInput(tc.input);
      const expectedStdout = tc.expectedStdout !== undefined 
        ? String(tc.expectedStdout).trim() 
        : formatExpectedStdout(tc.expected);

      // Reset and inject STDIN and STDOUT wrappers
      pyodide.runPython(`
import sys
import io

class StdoutCatcher:
    def __init__(self):
        self.output = []
    def write(self, s):
        self.output.append(s)
    def flush(self):
        pass
    def get_value(self):
        return "".join(self.output)

sys_stdout_catcher = StdoutCatcher()
sys.stdout = sys_stdout_catcher
sys.stdin = io.StringIO(${JSON.stringify(stdinContent)})
`);

      let stdout = '';
      let actualOutput = null;
      let isPassed = false;
      let caseError = null;

      try {
        // Execute user code
        pyodide.runPython(userCode);
        stdout = pyodide.runPython(`sys_stdout_catcher.get_value()`).trim();

        if (stdout.length > 0) {
          actualOutput = stdout;
          isPassed = compareStdoutResults(stdout, expectedStdout, tc.expected);
        } else if (methodName && userCode.includes('class Solution')) {
          // Fallback: If user wrote class Solution and didn't print to stdout, invoke method
          const inputJson = JSON.stringify(tc.input);
          const executionScript = `
import json
args = json.loads('''${inputJson}''')
sol = Solution()
func = getattr(sol, "${methodName}")
if isinstance(args, list):
    res = func(*args)
else:
    res = func(args)

def normalize_output(o):
    if isinstance(o, (set, tuple)):
        return list(o)
    return o

json.dumps(normalize_output(res))
`;
          const resultJson = pyodide.runPython(executionScript);
          const methodResult = JSON.parse(resultJson);
          actualOutput = methodResult;
          isPassed = compareResults(methodResult, tc.expected);
        } else {
          actualOutput = '';
          isPassed = compareStdoutResults('', expectedStdout, tc.expected);
        }
      } catch (err) {
        caseError = cleanPythonError(err.message);
        isPassed = false;
      }

      const caseEndTime = performance.now();
      if (!isPassed) allPassed = false;

      results.push({
        caseIndex: i + 1,
        input: tc.input,
        stdin: stdinContent,
        expected: tc.expected,
        expectedStdout: expectedStdout,
        actual: actualOutput,
        passed: isPassed,
        runtimeMs: Math.round(caseEndTime - caseStartTime),
        stdout: stdout,
        error: caseError
      });
    }

    const totalTimeMs = Math.round(performance.now() - startTime);

    return {
      allPassed,
      results,
      totalTimeMs,
      error: null
    };

  } catch (err) {
    return {
      allPassed: false,
      results: [],
      totalTimeMs: Math.round(performance.now() - startTime),
      error: cleanPythonError(err.message)
    };
  }
}

/**
 * Formats expected output to canonical STDOUT string
 */
function formatExpectedStdout(expected) {
  if (expected === true) return 'true';
  if (expected === false) return 'false';
  if (expected === null || expected === undefined) return '';
  if (Array.isArray(expected)) {
    if (expected.length > 0 && Array.isArray(expected[0])) {
      return JSON.stringify(expected);
    }
    return expected.join(' ');
  }
  return String(expected);
}

/**
 * Compares STDOUT against expected output with fuzzy standard tolerances
 */
function compareStdoutResults(actualStdout, expectedStdout, rawExpected) {
  if (!actualStdout && !expectedStdout) return true;
  const actualTrim = String(actualStdout).trim();
  const expectTrim = String(expectedStdout).trim();

  // Exact match
  if (actualTrim === expectTrim) return true;

  // Case-insensitive match (e.g. "True" vs "true")
  if (actualTrim.toLowerCase() === expectTrim.toLowerCase()) return true;

  // Compare as JSON Arrays / Objects
  try {
    const parsedActual = JSON.parse(actualTrim);
    let parsedExpected = rawExpected;
    if (parsedExpected === undefined && expectTrim) {
      try { parsedExpected = JSON.parse(expectTrim); } catch {}
    }
    if (compareResults(parsedActual, parsedExpected)) return true;
  } catch {}

  // Compare space/newline separated tokens
  const actualTokens = actualTrim.split(/\s+/).filter(Boolean);
  const expectTokens = expectTrim.split(/\s+/).filter(Boolean);

  if (actualTokens.length === expectTokens.length && actualTokens.length > 0) {
    let allTokensMatch = true;
    for (let i = 0; i < actualTokens.length; i++) {
      if (actualTokens[i].toLowerCase() !== expectTokens[i].toLowerCase()) {
        allTokensMatch = false;
        break;
      }
    }
    if (allTokensMatch) return true;

    // Check if permutations match (e.g., unordered set elements)
    const sortedActual = [...actualTokens].map(s => s.toLowerCase()).sort();
    const sortedExpect = [...expectTokens].map(s => s.toLowerCase()).sort();
    if (JSON.stringify(sortedActual) === JSON.stringify(sortedExpect)) {
      return true;
    }
  }

  // Fallback direct compare
  return compareResults(actualStdout, rawExpected);
}

/**
 * Deep comparison of structured outputs (handles nested 2D array permutations for Group Anagrams)
 */
function compareResults(actual, expected) {
  if (actual === expected) return true;
  if (actual === null || expected === null || actual === undefined || expected === undefined) return actual === expected;

  // Boolean loose compare
  if (typeof actual === 'boolean' || typeof expected === 'boolean') {
    return String(actual).toLowerCase() === String(expected).toLowerCase();
  }

  // Float tolerance comparison
  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) < 1e-5;
  }

  // Array comparison
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;

    // Direct element-by-element match
    let directMatch = true;
    for (let i = 0; i < actual.length; i++) {
      if (!compareResults(actual[i], expected[i])) {
        directMatch = false;
        break;
      }
    }
    if (directMatch) return true;

    // Permutation match for 2D array of groups (e.g. Group Anagrams)
    if (actual.length > 0 && Array.isArray(actual[0])) {
      const canonicalActual = actual.map(group => Array.isArray(group) ? [...group].sort().join(',') : String(group)).sort();
      const canonicalExpect = expected.map(group => Array.isArray(group) ? [...group].sort().join(',') : String(group)).sort();
      if (JSON.stringify(canonicalActual) === JSON.stringify(canonicalExpect)) {
        return true;
      }
    }

    // Permutation match for 1D arrays (e.g. unordered results)
    const sortedActual = [...actual].map(x => String(x)).sort();
    const sortedExpect = [...expected].map(x => String(x)).sort();
    return JSON.stringify(sortedActual) === JSON.stringify(sortedExpect);
  }

  // Object comparison
  if (typeof actual === 'object' && typeof expected === 'object') {
    const k1 = Object.keys(actual);
    const k2 = Object.keys(expected);
    if (k1.length !== k2.length) return false;
    for (const key of k1) {
      if (!compareResults(actual[key], expected[key])) return false;
    }
    return true;
  }

  return false;
}

/**
 * Clean up Pyodide internal traceback to show clean, user-friendly Python errors
 */
function cleanPythonError(rawError) {
  if (!rawError) return 'Unknown runtime error';
  const lines = rawError.split('\n');
  const relevantLines = [];
  let capture = false;

  for (const line of lines) {
    if (line.includes('File "<exec>"') || line.includes('Error:') || line.includes('Exception:')) {
      capture = true;
    }
    if (capture) {
      relevantLines.push(line);
    }
  }

  if (relevantLines.length > 0) {
    return relevantLines.join('\n');
  }

  return rawError;
}
