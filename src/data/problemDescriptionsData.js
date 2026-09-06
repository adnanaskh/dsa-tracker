// Detailed Problem Descriptions (LeetCode, TCS Digital/NQT, CodeChef Format)
// Contains in-depth problem statements, Input/Output format specifications, Constraints, and Examples with Explanations.

export const DETAILED_PROBLEM_DESCRIPTIONS = {
  "1": {
    id: 1,
    title: "Contains Duplicate",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hashing",
    statement: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.

An array contains a duplicate if there exists at least one pair of indices \`(i, j)\` such that \`i != j\` and \`nums[i] == nums[j]\`.`,
    inputFormat: {
      functionSignature: "def containsDuplicate(self, nums: list[int]) -> bool:",
      description: "A list of integers `nums` passed as a parameter to the solution method.",
      standardInput: `• Line 1: An integer \`N\` representing the number of elements in the array.
• Line 2: \`N\` space-separated integers representing the array elements.`
    },
    outputFormat: {
      returnType: "bool (True / False)",
      description: "Return `True` if any value appears at least twice in the array; otherwise return `False`.",
      standardOutput: "Print `true` or `false` on a single line (case-sensitive as per platform standard)."
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
        input: "nums = [1, 2, 3, 1]",
        output: "true",
        explanation: "The value 1 appears at index 0 and index 3. Since it appears twice, the function returns true."
      },
      {
        id: 2,
        input: "nums = [1, 2, 3, 4]",
        output: "false",
        explanation: "All elements [1, 2, 3, 4] are pairwise distinct. No duplicates exist, so the function returns false."
      },
      {
        id: 3,
        input: "nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]",
        output: "true",
        explanation: "Multiple elements (1, 3, 4, 2) appear more than once. The output is true."
      }
    ],
    companyTags: ["TCS Digital", "TCS NQT", "Amazon", "Apple", "Microsoft", "Adobe", "CodeChef Starters"],
    notes: "A hash set allows O(1) average lookup and insertion time. Sorting takes O(N log N) time but O(1) extra space."
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
      functionSignature: "def isAnagram(self, s: str, t: str) -> bool:",
      description: "Two strings `s` and `t` consisting of lowercase English letters.",
      standardInput: `• Line 1: String \`s\`
• Line 2: String \`t\``
    },
    outputFormat: {
      returnType: "bool (True / False)",
      description: "Return `True` if `t` is an anagram of `s`, otherwise `False`.",
      standardOutput: "Print `true` or `false` on a single line."
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
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation: 'Both strings contain the characters: \'a\': 3, \'n\': 1, \'g\': 1, \'r\': 1, \'m\': 1. Since letter counts match, t is an anagram of s.'
      },
      {
        id: 2,
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: 'String s contains \'t\' (count 1) and t contains \'c\' (count 1). The character counts differ, so t is not an anagram.'
      }
    ],
    companyTags: ["TCS NQT", "Infosys", "Amazon", "Bloomberg", "Google", "Goldman Sachs"],
    notes: "Follow-up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?"
  },

  "3": {
    id: 3,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Hash Map",
    statement: `Given an array of integers \`nums\` and an integer \`target\`, return **indices of the two numbers** such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    inputFormat: {
      functionSignature: "def twoSum(self, nums: list[int], target: int) -> list[int]:",
      description: "A list of integers `nums` and an integer `target`.",
      standardInput: `• Line 1: An integer \`N\` (size of array).
• Line 2: \`N\` space-separated integers representing the array \`nums\`.
• Line 3: An integer \`target\`.`
    },
    outputFormat: {
      returnType: "list[int] (Indices [i, j])",
      description: "A list of two integer indices `[index1, index2]` such that `nums[index1] + nums[index2] == target`.",
      standardOutput: "Print two space-separated indices on a single line."
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
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1]."
      },
      {
        id: 2,
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "Because nums[1] + nums[2] == 2 + 4 == 6, we return [1, 2]."
      },
      {
        id: 3,
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 3 + 3 == 6, we return [0, 1]."
      }
    ],
    companyTags: ["TCS Digital", "Amazon", "Google", "Microsoft", "Meta", "Apple", "CodeChef"],
    notes: "Optimal solution uses a one-pass Hash Map to store complement `target - num` achieving O(N) time and O(N) space."
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
      functionSignature: "def maxProfit(self, prices: list[int]) -> int:",
      description: "A list of integers `prices` representing stock prices on consecutive days.",
      standardInput: `• Line 1: An integer \`N\` (number of days).
• Line 2: \`N\` space-separated integers representing stock prices on each day.`
    },
    outputFormat: {
      returnType: "int (Maximum Profit)",
      description: "An integer representing the maximum achievable profit (or 0 if no profit can be made).",
      standardOutput: "Print the maximum profit integer on a single line."
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
        input: "prices = [7, 1, 5, 3, 6, 4]",
        output: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
      },
      {
        id: 2,
        input: "prices = [7, 6, 4, 3, 1]",
        output: "0",
        explanation: "In this case, prices continually decrease each day. No profitable transaction is possible, so maximum profit = 0."
      }
    ],
    companyTags: ["TCS Digital", "Amazon", "Microsoft", "Meta", "Goldman Sachs", "Infosys DSE"],
    notes: "Track minimum price seen so far (`min_price`) and compute potential profit at each step (`price - min_price`). Runs in O(N) time and O(1) auxiliary space."
  },

  "5": {
    id: 5,
    title: "Single Number",
    difficulty: "Easy",
    topic: "Arrays & Hashing",
    pattern: "Bit Manipulation",
    statement: `Given a **non-empty** array of integers \`nums\`, every element appears *twice* except for one. Find that single one.

You must implement a solution with a **linear runtime complexity** (\`O(N)\`) and use only **constant extra space** (\`O(1)\`).`,
    inputFormat: {
      functionSignature: "def singleNumber(self, nums: list[int]) -> int:",
      description: "A list of integers `nums` where every element appears twice except for exactly one unique element.",
      standardInput: `• Line 1: An integer \`N\` (size of array).
• Line 2: \`N\` space-separated integers.`
    },
    outputFormat: {
      returnType: "int (The unique single element)",
      description: "Return the integer that appears only once in the array.",
      standardOutput: "Print the unique integer on a single line."
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
        input: "nums = [2, 2, 1]",
        output: "1",
        explanation: "The element 2 appears twice, while 1 appears only once. The answer is 1."
      },
      {
        id: 2,
        input: "nums = [4, 1, 2, 1, 2]",
        output: "4",
        explanation: "Elements 1 and 2 appear twice. 4 appears only once. The answer is 4."
      },
      {
        id: 3,
        input: "nums = [1]",
        output: "1",
        explanation: "Array contains only one element, which is the single number."
      }
    ],
    companyTags: ["TCS NQT", "Amazon", "Google", "Microsoft", "Qualcomm", "Cisco"],
    notes: "Use the XOR bitwise operator: `a ^ a = 0` and `a ^ 0 = a`. XORing all numbers cancels out duplicate pairs, leaving only the unique single number."
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
      functionSignature: "def groupAnagrams(self, strs: list[str]) -> list[list[str]]:",
      description: "A list of strings `strs` containing lowercase English words.",
      standardInput: `• Line 1: An integer \`N\` (number of strings).
• Line 2: \`N\` space-separated strings.`
    },
    outputFormat: {
      returnType: "list[list[str]] (Grouped Anagrams)",
      description: "Return a 2D list where each inner list contains words that are anagrams of each other.",
      standardOutput: "Print each group of anagrams on a new line or formatted as nested brackets."
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
        input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
        output: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
        explanation: 'The strings are grouped by their canonical sorted key: "abt" -> ["bat"], "ant" -> ["tan", "nat"], "aet" -> ["eat", "tea", "ate"].'
      },
      {
        id: 2,
        input: 'strs = [""]',
        output: '[[""]]',
        explanation: "An empty string is grouped with itself."
      },
      {
        id: 3,
        input: 'strs = ["a"]',
        output: '[["a"]]',
        explanation: "A single character string is grouped with itself."
      }
    ],
    companyTags: ["TCS Digital", "Amazon", "Microsoft", "Uber", "Apple", "Affirm"],
    notes: "Use either a sorted tuple of characters `tuple(sorted(s))` or a 26-element character count tuple as the hash map key for O(N * K) time."
  },

  "7": {
    id: 7,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Heap / Bucket Sort",
    statement: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` **most frequent elements**. You may return the answer in **any order**.

It is guaranteed that the answer is **unique** (i.e. the set of the top k frequent elements is unique).`,
    inputFormat: {
      functionSignature: "def topKFrequent(self, nums: list[int], k: int) -> list[int]:",
      description: "A list of integers `nums` and an integer `k` (where 1 <= k <= number of unique elements).",
      standardInput: `• Line 1: An integer \`N\` (array size).
• Line 2: \`N\` space-separated integers.
• Line 3: An integer \`k\`.`
    },
    outputFormat: {
      returnType: "list[int] (Top K Elements)",
      description: "A list containing the `k` most frequent elements in `nums`.",
      standardOutput: "Print `k` space-separated integers representing the top frequent elements."
    },
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "`k` is in the range `[1, the number of unique elements in the array]`.",
      "It is guaranteed that the answer is unique.",
      "Time Complexity Target: Better than O(N log N)",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "nums = [1, 1, 1, 2, 2, 3], k = 2",
        output: "[1, 2]",
        explanation: "Element 1 has frequency 3, element 2 has frequency 2, and element 3 has frequency 1. The 2 most frequent elements are [1, 2]."
      },
      {
        id: 2,
        input: "nums = [1], k = 1",
        output: "[1]",
        explanation: "1 is the only element, so it is the most frequent element."
      }
    ],
    companyTags: ["TCS Digital", "Amazon", "Facebook / Meta", "Google", "Yelp", "ByteDance"],
    notes: "Can be solved in O(N) linear time using Bucket Sort where bucket index corresponds to frequency count."
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
      functionSignature: "def productExceptSelf(self, nums: list[int]) -> list[int]:",
      description: "A list of integers `nums` of length `N`.",
      standardInput: `• Line 1: An integer \`N\` (size of array).
• Line 2: \`N\` space-separated integers.`
    },
    outputFormat: {
      returnType: "list[int] (Product Array)",
      description: "An array `answer` of length `N` where `answer[i]` is the product of all elements except `nums[i]`.",
      standardOutput: "Print `N` space-separated integers representing the output array."
    },
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.",
      "Do NOT use division. Algorithm must run in O(N) time.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "nums = [1, 2, 3, 4]",
        output: "[24, 12, 8, 6]",
        explanation: "answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, answer[2] = 1*2*4 = 8, answer[3] = 1*2*3 = 6."
      },
      {
        id: 2,
        input: "nums = [-1, 1, 0, -3, 3]",
        output: "[0, 0, 9, 0, 0]",
        explanation: "answer[2] is (-1)*1*(-3)*3 = 9. All other positions include 0 in their product calculation and result in 0."
      }
    ],
    companyTags: ["TCS Digital", "Amazon", "Apple", "Microsoft", "Meta", "Asana", "Bloomberg"],
    notes: "Compute prefix products in a forward pass, then multiply by suffix products during a backward pass in O(1) auxiliary space (excluding output array)."
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
      functionSignature: "def isValidSudoku(self, board: list[list[str]]) -> bool:",
      description: "A 9x9 2D matrix of strings representing the Sudoku board.",
      standardInput: `• 9 lines, each containing 9 space-separated characters (digits '1'-'9' or '.').`
    },
    outputFormat: {
      returnType: "bool (True / False)",
      description: "Return `True` if the board configuration is valid, otherwise `False`.",
      standardOutput: "Print `true` or `false` on a single line."
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
        input: `board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]`,
        output: "true",
        explanation: "All rows, columns, and 3x3 sub-boxes contain unique digits 1-9 without conflict."
      },
      {
        id: 2,
        input: `board = [
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]`,
        output: "false",
        explanation: "The top-left 3x3 sub-box contains two '8's (at row 0 col 0 and row 2 col 2), and row 0 & row 3 have '8' in col 0. Thus the board is invalid."
      }
    ],
    companyTags: ["TCS Digital", "Amazon", "Uber", "Apple", "Microsoft", "Oracle"],
    notes: "Use three arrays of hash sets: `rows[9]`, `cols[9]`, and `boxes[3][3]` to validate uniqueness in O(81) = O(1) time."
  },

  "10": {
    id: 10,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    topic: "Arrays & Hashing",
    pattern: "Hash Set",
    statement: `Given an unsorted array of integers \`nums\`, return the **length of the longest consecutive elements sequence**.

You must write an algorithm that runs in **\`O(N)\`** time complexity.`,
    inputFormat: {
      functionSignature: "def longestConsecutive(self, nums: list[int]) -> int:",
      description: "An unsorted list of integers `nums`.",
      standardInput: `• Line 1: An integer \`N\` (number of elements).
• Line 2: \`N\` space-separated integers.`
    },
    outputFormat: {
      returnType: "int (Length of longest consecutive sequence)",
      description: "An integer representing the length of the longest consecutive values sequence.",
      standardOutput: "Print the integer length on a single line."
    },
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "Algorithm must run in strictly O(N) time.",
      "Time Limit: 1.0s",
      "Memory Limit: 256 MB"
    ],
    examples: [
      {
        id: 1,
        input: "nums = [100, 4, 200, 1, 3, 2]",
        output: "4",
        explanation: "The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4."
      },
      {
        id: 2,
        input: "nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]",
        output: "9",
        explanation: "The consecutive elements sequence is [0, 1, 2, 3, 4, 5, 6, 7, 8]. The length is 9."
      }
    ],
    companyTags: ["TCS Digital", "Amazon", "Google", "Microsoft", "Spotify", "Meta"],
    notes: "Insert all numbers into a Hash Set. Only start counting a sequence when `num - 1` is NOT in the set (identifying the beginning of a sequence). Each number is visited at most twice, guaranteeing O(N) time."
  }
};

