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
  },

  "11": {
    id: 11,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Hash Set",
    statement: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in **\`O(n)\`** time.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of elements.
• Line 2: \`N\` space-separated integers representing the array \`nums\`. (If \`N = 0\`, Line 2 may be omitted or empty).`,
      explanation: "Read array size N followed by N integer elements."
    },
    outputFormat: {
      standardOutput: "Print a single integer representing the length of the longest consecutive sequence.",
      explanation: "An integer denoting the maximum streak length."
    },
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\n100 4 200 1 3 2",
        output: "4",
        explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4."
      },
      {
        id: 2,
        input: "10\n0 3 7 2 5 8 4 6 0 1",
        output: "9",
        explanation: "The sequence [0, 1, 2, 3, 4, 5, 6, 7, 8] has length 9."
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
    
    for x in num_set:
        # Check if x is the start of a streak
        if (x - 1) not in num_set:
            curr = x
            streak = 1
            while (curr + 1) in num_set:
                curr += 1
                streak += 1
            if streak > longest:
                longest = streak
                
    print(longest)

if __name__ == '__main__':
    solve()
`,
    notes: "Inserting elements into a Hash Set allows O(1) lookups. Only expand when (x - 1) is not present to guarantee O(N) total time."
  },

  "12": {
    id: 12,
    title: "Sort Colors",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Dutch National Flag",
    statement: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them **in-place** so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers \`0\`, \`1\`, and \`2\` to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function and using only **constant extra space \`O(1)\`**.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of elements.
• Line 2: \`N\` space-separated integers where each integer is \`0\`, \`1\`, or \`2\`.`,
      explanation: "Read array size N followed by the sequence of 0s, 1s, and 2s."
    },
    outputFormat: {
      standardOutput: "Print the \`N\` space-separated integers sorted in non-decreasing order.",
      explanation: "A single line containing the sorted elements."
    },
    constraints: [
      "n == nums.length",
      "1 <= n <= 300",
      "nums[i] is either 0, 1, or 2.",
      "Must be solved in-place with O(1) extra space.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "6\n2 0 2 1 1 0",
        output: "0 0 1 1 2 2",
        explanation: "Sorting the colors [2, 0, 2, 1, 1, 0] gives [0, 0, 1, 1, 2, 2]."
      },
      {
        id: 2,
        input: "3\n2 0 1",
        output: "0 1 2",
        explanation: "Sorting [2, 0, 1] gives [0, 1, 2]."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    
    # Dutch National Flag 3-way partitioning
    low = 0
    mid = 0
    high = n - 1
    
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
            
    print(" ".join(str(x) for x in nums))

if __name__ == '__main__':
    solve()
`,
    notes: "The Dutch National Flag algorithm partitions the array into three zones in a single pass with O(1) extra space."
  },

  "13": {
    id: 13,
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Prefix Sum + Hash Map",
    statement: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.

A subarray is a contiguous **non-empty** sequence of elements within an array.`,
    inputFormat: {
      standardInput: `• Line 1: Two space-separated integers \`N\` and \`k\`.
• Line 2: \`N\` space-separated integers representing the array \`nums\`.`,
      explanation: "Read array size N, target sum k, and the N array integers."
    },
    outputFormat: {
      standardOutput: "Print a single integer representing the count of continuous subarrays whose sum equals k.",
      explanation: "An integer count of matching subarrays."
    },
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "3 2\n1 1 1",
        output: "2",
        explanation: "Subarrays with sum 2 are nums[0..1] = [1, 1] and nums[1..2] = [1, 1]."
      },
      {
        id: 2,
        input: "3 3\n1 2 3",
        output: "2",
        explanation: "Subarrays with sum 3 are nums[0..1] = [1, 2] and nums[2..2] = [3]."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    n = int(tokens[0])
    k = int(tokens[1])
    nums = [int(x) for x in tokens[2:n+2]]
    
    count = 0
    curr_sum = 0
    # prefix_map stores frequency of running prefix sums
    prefix_map = {0: 1}
    
    for x in nums:
        curr_sum += x
        target = curr_sum - k
        if target in prefix_map:
            count += prefix_map[target]
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
        
    print(count)

if __name__ == '__main__':
    solve()
`,
    notes: "Maintain a running prefix sum and hash map of frequencies to find subarrays summing to k in O(N) time."
  },

  "14": {
    id: 14,
    title: "Find All Anagrams in a String",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Sliding Window + Hash Map",
    statement: `Given two strings \`s\` and \`p\`, return an array of all the start indices of \`p\`'s anagrams in \`s\`.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    inputFormat: {
      standardInput: `• Line 1: String \`s\`
• Line 2: String \`p\``,
      explanation: "Read haystack string s and pattern string p."
    },
    outputFormat: {
      standardOutput: "Print the space-separated start indices in ascending order. If no anagram is found, print nothing (or empty line).",
      explanation: "A list of 0-indexed start positions."
    },
    constraints: [
      "1 <= s.length, p.length <= 3 * 10^4",
      "s and p consist of lowercase English letters.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "cbaebabacd\nabc",
        output: "0 6",
        explanation: "The substring with start index = 0 is 'cba', which is an anagram of 'abc'. The substring with start index = 6 is 'bac', which is an anagram of 'abc'."
      },
      {
        id: 2,
        input: "abab\nab",
        output: "0 1 2",
        explanation: "The substrings starting at indices 0 ('ab'), 1 ('ba'), and 2 ('ab') are all anagrams of 'ab'."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if len(tokens) < 2:
        return
        
    s = tokens[0]
    p = tokens[1]
    
    ns, np = len(s), len(p)
    if ns < np:
        print("")
        return
        
    p_count = [0] * 26
    s_count = [0] * 26
    
    for ch in p:
        p_count[ord(ch) - ord('a')] += 1
        
    for i in range(np):
        s_count[ord(s[i]) - ord('a')] += 1
        
    res = []
    if s_count == p_count:
        res.append(0)
        
    for i in range(np, ns):
        s_count[ord(s[i]) - ord('a')] += 1
        s_count[ord(s[i - np]) - ord('a')] -= 1
        if s_count == p_count:
            res.append(i - np + 1)
            
    print(" ".join(str(x) for x in res))

if __name__ == '__main__':
    solve()
`,
    notes: "A sliding window of fixed length len(p) compares character frequency vectors in O(26) = O(1) per step, achieving O(|s|) total time."
  },

  "15": {
    id: 15,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Kadane's Algorithm",
    statement: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A **subarray** is a contiguous non-empty sequence of elements within an array.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of elements.
• Line 2: \`N\` space-separated integers representing the array \`nums\`.`,
      explanation: "Read array length N followed by N integers."
    },
    outputFormat: {
      standardOutput: "Print a single integer representing the maximum subarray sum.",
      explanation: "An integer containing the maximum contiguous sum."
    },
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "9\n-2 1 -3 4 -1 2 1 -5 4",
        output: "6",
        explanation: "The subarray [4, -1, 2, 1] has the largest sum = 6."
      },
      {
        id: 2,
        input: "1\n1",
        output: "1",
        explanation: "The single element subarray [1] has sum = 1."
      },
      {
        id: 3,
        input: "5\n5 4 -1 7 8",
        output: "23",
        explanation: "The subarray [5, 4, -1, 7, 8] has the largest sum = 23."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    
    max_sum = nums[0]
    curr_sum = nums[0]
    
    for x in nums[1:]:
        curr_sum = max(x, curr_sum + x)
        max_sum = max(max_sum, curr_sum)
        
    print(max_sum)

if __name__ == '__main__':
    solve()
`,
    notes: "Kadane's Algorithm maintains the maximum subarray sum ending at each position in O(N) time and O(1) space."
  },

  "16": {
    id: 16,
    title: "Majority Element",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Boyer-Moore Voting",
    statement: `Given an array \`nums\` of size \`n\`, return the majority element.

The **majority element** is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.

**Follow-up:** Could you solve the problem in linear time **\`O(n)\`** and in **\`O(1)\`** space?`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of elements.
• Line 2: \`N\` space-separated integers representing the array \`nums\`.`,
      explanation: "Read array size N followed by N integers."
    },
    outputFormat: {
      standardOutput: "Print a single integer representing the majority element.",
      explanation: "The integer occurring strictly more than floor(N/2) times."
    },
    constraints: [
      "n == nums.length",
      "1 <= n <= 5 * 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "3\n3 2 3",
        output: "3",
        explanation: "Element 3 appears 2 times, which is > 3/2 = 1.5 times."
      },
      {
        id: 2,
        input: "7\n2 2 1 1 1 2 2",
        output: "2",
        explanation: "Element 2 appears 4 times, which is > 7/2 = 3.5 times."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    
    # Boyer-Moore Voting Algorithm
    candidate = None
    count = 0
    
    for x in nums:
        if count == 0:
            candidate = x
            count = 1
        elif x == candidate:
            count += 1
        else:
            count -= 1
            
    print(candidate)

if __name__ == '__main__':
    solve()
`,
    notes: "Boyer-Moore Voting cancels out differing elements, leaving the majority element in O(N) time and O(1) space."
  },

  "17": {
    id: 17,
    title: "Move Zeroes",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Two Pointer",
    statement: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note** that you must do this in-place without making a copy of the array.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the number of elements.
• Line 2: \`N\` space-separated integers representing the array \`nums\`.`,
      explanation: "Read array size N followed by the sequence of integers."
    },
    outputFormat: {
      standardOutput: "Print the \`N\` space-separated integers after moving all zeroes to the end.",
      explanation: "A single line containing the modified array."
    },
    constraints: [
      "1 <= nums.length <= 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "Must do this in-place with O(1) extra space.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "5\n0 1 0 3 12",
        output: "1 3 12 0 0",
        explanation: "Non-zero elements 1, 3, 12 maintain their order, and zeroes are shifted to the end."
      },
      {
        id: 2,
        input: "1\n0",
        output: "0",
        explanation: "Single zero element remains unchanged."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    n = int(tokens[0])
    nums = [int(x) for x in tokens[1:n+1]]
    
    # Two pointers: insert_pos points to the next non-zero insertion slot
    insert_pos = 0
    for i in range(n):
        if nums[i] != 0:
            nums[insert_pos], nums[i] = nums[i], nums[insert_pos]
            insert_pos += 1
            
    print(" ".join(str(x) for x in nums))

if __name__ == '__main__':
    solve()
`,
    notes: "Using a slow/fast pointer swap moves non-zero values forward in a single pass while preserving relative order."
  },

  "18": {
    id: 18,
    title: "Rotate Array",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Array Reversal",
    statement: `Given an integer array \`nums\`, rotate the array to the right by \`k\` steps, where \`k\` is non-negative.

**Follow up:**
- Try to come up with as many solutions as you can; there are at least three different ways to solve this problem.
- Could you do it in-place with \`O(1)\` extra space?`,
    inputFormat: {
      standardInput: `• Line 1: Two space-separated integers \`N\` and \`k\`.
• Line 2: \`N\` space-separated integers representing the array \`nums\`.`,
      explanation: "Read array size N, rotation steps k, and the N array elements."
    },
    outputFormat: {
      standardOutput: "Print the \`N\` space-separated integers after performing the right rotation.",
      explanation: "A single line containing the rotated array."
    },
    constraints: [
      "1 <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "0 <= k <= 10^5",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "7 3\n1 2 3 4 5 6 7",
        output: "5 6 7 1 2 3 4",
        explanation: "Rotate 1 step to the right: [7,1,2,3,4,5,6]\nRotate 2 steps to the right: [6,7,1,2,3,4,5]\nRotate 3 steps to the right: [5,6,7,1,2,3,4]"
      },
      {
        id: 2,
        input: "4 2\n-1 -100 3 99",
        output: "3 99 -1 -100",
        explanation: "Rotate 1 step to the right: [99,-1,-100,3]\nRotate 2 steps to the right: [3,99,-1,-100]"
      }
    ],
    starterCode: `import sys

def reverse(arr, left, right):
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    n = int(tokens[0])
    k = int(tokens[1])
    nums = [int(x) for x in tokens[2:n+2]]
    
    k = k % n
    if k != 0:
        # Step 1: Reverse entire array
        reverse(nums, 0, n - 1)
        # Step 2: Reverse first k elements
        reverse(nums, 0, k - 1)
        # Step 3: Reverse remaining n - k elements
        reverse(nums, k, n - 1)
        
    print(" ".join(str(x) for x in nums))

if __name__ == '__main__':
    solve()
`,
    notes: "Reversing the entire array followed by reversing both subarrays [0, k-1] and [k, n-1] achieves in-place rotation in O(N) time and O(1) space."
  },

  "19": {
    id: 19,
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Floyd's Cycle Detection",
    statement: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.

There is only **one repeated number** in \`nums\`, return this repeated number.

You must solve the problem **without** modifying the array \`nums\` and uses only **constant \`O(1)\` extra space**.`,
    inputFormat: {
      standardInput: `• Line 1: An integer \`N\`, the total number of elements in the array (equal to \`n + 1\`).
• Line 2: \`N\` space-separated integers where each element is between \`1\` and \`N - 1\`.`,
      explanation: "Read total length N followed by N integers."
    },
    outputFormat: {
      standardOutput: "Print a single integer representing the duplicate value.",
      explanation: "The repeated integer."
    },
    constraints: [
      "1 <= n <= 10^5",
      "nums.length == n + 1",
      "1 <= nums[i] <= n",
      "All the integers in nums appear only once except for precisely one integer which appears two or more times.",
      "Must NOT modify the array nums.",
      "Must use O(1) auxiliary space.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "5\n1 3 4 2 2",
        output: "2",
        explanation: "Integer 2 appears twice."
      },
      {
        id: 2,
        input: "5\n3 1 3 4 2",
        output: "3",
        explanation: "Integer 3 appears twice."
      },
      {
        id: 3,
        input: "5\n3 3 3 3 3",
        output: "3",
        explanation: "Integer 3 appears multiple times."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    n_plus_1 = int(tokens[0])
    nums = [int(x) for x in tokens[1:n_plus_1+1]]
    
    # Floyd's Tortoise and Hare (Cycle Detection)
    slow = nums[0]
    fast = nums[0]
    
    # Phase 1: Finding intersection point in cycle
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
            
    # Phase 2: Finding entrance to the cycle
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
        
    print(slow)

if __name__ == '__main__':
    solve()
`,
    notes: "Treating array indices as linked list pointers turns finding the duplicate into finding the cycle entry point via Floyd's Algorithm in O(N) time and O(1) space."
  },

  "20": {
    id: 20,
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "In-place Matrix Marking",
    statement: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.

You must do it **in-place** with **\`O(1)\` extra memory**.`,
    inputFormat: {
      standardInput: `• Line 1: Two space-separated integers \`M\` and \`N\` (number of rows and columns).
• Next \`M\` lines: \`N\` space-separated integers per line representing the matrix rows.`,
      explanation: "Read dimensions M and N, followed by M rows of N integers."
    },
    outputFormat: {
      standardOutput: "Print the modified matrix as \`M\` lines, each containing \`N\` space-separated integers.",
      explanation: "The updated matrix with affected rows and columns set to 0."
    },
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200",
      "-2^31 <= matrix[i][j] <= 2^31 - 1",
      "Must be solved in-place with O(1) extra space.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "3 3\n1 1 1\n1 0 1\n1 1 1",
        output: "1 0 1\n0 0 0\n1 0 1",
        explanation: "Cell (1, 1) is 0, so row 1 and column 1 are both filled with zeroes."
      },
      {
        id: 2,
        input: "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5",
        output: "0 0 0 0\n0 4 5 0\n0 3 1 0",
        explanation: "Row 0 and columns 0 and 3 contain 0s, resulting in those entire rows and columns becoming 0."
      }
    ],
    starterCode: `import sys

def solve():
    tokens = sys.stdin.read().split()
    if not tokens:
        return
        
    m = int(tokens[0])
    n = int(tokens[1])
    
    idx = 2
    matrix = []
    for r in range(m):
        matrix.append([int(x) for x in tokens[idx : idx + n]])
        idx += n
        
    first_row_has_zero = any(matrix[0][c] == 0 for c in range(n))
    first_col_has_zero = any(matrix[r][0] == 0 for r in range(m))
    
    # Use first row and column as markers
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
                
    # Update inner matrix based on markers
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
                
    # Update first row and column if necessary
    if first_row_has_zero:
        for c in range(n):
            matrix[0][c] = 0
            
    if first_col_has_zero:
        for r in range(m):
            matrix[r][0] = 0
            
    for row in matrix:
        print(" ".join(str(x) for x in row))

if __name__ == '__main__':
    solve()
`,
    notes: "Using the matrix's own first row and column as zero markers achieves optimal O(M * N) time with O(1) auxiliary space."
  }
