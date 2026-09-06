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
        script.onerror = () => reject(new Error('Failed to load Pyodide WebAssembly script. Please check your internet connection.'));
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
 * Runs Python code against a set of test cases inside Pyodide sandbox
 * @param {string} userCode - The user's Python 3 code
 * @param {string} methodName - The method name in class Solution
 * @param {Array} testCases - Array of { input: any[], expected: any }
 * @returns {Promise<{ allPassed: boolean, results: Array, totalTimeMs: number, error: string|null }>}
 */
export async function runPythonTests(userCode, methodName, testCases) {
  const startTime = performance.now();
  try {
    const pyodide = await loadPyodideEngine();

    // Reset standard output capture
    pyodide.runPython(`
import sys
import io
import json

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
`);

    // Execute user code definition in Pyodide namespace
    pyodide.runPython(userCode);

    const results = [];
    let allPassed = true;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      const caseStartTime = performance.now();

      // Clear stdout before each testcase
      pyodide.runPython(`sys_stdout_catcher.output = []`);

      // Prepare input arguments
      const inputJson = JSON.stringify(tc.input);

      // Wrapper script to invoke Solution().methodName(*args)
      const executionScript = `
import json
args = json.loads('''${inputJson}''')
sol = Solution()
func = getattr(sol, "${methodName}")
if isinstance(args, list):
    res = func(*args)
else:
    res = func(args)

# Normalize set/tuple to list for JSON serialization
def normalize_output(o):
    if isinstance(o, (set, tuple)):
        return list(o)
    return o

res = normalize_output(res)
json.dumps(res)
`;

      try {
        const resultJson = pyodide.runPython(executionScript);
        const actual = JSON.parse(resultJson);
        const caseEndTime = performance.now();
        const stdout = pyodide.runPython(`sys_stdout_catcher.get_value()`);

        // Check deep equality
        const isPassed = compareResults(actual, tc.expected);
        if (!isPassed) allPassed = false;

        results.push({
          caseIndex: i + 1,
          input: tc.input,
          expected: tc.expected,
          actual: actual,
          passed: isPassed,
          runtimeMs: Math.round(caseEndTime - caseStartTime),
          stdout: stdout.trim(),
          error: null
        });
      } catch (err) {
        allPassed = false;
        const stdout = pyodide.runPython(`sys_stdout_catcher.get_value()`).catch(() => '');
        results.push({
          caseIndex: i + 1,
          input: tc.input,
          expected: tc.expected,
          actual: null,
          passed: false,
          runtimeMs: 0,
          stdout: typeof stdout === 'string' ? stdout.trim() : '',
          error: cleanPythonError(err.message)
        });
      }
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
 * Deep comparison of actual vs expected outputs (handles unordered arrays if applicable)
 */
function compareResults(actual, expected) {
  if (actual === expected) return true;
  if (actual === null || expected === null) return actual === expected;

  // Float tolerance comparison
  if (typeof actual === 'number' && typeof expected === 'number') {
    return Math.abs(actual - expected) < 1e-5;
  }

  // Array comparison
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (!compareResults(actual[i], expected[i])) return false;
    }
    return true;
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
