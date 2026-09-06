/**
 * Remote Code Execution Engine for C++, Java, and Node.js
 * Powered by Paiza.io API with sandboxing, timeout handling, and parallel testcase execution.
 */
import { formatStdinFromInput, formatExpectedStdout, compareStdoutResults } from './testComparison.js';

const API_BASE = 'https://api.paiza.io/runners';
const API_KEY = 'guest';
const POLL_INTERVAL_MS = 350;
const MAX_POLL_ATTEMPTS = 25; // ~8.5 seconds max

/**
 * Normalizes user code according to language-specific requirements
 */
function prepareSourceCode(language, rawCode) {
  let code = rawCode.trim();

  if (language === 'java') {
    // In Java online runners, the main class should be named Main
    if (/public\s+class\s+([A-Za-z0-9_]+)/.test(code)) {
      code = code.replace(/public\s+class\s+([A-Za-z0-9_]+)/, 'public class Main');
    } else if (!/class\s+Main\b/.test(code) && /class\s+([A-Za-z0-9_]+)/.test(code)) {
      code = code.replace(/class\s+([A-Za-z0-9_]+)/, 'public class Main');
    }
  }

  return code;
}

/**
 * Maps frontend language identifier to compiler backend language code
 */
function mapLanguage(lang) {
  const l = (lang || '').toLowerCase().trim();
  if (l === 'cpp' || l === 'c++') return 'cpp';
  if (l === 'c') return 'c';
  if (l === 'java') return 'java';
  if (l === 'javascript' || l === 'js' || l === 'node') return 'javascript';
  if (l === 'python' || l === 'python3' || l === 'py') return 'python3';
  if (l === 'go' || l === 'golang') return 'go';
  if (l === 'rust') return 'rust';
  return 'cpp';
}

/**
 * Executes a single test case on the remote compiler API
 */
