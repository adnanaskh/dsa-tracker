import { PROBLEM_TEST_CASES } from '../src/data/testCasesData.js';
import { DETAILED_SOLUTIONS } from '../src/data/solutionsData.js';
import { spawnSync } from 'child_process';

console.log('--- TESTING CLASS SOLUTION LOGIC FOR QUESTIONS 1 TO 60 ---');

let allPassed = true;
let totalPassedCases = 0;
let totalTestedProblems = 0;

for (let i = 1; i <= 60; i++) {
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
func = getattr(sol, "${methodName}", None)
if not func:
    # Try snake_case
    import re
    snake = re.sub(r'(?<!^)(?=[A-Z])', '_', "${methodName}").lower()
    func = getattr(sol, snake, None)

if not func:
    print(f"Method ${methodName} not found on Solution", file=sys.stderr)
    sys.exit(1)

# Handle special in-place algorithms like merge, moveZeroes, rotateArray, setMatrixZeroes, removeDuplicates, sortColors
if "${methodName}" == "merge":
    nums1, m, nums2, n = input_args
    nums1_copy = list(nums1)
    res = func(nums1_copy, m, nums2, n)
    actual = nums1_copy if res is None else res
elif "${methodName}" == "moveZeroes":
    nums = input_args[0]
    nums_copy = list(nums)
    res = func(nums_copy)
    actual = nums_copy if res is None else res
elif "${methodName}" == "rotateArray":
    nums, k = input_args
    nums_copy = list(nums)
    res = func(nums_copy, k)
    actual = nums_copy if res is None else res
elif "${methodName}" == "setMatrixZeroes":
    matrix = input_args[0]
    matrix_copy = [list(row) for row in matrix]
    res = func(matrix_copy)
    actual = matrix_copy if res is None else res
elif "${methodName}" == "sortColors":
    nums = input_args[0]
    nums_copy = list(nums)
    res = func(nums_copy)
    actual = nums_copy if res is None else res
elif "${methodName}" == "removeDuplicates" and len(input_args) == 1 and isinstance(input_args[0], list):
    nums = input_args[0]
    nums_copy = list(nums)
    res = func(nums_copy)
    actual = res
else:
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

if isinstance(norm_expected, list) and len(norm_expected) > 0 and isinstance(norm_expected[0], list) and "${methodName}" in ["groupAnagrams", "threeSum", "fourSum"]:
    # Sort outer list
    norm_actual = sorted(norm_actual, key=lambda l: (len(l), str(l)))
    norm_expected = sorted(norm_expected, key=lambda l: (len(l), str(l)))

if norm_actual != norm_expected:
    # Handle palindrome longest alternative
    if "${methodName}" == "longestPalindrome" and len(norm_actual) == len(norm_expected) and norm_actual == norm_actual[::-1]:
        pass
    else:
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
    } else {
      totalPassedCases++;
    }
  }

  if (failed === 0) {
    console.log(`✅ Q${id} (${methodName}): All ${allCases.length} test cases PASSED`);
    totalTestedProblems++;
  } else {
    console.error(`❌ Q${id} (${methodName}): ${failed}/${allCases.length} test cases failed.`);
    allPassed = false;
  }
}

console.log('----------------------------------------------------');
console.log(`TOTAL PASSED PROBLEMS: ${totalTestedProblems}/60`);
console.log(`TOTAL PASSED TESTCASES: ${totalPassedCases}`);

if (allPassed) {
  console.log('\n🎉 ALL 60 PYTHON SOLUTIONS PASSED 100% OF TEST CASES!');
} else {
  process.exit(1);
}
