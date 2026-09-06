// Client-Side Python 3 WebAssembly Execution Engine powered by Pyodide
import {
  formatStdinFromInput,
  formatExpectedStdout,
  compareStdoutResults,
  compareResults
} from './testComparison.js';

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
    if (typeof window !== 'undefined' && !window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide WebAssembly script. Please check your network connection.'));
        document.head.appendChild(script);
      });
    }

    if (typeof window !== 'undefined' && window.loadPyodide) {
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
      });
      pyodideInstance = pyodide;
      return pyodide;
    }

    throw new Error('Pyodide is not supported in this environment');
  })();

  return pyodideLoadingPromise;
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
      compileError: null,
      error: null
    };

  } catch (err) {
    return {
      allPassed: false,
      results: [],
      totalTimeMs: Math.round(performance.now() - startTime),
      compileError: null,
      error: cleanPythonError(err.message)
    };
  }
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

export { formatStdinFromInput, formatExpectedStdout, compareStdoutResults, compareResults };
