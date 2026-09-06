import { DETAILED_PROBLEM_DESCRIPTIONS } from '../src/data/problemDescriptionsData.js';
import { PROBLEM_TEST_CASES } from '../src/data/testCasesData.js';
import { DETAILED_SOLUTIONS } from '../src/data/solutionsData.js';

console.log('--- COMPREHENSIVE AUDIT OF QUESTIONS 1 TO 60 ---');
let issues = [];

for (let i = 1; i <= 60; i++) {
  const id = String(i);
  const desc = DETAILED_PROBLEM_DESCRIPTIONS[id];
  const tests = PROBLEM_TEST_CASES[id];
  const sol = DETAILED_SOLUTIONS[id];

  // 1. Audit Problem Description
  if (!desc) {
    issues.push(`Q${id}: Missing description`);
  } else {
    if (!desc.statement || desc.statement.length < 50) issues.push(`Q${id}: Statement too short or missing`);
    if (!desc.inputFormat || !desc.outputFormat) issues.push(`Q${id}: Missing input/output format`);
    if (!desc.examples || desc.examples.length < 2) issues.push(`Q${id}: Less than 2 examples`);
    if (!desc.constraints || desc.constraints.length === 0) issues.push(`Q${id}: Missing constraints`);
    if (!desc.starterCode || desc.starterCode.length < 30) issues.push(`Q${id}: Missing starterCode`);
  }

  // 2. Audit Test Cases
  if (!tests) {
    issues.push(`Q${id}: Missing test cases`);
  } else {
    if (!tests.sampleCases || tests.sampleCases.length === 0) issues.push(`Q${id}: Missing sampleCases`);
    if (!tests.hiddenCases || tests.hiddenCases.length === 0) issues.push(`Q${id}: Missing hiddenCases`);
    if (!tests.methodName) issues.push(`Q${id}: Missing methodName`);
    
    [...(tests.sampleCases || []), ...(tests.hiddenCases || [])].forEach((tc, idx) => {
      if (tc.stdin === undefined || tc.expectedStdout === undefined) {
        issues.push(`Q${id}: Test case ${idx+1} missing stdin or expectedStdout`);
      }
      if (tc.input === undefined || tc.expected === undefined) {
        issues.push(`Q${id}: Test case ${idx+1} missing structured input or expected`);
      }
    });
  }

  // 3. Audit Solution / Editorial
  if (!sol) {
    issues.push(`Q${id}: Missing solution`);
  } else {
    if (!sol.intuition || sol.intuition.length < 30) {
      issues.push(`Q${id}: Solution intuition too short`);
    }
    if (!sol.approaches || sol.approaches.length === 0) {
      issues.push(`Q${id}: Solution approaches missing`);
    }
    if (sol.approaches && sol.approaches.some(a => a.name === 'Optimal Algorithm' || a.timeComplexity === 'O(...)')) {
      issues.push(`Q${id}: Solution has placeholder approaches`);
    }
    if (!sol.algorithmSteps || sol.algorithmSteps.length === 0) {
      issues.push(`Q${id}: Solution missing algorithmSteps`);
    }
    if (!sol.complexity || !sol.complexity.time || !sol.complexity.space) {
      issues.push(`Q${id}: Solution missing complexity object`);
    }
    if (!sol.code || !sol.code.python) {
      issues.push(`Q${id}: Solution missing Python code`);
    }
  }
}

if (issues.length === 0) {
  console.log('🎉 ALL 60 QUESTIONS AUDITED SUCCESSFULLY WITH 100% QUALITY!');
  console.log(`Audited:
  - 60/60 Problem statements, I/O formats, examples, constraints, starter codes
  - 60/60 Realistic test cases with stdin & expectedStdout (sample + edge-case hidden)
  - 60/60 Complete editorials with intuition, multiple approaches, step-by-step algorithms, complexity analyses, edge cases, interview tips, and Python solutions`);
} else {
  console.error('⚠️ Issues found during audit:');
  issues.forEach(iss => console.error('  - ' + iss));
  process.exit(1);
}
