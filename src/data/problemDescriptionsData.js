// Detailed Problem Descriptions (Industry Standard Online Judge & Assessment Format)
// Standard Input (STDIN) and Standard Output (STDOUT) specifications, Constraints, and Examples.

export const DETAILED_PROBLEM_DESCRIPTIONS = {
  "1": {
    id: 1,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hashing",
    statement: `Given an integer array \`nums\`, determine whether any value appears **at least twice** in the array. Return \`true\` if any value is duplicated; otherwise return \`false\`.

An array is said to contain duplicates if there exists at least one pair of distinct indices \`(i, j)\` such that \`nums[i] == nums[j]\` where \`i != j\`.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` representing the number of elements in the array.
• Line 2: \`N\` space-separated integers representing the elements of array \`nums\`.`,
      explanation: "Read the total count N from the first line, followed by the N space-separated integers on the second line."
    },
    outputFormat: {
      standardOutput: "Print `true` if any element appears at least twice in the array; otherwise print `false` on a single line (in lowercase).",
      explanation: "A single string 'true' or 'false' written to standard output."
    },
    constraints: [
      "1 <= N <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "4\n1 2 3 1",
        output: "true",
        explanation: "The element 1 appears at index 0 and index 3 (2 occurrences). The output is true."
      },
      {
        id: 2,
        input: "4\n1 2 3 4",
        output: "false",
        explanation: "All elements [1, 2, 3, 4] are strictly distinct. The output is false."
      },
      {
        id: 3,
        input: "10\n1 1 1 3 3 4 3 2 4 2",
        output: "true",
        explanation: "Elements 1, 3, 4, and 2 each appear multiple times. The output is true."
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

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original characters exactly once.`,
    inputFormat: {
      standardInput: `• Line 1: String \`s\`
• Line 2: String \`t\``,
      explanation: "Read string s from line 1 and string t from line 2."
    },
    outputFormat: {
      standardOutput: "Print `true` if t is an anagram of s, otherwise print `false`.",
      explanation: "Output a single line containing either 'true' or 'false'."
    },
    constraints: [
      "1 <= len(s), len(t) <= 5 * 10^4",
      "Strings consist of lowercase English letters ('a'-'z').",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "anagram\nagaram",
        output: "true",
        explanation: "Both strings contain identical character counts: 3 'a's, 1 'n', 1 'g', 1 'r', 1 'm'."
      },
      {
        id: 2,
        input: "rat\ncar",
        output: "false",
        explanation: "Character frequencies differ between 'rat' and 'car'."
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
    statement: `Given an array of integers \`nums\` and an integer \`target\`, find the **indices of the two numbers** such that they add up to \`target\`.

You may assume that each input has **exactly one solution**, and you may not use the same element twice. You can print the answer indices in any order.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` (number of elements in the array).
• Line 2: \`N\` space-separated integers representing \`nums\`.
• Line 3: An integer \`target\`.`,
      explanation: "Line 1 specifies the array length, Line 2 contains the array elements, and Line 3 contains the target sum."
    },
    outputFormat: {
      standardOutput: "Print the two 0-based indices separated by a space on a single line (e.g., `0 1`).",
      explanation: "Two space-separated integers representing the zero-indexed positions of the pair."
    },
    constraints: [
      "2 <= N <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid pair exists.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "4\n2 7 11 15\n9",
        output: "0 1",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9. The indices are 0 and 1."
      },
      {
        id: 2,
        input: "3\n3 2 4\n6",
        output: "1 2",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6. The indices are 1 and 2."
      },
      {
        id: 3,
        input: "2\n3 3\n6",
        output: "0 1",
        explanation: "nums[0] + nums[1] = 3 + 3 = 6. The indices are 0 and 1."
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
    statement: `You are given an array \`prices\` where \`prices[i]\` represents the stock price on the \`i-th\` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a future day to sell that stock. Return the **maximum profit** you can achieve. If no profit can be made, return \`0\`.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` representing the number of days.
• Line 2: \`N\` space-separated integers representing stock prices on each day.`,
      explanation: "Read the number of days N, then the sequence of daily stock prices."
    },
    outputFormat: {
      standardOutput: "Print the maximum profit integer on a single line.",
      explanation: "A single non-negative integer representing maximum profit."
    },
    constraints: [
      "1 <= N <= 10^5",
      "0 <= prices[i] <= 10^4",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\n7 1 5 3 6 4",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5."
      },
      {
        id: 2,
        input: "5\n7 6 4 3 1",
        output: "0",
        explanation: "Prices continually decrease. No profitable trade is possible, so max profit = 0."
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
    statement: `Given a non-empty array of integers \`nums\`, every element appears **twice** except for one unique element. Find and output that single element.

Your solution must run in **linear runtime complexity** (\`O(N)\`) and use only **constant extra space** (\`O(1)\`).`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` (number of elements).
• Line 2: \`N\` space-separated integers.`,
      explanation: "Read array size N followed by the N integers."
    },
    outputFormat: {
      standardOutput: "Print the single unique integer on a single line.",
      explanation: "A single integer value."
    },
    constraints: [
      "1 <= N <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element appears twice except for one element which appears once.",
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
        explanation: "1 and 2 appear twice; 4 appears once."
      },
      {
        id: 3,
        input: "1\n1",
        output: "1",
        explanation: "Single element array."
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
    notes: "XOR of two identical numbers is 0 (`x ^ x = 0`) and `x ^ 0 = x`. XORing all numbers isolates the unique number."
  },

  "6": {
    id: 6,
    title: "Group Anagrams",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Hashing",
    statement: `Given an array of strings \`strs\`, group the **anagrams** together.

An **Anagram** is a word formed by rearranging the letters of another word using all original characters exactly once.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` (number of strings).
• Line 2: \`N\` space-separated strings.`,
      explanation: "Read the count N, then N space-separated lowercase words."
    },
    outputFormat: {
      standardOutput: "Print the grouped anagrams as nested JSON list format or one group per line.",
      explanation: "A 2D array representation containing groups of anagrams."
    },
    constraints: [
      "1 <= N <= 10^4",
      "0 <= len(strs[i]) <= 100",
      "Strings contain lowercase English letters.",
      "Time Limit: 1.5s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\neat tea tan ate nat bat",
        output: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]',
        explanation: 'Strings sharing the same character multiset are grouped together.'
      },
      {
        id: 2,
        input: "1\na",
        output: '[["a"]]',
        explanation: "Single character word forms a single group."
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
        
    print(json.dumps(list(groups.values())))

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
    statement: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` **most frequent elements**.

It is guaranteed that the answer is **unique** (the set of top k elements is unambiguous).`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` (number of elements).
• Line 2: \`N\` space-separated integers representing \`nums\`.
• Line 3: An integer \`k\`.`,
      explanation: "Line 1 has array size N, Line 2 has array elements, and Line 3 has integer k."
    },
    outputFormat: {
      standardOutput: "Print the `k` most frequent integers separated by a space on a single line.",
      explanation: "K space-separated integers in any order."
    },
    constraints: [
      "1 <= N <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= number of unique elements",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\n1 1 1 2 2 3\n2",
        output: "1 2",
        explanation: "Element 1 appears 3 times, 2 appears 2 times, and 3 appears 1 time. Top 2 frequent elements are 1 and 2."
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
    statement: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all elements of \`nums\` except \`nums[i]\`.

You must write an algorithm that runs in **\`O(N)\`** time and **without using division**.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` (number of elements).
• Line 2: \`N\` space-separated integers.`,
      explanation: "Read array size N followed by N integers on the second line."
    },
    outputFormat: {
      standardOutput: "Print \`N\` space-separated integers representing the resulting product array.",
      explanation: "N space-separated integers on a single line."
    },
    constraints: [
      "2 <= N <= 10^5",
      "-30 <= nums[i] <= 30",
      "Product of any prefix or suffix is guaranteed to fit in 32-bit integer.",
      "Division operation is strictly disallowed.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "4\n1 2 3 4",
        output: "24 12 8 6",
        explanation: "2*3*4 = 24, 1*3*4 = 12, 1*2*4 = 8, 1*2*3 = 6."
      },
      {
        id: 2,
        input: "5\n-1 1 0 -3 3",
        output: "0 0 9 0 0",
        explanation: "Product at index 2 is (-1)*1*(-3)*3 = 9. All other products include 0."
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

Empty cells are represented by the character \`"."\`.`,
    inputFormat: {
      standardInput: `• 9 lines, each containing 9 space-separated characters (digits '1'-'9' or '.').`,
      explanation: "A 9x9 matrix of board characters."
    },
    outputFormat: {
      standardOutput: "Print `true` if the board is valid; otherwise print `false`.",
      explanation: "A single boolean string 'true' or 'false'."
    },
    constraints: [
      "Board is strictly 9 x 9.",
      "Each character is a digit '1'-'9' or '.'.",
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
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Hash Set",
    statement: `Given an unsorted array of integers \`nums\`, find the **length of the longest consecutive elements sequence**.

Your algorithm must run in **\`O(N)\`** time complexity.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\` (number of elements in the array).
• Line 2: \`N\` space-separated integers representing \`nums\`.`,
      explanation: "Read array size N followed by the N integers."
    },
    outputFormat: {
      standardOutput: "Print a single integer representing the length of the longest consecutive sequence.",
      explanation: "A single integer length value."
    },
    constraints: [
      "0 <= N <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Time Complexity Target: Strictly O(N)",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\n100 4 200 1 3 2",
        output: "4",
        explanation: "The longest consecutive elements sequence is [1, 2, 3, 4] with length 4."
      },
      {
        id: 2,
        input: "10\n0 3 7 2 5 8 4 6 0 1",
        output: "9",
        explanation: "The longest consecutive sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8] with length 9."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        print(0)
        return
    
    n = int(tokens[0])
    if n == 0:
        print(0)
        return
        
    nums = [int(x) for x in tokens[1:n+1]]
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        # Check if it's the start of a sequence
        if (num - 1) not in num_set:
            current = num
            streak = 1
            while (current + 1) in num_set:
                current += 1
                streak += 1
            longest = max(longest, streak)
            
    print(longest)

if __name__ == '__main__':
    solve()
`,
    notes: "Only starts traversing from sequence origins (`num - 1 not in set`), visiting each number at most twice for O(N) total time."
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

  // Dynamic Fallback generator for questions 11-305
  const name = question?.name || "Problem " + id;
  const topic = question?.topic || "Data Structures & Algorithms";
  const difficulty = question?.difficulty || "Medium";
  const pattern = question?.pattern || "Optimal Algorithm";
  const methodName = testSuite?.methodName || "solve";

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
