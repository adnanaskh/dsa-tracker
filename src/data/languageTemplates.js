/**
 * Clean, Standard Starter Boilerplates & Templates for Competitive Programming
 * Supports Python 3, Java, C++, and JavaScript
 */

export const DEFAULT_TEMPLATES = {
  python3: `# Python 3 Solution
import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    # Write your optimal algorithm here 
    pass

if __name__ == '__main__':
    solve()
`,

  java: `// Java Solution (OpenJDK)
import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;

        // Write your optimal algorithm here
        // Output result using System.out.println()
    }
}
`,

  cpp: `// C++ Solution (GCC / C++17)
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Write your optimal algorithm here
    // Read input with cin >> and output with cout <<
    return 0;
}
`,

  javascript: `// JavaScript Solution (Node.js)
const fs = require('fs');

function solve() {
    const input = fs.readFileSync(0, 'utf-8').trim();
    if (!input) return;

    // Write your optimal algorithm here
    // Output result using console.log()
}

solve();
`
};

/**
 * Returns a language starter template for a given question and language
 */
export function getStarterTemplate(language, question, testSuite) {
  const lang = (language || 'python3').toLowerCase().trim();

  // If Python and testSuite provides tailored starterCode, use it
  if ((lang === 'python3' || lang === 'python') && testSuite?.starterCode) {
    return testSuite.starterCode;
  }

  if (lang === 'java') {
    return DEFAULT_TEMPLATES.java;
  }

  if (lang === 'cpp' || lang === 'c++') {
    return DEFAULT_TEMPLATES.cpp;
  }

  if (lang === 'javascript' || lang === 'js') {
    return DEFAULT_TEMPLATES.javascript;
  }

  return DEFAULT_TEMPLATES.python3;
}
