import fs from 'fs';
import path from 'path';

// 1. problemDescriptionsData.js
const pDescPath = path.resolve('src/data/problemDescriptionsData.js');
let pDescContent = fs.readFileSync(pDescPath, 'utf-8');
if (!pDescContent.includes('export function getProblemDescription')) {
  pDescContent += `\nexport function getProblemDescription(questionId, fallbackQuestion = {}) {
  const idStr = String(questionId);
  if (DETAILED_PROBLEM_DESCRIPTIONS[idStr]) {
    return DETAILED_PROBLEM_DESCRIPTIONS[idStr];
  }
  const name = fallbackQuestion.name || \`Problem \${idStr}\`;
  return {
    title: name,
    difficulty: fallbackQuestion.difficulty || "Medium",
    topic: fallbackQuestion.topic || "DSA",
    pattern: fallbackQuestion.pattern || "General",
    statement: \`Given the input constraints and requirements for **\${name}**, write an optimal solution that passes all test cases efficiently.\`,
    inputFormat: "Standard competitive programming input format (read from STDIN).",
    outputFormat: "Standard competitive programming output format (print to STDOUT).",
    examples: [
      {
        input: "Example input data",
        output: "Example output data",
        explanation: "The solution satisfies all problem conditions."
      }
    ],
    constraints: [
      "Follow standard algorithmic constraints for Time Limit Exceeded (1-2s) and Memory Limits (256MB)."
    ],
    starterCode: "import sys\\n\\ndef solve():\\n    lines = sys.stdin.read().split()\\n    if not lines:\\n        return\\n    print('Write your solution here')\\n\\nif __name__ == '__main__':\\n    solve()"
  };
}
`;
  fs.writeFileSync(pDescPath, pDescContent, 'utf-8');
  console.log('Appended getProblemDescription to problemDescriptionsData.js');
}

// 2. testCasesData.js
const tCasesPath = path.resolve('src/data/testCasesData.js');
let tCasesContent = fs.readFileSync(tCasesPath, 'utf-8');
if (!tCasesContent.includes('export function getProblemTestSuite')) {
  tCasesContent += `\nexport function getProblemTestSuite(questionId, fallbackQuestion = {}) {
  const idStr = String(questionId);
  if (PROBLEM_TEST_CASES[idStr]) {
    return PROBLEM_TEST_CASES[idStr];
  }
  return {
    methodName: "solve",
    sampleCases: [
      { stdin: "sample_input", expectedStdout: "sample_output", input: ["sample_input"], expected: "sample_output" }
    ],
    hiddenCases: [
      { stdin: "hidden_input", expectedStdout: "hidden_output", input: ["hidden_input"], expected: "hidden_output" }
    ]
  };
}
`;
  fs.writeFileSync(tCasesPath, tCasesContent, 'utf-8');
  console.log('Appended getProblemTestSuite to testCasesData.js');
}

// 3. solutionsData.js
const solPath = path.resolve('src/data/solutionsData.js');
let solContent = fs.readFileSync(solPath, 'utf-8');
if (!solContent.includes('export function getEditorialSolution')) {
  solContent += `\nexport function getEditorialSolution(questionId, fallbackQuestion = {}) {
  const idStr = String(questionId);
  if (DETAILED_SOLUTIONS[idStr]) {
    return DETAILED_SOLUTIONS[idStr];
  }
  const name = fallbackQuestion.name || \`Problem \${idStr}\`;
  return {
    intuition: \`To solve **\${name}**, analyze the fundamental invariants and constraints. Consider optimal time and space trade-offs.\`,
    approaches: [
      {
        name: "Optimal Approach",
        description: \`Efficient algorithm utilizing optimal data structures for \${fallbackQuestion.pattern || 'the given problem pattern'}.\`,
        timeComplexity: "O(N)",
        spaceComplexity: "O(1)"
      }
    ],
    algorithmSteps: [
      "1. Parse the input and validate edge cases.",
      "2. Apply optimal traversal / algorithmic processing.",
      "3. Return the computed result."
    ],
    complexity: {
      time: "O(N)",
      space: "O(1)"
    },
    edgeCases: [
      "Empty or single element inputs",
      "Extreme boundary values"
    ],
    interviewTips: [
      "State time and space complexity upfront before coding.",
      "Test with small custom edge cases."
    ],
    code: {
      python: \`# Solution for \${name}\\nclass Solution:\\n    def solve(self):\\n        pass\`
    }
  };
}
`;
  fs.writeFileSync(solPath, solContent, 'utf-8');
  console.log('Appended getEditorialSolution to solutionsData.js');
}

console.log('Done appending helper exports!');
