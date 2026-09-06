// Exact LeetCode & CodeChef Descriptions with Competitive Programming STDIN / STDOUT Specifications
// Contains exact problem statements, standard competitive programming I/O formats, constraints, and testable examples.

export const DETAILED_PROBLEM_DESCRIPTIONS = {
  "1": {
    id: 1,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hashing",
    statement: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of elements in the array \`nums\`.
• Line 2: \`N\` space-separated integers representing the elements of \`nums\`.`,
      explanation: "Read the total count N from the first line, followed by the N space-separated integers on the second line."
    },
    outputFormat: {
      standardOutput: "Print `true` if any value appears at least twice in the array; otherwise print `false` on a single line.",
      explanation: "A single boolean string 'true' or 'false' (in lowercase) written to standard output."
    },
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "4\n1 2 3 1",
        output: "true",
        explanation: "The value 1 appears at index 0 and index 3 (2 occurrences)."
      },
      {
        id: 2,
        input: "4\n1 2 3 4",
        output: "false",
        explanation: "All elements [1, 2, 3, 4] are pairwise distinct."
      },
      {
        id: 3,
        input: "10\n1 1 1 3 3 4 3 2 4 2",
        output: "true",
        explanation: "Elements 1, 3, 4, and 2 each appear multiple times."
      }
    ],
    starterCode: `import sys

def solve():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    
    seen = set()
    for num in nums:
        if num in seen:
            print("true")
            return
        seen.add(num)
    
    print("false")

if __name__ == '__main__':
    solve()
`,
    notes: "Utilizing a Hash Set provides an O(N) linear time solution with O(N) auxiliary space."
  },

  "2": {
    id: 2,
    title: "Valid Anagram",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hashing",
    statement: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an **anagram** of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    inputFormat: {
      standardInput: `• Line 1: String \`s\`
• Line 2: String \`t\``,
      explanation: "Line 1 contains the first string s, and Line 2 contains the second string t."
    },
    outputFormat: {
      standardOutput: "Print `true` if t is an anagram of s, otherwise print `false` on a single line.",
      explanation: "Output a single line containing either 'true' or 'false'."
    },
    constraints: [
      "1 <= s.length, t.length <= 5 * 10^4",
      "`s` and `t` consist of lowercase English letters.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "anagram\nnagaram",
        output: "true",
        explanation: "Both strings contain the exact same characters with identical frequencies: 'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1."
      },
      {
        id: 2,
        input: "rat\ncar",
        output: "false",
        explanation: "Character frequencies differ ('r' appears in both, but 't' is in s and 'c' is in t)."
      }
    ],
    starterCode: `import sys

def solve():
    lines = sys.stdin.read().split()
    if len(lines) < 2:
        return
    
    s = lines[0]
    t = lines[1]
    
    if len(s) != len(t):
        print("false")
        return
    
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in t:
        if ch not in counts or counts[ch] == 0:
            print("false")
            return
        counts[ch] -= 1
        
    print("true")

if __name__ == '__main__':
    solve()
`,
    notes: "A frequency hash map or array of size 26 checks anagram validity in O(N) time and O(1) space."
  },

  "3": {
    id: 3,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hash Map",
    statement: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the length of the array \`nums\`.
• Line 2: \`N\` space-separated integers representing \`nums\`.
• Line 3: An integer \`target\`.`,
      explanation: "Read the array size N, the N array elements, and the target integer."
    },
    outputFormat: {
      standardOutput: "Print the two 0-based indices separated by a space on a single line (e.g., `0 1`).",
      explanation: "Two space-separated integers representing the zero-indexed positions of the two numbers."
    },
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "4\n2 7 11 15\n9",
        output: "0 1",
        explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we return 0 1."
      },
      {
        id: 2,
        input: "3\n3 2 4\n6",
        output: "1 2",
        explanation: "Because nums[1] + nums[2] == 2 + 4 == 6, we return 1 2."
      },
      {
        id: 3,
        input: "2\n3 3\n6",
        output: "0 1",
        explanation: "Because nums[0] + nums[1] == 3 + 3 == 6, we return 0 1."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    target = int(tokens[n+1])
    
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            print(f"{seen[diff]} {i}")
            return
        seen[num] = i

if __name__ == '__main__':
    solve()
`,
    notes: "One-pass hash map records each visited element and its index, achieving O(N) time."
  },

  "4": {
    id: 4,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Greedy / Kadane",
    statement: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the **maximum profit** you can achieve from this transaction. If you cannot achieve any profit, return \`0\`.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of days.
• Line 2: \`N\` space-separated integers representing stock prices on each day.`,
      explanation: "Read the number of days N, then the sequence of daily stock prices."
    },
    outputFormat: {
      standardOutput: "Print the maximum profit integer on a single line.",
      explanation: "A single integer representing the maximum achievable profit (0 if no profit is possible)."
    },
    constraints: [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\n7 1 5 3 6 4",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
      },
      {
        id: 2,
        input: "5\n7 6 4 3 1",
        output: "0",
        explanation: "In this case, no transactions are done and the max profit = 0."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    
    n = int(tokens[0])
    prices = [int(x) for x in tokens[1:n+1]]
    
    min_price = float('inf')
    max_profit = 0
    
    for p in prices:
        if p < min_price:
            min_price = p
        elif p - min_price > max_profit:
            max_profit = p - min_price
            
    print(max_profit)

if __name__ == '__main__':
    solve()
`,
    notes: "Maintains running minimum price and updates maximum difference in a single O(N) pass."
  },

  "5": {
    id: 5,
    title: "Single Number",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Bit Manipulation",
    statement: `Given a **non-empty** array of integers \`nums\`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a **linear runtime complexity** and use only **constant extra space**.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of elements.
• Line 2: \`N\` space-separated integers representing \`nums\`.`,
      explanation: "Read array size N followed by the N integers."
    },
    outputFormat: {
      standardOutput: "Print the single element that appears only once.",
      explanation: "A single integer value printed on a single line."
    },
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "3\n2 2 1",
        output: "1",
        explanation: "The element 2 appears twice; 1 appears once."
      },
      {
        id: 2,
        input: "5\n4 1 2 1 2",
        output: "4",
        explanation: "Elements 1 and 2 appear twice; 4 appears once."
      },
      {
        id: 3,
        input: "1\n1",
        output: "1",
        explanation: "Array contains only one element."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    
    res = 0
    for x in nums:
        res ^= x
        
    print(res)

if __name__ == '__main__':
    solve()
`,
    notes: "XOR of two identical numbers is 0 (`x ^ x = 0`) and `x ^ 0 = x`. XORing all numbers isolates the unique number in O(N) time and O(1) space."
  },

  "6": {
    id: 6,
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Hashing",
    statement: `Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in **any order**.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of strings in \`strs\`.
• Line 2: \`N\` space-separated strings representing \`strs\`.`,
      explanation: "Read the count N, then N space-separated lowercase words."
    },
    outputFormat: {
      standardOutput: "Print the grouped anagrams formatted as a 2D JSON array `[[\"...\"]]`.",
      explanation: "A 2D array containing lists of anagram groups."
    },
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "`strs[i]` consists of lowercase English letters.",
      "Time Limit: 1.5s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\neat tea tan ate nat bat",
        output: '[["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]',
        explanation: 'Strings sharing the same character frequencies are grouped together.'
      },
      {
        id: 2,
        input: "1\na",
        output: '[["a"]]',
        explanation: "A single word forms a single group."
      }
    ],
    starterCode: `import sys
import json
from collections import defaultdict

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    
    n = int(tokens[0])
    strs = tokens[1:n+1]
    
    groups = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)
        
    res = [sorted(g) for g in groups.values()]
    res.sort()
    print(json.dumps(res))

if __name__ == '__main__':
    solve()
`,
    notes: "Map sorted word strings to their original words in a Hash Map in O(N * K log K) time."
  },

  "7": {
    id: 7,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Heap / Bucket Sort",
    statement: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` **most frequent elements**. You may return the answer in **any order**.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the size of array \`nums\`.
• Line 2: \`N\` space-separated integers representing \`nums\`.
• Line 3: An integer \`k\`.`,
      explanation: "Line 1 has array size N, Line 2 has array elements, and Line 3 has integer k."
    },
    outputFormat: {
      standardOutput: "Print the `k` most frequent elements separated by a space on a single line.",
      explanation: "K space-separated integers."
    },
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "`k` is in the range `[1, the number of unique elements in the array]`.",
      "It is guaranteed that the answer is unique.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\n1 1 1 2 2 3\n2",
        output: "1 2",
        explanation: "Element 1 appears 3 times, 2 appears 2 times, and 3 appears 1 time. The 2 most frequent elements are 1 and 2."
      },
      {
        id: 2,
        input: "1\n1\n1",
        output: "1",
        explanation: "1 is the only element in the array."
      }
    ],
    starterCode: `import sys
from collections import Counter

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    k = int(tokens[n+1])
    
    counts = Counter(nums)
    most_common = [str(x[0]) for x in counts.most_common(k)]
    print(" ".join(most_common))

if __name__ == '__main__':
    solve()
`,
    notes: "Can be solved in O(N) using Bucket Sort or O(N log K) using a Min-Heap."
  },

  "8": {
    id: 8,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Prefix / Suffix Products",
    statement: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.

You must write an algorithm that runs in **\`O(N)\`** time and **without using the division operation**.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the size of array \`nums\`.
• Line 2: \`N\` space-separated integers representing \`nums\`.`,
      explanation: "Read array size N followed by N integers on the second line."
    },
    outputFormat: {
      standardOutput: "Print `N` space-separated integers representing the resulting product array `answer`.",
      explanation: "N space-separated integers on a single line."
    },
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
      "Division operation is strictly disallowed.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "4\n1 2 3 4",
        output: "24 12 8 6",
        explanation: "answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, answer[2] = 1*2*4 = 8, answer[3] = 1*2*3 = 6."
      },
      {
        id: 2,
        input: "5\n-1 1 0 -3 3",
        output: "0 0 9 0 0",
        explanation: "answer[2] is (-1)*1*(-3)*3 = 9. All other products include 0."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
    
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
        
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
        
    print(" ".join(str(x) for x in res))

if __name__ == '__main__':
    solve()
`,
    notes: "Multiply prefix products during the forward pass and suffix products during the backward pass in O(1) auxiliary space."
  },

  "9": {
    id: 9,
    title: "Valid Sudoku",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Hash Set / Bitmask",
    statement: `Determine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits \`1-9\` without repetition.
2. Each column must contain the digits \`1-9\` without repetition.
3. Each of the nine \`3 x 3\` sub-boxes of the grid must contain the digits \`1-9\` without repetition.

**Note:**
- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.
- Empty cells are represented by the character \`"."\`.`,
    inputFormat: {
      standardInput: `• 9 lines, each containing 9 space-separated characters (digits '1'-'9' or '.').`,
      explanation: "A 9x9 matrix of board characters representing the Sudoku board."
    },
    outputFormat: {
      standardOutput: "Print `true` if the board is valid; otherwise print `false`.",
      explanation: "A single boolean string 'true' or 'false'."
    },
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit '1'-'9' or '.'.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: `5 3 . . 7 . . . .
6 . . 1 9 5 . . .
. 9 8 . . . . 6 .
8 . . . 6 . . . 3
4 . . 8 . 3 . . 1
7 . . . 2 . . . 6
. 6 . . . . 2 8 .
. . . 4 1 9 . . 5
. . . . 8 . . 7 9`,
        output: "true",
        explanation: "All rows, columns, and 3x3 subgrids contain no duplicates among filled digits."
      },
      {
        id: 2,
        input: `8 3 . . 7 . . . .
6 . . 1 9 5 . . .
. 9 8 . . . . 6 .
8 . . . 6 . . . 3
4 . . 8 . 3 . . 1
7 . . . 2 . . . 6
. 6 . . . . 2 8 .
. . . 4 1 9 . . 5
. . . . 8 . . 7 9`,
        output: "false",
        explanation: "Duplicate '8' in row 0 column 0 and row 3 column 0 violates column uniqueness."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if len(tokens) < 81:
        return
    
    board = [tokens[i*9:(i+1)*9] for i in range(9)]
    
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == '.':
                continue
                
            box_idx = (r // 3) * 3 + (c // 3)
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                print("false")
                return
                
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)
            
    print("true")

if __name__ == '__main__':
    solve()
`,
    notes: "Evaluates board validity in O(81) = O(1) constant time."
  },

  "10": {
    id: 10,
    title: "Encode and Decode Strings",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "String Manipulation",
    statement: `Design an algorithm to **encode** a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Please implement \`encode\` and \`decode\` functions.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of strings.
• Line 2: \`N\` space-separated strings.`,
      explanation: "Read count N followed by the sequence of words."
    },
    outputFormat: {
      standardOutput: "Print the decoded list of strings formatted as JSON `[\"word1\", \"word2\", ...]`.",
      explanation: "A JSON array of decoded strings."
    },
    constraints: [
      "0 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "`strs[i]` contains any possible characters out of 256 valid ASCII characters.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "4\nlint code love you",
        output: '["lint", "code", "love", "you"]',
        explanation: "Encoding format: '4#lint4#code4#love3#you'. Decoding reconstructs the original 4 strings."
      },
      {
        id: 2,
        input: "2\nwe say",
        output: '["we", "say"]',
        explanation: "Decoding yields original strings 'we' and 'say'."
      }
    ],
    starterCode: `import sys
import json

class Codec:
    def encode(self, strs: list[str]) -> str:
        res = ""
        for s in strs:
            res += f"{len(s)}#{s}"
        return res

    def decode(self, s: str) -> list[str]:
        res = []
        i = 0
        while i < len(s):
            j = i
            while s[j] != '#':
                j += 1
            length = int(s[i:j])
            res.append(s[j+1 : j+1+length])
            i = j + 1 + length
        return res

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        print("[]")
        return
        
    n = int(tokens[0])
    strs = tokens[1:n+1]
    
    codec = Codec()
    encoded = codec.encode(strs)
    decoded = codec.decode(encoded)
    print(json.dumps(decoded))

if __name__ == '__main__':
    solve()
`,
    notes: "Length-prefix encoding (e.g. `<length>#<string>`) guarantees stateless, unambiguous parsing in O(N) time."
  }
};