/**
 * Returns formatted problem description with standard TCS/LeetCode layout.
 * If specific handcrafted metadata is not yet defined, it dynamically constructs
 * a complete, structured description from the problem and test cases data.
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

  const dynamicExamples = sampleCases.slice(0, 3).map((cs, idx) => ({
    id: idx + 1,
    input: Array.isArray(cs.input) ? cs.input.map(x => JSON.stringify(x)).join(", ") : JSON.stringify(cs.input),
    output: JSON.stringify(cs.expected),
    explanation: `For the provided input parameters, the optimal solution computes and returns ${JSON.stringify(cs.expected)}.`
  }));

  return {
    id: Number(id),
    title: name,
    difficulty: difficulty,
    topic: topic,
    pattern: pattern,
    statement: `Given the requirements for **${name}**, write an optimal algorithm utilizing the **${pattern}** pattern in **${topic}**.

Your solution must satisfy all constraints, process edge cases correctly, and achieve optimal time and space complexity.`,
    inputFormat: {
      functionSignature: `def ${methodName}(self, ...) -> ...:`,
      description: `Input parameters are passed to the \`${methodName}\` method in the Solution class.`,
      standardInput: `• Line 1: Number of elements / test input size \`N\`.\n• Line 2: Formatted problem input data.`
    },
    outputFormat: {
      returnType: "Target Return Value",
      description: `Return the computed optimal result from the \`${methodName}\` method.`,
      standardOutput: `Print the formatted output to stdout.`
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
        input: "Example Input",
        output: "Example Output",
        explanation: "Detailed step-by-step example execution."
      }
    ],
    companyTags: ["TCS NQT", "TCS Digital", "Amazon", "Infosys", "CodeChef"],
    notes: `Analyze the problem with the ${pattern} technique to optimize execution time.`
  };
}