,

  "21": {
  "id": 21,
  "title": "Spiral Matrix",
  "difficulty": "Medium",
  "topic": "Arrays & Hashing",
  "pattern": "Matrix Traversal",
  "statement": "Given an `m x n` matrix, return *all elements of the matrix in spiral order*.",
  "inputFormat": {
    "standardInput": "• Line 1: Two space-separated integers `M` and `N` (number of rows and columns).\n• Next `M` lines: `N` space-separated integers per line representing the matrix.",
    "explanation": "Read dimensions M and N, followed by M rows of N space-separated integers."
  },
  "outputFormat": {
    "standardOutput": "Print all elements visited in clockwise spiral order as space-separated integers on a single line.",
    "explanation": "The spiral traversal of the matrix."
  },
  "constraints": [
    "m == matrix.length",
    "n == matrix[i].length",
    "1 <= m, n <= 10",
    "-100 <= matrix[i][j] <= 100",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "3 3\n1 2 3\n4 5 6\n7 8 9",
      "output": "1 2 3 6 9 8 7 4 5",
      "explanation": "Traversing top row (1, 2, 3), right col (6, 9), bottom row (8, 7), left col (4), and inner (5)."
    },
    {
      "id": 2,
      "input": "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
      "output": "1 2 3 4 8 12 11 10 9 5 6 7",
      "explanation": "Clockwise spiral traversal of a 3x4 rectangular matrix."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    m = int(tokens[0])\n    n = int(tokens[1])\n    idx = 2\n    matrix = []\n    for _ in range(m):\n        matrix.append([int(x) for x in tokens[idx : idx + n]])\n        idx += n\n        \n    top, bottom = 0, m - 1\n    left, right = 0, n - 1\n    res = []\n    \n    while top <= bottom and left <= right:\n        for c in range(left, right + 1):\n            res.append(matrix[top][c])\n        top += 1\n        \n        for r in range(top, bottom + 1):\n            res.append(matrix[r][right])\n        right -= 1\n        \n        if top <= bottom:\n            for c in range(right, left - 1, -1):\n                res.append(matrix[bottom][c])\n            bottom -= 1\n            \n        if left <= right:\n            for r in range(bottom, top - 1, -1):\n                res.append(matrix[r][left])\n            left += 1\n            \n    print(\" \".join(str(x) for x in res))\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Track four boundary pointers (top, bottom, left, right) and shrink the boundary inward after traversing each side."
},

  "22": {
  "id": 22,
  "title": "Trapping Rain Water",
  "difficulty": "Hard",
  "topic": "Arrays & Hashing",
  "pattern": "Two Pointer / Stack",
  "statement": "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
  "inputFormat": {
    "standardInput": "• Line 1: An integer `N`, the number of elevation bars.\n• Line 2: `N` space-separated non-negative integers representing the bar heights.",
    "explanation": "Read array size N followed by elevation heights."
  },
  "outputFormat": {
    "standardOutput": "Print a single integer representing total units of trapped rain water.",
    "explanation": "Total volume of water trapped."
  },
  "constraints": [
    "n == height.length",
    "1 <= n <= 2 * 10^4",
    "0 <= height[i] <= 10^5",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
      "output": "6",
      "explanation": "Water trapped in the valleys between bars sums to 6 units."
    },
    {
      "id": 2,
      "input": "6\n4 2 0 3 2 5",
      "output": "9",
      "explanation": "Trapped water between height 4 and 5 equals 9 units."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    height = [int(x) for x in tokens[1:n+1]]\n    if n < 3:\n        print(0)\n        return\n        \n    left, right = 0, n - 1\n    left_max, right_max = 0, 0\n    water = 0\n    \n    while left < right:\n        if height[left] < height[right]:\n            if height[left] >= left_max:\n                left_max = height[left]\n            else:\n                water += left_max - height[left]\n            left += 1\n        else:\n            if height[right] >= right_max:\n                right_max = height[right]\n            else:\n                water += right_max - height[right]\n            right -= 1\n            \n    print(water)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Using two pointers moving inward based on the smaller maximum boundary calculates trapped water in O(N) time and O(1) space."
},

  "23": {
  "id": 23,
  "title": "Largest Rectangle in Histogram",
  "difficulty": "Hard",
  "topic": "Arrays & Hashing",
  "pattern": "Monotonic Stack",
  "statement": "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return *the area of the largest rectangle in the histogram*.",
  "inputFormat": {
    "standardInput": "• Line 1: An integer `N`, the number of histogram bars.\n• Line 2: `N` space-separated integers representing the bar heights.",
    "explanation": "Read count N and the list of bar heights."
  },
  "outputFormat": {
    "standardOutput": "Print a single integer representing the maximum rectangle area.",
    "explanation": "The maximum rectangular area."
  },
  "constraints": [
    "1 <= heights.length <= 10^5",
    "0 <= heights[i] <= 10^4",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "6\n2 1 5 6 2 3",
      "output": "10",
      "explanation": "The largest rectangle is formed between heights 5 and 6 with area = 2 * 5 = 10."
    },
    {
      "id": 2,
      "input": "2\n2 4",
      "output": "4",
      "explanation": "The largest rectangle has height 4 and width 1 (or height 2 and width 2), area = 4."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    heights = [int(x) for x in tokens[1:n+1]]\n    \n    stack = [] # (index, height)\n    max_area = 0\n    \n    for i, h in enumerate(heights):\n        start = i\n        while stack and stack[-1][1] > h:\n            idx, height = stack.pop()\n            max_area = max(max_area, height * (i - idx))\n            start = idx\n        stack.append((start, h))\n        \n    for idx, height in stack:\n        max_area = max(max_area, height * (n - idx))\n        \n    print(max_area)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "A monotonic increasing stack allows extending bar widths to the left and right in O(N) total time."
},

  "24": {
  "id": 24,
  "title": "First Missing Positive",
  "difficulty": "Hard",
  "topic": "Arrays & Hashing",
  "pattern": "Index Hashing",
  "statement": "Given an unsorted integer array `nums`, return the *smallest positive integer* that is not present in `nums`.\n\nYou must implement an algorithm that runs in `O(n)` time and uses `O(1)` auxiliary space.",
  "inputFormat": {
    "standardInput": "• Line 1: An integer `N`, the number of elements in the array.\n• Line 2: `N` space-separated integers.",
    "explanation": "Read array size N followed by N integers."
  },
  "outputFormat": {
    "standardOutput": "Print a single integer representing the smallest missing positive integer.",
    "explanation": "The smallest positive integer >= 1 absent from nums."
  },
  "constraints": [
    "1 <= nums.length <= 10^5",
    "-2^31 <= nums[i] <= 2^31 - 1",
    "Time Complexity: O(N)",
    "Space Complexity: O(1) extra space",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "3\n1 2 0",
      "output": "3",
      "explanation": "Numbers in the range [1, 2] are present, so the smallest missing positive is 3."
    },
    {
      "id": 2,
      "input": "4\n3 4 -1 1",
      "output": "2",
      "explanation": "1 is in the array but 2 is missing, so 2 is returned."
    },
    {
      "id": 3,
      "input": "5\n7 8 9 11 12",
      "output": "1",
      "explanation": "Smallest positive integer 1 is missing."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = [int(x) for x in tokens[1:n+1]]\n    \n    # Place each number x at index x - 1 if 1 <= x <= n\n    for i in range(n):\n        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:\n            target_idx = nums[i] - 1\n            nums[i], nums[target_idx] = nums[target_idx], nums[i]\n            \n    for i in range(n):\n        if nums[i] != i + 1:\n            print(i + 1)\n            return\n            \n    print(n + 1)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Cyclic sort placing each positive number val into index val - 1 turns the array into its own hash table in O(N) time and O(1) space."
},

  "25": {
  "id": 25,
  "title": "Jump Game",
  "difficulty": "Medium",
  "topic": "Arrays & Hashing",
  "pattern": "Greedy",
  "statement": "You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.\n\nReturn `true` *if you can reach the last index, or* `false` *otherwise*.",
  "inputFormat": {
    "standardInput": "• Line 1: An integer `N`, the length of the array.\n• Line 2: `N` space-separated integers representing jump capacities.",
    "explanation": "Read length N and N jump integers."
  },
  "outputFormat": {
    "standardOutput": "Print `true` if reaching the last index is possible, otherwise print `false`.",
    "explanation": "Boolean reachability status."
  },
  "constraints": [
    "1 <= nums.length <= 10^4",
    "0 <= nums[i] <= 10^5",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "5\n2 3 1 1 4",
      "output": "true",
      "explanation": "Jump 1 step from index 0 to 1, then 3 steps to the last index."
    },
    {
      "id": 2,
      "input": "5\n3 2 1 0 4",
      "output": "false",
      "explanation": "All routes inevitably land on index 3 with jump length 0, making reaching index 4 impossible."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = [int(x) for x in tokens[1:n+1]]\n    \n    max_reach = 0\n    for i in range(n):\n        if i > max_reach:\n            print(\"false\")\n            return\n        max_reach = max(max_reach, i + nums[i])\n        if max_reach >= n - 1:\n            print(\"true\")\n            return\n            \n    print(\"true\" if max_reach >= n - 1 else \"false\")\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Track the maximum reachable index greedily. If the current index exceeds max_reach, the target is unreachable."
},

  "26": {
  "id": 26,
  "title": "Valid Palindrome",
  "difficulty": "Easy",
  "topic": "Strings",
  "pattern": "Two Pointer",
  "statement": "A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` *if it is a palindrome, or* `false` *otherwise*.",
  "inputFormat": {
    "standardInput": "• Line 1: A string `s` containing arbitrary printable characters.",
    "explanation": "Read the entire line of text."
  },
  "outputFormat": {
    "standardOutput": "Print `true` if `s` is a palindrome, otherwise `false`.",
    "explanation": "Boolean result."
  },
  "constraints": [
    "1 <= s.length <= 2 * 10^5",
    "s consists only of printable ASCII characters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "A man, a plan, a canal: Panama",
      "output": "true",
      "explanation": "\"amanaplanacanalpanama\" reads identically forwards and backwards."
    },
    {
      "id": 2,
      "input": "race a car",
      "output": "false",
      "explanation": "\"raceacar\" is not a palindrome."
    },
    {
      "id": 3,
      "input": " ",
      "output": "true",
      "explanation": "An empty filtered string \"\" is a valid palindrome."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    \n    left, right = 0, len(s) - 1\n    while left < right:\n        while left < right and not s[left].isalnum():\n            left += 1\n        while left < right and not s[right].isalnum():\n            right -= 1\n            \n        if s[left].lower() != s[right].lower():\n            print(\"false\")\n            return\n            \n        left += 1\n        right -= 1\n        \n    print(\"true\")\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Two pointers scanning from both ends skipping non-alphanumeric characters achieve O(N) time and O(1) space."
},

  "27": {
  "id": 27,
  "title": "Reverse String",
  "difficulty": "Easy",
  "topic": "Strings",
  "pattern": "Two Pointer",
  "statement": "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array **in-place** with `O(1)` extra memory.",
  "inputFormat": {
    "standardInput": "• Line 1: A single line string `s`.",
    "explanation": "Read the string to reverse."
  },
  "outputFormat": {
    "standardOutput": "Print the reversed string.",
    "explanation": "The string reversed character by character."
  },
  "constraints": [
    "1 <= s.length <= 10^5",
    "s[i] is a printable ASCII character.",
    "Must be in-place with O(1) auxiliary space.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "hello",
      "output": "olleh",
      "explanation": "Characters reversed in place."
    },
    {
      "id": 2,
      "input": "Hannah",
      "output": "hannaH",
      "explanation": "Preserves exact character casing while reversing order."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    s = list(sys.stdin.read().rstrip('\\r\\n'))\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    print(\"\".join(s))\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Swap characters from left and right pointers moving towards the center in O(N) time and O(1) space."
},

  "28": {
  "id": 28,
  "title": "Valid Anagram",
  "difficulty": "Easy",
  "topic": "Strings",
  "pattern": "Hashing",
  "statement": "Given two strings `s` and `t`, return `true` *if* `t` *is an anagram of* `s`, *and* `false` *otherwise*.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  "inputFormat": {
    "standardInput": "• Line 1: String `s`.\n• Line 2: String `t`.",
    "explanation": "Read two lowercase strings on separate lines."
  },
  "outputFormat": {
    "standardOutput": "Print `true` if `t` is an anagram of `s`, otherwise print `false`.",
    "explanation": "Boolean equivalence."
  },
  "constraints": [
    "1 <= s.length, t.length <= 5 * 10^4",
    "s and t consist of lowercase English letters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "anagram\nnagaram",
      "output": "true",
      "explanation": "Both strings have identical character frequencies."
    },
    {
      "id": 2,
      "input": "rat\ncar",
      "output": "false",
      "explanation": "'r' and 'c' counts differ."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if len(tokens) < 2:\n        return\n    s, t = tokens[0], tokens[1]\n    \n    if len(s) != len(t):\n        print(\"false\")\n        return\n        \n    counts = [0] * 26\n    for ch in s:\n        counts[ord(ch) - ord('a')] += 1\n    for ch in t:\n        counts[ord(ch) - ord('a')] -= 1\n        if counts[ord(ch) - ord('a')] < 0:\n            print(\"false\")\n            return\n            \n    print(\"true\")\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "A fixed 26-element array counting character balance yields an optimal O(N) time and O(1) space solution."
},

  "29": {
  "id": 29,
  "title": "First Unique Character in a String",
  "difficulty": "Easy",
  "topic": "Strings",
  "pattern": "Hash Map",
  "statement": "Given a string `s`, *find the first non-repeating character in it and return its index*. If it does not exist, return `-1`.",
  "inputFormat": {
    "standardInput": "• Line 1: A lowercase string `s`.",
    "explanation": "Read string s."
  },
  "outputFormat": {
    "standardOutput": "Print the 0-based index of the first non-repeating character, or `-1` if none exists.",
    "explanation": "The first unique character index."
  },
  "constraints": [
    "1 <= s.length <= 10^5",
    "s consists of only lowercase English letters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "leetcode",
      "output": "0",
      "explanation": "Character 'l' at index 0 is non-repeating."
    },
    {
      "id": 2,
      "input": "loveleetcode",
      "output": "2",
      "explanation": "'l' and 'o' repeat; 'v' at index 2 is the first unique character."
    },
    {
      "id": 3,
      "input": "aabb",
      "output": "-1",
      "explanation": "All characters repeat."
    }
  ],
  "starterCode": "import sys\nfrom collections import Counter\n\ndef solve():\n    s = sys.stdin.read().strip()\n    if not s:\n        print(-1)\n        return\n        \n    counts = Counter(s)\n    for idx, ch in enumerate(s):\n        if counts[ch] == 1:\n            print(idx)\n            return\n            \n    print(-1)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Two passes: pass 1 counts frequencies in O(N); pass 2 finds the first character with count 1 in O(N)."
},

  "30": {
  "id": 30,
  "title": "Longest Common Prefix",
  "difficulty": "Easy",
  "topic": "Strings",
  "pattern": "String Traversal",
  "statement": "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string `\"\"`.",
  "inputFormat": {
    "standardInput": "• Line 1: An integer `N`, the number of strings.\n• Line 2: `N` space-separated strings.",
    "explanation": "Read count N followed by N strings."
  },
  "outputFormat": {
    "standardOutput": "Print the longest common prefix string (or leave empty if no prefix exists).",
    "explanation": "Common prefix string."
  },
  "constraints": [
    "1 <= strs.length <= 200",
    "0 <= strs[i].length <= 200",
    "strs[i] consists of only lowercase English letters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "3\nflower flow flight",
      "output": "fl",
      "explanation": "\"fl\" is shared by flower, flow, and flight."
    },
    {
      "id": 2,
      "input": "3\ndog racecar car",
      "output": "",
      "explanation": "There is no common prefix among the input strings."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    strs = tokens[1:n+1]\n    if not strs:\n        print(\"\")\n        return\n        \n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix:\n                print(\"\")\n                return\n                \n    print(prefix)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Vertical scanning character by character across all strings finds the prefix in O(S) where S is total characters."
},

  "31": {
  "id": 31,
  "title": "Longest Substring Without Repeating Characters",
  "difficulty": "Medium",
  "topic": "Strings",
  "pattern": "Sliding Window",
  "statement": "Given a string `s`, find the length of the **longest substring** without duplicate characters.",
  "inputFormat": {
    "standardInput": "• Line 1: A string `s`.",
    "explanation": "Read the input string (which may contain spaces)."
  },
  "outputFormat": {
    "standardOutput": "Print a single integer representing the length of the longest unique substring.",
    "explanation": "Maximum substring length."
  },
  "constraints": [
    "0 <= s.length <= 5 * 10^4",
    "s consists of English letters, digits, symbols and spaces.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "abcabcbb",
      "output": "3",
      "explanation": "The answer is \"abc\", with the length of 3."
    },
    {
      "id": 2,
      "input": "bbbbb",
      "output": "1",
      "explanation": "The answer is \"b\", with the length of 1."
    },
    {
      "id": 3,
      "input": "pwwkew",
      "output": "3",
      "explanation": "The answer is \"wke\", with the length of 3."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    \n    seen = {}\n    left = 0\n    max_len = 0\n    \n    for right, ch in enumerate(s):\n        if ch in seen and seen[ch] >= left:\n            left = seen[ch] + 1\n        seen[ch] = right\n        max_len = max(max_len, right - left + 1)\n        \n    print(max_len)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Using a sliding window with a hash map recording each character's last seen index achieves optimal O(N) time and O(min(N, M)) space."
},

  "32": {
  "id": 32,
  "title": "Longest Repeating Character Replacement",
  "difficulty": "Medium",
  "topic": "Strings",
  "pattern": "Sliding Window",
  "statement": "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.\n\nReturn *the length of the longest substring containing the same letter you can get after performing the above operations*.",
  "inputFormat": {
    "standardInput": "• Line 1: An uppercase string `s`.\n• Line 2: An integer `k`.",
    "explanation": "Read string s and replacement budget k."
  },
  "outputFormat": {
    "standardOutput": "Print a single integer representing the maximum length of repeating characters.",
    "explanation": "Maximum window length."
  },
  "constraints": [
    "1 <= s.length <= 10^5",
    "s consists of only uppercase English letters.",
    "0 <= k <= s.length",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "ABAB\n2",
      "output": "4",
      "explanation": "Replace the two 'A's with two 'B's (or vice versa) to get \"BBBB\" or \"AAAA\"."
    },
    {
      "id": 2,
      "input": "AABABBA\n1",
      "output": "4",
      "explanation": "Replace the middle 'A' to form \"AABBBBA\" with 4 consecutive 'B's."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    s = tokens[0]\n    k = int(tokens[1])\n    \n    counts = {}\n    max_freq = 0\n    left = 0\n    max_len = 0\n    \n    for right, ch in enumerate(s):\n        counts[ch] = counts.get(ch, 0) + 1\n        max_freq = max(max_freq, counts[ch])\n        \n        # Valid window condition: (window_len - max_freq) <= k\n        while (right - left + 1) - max_freq > k:\n            counts[s[left]] -= 1\n            left += 1\n            \n        max_len = max(max_len, right - left + 1)\n        \n    print(max_len)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "A sliding window where (window_size - max_frequency) <= k expands greedily in O(N) time."
},

  "33": {
  "id": 33,
  "title": "Permutation in String",
  "difficulty": "Medium",
  "topic": "Strings",
  "pattern": "Sliding Window + Hash",
  "statement": "Given two strings `s1` and `s2`, return `true` *if* `s2` *contains a permutation of* `s1`, *or* `false` *otherwise*.\n\nIn other words, return `true` if one of `s1`'s permutations is the **substring** of `s2`.",
  "inputFormat": {
    "standardInput": "• Line 1: String `s1`.\n• Line 2: String `s2`.",
    "explanation": "Read pattern s1 and text s2."
  },
  "outputFormat": {
    "standardOutput": "Print `true` if s2 contains a permutation of s1, otherwise `false`.",
    "explanation": "Boolean permutation match."
  },
  "constraints": [
    "1 <= s1.length, s2.length <= 10^4",
    "s1 and s2 consist of lowercase English letters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "ab\neidbaooo",
      "output": "true",
      "explanation": "s2 contains one permutation of s1 (\"ba\")."
    },
    {
      "id": 2,
      "input": "ab\neidboaoo",
      "output": "false",
      "explanation": "No permutation of \"ab\" exists as a contiguous substring in s2."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if len(tokens) < 2:\n        return\n    s1, s2 = tokens[0], tokens[1]\n    \n    if len(s1) > len(s2):\n        print(\"false\")\n        return\n        \n    c1 = [0] * 26\n    c2 = [0] * 26\n    \n    for i in range(len(s1)):\n        c1[ord(s1[i]) - ord('a')] += 1\n        c2[ord(s2[i]) - ord('a')] += 1\n        \n    matches = sum(1 for i in range(26) if c1[i] == c2[i])\n    \n    for i in range(len(s1), len(s2)):\n        if matches == 26:\n            print(\"true\")\n            return\n            \n        r_idx = ord(s2[i]) - ord('a')\n        l_idx = ord(s2[i - len(s1)]) - ord('a')\n        \n        c2[r_idx] += 1\n        if c2[r_idx] == c1[r_idx]:\n            matches += 1\n        elif c2[r_idx] == c1[r_idx] + 1:\n            matches -= 1\n            \n        c2[l_idx] -= 1\n        if c2[l_idx] == c1[l_idx]:\n            matches += 1\n        elif c2[l_idx] == c1[l_idx] - 1:\n            matches -= 1\n            \n    print(\"true\" if matches == 26 else \"false\")\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "A fixed-size sliding window maintaining a 26-element character match count runs in strictly O(len(s1) + len(s2)) time."
},

  "34": {
  "id": 34,
  "title": "Minimum Window Substring",
  "difficulty": "Hard",
  "topic": "Strings",
  "pattern": "Sliding Window",
  "statement": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (**including duplicates**) is included in the window. If there is no such substring, return the empty string `\"\"`.",
  "inputFormat": {
    "standardInput": "• Line 1: String `s`.\n• Line 2: String `t`.",
    "explanation": "Read source string s and target string t."
  },
  "outputFormat": {
    "standardOutput": "Print the minimum window substring (or empty string if none).",
    "explanation": "The shortest valid substring."
  },
  "constraints": [
    "m == s.length",
    "n == t.length",
    "1 <= m, n <= 10^5",
    "s and t consist of uppercase and lowercase English letters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "ADOBECODEBANC\nABC",
      "output": "BANC",
      "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
    },
    {
      "id": 2,
      "input": "a\na",
      "output": "a",
      "explanation": "The entire string s is the minimum window."
    },
    {
      "id": 3,
      "input": "a\naa",
      "output": "",
      "explanation": "Both 'a's from t must be included in the window, but s only has one 'a'."
    }
  ],
  "starterCode": "import sys\nfrom collections import Counter\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if len(tokens) < 2:\n        return\n    s, t = tokens[0], tokens[1]\n    \n    if not s or not t or len(s) < len(t):\n        print(\"\")\n        return\n        \n    t_count = Counter(t)\n    window = {}\n    have, need = 0, len(t_count)\n    res, res_len = [-1, -1], float('inf')\n    left = 0\n    \n    for right, ch in enumerate(s):\n        window[ch] = window.get(ch, 0) + 1\n        if ch in t_count and window[ch] == t_count[ch]:\n            have += 1\n            \n        while have == need:\n            if (right - left + 1) < res_len:\n                res = [left, right]\n                res_len = right - left + 1\n                \n            window[s[left]] -= 1\n            if s[left] in t_count and window[s[left]] < t_count[s[left]]:\n                have -= 1\n            left += 1\n            \n    l, r = res\n    print(s[l : r + 1] if res_len != float('inf') else \"\")\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Maintain have/need match counters over a dynamically expanding right and contracting left window in O(M + N) time."
},

  "35": {
  "id": 35,
  "title": "Sliding Window Maximum",
  "difficulty": "Hard",
  "topic": "Strings",
  "pattern": "Deque / Monotonic Queue",
  "statement": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn *the max sliding window*.",
  "inputFormat": {
    "standardInput": "• Line 1: Two space-separated integers `N` and `k`.\n• Line 2: `N` space-separated integers representing the array `nums`.",
    "explanation": "Read array size N, window size k, and array elements."
  },
  "outputFormat": {
    "standardOutput": "Print the maximum value of each sliding window as space-separated integers on a single line.",
    "explanation": "List of window maximums."
  },
  "constraints": [
    "1 <= nums.length <= 10^5",
    "-10^4 <= nums[i] <= 10^4",
    "1 <= k <= nums.length",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "8 3\n1 3 -1 -3 5 3 6 7",
      "output": "3 3 5 5 6 7",
      "explanation": "Window positions: [1,3,-1]->3, [3,-1,-3]->3, [-1,-3,5]->5, [-3,5,3]->5, [5,3,6]->6, [3,6,7]->7."
    },
    {
      "id": 2,
      "input": "1 1\n1",
      "output": "1",
      "explanation": "Single window contains single element 1."
    }
  ],
  "starterCode": "import sys\nfrom collections import deque\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    k = int(tokens[1])\n    nums = [int(x) for x in tokens[2:n+2]]\n    \n    dq = deque() # store indices of decreasing elements\n    res = []\n    \n    for i in range(n):\n        # Remove elements outside current window\n        if dq and dq[0] < i - k + 1:\n            dq.popleft()\n            \n        # Remove smaller elements from back\n        while dq and nums[dq[-1]] < nums[i]:\n            dq.pop()\n            \n        dq.append(i)\n        \n        if i >= k - 1:\n            res.append(str(nums[dq[0]]))\n            \n    print(\" \".join(res))\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "A monotonically decreasing double-ended queue (deque) storing indices maintains the window maximum at dq[0] in amortized O(N) time."
},

  "36": {
  "id": 36,
  "title": "Group Anagrams",
  "difficulty": "Medium",
  "topic": "Strings",
  "pattern": "Hashing",
  "statement": "Given an array of strings `strs`, group **the anagrams** together. You can return the answer in **any order**.\n\nAn **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
  "inputFormat": {
    "standardInput": "• Line 1: An integer `N`, the number of strings.\n• Line 2: `N` space-separated strings.",
    "explanation": "Read count N and N strings."
  },
  "outputFormat": {
    "standardOutput": "Print the grouped anagrams formatted as JSON matrix or space-separated lines.",
    "explanation": "List of anagram groups."
  },
  "constraints": [
    "1 <= strs.length <= 10^4",
    "0 <= strs[i].length <= 100",
    "strs[i] consists of lowercase English letters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "6\neat tea tan ate nat bat",
      "output": "[[\"bat\"], [\"nat\", \"tan\"], [\"ate\", \"eat\", \"tea\"]]",
      "explanation": "Grouped by identical character counts."
    },
    {
      "id": 2,
      "input": "1\na",
      "output": "[[\"a\"]]",
      "explanation": "Single element array."
    }
  ],
  "starterCode": "import sys\nimport json\nfrom collections import defaultdict\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    strs = tokens[1:n+1]\n    \n    groups = defaultdict(list)\n    for s in strs:\n        key = \"\".join(sorted(s))\n        groups[key].append(s)\n        \n    res = list(groups.values())\n    print(json.dumps(res))\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Using sorted strings as hash map keys groups anagrams in O(N * K log K) time."
},

  "37": {
  "id": 37,
  "title": "Encode and Decode Strings",
  "difficulty": "Medium",
  "topic": "Strings",
  "pattern": "String Design",
  "statement": "Design an algorithm to encode a list of strings to a single string. The encoded string is then sent over the network and is decoded back to the original list of strings.\n\nPlease implement `encode` and `decode` functions.",
  "inputFormat": {
    "standardInput": "• Line 1: An integer `N`, the number of strings.\n• Line 2: `N` space-separated strings.",
    "explanation": "Read string count N and strings."
  },
  "outputFormat": {
    "standardOutput": "Print the decoded list of strings as JSON array or space-separated words.",
    "explanation": "Decoded original strings."
  },
  "constraints": [
    "1 <= strs.length <= 200",
    "0 <= strs[i].length <= 200",
    "strs[i] contains any possible characters out of 256 valid ASCII characters.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "4\nneet code love you",
      "output": "[\"neet\", \"code\", \"love\", \"you\"]",
      "explanation": "Encoded with length-prefix '#', then decoded seamlessly."
    },
    {
      "id": 2,
      "input": "2\nwe say",
      "output": "[\"we\", \"say\"]",
      "explanation": "Preserves individual token boundaries."
    }
  ],
  "starterCode": "import sys\nimport json\n\ndef encode(strs):\n    res = \"\"\n    for s in strs:\n        res += f\"{len(s)}#{s}\"\n    return res\n\ndef decode(s):\n    res = []\n    i = 0\n    while i < len(s):\n        j = i\n        while s[j] != '#':\n            j += 1\n        length = int(s[i:j])\n        res.append(s[j + 1 : j + 1 + length])\n        i = j + 1 + length\n    return res\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    strs = tokens[1:n+1]\n    \n    encoded = encode(strs)\n    decoded = decode(encoded)\n    print(json.dumps(decoded))\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Length-prefix encoding (len + '#' + str) handles arbitrary delimiters and special characters in linear time."
},

  "38": {
  "id": 38,
  "title": "String to Integer (atoi)",
  "difficulty": "Medium",
  "topic": "Strings",
  "pattern": "Parsing",
  "statement": "Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.\n\nThe algorithm for `myAtoi(string s)` is as follows:\n1. **Whitespace**: Ignore any leading whitespace (`\" \"`).\n2. **Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither is present.\n3. **Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.\n4. **Rounding**: If the integer is out of the 32-bit signed integer range `[-2^31, 2^31 - 1]`, clamp the integer so that it remains in range.",
  "inputFormat": {
    "standardInput": "• Line 1: A single line string `s`.",
    "explanation": "Read the entire line of text."
  },
  "outputFormat": {
    "standardOutput": "Print the parsed 32-bit signed integer.",
    "explanation": "Clamped integer in [-2^31, 2^31 - 1]."
  },
  "constraints": [
    "0 <= s.length <= 200",
    "s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "42",
      "output": "42",
      "explanation": "Simple positive integer."
    },
    {
      "id": 2,
      "input": "   -42",
      "output": "-42",
      "explanation": "Leading whitespace skipped, negative sign detected."
    },
    {
      "id": 3,
      "input": "4193 with words",
      "output": "4193",
      "explanation": "Parsing stops at the first non-digit character (space)."
    },
    {
      "id": 4,
      "input": "-91283472332",
      "output": "-2147483648",
      "explanation": "Value exceeds 32-bit signed integer minimum and is clamped to -2147483648."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    s = sys.stdin.read().rstrip('\\r\\n')\n    \n    s = s.lstrip()\n    if not s:\n        print(0)\n        return\n        \n    sign = 1\n    idx = 0\n    if s[0] == '-':\n        sign = -1\n        idx = 1\n    elif s[0] == '+':\n        idx = 1\n        \n    INT_MAX = 2**31 - 1\n    INT_MIN = -2**31\n    num = 0\n    \n    while idx < len(s) and s[idx].isdigit():\n        digit = int(s[idx])\n        if num > (INT_MAX - digit) // 10:\n            print(INT_MAX if sign == 1 else INT_MIN)\n            return\n        num = num * 10 + digit\n        idx += 1\n        \n    res = sign * num\n    print(min(max(res, INT_MIN), INT_MAX))\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Sequential state machine handling whitespace, sign, digits, and overflow checks in O(N) time."
},

  "39": {
  "id": 39,
  "title": "Decode String",
  "difficulty": "Medium",
  "topic": "Strings",
  "pattern": "Stack",
  "statement": "Given an encoded string, return its decoded string.\n\nThe encoding rule is: `k[encoded_string]`, where the `encoded_string` inside the square brackets is being repeated exactly `k` times. Note that `k` is guaranteed to be a positive integer.\n\nYou may assume that the input string is always valid; there are no extra white spaces, square brackets are well-formed, etc. Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, `k`. For example, there will not be input like `3a` or `2[4]`.",
  "inputFormat": {
    "standardInput": "• Line 1: A valid encoded string `s`.",
    "explanation": "Read the encoded string format."
  },
  "outputFormat": {
    "standardOutput": "Print the fully decoded string.",
    "explanation": "Expanded string without brackets or repeat numbers."
  },
  "constraints": [
    "1 <= s.length <= 30",
    "s consists of lowercase English letters, digits, and square brackets '[]'.",
    "s is guaranteed to be a valid input.",
    "All the integers in s are in the range [1, 300].",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "3[a]2[bc]",
      "output": "aaabcbc",
      "explanation": "'a' repeated 3 times followed by 'bc' repeated 2 times."
    },
    {
      "id": 2,
      "input": "3[a2[c]]",
      "output": "accaccacc",
      "explanation": "Nested brackets: 'a2[c]' -> 'acc', repeated 3 times -> 'accaccacc'."
    },
    {
      "id": 3,
      "input": "2[abc]3[cd]ef",
      "output": "abcabccdcdcdef",
      "explanation": "Multiple repeat segments with trailing unencoded letters."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    s = sys.stdin.read().strip()\n    if not s:\n        print(\"\")\n        return\n        \n    stack = []\n    curr_str = \"\"\n    curr_num = 0\n    \n    for ch in s:\n        if ch.isdigit():\n            curr_num = curr_num * 10 + int(ch)\n        elif ch == '[':\n            stack.append((curr_str, curr_num))\n            curr_str = \"\"\n            curr_num = 0\n        elif ch == ']':\n            prev_str, repeat = stack.pop()\n            curr_str = prev_str + curr_str * repeat\n        else:\n            curr_str += ch\n            \n    print(curr_str)\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "A stack storing (previous_string, repeat_count) naturally evaluates nested bracket hierarchies in O(N) time."
},

  "40": {
  "id": 40,
  "title": "Regular Expression Matching",
  "difficulty": "Hard",
  "topic": "Strings",
  "pattern": "DP / Recursion",
  "statement": "Given an input string `s` and a pattern `p`, implement regular expression matching with support for `'.'` and `'*'` where:\n• `'.'` Matches any single character.\n• `'*'` Matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).",
  "inputFormat": {
    "standardInput": "• Line 1: String `s`.\n• Line 2: Pattern string `p`.",
    "explanation": "Read string s and regular expression pattern p."
  },
  "outputFormat": {
    "standardOutput": "Print `true` if pattern `p` matches string `s` completely, otherwise `false`.",
    "explanation": "Boolean match status."
  },
  "constraints": [
    "1 <= s.length <= 20",
    "1 <= p.length <= 20",
    "s contains only lowercase English letters.",
    "p contains only lowercase English letters, '.', and '*'.",
    "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.",
    "Time Limit: 1.0s",
    "Memory Limit: 256 MB"
  ],
  "examples": [
    {
      "id": 1,
      "input": "aa\na",
      "output": "false",
      "explanation": "'a' does not match the entire string \"aa\"."
    },
    {
      "id": 2,
      "input": "aa\na*",
      "output": "true",
      "explanation": "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\"."
    },
    {
      "id": 3,
      "input": "ab\n.*",
      "output": "true",
      "explanation": "\".*\" means \"zero or more (*) of any character (.)\"."
    }
  ],
  "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if len(tokens) < 2:\n        return\n    s, p = tokens[0], tokens[1]\n    \n    memo = {}\n    \n    def dp(i, j):\n        if (i, j) in memo:\n            return memo[(i, j)]\n        if j == len(p):\n            return i == len(s)\n            \n        first_match = i < len(s) and (p[j] == s[i] or p[j] == '.')\n        \n        if j + 1 < len(p) and p[j + 1] == '*':\n            ans = dp(i, j + 2) or (first_match and dp(i + 1, j))\n        else:\n            ans = first_match and dp(i + 1, j + 1)\n            \n        memo[(i, j)] = ans\n        return ans\n        \n    print(\"true\" if dp(0, 0) else \"false\")\n\nif __name__ == '__main__':\n    solve()\n",
  "notes": "Top-down 2D memoized Dynamic Programming over indices (i, j) of string s and pattern p runs in O(M * N) time."
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