async function executeSingleTestCase(language, sourceCode, stdinContent, timeoutMs = 8000) {
  const langKey = mapLanguage(language);
  const preparedCode = prepareSourceCode(language, sourceCode);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // 1. Create runner task
    const createRes = await fetch(`${API_BASE}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: preparedCode,
        language: langKey,
        input: stdinContent,
        api_key: API_KEY
      }),
      signal: controller.signal
    });

    if (!createRes.ok) {
      throw new Error(`Execution service returned status ${createRes.status}: ${createRes.statusText}`);
    }

    const createData = await createRes.json();
    if (createData.error) {
      throw new Error(createData.error);
    }

    const runnerId = createData.id;

    // 2. Poll for results until 'completed'
    let attempts = 0;
    while (attempts < MAX_POLL_ATTEMPTS) {
      attempts++;
      await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));

      const detailsRes = await fetch(`${API_BASE}/get_details?id=${runnerId}&api_key=${API_KEY}`, {
        signal: controller.signal
      });

      if (!detailsRes.ok) continue;

      const details = await detailsRes.json();
      if (details.status === 'completed') {
        clearTimeout(timeoutId);
        return {
          buildResult: details.build_result,
          buildStderr: details.build_stderr || '',
          stdout: (details.stdout || '').trim(),
          stderr: (details.stderr || '').trim(),
          exitCode: details.exit_code,
          timeMs: Math.round(parseFloat(details.time || 0) * 1000),
          result: details.result // 'success', 'failure', 'timeout'
        };
      }
    }

    clearTimeout(timeoutId);
    return {
      buildResult: 'failure',
      buildStderr: '',
      stdout: '',
      stderr: 'Execution timed out (exceeded time limit).',
      exitCode: -1,
      timeMs: timeoutMs,
      result: 'timeout'
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return {
        buildResult: 'failure',
        buildStderr: '',
        stdout: '',
        stderr: 'Execution timed out after 8 seconds.',
        exitCode: -1,
        timeMs: timeoutMs,
        result: 'timeout'
      };
    }
    throw err;
  }
}

/**
 * Formats compiler diagnostic errors into clean user-readable messages
 */
function formatCompilerError(buildStderr, language) {
  if (!buildStderr) return null;
  const lang = mapLanguage(language);
  let cleaned = buildStderr.trim();

  if (lang === 'cpp') {
    // Replace internal temporary filenames like Main.cpp: or solution.cpp: with cleaner references
    cleaned = cleaned.replace(/Main\.cpp:/g, 'Line ');
  } else if (lang === 'java') {
    cleaned = cleaned.replace(/Main\.java:/g, 'Line ');
  }

  return cleaned;
}

/**
 * Runs a full test suite against user code in Java, C++, or other compiled languages
 */
export async function runRemoteTests(language, userCode, testCases) {
  const startTime = performance.now();
  const langName = language === 'cpp' ? 'C++' : language === 'java' ? 'Java' : language;

  if (!testCases || testCases.length === 0) {
    return {
      allPassed: true,
      results: [],
      totalTimeMs: 0,
      compileError: null,
      error: null
    };
  }

  try {
    // Run all test cases in parallel for maximum speed
    const testPromises = testCases.map(async (tc, index) => {
      const caseStartTime = performance.now();
      const stdinContent = tc.stdin !== undefined ? tc.stdin : formatStdinFromInput(tc.input);
      const expectedStdout = tc.expectedStdout !== undefined 
        ? String(tc.expectedStdout).trim() 
        : formatExpectedStdout(tc.expected);

      try {
        const exec = await executeSingleTestCase(language, userCode, stdinContent);
        const caseEndTime = performance.now();

        // Check if there was a compilation error
        if (exec.buildResult === 'failure' && exec.buildStderr) {
          const compError = formatCompilerError(exec.buildStderr, language);
          return {
            caseIndex: index + 1,
            input: tc.input,
            stdin: stdinContent,
            expected: tc.expected,
            expectedStdout: expectedStdout,
            actual: '',
            passed: false,
            runtimeMs: 0,
            stdout: '',
            compileError: compError,
            error: `Compilation Error:\n${compError}`
          };
        }

        // Check for runtime error (e.g. non-zero exit code or stderr)
        let runtimeError = null;
        if (exec.result === 'timeout') {
          runtimeError = 'Time Limit Exceeded (Execution timed out)';
        } else if (exec.stderr && exec.stderr.length > 0 && exec.exitCode !== '0' && exec.exitCode !== 0) {
          runtimeError = exec.stderr;
        }

        const isPassed = !runtimeError && compareStdoutResults(exec.stdout, expectedStdout, tc.expected);

        return {
          caseIndex: index + 1,
          input: tc.input,
          stdin: stdinContent,
          expected: tc.expected,
          expectedStdout: expectedStdout,
          actual: exec.stdout,
          passed: isPassed,
          runtimeMs: Math.max(exec.timeMs, Math.round(caseEndTime - caseStartTime)),
          stdout: exec.stdout,
          error: runtimeError
        };
      } catch (err) {
        return {
          caseIndex: index + 1,
          input: tc.input,
          stdin: stdinContent,
          expected: tc.expected,
          expectedStdout: expectedStdout,
          actual: '',
          passed: false,
          runtimeMs: 0,
          stdout: '',
          error: err.message || 'Execution error'
        };
      }
    });

    const results = await Promise.all(testPromises);
    const totalTimeMs = Math.round(performance.now() - startTime);

    // If any test case had a compile error, extract it at top level
    const firstCompileError = results.find(r => r.compileError)?.compileError || null;
    const allPassed = !firstCompileError && results.every(r => r.passed);

    return {
      allPassed,
      results,
      totalTimeMs,
      compileError: firstCompileError,
      error: firstCompileError ? `Compilation Error:\n${firstCompileError}` : null
    };

  } catch (err) {
    return {
      allPassed: false,
      results: [],
      totalTimeMs: Math.round(performance.now() - startTime),
      compileError: null,
      error: `Failed to execute ${langName} code: ${err.message}`
    };
  }
}
