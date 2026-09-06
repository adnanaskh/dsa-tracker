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
