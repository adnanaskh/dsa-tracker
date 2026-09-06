/**
 * Comprehensive Multi-Language Compiler & Execution Audit Script
 * Audits Python, Java, C++, and JavaScript execution across test suites
 */
import { runCodeTests } from '../src/utils/codeRunner.js';
import { runRemoteTests } from '../src/utils/remoteCodeRunner.js';
import { PROBLEM_TEST_CASES } from '../src/data/testCasesData.js';

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 INITIATING MULTI-LANGUAGE COMPILER & RUNNER AUDIT');
  console.log('====================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✅ [PASS] ${testName}`);
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      if (details) console.error(`     Details: ${details}`);
    }
  }

  // ----------------------------------------------------
  // AUDIT 1: C++ COMPILATION & EXECUTION (Contains Duplicate)
  // ----------------------------------------------------
  console.log('\n--- 1. AUDITING C++ COMPILER & EXECUTION ---');
  const cppSampleCases = PROBLEM_TEST_CASES['1'].sampleCases;
  const cppOptimalCode = `
#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;
    unordered_set<int> seen;
    bool hasDuplicate = false;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (seen.count(x)) {
            hasDuplicate = true;
        }
        seen.insert(x);
    }
    cout << (hasDuplicate ? "true" : "false") << endl;
    return 0;
}
`;

  try {
    const cppRes = await runCodeTests('cpp', cppOptimalCode, null, cppSampleCases);
    assert(cppRes.allPassed === true, 'C++ Optimal Solution passes all sample testcases', JSON.stringify(cppRes));
    assert(cppRes.results.length === cppSampleCases.length, `C++ executed all ${cppSampleCases.length} testcases`);
    assert(cppRes.totalTimeMs > 0, `C++ execution recorded runtime: ${cppRes.totalTimeMs}ms`);
  } catch (err) {
    assert(false, 'C++ Optimal Solution execution failed', err.message);
  }

  // ----------------------------------------------------
  // AUDIT 2: C++ COMPILATION ERROR HANDLING
  // ----------------------------------------------------
  console.log('\n--- 2. AUDITING C++ COMPILER ERROR REPORTING ---');
  const cppSyntaxErrorCode = `
#include <iostream>
int main() {
    std::cout << undeclared_variable_name << std::endl
    return 0;
}
`;
  try {
    const cppErrRes = await runCodeTests('cpp', cppSyntaxErrorCode, null, cppSampleCases.slice(0, 1));
    assert(cppErrRes.allPassed === false, 'C++ Syntax Error correctly marked as failed');
    assert(cppErrRes.compileError !== null, 'C++ Compiler Error captured cleanly in compileError field', cppErrRes.compileError);
    assert(cppErrRes.compileError && cppErrRes.compileError.includes('undeclared_variable_name'), 'C++ Diagnostic highlights missing variable');
  } catch (err) {
    assert(false, 'C++ Error handling test failed with exception', err.message);
  }

  // ----------------------------------------------------
  // AUDIT 3: JAVA COMPILATION & EXECUTION (Contains Duplicate)
  // ----------------------------------------------------
  console.log('\n--- 3. AUDITING JAVA COMPILER & EXECUTION ---');
  const javaSampleCases = PROBLEM_TEST_CASES['1'].sampleCases;
  const javaOptimalCode = `
import java.util.*;
import java.io.*;

public class Solution { // Testing class name normalization (Solution -> Main)
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        Set<Integer> seen = new HashSet<>();
        boolean hasDuplicate = false;
        for (int i = 0; i < n; i++) {
            int val = sc.nextInt();
            if (seen.contains(val)) {
                hasDuplicate = true;
            }
            seen.add(val);
        }
        System.out.println(hasDuplicate ? "true" : "false");
    }
}
`;

  try {
    const javaRes = await runCodeTests('java', javaOptimalCode, null, javaSampleCases);
    assert(javaRes.allPassed === true, 'Java Optimal Solution passes all sample testcases', JSON.stringify(javaRes));
    assert(javaRes.results.length === javaSampleCases.length, `Java executed all ${javaSampleCases.length} testcases`);
    assert(javaRes.totalTimeMs > 0, `Java execution recorded runtime: ${javaRes.totalTimeMs}ms`);
  } catch (err) {
    assert(false, 'Java Optimal Solution execution failed', err.message);
  }

  // ----------------------------------------------------
  // AUDIT 4: JAVA COMPILATION ERROR HANDLING
  // ----------------------------------------------------
  console.log('\n--- 4. AUDITING JAVA COMPILER ERROR REPORTING ---');
  const javaSyntaxErrorCode = `
import java.util.*;
public class Main {
    public static void main(String[] args) {
        int x = "incompatible_string_to_int";
    }
}
`;
  try {
    const javaErrRes = await runCodeTests('java', javaSyntaxErrorCode, null, javaSampleCases.slice(0, 1));
    assert(javaErrRes.allPassed === false, 'Java Type Error correctly marked as failed');
    assert(javaErrRes.compileError !== null, 'Java Compiler Error captured in compileError field', javaErrRes.compileError);
  } catch (err) {
    assert(false, 'Java Error handling test failed with exception', err.message);
  }

  // ----------------------------------------------------
  // AUDIT 5: JAVASCRIPT / NODE.JS EXECUTION
  // ----------------------------------------------------
  console.log('\n--- 5. AUDITING JAVASCRIPT / NODE.JS EXECUTION ---');
  const jsOptimalCode = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    const seen = new Set();
    let duplicate = false;
    for (const num of nums) {
        if (seen.has(num)) {
            duplicate = true;
            break;
        }
        seen.add(num);
    }
    console.log(duplicate ? 'true' : 'false');
}
`;
  try {
    const jsRes = await runCodeTests('javascript', jsOptimalCode, null, PROBLEM_TEST_CASES['1'].sampleCases);
    assert(jsRes.allPassed === true, 'JavaScript Node.js runner passes testcases', JSON.stringify(jsRes));
  } catch (err) {
    assert(false, 'JavaScript execution failed', err.message);
  }

  // ----------------------------------------------------
  // AUDIT 6: STRING / HASHING PROBLEM (Problem #2: Valid Anagram) IN C++ & JAVA
  // ----------------------------------------------------
  console.log('\n--- 6. AUDITING PROBLEM #2 (VALID ANAGRAM) IN C++ & JAVA ---');
  const anagramCases = PROBLEM_TEST_CASES['2'].sampleCases;
  const cppAnagramCode = `
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s, t;
    if (!(cin >> s >> t)) return 0;
    if (s.length() != t.length()) {
        cout << "false" << endl;
        return 0;
    }
    vector<int> freq(26, 0);
    for (char c : s) freq[c - 'a']++;
    for (char c : t) {
        if (--freq[c - 'a'] < 0) {
            cout << "false" << endl;
            return 0;
        }
    }
    cout << "true" << endl;
    return 0;
}
`;
  const javaAnagramCode = `
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String s = sc.next();
        String t = sc.next();
        if (s.length() != t.length()) {
            System.out.println("false");
            return;
        }
        int[] freq = new int[26];
        for (char c : s.toCharArray()) freq[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--freq[c - 'a'] < 0) {
                System.out.println("false");
                return;
            }
        }
        System.out.println("true");
    }
}
`;
  try {
    const cppAnaRes = await runCodeTests('cpp', cppAnagramCode, null, anagramCases);
    assert(cppAnaRes.allPassed === true, 'C++ Valid Anagram passes all sample cases');

    const javaAnaRes = await runCodeTests('java', javaAnagramCode, null, anagramCases);
    assert(javaAnaRes.allPassed === true, 'Java Valid Anagram passes all sample cases');
  } catch (err) {
    assert(false, 'Valid Anagram multi-lang test failed', err.message);
  }

  // ----------------------------------------------------
  // AUDIT 7: WRONG ANSWER LOGIC
  // ----------------------------------------------------
  console.log('\n--- 7. AUDITING WRONG ANSWER VERIFICATION ---');
  const wrongCode = `
#include <iostream>
using namespace std;
int main() {
    cout << "always_wrong" << endl;
    return 0;
}
`;
  try {
    const wrongRes = await runCodeTests('cpp', wrongCode, null, cppSampleCases);
    assert(wrongRes.allPassed === false, 'Wrong answer properly flagged as not passed');
    assert(wrongRes.results.every(r => !r.passed), 'Every case with mismatched output marked passed=false');
  } catch (err) {
    assert(false, 'Wrong Answer verification failed', err.message);
  }

  console.log('\n====================================================');
  console.log(`📊 AUDIT SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('====================================================\n');

  if (passedTests === totalTests) {
    console.log('🎉 ALL COMPILERS & EXECUTION ENGINES VERIFIED SUCCESSFULLY!');
  } else {
    process.exit(1);
  }
}

runAudit();
