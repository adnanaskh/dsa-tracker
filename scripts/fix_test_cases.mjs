import fs from 'fs';
import path from 'path';

const tCasesPath = path.resolve('src/data/testCasesData.js');
const tCasesModule = await import('../src/data/testCasesData.js');
const tests = tCasesModule.PROBLEM_TEST_CASES;

// Fix Q13
if (tests['13']) {
  // Case 3 (hidden index 0): [1, -1, 0, 1], k=0 -> 4
  tests['13'].hiddenCases[0].expected = 4;
  tests['13'].hiddenCases[0].expectedStdout = "4";
  
  // Case 6 (hidden index 3): [2, 3, -5, 5, 5], k=5 -> 5
  tests['13'].hiddenCases[3].expected = 5;
  tests['13'].hiddenCases[3].expectedStdout = "5";
}

// Fix Q43
if (tests['43']) {
  // Hidden case 0: "pmjghexybyrgzrcrmbtx", "hwbegsorregnxbtz" -> 7
  tests['43'].hiddenCases[0].expected = 7;
  tests['43'].hiddenCases[0].expectedStdout = "7";
}

fs.writeFileSync(tCasesPath, `// Realistic Test Cases for Competitive Execution (STDIN / STDOUT & Python Method Evaluation)\nexport const PROBLEM_TEST_CASES = ${JSON.stringify(tests, null, 2)};\n`, 'utf-8');
console.log('Fixed test case expected values for Q13 and Q43!');