/**
 * Returns formatted problem description with standard Online Judge layout.
 * Dynamic fallback generator ensures questions 11-305 have full structure.
 */
export function getProblemDescription(id, question, testSuite = null) {
  const strId = String(id);
  if (DETAILED_PROBLEM_DESCRIPTIONS[strId]) {
    return DETAILED_PROBLEM_DESCRIPTIONS[strId];
  }

  const name = question?.name || "Problem " + id;
  const topic = question?.topic || "Data Structures & Algorithms";
  const difficulty = question?.difficulty || "Medium";
  const pattern = question?.pattern || "Optimal Algorithm";

  const sampleCases = testSuite?.sampleCases || [];

  const dynamicExamples = sampleCases.slice(0, 3).map((cs, idx) => {
    let inputStr = '';
    if (cs.stdin) {
      inputStr = cs.stdin;
    } else if (Array.isArray(cs.input)) {
      if (cs.input.length === 1 && Array.isArray(cs.input[0])) {
        inputStr = `${cs.input[0].length}\n${cs.input[0].join(' ')}`;
      } else {
        inputStr = cs.input.map(x => Array.isArray(x) ? `${x.length}\n${x.join(' ')}` : String(x)).join('\n');
      }
    } else {
      inputStr = String(cs.input);
    }

    const outputStr = cs.expectedStdout || (cs.expected === true ? 'true' : cs.expected === false ? 'false' : Array.isArray(cs.expected) ? cs.expected.join(' ') : String(cs.expected));

    return {
      id: idx + 1,
      input: inputStr,
      output: outputStr,
      explanation: `For the provided input data, the algorithm computes and outputs ${outputStr}.`
    };
  });

  return {
    id: Number(id),
    title: name,
    difficulty: difficulty,
    topic: topic,
    pattern: pattern,
    statement: `Given the requirements for **${name}**, write a complete program utilizing the **${pattern}** technique in **${topic}**.

Your program must read input from standard input (\`stdin\`), execute the optimal algorithm, and print the required result to standard output (\`stdout\`).`,
    inputFormat: {
      standardInput: `• Line 1: Test case size / array length \`N\`.\n• Line 2: Space-separated data elements.`,
      explanation: "Read standard input data according to problem constraints."
    },
    outputFormat: {
      standardOutput: "Print the required output to standard output (`stdout`).",
      explanation: "Format output exactly as specified by the problem requirements."
    },
    constraints: [
      "1 <= N <= 10^5",
      "Time Complexity: Target O(N) or O(N log N)",
      "Space Complexity: Target O(1) or O(N)",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: dynamicExamples.length > 0 ? dynamicExamples : [
      {
        id: 1,
        input: "Sample Input",
        output: "Sample Output",
        explanation: "Step-by-step example execution."
      }
    ],
    starterCode: `import sys

def solve():
    # Read from standard input (stdin)
    input_data = sys.stdin.read().split()
    if not input_data:
        return
        
    # Write your logic here
    # Print result to standard output (stdout)
    pass

if __name__ == '__main__':
    solve()
`,
    notes: `Analyze the problem with the ${pattern} technique to optimize execution time.`
  };
}
