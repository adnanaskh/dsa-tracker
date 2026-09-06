/**
 * Shared Test Comparison and Formatting Utilities for DSA Tracker Runners
 */

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
 * Formats expected output to canonical STDOUT string
 */
export function formatExpectedStdout(expected) {
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
 * Compares STDOUT against expected output with standard tolerances & fuzzy normalization
 */
export function compareStdoutResults(actualStdout, expectedStdout, rawExpected) {
  if (!actualStdout && !expectedStdout) return true;
  const actualTrim = String(actualStdout || '').trim();
  const expectTrim = String(expectedStdout || '').trim();

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
 * Deep comparison of structured outputs (handles nested arrays, booleans, floats, sets)
 */
export function compareResults(actual, expected) {
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
