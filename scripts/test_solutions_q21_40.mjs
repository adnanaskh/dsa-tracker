import { PROBLEM_TEST_CASES } from '../src/data/testCasesData.js';
import { DETAILED_SOLUTIONS } from '../src/data/solutionsData.js';
import { spawnSync } from 'child_process';

console.log('--- TESTING CLASS SOLUTION LOGIC FOR Q21 TO Q40 ---');

let allPassed = true;

for (let i = 21; i <= 40; i++) {
  const id = String(i);
  const tests = PROBLEM_TEST_CASES[id];
  const sol = DETAILED_SOLUTIONS[id];
  const pythonSol = sol?.code?.python;
  const methodName = tests?.methodName;

  if (!pythonSol || !methodName) {
    console.error(`Q${id}: Missing python solution code or methodName`);
    allPassed = false;
    continue;
  }

  const allCases = [...(tests.sampleCases || []), ...(tests.hiddenCases || [])];
  let failed = 0;

  for (let c = 0; c < allCases.length; c++) {
    const tc = allCases[c];
    const inputJson = JSON.stringify(tc.input);
    const expectedJson = JSON.stringify(tc.expected);

    const testRunnerScript = `
import json
import sys

${pythonSol}

input_args = json.loads('''${inputJson}''')
expected = json.loads('''${expectedJson}''')

sol = Solution()
func = getattr(sol, "${methodName}")

if isinstance(input_args, list):
    actual = func(*input_args)
else:
    actual = func(input_args)

# Normalization
def normalize(x):
    if isinstance(x, (set, tuple)):
        return list(x)
    if isinstance(x, list) and len(x) > 0 and isinstance(x[0], list):
        return [sorted(sub) if isinstance(sub, list) else sub for sub in x]
    return x

norm_actual = normalize(actual)
norm_expected = normalize(expected)

if isinstance(norm_expected, list) and len(norm_expected) > 0 and isinstance(norm_expected[0], list) and "${methodName}" == "groupAnagrams":
    # Sort outer list for group anagrams
    norm_actual = sorted(norm_actual, key=lambda l: (len(l), "".join(sorted(l))))
    norm_expected = sorted(norm_expected, key=lambda l: (len(l), "".join(sorted(l))))

if norm_actual != norm_expected:
    print(f"FAILED: actual={norm_actual!r} expected={norm_expected!r}", file=sys.stderr)
    sys.exit(1)
`;

    const res = spawnSync('python', ['-c', testRunnerScript], {
      encoding: 'utf-8',
      timeout: 5000
    });

    if (res.status !== 0) {
      console.error(`Q${id} (${methodName}) Case ${c+1} FAILED:`, res.stderr?.trim() || res.error);
      failed++;
    }
  }

  if (failed === 0) {
    console.log(`✅ Q${id} (${methodName}): All ${allCases.length} cases PASSED!`);
  } else {
    console.error(`❌ Q${id} (${methodName}): ${failed}/${allCases.length} test cases failed.`);
    allPassed = false;
  }
}

if (allPassed) {
  console.log('\n🎉 ALL SOLUTIONS FOR Q21 TO Q40 PASS ALL TEST CASES PERFECTLY!');
} else {
  process.exit(1);
}
