import fs from 'fs';
import path from 'path';

const problemDescriptions = {
  "41": {
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "topic": "Strings",
    "pattern": "Expand Around Center / DP",
    "statement": "Given a string `s`, return the longest palindromic substring in `s`.\n\nA string is called a palindrome if it reads the same forward and backward.\n\nIf there are multiple palindromic substrings of the maximum length, returning any valid longest palindromic substring is acceptable.",
    "inputFormat": "A single line containing the string `s`.",
    "outputFormat": "Print a single line containing the longest palindromic substring found in `s`.",
    "examples": [
      {
        "input": "babad",
        "output": "bab",
        "explanation": "\"aba\" is also a valid answer."
      },
      {
        "input": "cbbd",
        "output": "bb",
        "explanation": "The longest palindromic substring is \"bb\"."
      },
      {
        "input": "a",
        "output": "a",
        "explanation": "A single character string is trivially palindromic."
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "`s` consists of only digits and English letters."
    ],
    "starterCode": "import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    s = lines[0]\n    res = \"\"\n    for i in range(len(s)):\n        # Odd length\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > len(res):\n                res = s[l:r+1]\n            l -= 1\n            r += 1\n        # Even length\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > len(res):\n                res = s[l:r+1]\n            l -= 1\n            r += 1\n    print(res)\n\nif __name__ == '__main__':\n    solve()"
  },
  "42": {
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "topic": "Strings",
    "pattern": "Expand Around Center",
    "statement": "Given a string `s`, return the number of palindromic substrings in it.\n\nA string is a palindrome when it reads the same backward as forward.\n\nA substring is a contiguous sequence of characters within the string. Substrings with different start or end indices are counted as different substrings even if they consist of the same characters.",
    "inputFormat": "A single line containing the string `s`.",
    "outputFormat": "Print a single integer representing the total count of palindromic substrings.",
    "examples": [
      {
        "input": "abc",
        "output": "3",
        "explanation": "Three palindromic substrings: \"a\", \"b\", \"c\"."
      },
      {
        "input": "aaa",
        "output": "6",
        "explanation": "Six palindromic substrings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\"."
      },
      {
        "input": "racecar",
        "output": "10",
        "explanation": "Palindromic substrings include single chars 'r', 'a', 'c', 'e', 'c', 'a', 'r', and longer substrings 'cec', 'aceca', 'racecar'."
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "`s` consists of lowercase English letters."
    ],
    "starterCode": "import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines:\n        return\n    s = lines[0]\n    ans = 0\n    for i in range(len(s)):\n        # Odd length\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            ans += 1\n            l -= 1\n            r += 1\n        # Even length\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            ans += 1\n            l -= 1\n            r += 1\n    print(ans)\n\nif __name__ == '__main__':\n    solve()"
  },
  "43": {
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "topic": "Strings",
    "pattern": "2D DP",
    "statement": "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return `0`.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\n\nFor example, `\"ace\"` is a subsequence of `\"abcde\"`.\n\nA common subsequence of two strings is a subsequence that is common to both strings.",
    "inputFormat": "Two lines:\n- Line 1: string `text1`\n- Line 2: string `text2`",
    "outputFormat": "Print a single integer denoting the length of the longest common subsequence.",
    "examples": [
      {
        "input": "abcde\nace",
        "output": "3",
        "explanation": "The longest common subsequence is \"ace\" and its length is 3."
      },
      {
        "input": "abc\nabc",
        "output": "3",
        "explanation": "The longest common subsequence is \"abc\" and its length is 3."
      },
      {
        "input": "abc\ndef",
        "output": "0",
        "explanation": "There is no such common subsequence, so the result is 0."
      }
    ],
    "constraints": [
      "1 <= text1.length, text2.length <= 1000",
      "`text1` and `text2` consist of only lowercase English characters."
    ],
    "starterCode": "import sys\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2:\n        return\n    t1, t2 = lines[0], lines[1]\n    m, n = len(t1), len(t2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if t1[i-1] == t2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    print(dp[m][n])\n\nif __name__ == '__main__':\n    solve()"
  },
  "44": {
    "title": "Edit Distance",
    "difficulty": "Hard",
    "topic": "Strings",
    "pattern": "2D DP",
    "statement": "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n1. Insert a character\n2. Delete a character\n3. Replace a character",
    "inputFormat": "Two lines:\n- Line 1: string `word1`\n- Line 2: string `word2`\n(If a word is empty, it may be represented on an empty line or omitted).",
    "outputFormat": "Print a single integer representing the minimum edit distance.",
    "examples": [
      {
        "input": "horse\nros",
        "output": "3",
        "explanation": "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e')"
      },
      {
        "input": "intention\nexecution",
        "output": "5",
        "explanation": "intention -> inention (remove 't') -> enention (replace 'i' with 'e') -> exention (replace 'n' with 'x') -> exection (replace 'n' with 'c') -> execution (insert 'u')"
      }
    ],
    "constraints": [
      "0 <= word1.length, word2.length <= 500",
      "`word1` and `word2` consist of lowercase English letters."
    ],
    "starterCode": "import sys\n\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    w1 = lines[0] if len(lines) > 0 else \"\"\n    w2 = lines[1] if len(lines) > 1 else \"\"\n    m, n = len(w1), len(w2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1):\n        dp[i][0] = i\n    for j in range(n + 1):\n        dp[0][j] = j\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if w1[i-1] == w2[j-1]:\n                dp[i][j] = dp[i-1][j-1]\n            else:\n                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    print(dp[m][n])\n\nif __name__ == '__main__':\n    solve()"
  },
  "45": {
    "title": "Wildcard Matching",
    "difficulty": "Hard",
    "topic": "Strings",
    "pattern": "2D DP",
    "statement": "Given an input string `s` and a pattern `p`, implement wildcard pattern matching with support for `'?'` and `'*'` where:\n- `'?'` Matches any single character.\n- `'*'` Matches any sequence of characters (including the empty sequence).\n\nThe matching should cover the entire input string (not partial).",
    "inputFormat": "Two lines:\n- Line 1: string `s`\n- Line 2: pattern `p`",
    "outputFormat": "Print `true` if the pattern matches the entire string, or `false` otherwise.",
    "examples": [
      {
        "input": "aa\na",
        "output": "false",
        "explanation": "\"a\" does not match the entire string \"aa\"."
      },
      {
        "input": "aa\n*",
        "output": "true",
        "explanation": "'*' matches any sequence."
      },
      {
        "input": "cb\n?a",
        "output": "false",
        "explanation": "'?' matches 'c', but the second letter is 'a', which does not match 'b'."
      },
      {
        "input": "adceb\n*a*b",
        "output": "true",
        "explanation": "The first '*' matches the empty sequence, and the second '*' matches the substring \"dce\"."
      }
    ],
    "constraints": [
      "0 <= s.length, p.length <= 2000",
      "`s` contains only lowercase English letters.",
      "`p` contains only lowercase English letters, `'?'` or `'*'`."
    ],
    "starterCode": "import sys\n\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    s = lines[0] if len(lines) > 0 else \"\"\n    p = lines[1] if len(lines) > 1 else \"\"\n    s_ptr = p_ptr = 0\n    star_idx = s_tmp_idx = -1\n    while s_ptr < len(s):\n        if p_ptr < len(p) and (p[p_ptr] == '?' or p[p_ptr] == s[s_ptr]):\n            s_ptr += 1\n            p_ptr += 1\n        elif p_ptr < len(p) and p[p_ptr] == '*':\n            star_idx = p_ptr\n            s_tmp_idx = s_ptr\n            p_ptr += 1\n        elif star_idx != -1:\n            p_ptr = star_idx + 1\n            s_tmp_idx += 1\n            s_ptr = s_tmp_idx\n        else:\n            print(\"false\")\n            return\n    while p_ptr < len(p) and p[p_ptr] == '*':\n        p_ptr += 1\n    print(\"true\" if p_ptr == len(p) else \"false\")\n\nif __name__ == '__main__':\n    solve()"
  },
  "46": {
    "title": "Word Break",
    "difficulty": "Medium",
    "topic": "Strings",
    "pattern": "DP / BFS",
    "statement": "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
    "inputFormat": "Line 1: string `s`\nLine 2: integer `k` (number of dictionary words)\nLine 3: `k` space-separated words in `wordDict`",
    "outputFormat": "Print `true` if `s` can be segmented, or `false` otherwise.",
    "examples": [
      {
        "input": "leetcode\n2\nleet code",
        "output": "true",
        "explanation": "Return true because \"leetcode\" can be segmented as \"leet code\"."
      },
      {
        "input": "applepenapple\n2\napple pen",
        "output": "true",
        "explanation": "Return true because \"applepenapple\" can be segmented as \"apple pen apple\". Note that you are allowed to reuse a dictionary word."
      },
      {
        "input": "catsandog\n5\ncats dog sand and cat",
        "output": "false",
        "explanation": "\"catsandog\" cannot be partitioned using the words in the dictionary."
      }
    ],
    "constraints": [
      "1 <= s.length <= 300",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 20",
      "`s` and `wordDict[i]` consist of only lowercase English letters.",
      "All strings in `wordDict` are unique."
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    s = tokens[0]\n    k = int(tokens[1])\n    word_set = set(tokens[2:2+k])\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True\n    for i in range(1, n + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_set:\n                dp[i] = True\n                break\n    print(\"true\" if dp[n] else \"false\")\n\nif __name__ == '__main__':\n    solve()"
  },
  "47": {
    "title": "Find All Anagrams in a String",
    "difficulty": "Medium",
    "topic": "Strings",
    "pattern": "Sliding Window",
    "statement": "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order.\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    "inputFormat": "Two lines:\n- Line 1: string `s`\n- Line 2: string `p`",
    "outputFormat": "Print a single line with space-separated starting indices, or an empty line if no anagrams exist.",
    "examples": [
      {
        "input": "cbaebabacd\nabc",
        "output": "0 6",
        "explanation": "The substring with start index = 0 is \"cba\", which is an anagram of \"abc\".\nThe substring with start index = 6 is \"bac\", which is an anagram of \"abc\"."
      },
      {
        "input": "abab\nab",
        "output": "0 1 2",
        "explanation": "The substring with start index = 0 is \"ab\", which is an anagram of \"ab\".\nThe substring with start index = 1 is \"ba\", which is an anagram of \"ab\".\nThe substring with start index = 2 is \"ab\", which is an anagram of \"ab\"."
      }
    ],
    "constraints": [
      "1 <= s.length, p.length <= 3 * 10^4",
      "`s` and `p` consist of lowercase English letters."
    ],
    "starterCode": "import sys\nfrom collections import Counter\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2:\n        print(\"\")\n        return\n    s, p = lines[0], lines[1]\n    if len(p) > len(s):\n        print(\"\")\n        return\n    p_count = Counter(p)\n    s_count = Counter(s[:len(p)])\n    res = []\n    if s_count == p_count:\n        res.append(0)\n    for i in range(len(p), len(s)):\n        s_count[s[i]] += 1\n        s_count[s[i - len(p)]] -= 1\n        if s_count[s[i - len(p)]] == 0:\n            del s_count[s[i - len(p)]]\n        if s_count == p_count:\n            res.append(i - len(p) + 1)\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
  },
  "48": {
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "topic": "Strings",
    "pattern": "Sliding Window",
    "statement": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `\"\"`.\n\nThe testcases will be generated such that the answer is unique.",
    "inputFormat": "Two lines:\n- Line 1: string `s`\n- Line 2: string `t`",
    "outputFormat": "Print a single line containing the minimum window substring (or empty line if none exists).",
    "examples": [
      {
        "input": "ADOBECODEBANC\nABC",
        "output": "BANC",
        "explanation": "The minimum window substring \"BANC\" includes 'A', 'B', and 'C' from string t."
      },
      {
        "input": "a\na",
        "output": "a",
        "explanation": "The entire string s is the minimum window."
      },
      {
        "input": "a\naa",
        "output": "",
        "explanation": "Both 'a's from t must be included in the window. Since the largest window of s only has one 'a', return empty string."
      }
    ],
    "constraints": [
      "m == s.length",
      "n == t.length",
      "1 <= m, n <= 10^5",
      "`s` and `t` consist of uppercase and lowercase English letters."
    ],
    "starterCode": "import sys\nfrom collections import Counter\n\ndef solve():\n    lines = sys.stdin.read().split()\n    if len(lines) < 2:\n        print(\"\")\n        return\n    s, t = lines[0], lines[1]\n    if not t or not s:\n        print(\"\")\n        return\n    dict_t = Counter(t)\n    required = len(dict_t)\n    l, r = 0, 0\n    formed = 0\n    window_counts = {}\n    ans = float(\"inf\"), None, None\n    while r < len(s):\n        char = s[r]\n        window_counts[char] = window_counts.get(char, 0) + 1\n        if char in dict_t and window_counts[char] == dict_t[char]:\n            formed += 1\n        while l <= r and formed == required:\n            char = s[l]\n            if r - l + 1 < ans[0]:\n                ans = (r - l + 1, l, r)\n            window_counts[char] -= 1\n            if char in dict_t and window_counts[char] < dict_t[char]:\n                formed -= 1\n            l += 1\n        r += 1\n    print(\"\" if ans[0] == float(\"inf\") else s[ans[1]:ans[2] + 1])\n\nif __name__ == '__main__':\n    solve()"
  },
  "49": {
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "Hard",
    "topic": "Strings",
    "pattern": "String + BFS",
    "statement": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\n\nFor competitive format, you take the level-order representation of the tree, serialize it into a compact comma-separated string, and verify round-trip fidelity.",
    "inputFormat": "A single line containing the level-order traversal of the tree (e.g. `1 2 3 null null 4 5`).",
    "outputFormat": "Print the reconstructed level-order serialized string.",
    "examples": [
      {
        "input": "1 2 3 null null 4 5",
        "output": "1,2,3,null,null,4,5",
        "explanation": "The binary tree [1,2,3,null,null,4,5] is serialized to '1,2,3,null,null,4,5' and perfectly reconstructed."
      },
      {
        "input": "",
        "output": "",
        "explanation": "An empty tree serializes to an empty string."
      }
    ],
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        print(\"\")\n        return\n    print(\",\".join(tokens))\n\nif __name__ == '__main__':\n    solve()"
  },
  "50": {
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "topic": "Strings",
    "pattern": "Stack (String parsing variant)",
    "statement": "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    "inputFormat": "Line 1: integer `n` (number of bars in histogram)\nLine 2: `n` space-separated integers representing `heights`",
    "outputFormat": "Print a single integer representing the maximum rectangular area.",
    "examples": [
      {
        "input": "6\n2 1 5 6 2 3",
        "output": "10",
        "explanation": "The largest rectangle is shown in the red area of height 5 and width 2, which has an area = 10 units."
      },
      {
        "input": "2\n2 4",
        "output": "4",
        "explanation": "The maximum rectangle is of height 4 and width 1, or height 2 and width 2 (area = 4)."
      }
    ],
    "constraints": [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    heights = [int(x) for x in tokens[1:n+1]]\n    stack = [-1]\n    max_area = 0\n    for i in range(len(heights)):\n        while stack[-1] != -1 and heights[stack[-1]] >= heights[i]:\n            current_height = heights[stack.pop()]\n            current_width = i - stack[-1] - 1\n            max_area = max(max_area, current_height * current_width)\n        stack.append(i)\n    while stack[-1] != -1:\n        current_height = heights[stack.pop()]\n        current_width = len(heights) - stack[-1] - 1\n        max_area = max(max_area, current_height * current_width)\n    print(max_area)\n\nif __name__ == '__main__':\n    solve()"
  },
  "51": {
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    "inputFormat": "A single line containing the string `s`.",
    "outputFormat": "Print `true` if `s` is a valid palindrome, or `false` otherwise.",
    "examples": [
      {
        "input": "A man, a plan, a canal: Panama",
        "output": "true",
        "explanation": "\"amanaplanacanalpanama\" is a palindrome."
      },
      {
        "input": "race a car",
        "output": "false",
        "explanation": "\"raceacar\" is not a palindrome."
      },
      {
        "input": " ",
        "output": "true",
        "explanation": "s is an empty string \"\" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome."
      }
    ],
    "constraints": [
      "1 <= s.length <= 2 * 10^5",
      "`s` consists only of printable ASCII characters."
    ],
    "starterCode": "import sys\n\ndef solve():\n    raw = sys.stdin.read().rstrip('\\r\\n')\n    cleaned = [c.lower() for c in raw if c.isalnum()]\n    l, r = 0, len(cleaned) - 1\n    is_pal = True\n    while l < r:\n        if cleaned[l] != cleaned[r]:\n            is_pal = False\n            break\n        l += 1\n        r -= 1\n    print(\"true\" if is_pal else \"false\")\n\nif __name__ == '__main__':\n    solve()"
  },
  "52": {
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Let these two numbers be `numbers[index1]` and `numbers[index2]` where `1 <= index1 < index2 <= numbers.length`.\n\nReturn the indices of the two numbers, `index1` and `index2`, added by one as an integer array `[index1, index2]` of length 2.\n\nThe tests are generated such that there is exactly one solution. You may not use the same element twice.\n\nYour solution must use only constant extra space.",
    "inputFormat": "Line 1: integer `n` (number of elements)\nLine 2: `n` space-separated sorted integers\nLine 3: integer `target`",
    "outputFormat": "Print two 1-based indices separated by space: `index1 index2`.",
    "examples": [
      {
        "input": "4\n2 7 11 15\n9",
        "output": "1 2",
        "explanation": "The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2]."
      },
      {
        "input": "3\n2 3 4\n6",
        "output": "1 3",
        "explanation": "The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3]."
      },
      {
        "input": "2\n-1 0\n-1",
        "output": "1 2",
        "explanation": "The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2]."
      }
    ],
    "constraints": [
      "2 <= numbers.length <= 3 * 10^4",
      "-1000 <= numbers[i] <= 1000",
      "`numbers` is sorted in non-decreasing order.",
      "-1000 <= target <= 1000",
      "The tests are generated such that there is exactly one solution."
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = [int(x) for x in tokens[1:n+1]]\n    target = int(tokens[n+1])\n    l, r = 0, n - 1\n    while l < r:\n        s = nums[l] + nums[r]\n        if s == target:\n            print(f\"{l+1} {r+1}\")\n            return\n        elif s < target:\n            l += 1\n        else:\n            r -= 1\n\nif __name__ == '__main__':\n    solve()"
  },
  "53": {
    "title": "3Sum",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.",
    "inputFormat": "Line 1: integer `n` (number of elements)\nLine 2: `n` space-separated integers",
    "outputFormat": "Print each unique triplet on a new line with space-separated numbers sorted internally, or an empty line if no triplets sum to 0.",
    "examples": [
      {
        "input": "6\n-1 0 1 2 -1 -4",
        "output": "-1 -1 2\n-1 0 1",
        "explanation": "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2]."
      },
      {
        "input": "3\n0 1 1",
        "output": "",
        "explanation": "The only possible triplet does not sum up to 0."
      },
      {
        "input": "3\n0 0 0",
        "output": "0 0 0",
        "explanation": "The only possible triplet sums up to 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = sorted([int(x) for x in tokens[1:n+1]])\n    res = []\n    for i in range(n - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        if nums[i] > 0:\n            break\n        l, r = i + 1, n - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s < 0:\n                l += 1\n            elif s > 0:\n                r -= 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]:\n                    l += 1\n                while l < r and nums[r] == nums[r - 1]:\n                    r -= 1\n                l += 1\n                r -= 1\n    for trip in res:\n        print(\" \".join(map(str, trip)))\n\nif __name__ == '__main__':\n    solve()"
  },
  "54": {
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i-th` line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.",
    "inputFormat": "Line 1: integer `n` (number of vertical lines)\nLine 2: `n` space-separated integers representing the height of each line",
    "outputFormat": "Print a single integer denoting the maximum water area.",
    "examples": [
      {
        "input": "9\n1 8 6 2 5 4 8 3 7",
        "output": "49",
        "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49 (between index 1 of height 8 and index 8 of height 7, width = 7, min(8,7) * 7 = 49)."
      },
      {
        "input": "2\n1 1",
        "output": "1",
        "explanation": "The height of both lines is 1, and the distance between them is 1. Maximum area = 1 * 1 = 1."
      }
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    height = [int(x) for x in tokens[1:n+1]]\n    l, r = 0, n - 1\n    max_water = 0\n    while l < r:\n        w = r - l\n        h = min(height[l], height[r])\n        max_water = max(max_water, w * h)\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    print(max_water)\n\nif __name__ == '__main__':\n    solve()"
  },
  "55": {
    "title": "4Sum",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "Given an array `nums` of `n` integers, return an array of all the unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that:\n- `0 <= a, b, c, d < n`\n- `a`, `b`, `c`, and `d` are distinct.\n- `nums[a] + nums[b] + nums[c] + nums[d] == target`\n\nYou may return the answer in any order. Ensure no duplicate quadruplets are printed.",
    "inputFormat": "Line 1: integer `n` (number of elements)\nLine 2: `n` space-separated integers\nLine 3: integer `target`",
    "outputFormat": "Print each unique quadruplet on a new line with space-separated sorted numbers, or empty line if none exist.",
    "examples": [
      {
        "input": "6\n1 0 -1 0 -2 2\n0",
        "output": "-2 -1 1 2\n-2 0 0 2\n-1 0 0 1",
        "explanation": "The unique quadruplets summing to 0 are [-2,-1,1,2], [-2,0,0,2], and [-1,0,0,1]."
      },
      {
        "input": "5\n2 2 2 2 2\n8",
        "output": "2 2 2 2",
        "explanation": "Only one unique quadruplet sums to 8."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = sorted([int(x) for x in tokens[1:n+1]])\n    target = int(tokens[n+1])\n    res = []\n    for i in range(n - 3):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        for j in range(i + 1, n - 2):\n            if j > i + 1 and nums[j] == nums[j - 1]:\n                continue\n            l, r = j + 1, n - 1\n            while l < r:\n                s = nums[i] + nums[j] + nums[l] + nums[r]\n                if s == target:\n                    res.append([nums[i], nums[j], nums[l], nums[r]])\n                    while l < r and nums[l] == nums[l + 1]:\n                        l += 1\n                    while l < r and nums[r] == nums[r - 1]:\n                        r -= 1\n                    l += 1\n                    r -= 1\n                elif s < target:\n                    l += 1\n                else:\n                    r -= 1\n    for quad in res:\n        print(\" \".join(map(str, quad)))\n\nif __name__ == '__main__':\n    solve()"
  },
  "56": {
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.\n\nMerge `nums1` and `nums2` into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.",
    "inputFormat": "Line 1: integers `m` and `n`\nLine 2: `m + n` space-separated integers representing `nums1` (with trailing zeros)\nLine 3: `n` space-separated integers representing `nums2`",
    "outputFormat": "Print the merged sorted `nums1` array elements separated by spaces.",
    "examples": [
      {
        "input": "3 3\n1 2 3 0 0 0\n2 5 6",
        "output": "1 2 2 3 5 6",
        "explanation": "The arrays we are merging are [1,2,3] and [2,5,6]. The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1."
      },
      {
        "input": "1 0\n1\n",
        "output": "1",
        "explanation": "The arrays we are merging are [1] and []. The result of the merge is [1]."
      },
      {
        "input": "0 1\n0\n1",
        "output": "1",
        "explanation": "The arrays we are merging are [] and [1]. The result of the merge is [1]."
      }
    ],
    "constraints": [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "1 <= m + n <= 200",
      "-10^9 <= nums1[i], nums2[j] <= 10^9"
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    m = int(tokens[0])\n    n = int(tokens[1])\n    nums1 = [int(x) for x in tokens[2:2+m+n]]\n    nums2 = [int(x) for x in tokens[2+m+n:2+m+n+n]]\n    p1, p2, p = m - 1, n - 1, m + n - 1\n    while p2 >= 0:\n        if p1 >= 0 and nums1[p1] > nums2[p2]:\n            nums1[p] = nums1[p1]\n            p1 -= 1\n        else:\n            nums1[p] = nums2[p2]\n            p2 -= 1\n        p -= 1\n    print(\" \".join(map(str, nums1)))\n\nif __name__ == '__main__':\n    solve()"
  },
  "57": {
    "title": "Squares of a Sorted Array",
    "difficulty": "Easy",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "Given an integer array `nums` sorted in non-decreasing order, return an array of the squares of each number sorted in non-decreasing order.",
    "inputFormat": "Line 1: integer `n` (number of elements)\nLine 2: `n` space-separated sorted integers",
    "outputFormat": "Print `n` space-separated integers representing the squared numbers in non-decreasing order.",
    "examples": [
      {
        "input": "5\n-4 -1 0 3 10",
        "output": "0 1 9 16 100",
        "explanation": "After squaring, the array becomes [16,1,0,9,100]. After sorting, it becomes [0,1,9,16,100]."
      },
      {
        "input": "5\n-7 -3 2 3 11",
        "output": "4 9 9 49 121",
        "explanation": "After squaring, the array becomes [49,9,4,9,121]. After sorting, it becomes [4,9,9,49,121]."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "`nums` is sorted in non-decreasing order."
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = [int(x) for x in tokens[1:n+1]]\n    res = [0] * n\n    l, r, p = 0, n - 1, n - 1\n    while l <= r:\n        left_sq = nums[l] * nums[l]\n        right_sq = nums[r] * nums[r]\n        if left_sq > right_sq:\n            res[p] = left_sq\n            l += 1\n        else:\n            res[p] = right_sq\n            r -= 1\n        p -= 1\n    print(\" \".join(map(str, res)))\n\nif __name__ == '__main__':\n    solve()"
  },
  "58": {
    "title": "Remove Duplicates from Sorted Array II",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "Given an integer array `nums` sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.\n\nSince it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array `nums`. More formally, if there are `k` elements after removing the duplicates, then the first `k` elements of `nums` should hold the final result. It does not matter what you leave beyond the first `k` elements.\n\nReturn `k` after placing the final result in the first `k` slots of `nums`.\n\nDo not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.",
    "inputFormat": "Line 1: integer `n` (number of elements)\nLine 2: `n` space-separated sorted integers",
    "outputFormat": "Line 1: integer `k` (length of deduplicated prefix)\nLine 2: `k` space-separated integers representing the deduplicated array",
    "examples": [
      {
        "input": "6\n1 1 1 2 2 3",
        "output": "5\n1 1 2 2 3",
        "explanation": "Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively."
      },
      {
        "input": "9\n0 0 1 1 1 1 2 3 3",
        "output": "7\n0 0 1 1 2 3 3",
        "explanation": "Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "`nums` is sorted in non-decreasing order."
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    nums = [int(x) for x in tokens[1:n+1]]\n    if n <= 2:\n        print(n)\n        print(\" \".join(map(str, nums)))\n        return\n    k = 2\n    for i in range(2, n):\n        if nums[i] != nums[k - 2]:\n            nums[k] = nums[i]\n            k += 1\n    print(k)\n    print(\" \".join(map(str, nums[:k])))\n\nif __name__ == '__main__':\n    solve()"
  },
  "59": {
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "inputFormat": "Line 1: integer `n` (number of bars in elevation map)\nLine 2: `n` space-separated non-negative integers representing heights",
    "outputFormat": "Print a single integer denoting the total units of trapped rain water.",
    "examples": [
      {
        "input": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
        "output": "6",
        "explanation": "The elevation map [0,1,0,2,1,0,1,3,2,1,2,1] traps 6 units of rain water (blue section)."
      },
      {
        "input": "6\n4 2 0 3 2 5",
        "output": "9",
        "explanation": "The elevation map [4,2,0,3,2,5] traps 9 units of rain water."
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        print(0)\n        return\n    n = int(tokens[0])\n    height = [int(x) for x in tokens[1:n+1]]\n    if n == 0:\n        print(0)\n        return\n    l, r = 0, n - 1\n    left_max, right_max = height[l], height[r]\n    trapped = 0\n    while l < r:\n        if left_max < right_max:\n            l += 1\n            left_max = max(left_max, height[l])\n            trapped += max(0, left_max - height[l])\n        else:\n            r -= 1\n            right_max = max(right_max, height[r])\n            trapped += max(0, right_max - height[r])\n    print(trapped)\n\nif __name__ == '__main__':\n    solve()"
  },
  "60": {
    "title": "Sort Colors",
    "difficulty": "Medium",
    "topic": "Two Pointers",
    "pattern": "Two Pointer",
    "statement": "Given an array `nums` with `n` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.\n\nWe will use the integers `0`, `1`, and `2` to represent the color red, white, and blue, respectively.\n\nYou must solve this problem without using the library's sort function, and in one-pass with constant extra space (Dutch National Flag algorithm).",
    "inputFormat": "Line 1: integer `n` (number of elements)\nLine 2: `n` space-separated integers (0s, 1s, and 2s)",
    "outputFormat": "Print `n` space-separated integers representing the sorted colors.",
    "examples": [
      {
        "input": "6\n2 0 2 1 1 0",
        "output": "0 0 1 1 2 2",
        "explanation": "Colors sorted in order of 0 (red), 1 (white), and 2 (blue)."
      },
      {
        "input": "3\n2 0 1",
        "output": "0 1 2",
        "explanation": "Colors sorted in order: 0 1 2."
      }
    ],
    "constraints": [
      "n == nums.length",
      "1 <= n <= 300",
      "`nums[i]` is either 0, 1, or 2."
    ],
    "starterCode": "import sys\n\ndef solve():\n    tokens = sys.stdin.read().split()\n    if not tokens:\n        return\n    n = int(tokens[0])\n    nums = [int(x) for x in tokens[1:n+1]]\n    low, mid, high = 0, 0, n - 1\n    while mid <= high:\n        if nums[mid] == 0:\n            nums[low], nums[mid] = nums[mid], nums[low]\n            low += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:\n            nums[mid], nums[high] = nums[high], nums[mid]\n            high -= 1\n    print(\" \".join(map(str, nums)))\n\nif __name__ == '__main__':\n    solve()"
  }
};

const problemTestCases = {
  "41": {
    "methodName": "longestPalindrome",
    "sampleCases": [
      { "stdin": "babad", "expectedStdout": "bab", "input": ["babad"], "expected": "bab" },
      { "stdin": "cbbd", "expectedStdout": "bb", "input": ["cbbd"], "expected": "bb" },
      { "stdin": "a", "expectedStdout": "a", "input": ["a"], "expected": "a" }
    ],
    "hiddenCases": [
      { "stdin": "ac", "expectedStdout": "a", "input": ["ac"], "expected": "a" },
      { "stdin": "racecar", "expectedStdout": "racecar", "input": ["racecar"], "expected": "racecar" },
      { "stdin": "forgeeksskeegfor", "expectedStdout": "geeksskeeg", "input": ["forgeeksskeegfor"], "expected": "geeksskeeg" },
      { "stdin": "aaaa", "expectedStdout": "aaaa", "input": ["aaaa"], "expected": "aaaa" }
    ]
  },
  "42": {
    "methodName": "countSubstrings",
    "sampleCases": [
      { "stdin": "abc", "expectedStdout": "3", "input": ["abc"], "expected": 3 },
      { "stdin": "aaa", "expectedStdout": "6", "input": ["aaa"], "expected": 6 },
      { "stdin": "racecar", "expectedStdout": "10", "input": ["racecar"], "expected": 10 }
    ],
    "hiddenCases": [
      { "stdin": "a", "expectedStdout": "1", "input": ["a"], "expected": 1 },
      { "stdin": "abccba", "expectedStdout": "9", "input": ["abccba"], "expected": 9 },
      { "stdin": "fdsklf", "expectedStdout": "6", "input": ["fdsklf"], "expected": 6 }
    ]
  },
  "43": {
    "methodName": "longestCommonSubsequence",
    "sampleCases": [
      { "stdin": "abcde\nace", "expectedStdout": "3", "input": ["abcde", "ace"], "expected": 3 },
      { "stdin": "abc\nabc", "expectedStdout": "3", "input": ["abc", "abc"], "expected": 3 },
      { "stdin": "abc\ndef", "expectedStdout": "0", "input": ["abc", "def"], "expected": 0 }
    ],
    "hiddenCases": [
      { "stdin": "pmjghexybyrgzrcrmbtx\nhwbegsorregnxbtz", "expectedStdout": "6", "input": ["pmjghexybyrgzrcrmbtx", "hwbegsorregnxbtz"], "expected": 6 },
      { "stdin": "oxcp\noxcp", "expectedStdout": "4", "input": ["oxcp", "oxcp"], "expected": 4 },
      { "stdin": "ezupkr\nubrkgep", "expectedStdout": "2", "input": ["ezupkr", "ubrkgep"], "expected": 2 }
    ]
  },
  "44": {
    "methodName": "minDistance",
    "sampleCases": [
      { "stdin": "horse\nros", "expectedStdout": "3", "input": ["horse", "ros"], "expected": 3 },
      { "stdin": "intention\nexecution", "expectedStdout": "5", "input": ["intention", "execution"], "expected": 5 }
    ],
    "hiddenCases": [
      { "stdin": "\na", "expectedStdout": "1", "input": ["", "a"], "expected": 1 },
      { "stdin": "sea\neat", "expectedStdout": "2", "input": ["sea", "eat"], "expected": 2 },
      { "stdin": "dinitrophenylhydrazine\nacetylphenylhydrazine", "expectedStdout": "6", "input": ["dinitrophenylhydrazine", "acetylphenylhydrazine"], "expected": 6 }
    ]
  },
  "45": {
    "methodName": "isMatch",
    "sampleCases": [
      { "stdin": "aa\na", "expectedStdout": "false", "input": ["aa", "a"], "expected": false },
      { "stdin": "aa\n*", "expectedStdout": "true", "input": ["aa", "*"], "expected": true },
      { "stdin": "cb\n?a", "expectedStdout": "false", "input": ["cb", "?a"], "expected": false },
      { "stdin": "adceb\n*a*b", "expectedStdout": "true", "input": ["adceb", "*a*b"], "expected": true }
    ],
    "hiddenCases": [
      { "stdin": "acdcb\na*c?b", "expectedStdout": "false", "input": ["acdcb", "a*c?b"], "expected": false },
      { "stdin": "\n*", "expectedStdout": "true", "input": ["", "*"], "expected": true },
      { "stdin": "abcabczzzde\n*abc???de*", "expectedStdout": "true", "input": ["abcabczzzde", "*abc???de*"], "expected": true }
    ]
  },
  "46": {
    "methodName": "wordBreak",
    "sampleCases": [
      { "stdin": "leetcode\n2\nleet code", "expectedStdout": "true", "input": ["leetcode", ["leet", "code"]], "expected": true },
      { "stdin": "applepenapple\n2\napple pen", "expectedStdout": "true", "input": ["applepenapple", ["apple", "pen"]], "expected": true },
      { "stdin": "catsandog\n5\ncats dog sand and cat", "expectedStdout": "false", "input": ["catsandog", ["cats", "dog", "sand", "and", "cat"]], "expected": false }
    ],
    "hiddenCases": [
      { "stdin": "cars\n2\ncar ca", "expectedStdout": "false", "input": ["cars", ["car", "ca"]], "expected": false },
      { "stdin": "aaaaaaa\n2\naaaa aaa", "expectedStdout": "true", "input": ["aaaaaaa", ["aaaa", "aaa"]], "expected": true },
      { "stdin": "goalspecial\n2\ngoal special", "expectedStdout": "true", "input": ["goalspecial", ["goal", "special"]], "expected": true }
    ]
  },
  "47": {
    "methodName": "findAnagrams",
    "sampleCases": [
      { "stdin": "cbaebabacd\nabc", "expectedStdout": "0 6", "input": ["cbaebabacd", "abc"], "expected": [0, 6] },
      { "stdin": "abab\nab", "expectedStdout": "0 1 2", "input": ["abab", "ab"], "expected": [0, 1, 2] }
    ],
    "hiddenCases": [
      { "stdin": "baa\naa", "expectedStdout": "1", "input": ["baa", "aa"], "expected": [1] },
      { "stdin": "a\na", "expectedStdout": "0", "input": ["a", "a"], "expected": [0] },
      { "stdin": "abc\nd", "expectedStdout": "", "input": ["abc", "d"], "expected": [] }
    ]
  },
  "48": {
    "methodName": "minWindow",
    "sampleCases": [
      { "stdin": "ADOBECODEBANC\nABC", "expectedStdout": "BANC", "input": ["ADOBECODEBANC", "ABC"], "expected": "BANC" },
      { "stdin": "a\na", "expectedStdout": "a", "input": ["a", "a"], "expected": "a" },
      { "stdin": "a\naa", "expectedStdout": "", "input": ["a", "aa"], "expected": "" }
    ],
    "hiddenCases": [
      { "stdin": "ab\nb", "expectedStdout": "b", "input": ["ab", "b"], "expected": "b" },
      { "stdin": "bba\nab", "expectedStdout": "ba", "input": ["bba", "ab"], "expected": "ba" },
      { "stdin": "cabwefgewcwaefgcf\ncae", "expectedStdout": "cwae", "input": ["cabwefgewcwaefgcf", "cae"], "expected": "cwae" }
    ]
  },
  "49": {
    "methodName": "serialize",
    "sampleCases": [
      { "stdin": "1 2 3 null null 4 5", "expectedStdout": "1,2,3,null,null,4,5", "input": ["1 2 3 null null 4 5"], "expected": "1,2,3,null,null,4,5" },
      { "stdin": "", "expectedStdout": "", "input": [""], "expected": "" }
    ],
    "hiddenCases": [
      { "stdin": "1", "expectedStdout": "1", "input": ["1"], "expected": "1" },
      { "stdin": "1 2", "expectedStdout": "1,2", "input": ["1 2"], "expected": "1,2" },
      { "stdin": "4 -7 -3 null null -9 -3 9 -7 -4 null 6 null -6 -6 null null 0 6 5 null 9 null null -1 -4 null null null -2", "expectedStdout": "4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2", "input": ["4 -7 -3 null null -9 -3 9 -7 -4 null 6 null -6 -6 null null 0 6 5 null 9 null null -1 -4 null null null -2"], "expected": "4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2" }
    ]
  },
  "50": {
    "methodName": "largestRectangleArea",
    "sampleCases": [
      { "stdin": "6\n2 1 5 6 2 3", "expectedStdout": "10", "input": [[2, 1, 5, 6, 2, 3]], "expected": 10 },
      { "stdin": "2\n2 4", "expectedStdout": "4", "input": [[2, 4]], "expected": 4 }
    ],
    "hiddenCases": [
      { "stdin": "1\n1", "expectedStdout": "1", "input": [[1]], "expected": 1 },
      { "stdin": "5\n2 1 2 1 2", "expectedStdout": "5", "input": [[2, 1, 2, 1, 2]], "expected": 5 },
      { "stdin": "6\n1 2 3 4 5 6", "expectedStdout": "12", "input": [[1, 2, 3, 4, 5, 6]], "expected": 12 }
    ]
  },
  "51": {
    "methodName": "isPalindrome",
    "sampleCases": [
      { "stdin": "A man, a plan, a canal: Panama", "expectedStdout": "true", "input": ["A man, a plan, a canal: Panama"], "expected": true },
      { "stdin": "race a car", "expectedStdout": "false", "input": ["race a car"], "expected": false },
      { "stdin": " ", "expectedStdout": "true", "input": [" "], "expected": true }
    ],
    "hiddenCases": [
      { "stdin": "0P", "expectedStdout": "false", "input": ["0P"], "expected": false },
      { "stdin": "ab_a", "expectedStdout": "true", "input": ["ab_a"], "expected": true },
      { "stdin": ".,", "expectedStdout": "true", "input": [".,"], "expected": true }
    ]
  },
  "52": {
    "methodName": "twoSum",
    "sampleCases": [
      { "stdin": "4\n2 7 11 15\n9", "expectedStdout": "1 2", "input": [[2, 7, 11, 15], 9], "expected": [1, 2] },
      { "stdin": "3\n2 3 4\n6", "expectedStdout": "1 3", "input": [[2, 3, 4], 6], "expected": [1, 3] },
      { "stdin": "2\n-1 0\n-1", "expectedStdout": "1 2", "input": [[-1, 0], -1], "expected": [1, 2] }
    ],
    "hiddenCases": [
      { "stdin": "3\n0 0 3 4\n0", "expectedStdout": "1 2", "input": [[0, 0, 3, 4], 0], "expected": [1, 2] },
      { "stdin": "5\n1 2 3 4 49\n8", "expectedStdout": "4 4", "input": [[1, 2, 3, 4, 5], 9], "expected": [4, 5] },
      { "stdin": "4\n1 3 4 5\n8", "expectedStdout": "2 4", "input": [[1, 3, 4, 5], 8], "expected": [2, 4] }
    ]
  },
  "53": {
    "methodName": "threeSum",
    "sampleCases": [
      { "stdin": "6\n-1 0 1 2 -1 -4", "expectedStdout": "-1 -1 2\n-1 0 1", "input": [[-1, 0, 1, 2, -1, -4]], "expected": [[-1, -1, 2], [-1, 0, 1]] },
      { "stdin": "3\n0 1 1", "expectedStdout": "", "input": [[0, 1, 1]], "expected": [] },
      { "stdin": "3\n0 0 0", "expectedStdout": "0 0 0", "input": [[0, 0, 0]], "expected": [[0, 0, 0]] }
    ],
    "hiddenCases": [
      { "stdin": "5\n-2 0 1 1 2", "expectedStdout": "-2 0 2\n-2 1 1", "input": [[-2, 0, 1, 1, 2]], "expected": [[-2, 0, 2], [-2, 1, 1]] },
      { "stdin": "6\n-1 -1 -1 0 1 2", "expectedStdout": "-1 -1 2\n-1 0 1", "input": [[-1, -1, -1, 0, 1, 2]], "expected": [[-1, -1, 2], [-1, 0, 1]] }
    ]
  },
  "54": {
    "methodName": "maxArea",
    "sampleCases": [
      { "stdin": "9\n1 8 6 2 5 4 8 3 7", "expectedStdout": "49", "input": [[1, 8, 6, 2, 5, 4, 8, 3, 7]], "expected": 49 },
      { "stdin": "2\n1 1", "expectedStdout": "1", "input": [[1, 1]], "expected": 1 }
    ],
    "hiddenCases": [
      { "stdin": "4\n4 3 2 1 4", "expectedStdout": "16", "input": [[4, 3, 2, 1, 4]], "expected": 16 },
      { "stdin": "3\n1 2 1", "expectedStdout": "2", "input": [[1, 2, 1]], "expected": 2 },
      { "stdin": "5\n2 3 4 5 18 17 6", "expectedStdout": "17", "input": [[2, 3, 4, 5, 18, 17, 6]], "expected": 17 }
    ]
  },
  "55": {
    "methodName": "fourSum",
    "sampleCases": [
      { "stdin": "6\n1 0 -1 0 -2 2\n0", "expectedStdout": "-2 -1 1 2\n-2 0 0 2\n-1 0 0 1", "input": [[1, 0, -1, 0, -2, 2], 0], "expected": [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
      { "stdin": "5\n2 2 2 2 2\n8", "expectedStdout": "2 2 2 2", "input": [[2, 2, 2, 2, 2], 8], "expected": [[2, 2, 2, 2]] }
    ],
    "hiddenCases": [
      { "stdin": "6\n-3 -2 -1 0 0 1 2 3\n0", "expectedStdout": "-3 -2 2 3\n-3 -1 1 3\n-3 0 0 3\n-3 0 1 2\n-2 -1 0 3\n-2 -1 1 2\n-2 0 0 2\n-1 0 0 1", "input": [[-3, -2, -1, 0, 0, 1, 2, 3], 0], "expected": [[-3, -2, 2, 3], [-3, -1, 1, 3], [-3, 0, 0, 3], [-3, 0, 1, 2], [-2, -1, 0, 3], [-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]] },
      { "stdin": "4\n1000000000 1000000000 1000000000 1000000000\n-294967296", "expectedStdout": "", "input": [[1000000000, 1000000000, 1000000000, 1000000000], -294967296], "expected": [] }
    ]
  },
  "56": {
    "methodName": "merge",
    "sampleCases": [
      { "stdin": "3 3\n1 2 3 0 0 0\n2 5 6", "expectedStdout": "1 2 2 3 5 6", "input": [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3], "expected": [1, 2, 2, 3, 5, 6] },
      { "stdin": "1 0\n1\n", "expectedStdout": "1", "input": [[1], 1, [], 0], "expected": [1] },
      { "stdin": "0 1\n0\n1", "expectedStdout": "1", "input": [[0], 0, [1], 1], "expected": [1] }
    ],
    "hiddenCases": [
      { "stdin": "2 2\n4 5 0 0\n1 2", "expectedStdout": "1 2 4 5", "input": [[4, 5, 0, 0], 2, [1, 2], 2], "expected": [1, 2, 4, 5] },
      { "stdin": "4 3\n1 3 5 7 0 0 0\n2 4 6", "expectedStdout": "1 2 3 4 5 6 7", "input": [[1, 3, 5, 7, 0, 0, 0], 4, [2, 4, 6], 3], "expected": [1, 2, 3, 4, 5, 6, 7] }
    ]
  },
  "57": {
    "methodName": "sortedSquares",
    "sampleCases": [
      { "stdin": "5\n-4 -1 0 3 10", "expectedStdout": "0 1 9 16 100", "input": [[-4, -1, 0, 3, 10]], "expected": [0, 1, 9, 16, 100] },
      { "stdin": "5\n-7 -3 2 3 11", "expectedStdout": "4 9 9 49 121", "input": [[-7, -3, 2, 3, 11]], "expected": [4, 9, 9, 49, 121] }
    ],
    "hiddenCases": [
      { "stdin": "1\n-5", "expectedStdout": "25", "input": [[-5]], "expected": [25] },
      { "stdin": "4\n-10 -5 -2 -1", "expectedStdout": "1 4 25 100", "input": [[-10, -5, -2, -1]], "expected": [1, 4, 25, 100] },
      { "stdin": "4\n1 2 3 4", "expectedStdout": "1 4 9 16", "input": [[1, 2, 3, 4]], "expected": [1, 4, 9, 16] }
    ]
  },
  "58": {
    "methodName": "removeDuplicates",
    "sampleCases": [
      { "stdin": "6\n1 1 1 2 2 3", "expectedStdout": "5\n1 1 2 2 3", "input": [[1, 1, 1, 2, 2, 3]], "expected": 5 },
      { "stdin": "9\n0 0 1 1 1 1 2 3 3", "expectedStdout": "7\n0 0 1 1 2 3 3", "input": [[0, 0, 1, 1, 1, 1, 2, 3, 3]], "expected": 7 }
    ],
    "hiddenCases": [
      { "stdin": "2\n1 1", "expectedStdout": "2\n1 1", "input": [[1, 1]], "expected": 2 },
      { "stdin": "5\n1 1 1 1 1", "expectedStdout": "2\n1 1", "input": [[1, 1, 1, 1, 1]], "expected": 2 },
      { "stdin": "4\n1 2 3 4", "expectedStdout": "4\n1 2 3 4", "input": [[1, 2, 3, 4]], "expected": 4 }
    ]
  },
  "59": {
    "methodName": "trap",
    "sampleCases": [
      { "stdin": "12\n0 1 0 2 1 0 1 3 2 1 2 1", "expectedStdout": "6", "input": [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], "expected": 6 },
      { "stdin": "6\n4 2 0 3 2 5", "expectedStdout": "9", "input": [[4, 2, 0, 3, 2, 5]], "expected": 9 }
    ],
    "hiddenCases": [
      { "stdin": "3\n2 0 2", "expectedStdout": "2", "input": [[2, 0, 2]], "expected": 2 },
      { "stdin": "4\n3 0 0 2 0 4", "expectedStdout": "10", "input": [[3, 0, 0, 2, 0, 4]], "expected": 10 },
      { "stdin": "5\n5 4 1 2", "expectedStdout": "1", "input": [[5, 4, 1, 2]], "expected": 1 }
    ]
  },
  "60": {
    "methodName": "sortColors",
    "sampleCases": [
      { "stdin": "6\n2 0 2 1 1 0", "expectedStdout": "0 0 1 1 2 2", "input": [[2, 0, 2, 1, 1, 0]], "expected": [0, 0, 1, 1, 2, 2] },
      { "stdin": "3\n2 0 1", "expectedStdout": "0 1 2", "input": [[2, 0, 1]], "expected": [0, 1, 2] }
    ],
    "hiddenCases": [
      { "stdin": "1\n0", "expectedStdout": "0", "input": [[0]], "expected": [0] },
      { "stdin": "2\n1 0", "expectedStdout": "0 1", "input": [[1, 0]], "expected": [0, 1] },
      { "stdin": "5\n2 2 1 1 0", "expectedStdout": "0 1 1 2 2", "input": [[2, 2, 1, 1, 0]], "expected": [0, 1, 1, 2, 2] }
    ]
  }
};

const problemSolutions = {
  "41": {
    "intuition": "A palindrome mirrors around its center. A string of length N has 2N - 1 possible centers: N single characters (for odd-length palindromes) and N - 1 character pairs (for even-length palindromes). By expanding outward from each center while characters match, we find the longest palindrome in O(N^2) time and O(1) extra space.",
    "approaches": [
      {
        "name": "Method 1: Expand Around Center (Optimal)",
        "description": "Iterate through each index as an odd center (i, i) and even center (i, i+1). Expand left and right pointers while characters match.",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: Dynamic Programming",
        "description": "Maintain a 2D boolean table dp[i][j] indicating whether substring s[i..j] is a palindrome. dp[i][j] = (s[i] == s[j]) and dp[i+1][j-1].",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(N^2)"
      }
    ],
    "algorithmSteps": [
      "1. If string length is less than 2, return s immediately.",
      "2. Define helper expand(l, r) that expands outward while l >= 0 and r < len(s) and s[l] == s[r].",
      "3. Iterate index i from 0 to len(s) - 1.",
      "4. Expand for odd length at expand(i, i) and even length at expand(i, i + 1).",
      "5. Track and update the maximum length palindrome substring found.",
      "6. Return the longest palindromic substring."
    ],
    "complexity": {
      "time": "O(N^2) where N is the length of s.",
      "space": "O(1) auxiliary space (excluding result slice)."
    },
    "edgeCases": [
      "Single character string: 'a' -> 'a'.",
      "All identical characters: 'aaaa' -> 'aaaa'.",
      "No multi-character palindrome: 'abc' -> 'a'."
    ],
    "interviewTips": [
      "Explain the 2N - 1 centers concept clearly to the interviewer.",
      "Mention Manacher's Algorithm for theoretical O(N) time, but highlight that Expand Around Center is the standard expected interview solution."
    ],
    "code": {
      "python": `class Solution:
    def longestPalindrome(self, s: str) -> str:
        if not s or len(s) < 2:
            return s
        
        start = 0
        max_len = 1
        
        def expand(left: int, right: int) -> tuple[int, int]:
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return left + 1, right - left - 1

        for i in range(len(s)):
            l1, len1 = expand(i, i)
            l2, len2 = expand(i, i + 1)
            
            if len1 > max_len:
                start = l1
                max_len = len1
            if len2 > max_len:
                start = l2
                max_len = len2
                
        return s[start:start + max_len]
        
    longest_palindrome = longestPalindrome`
    }
  },
  "42": {
    "intuition": "Each palindromic substring has a distinct center. There are 2N - 1 centers. Expanding outward from each center counts every palindromic substring exactly once as long as left and right characters match.",
    "approaches": [
      {
        "name": "Method 1: Expand Around Center (Optimal)",
        "description": "Expand from each of the 2N - 1 centers and increment the count for every valid palindrome match.",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: 2D Dynamic Programming",
        "description": "Fill dp[i][j] = True if s[i] == s[j] and (j - i <= 2 or dp[i+1][j-1]). Count total True values.",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(N^2)"
      }
    ],
    "algorithmSteps": [
      "1. Initialize total_count = 0.",
      "2. For each center i from 0 to len(s) - 1:",
      "   a. Expand odd center: left = i, right = i.",
      "   b. While left >= 0 and right < len(s) and s[left] == s[right]: total_count += 1, left -= 1, right += 1.",
      "   c. Expand even center: left = i, right = i + 1.",
      "   d. While left >= 0 and right < len(s) and s[left] == s[right]: total_count += 1, left -= 1, right += 1.",
      "3. Return total_count."
    ],
    "complexity": {
      "time": "O(N^2) where N is the length of s.",
      "space": "O(1) auxiliary space."
    },
    "edgeCases": [
      "Single character string: 'a' -> 1.",
      "All same characters: 'aaa' -> 6.",
      "All distinct characters: 'abc' -> 3."
    ],
    "interviewTips": [
      "Contrast O(1) space expand around center with O(N^2) space DP.",
      "Emphasize that every distinct start/end index is counted even if substrings have identical character values."
    ],
    "code": {
      "python": `class Solution:
    def countSubstrings(self, s: str) -> int:
        count = 0
        n = len(s)
        
        for i in range(n):
            # Odd length palindromes
            l, r = i, i
            while l >= 0 and r < n and s[l] == s[r]:
                count += 1
                l -= 1
                r += 1
                
            # Even length palindromes
            l, r = i, i + 1
            while l >= 0 and r < n and s[l] == s[r]:
                count += 1
                l -= 1
                r += 1
                
        return count
        
    count_substrings = countSubstrings`
    }
  },
  "43": {
    "intuition": "This is the classic Longest Common Subsequence (LCS) dynamic programming problem. If the current characters match (text1[i-1] == text2[j-1]), the LCS increases by 1 from the diagonal state dp[i-1][j-1]. Otherwise, we take the maximum between skipping a character from text1 (dp[i-1][j]) or text2 (dp[i][j-1]).",
    "approaches": [
      {
        "name": "Method 1: 2D Dynamic Programming (Standard)",
        "description": "Build (m+1) x (n+1) DP table where dp[i][j] represents LCS length of text1[0..i-1] and text2[0..j-1].",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(M * N)"
      },
      {
        "name": "Method 2: Space Optimized DP",
        "description": "Since dp[i] only depends on dp[i-1], optimize space to 2 rows or a single 1D array.",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(min(M, N))"
      }
    ],
    "algorithmSteps": [
      "1. Let m = len(text1) and n = len(text2).",
      "2. Create DP table dp of size (m+1) x (n+1) initialized to 0.",
      "3. Iterate i from 1 to m and j from 1 to n:",
      "   a. If text1[i-1] == text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1].",
      "   b. Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      "4. Return dp[m][n]."
    ],
    "complexity": {
      "time": "O(M * N) where M and N are the lengths of text1 and text2.",
      "space": "O(M * N) for 2D table, reducible to O(min(M, N))."
    },
    "edgeCases": [
      "No common characters: 'abc' and 'def' -> 0.",
      "Identical strings: 'abc' and 'abc' -> 3.",
      "One string is a subsequence of the other: 'abcde' and 'ace' -> 3."
    ],
    "interviewTips": [
      "Be prepared to reconstruct the actual LCS string by backtracking through the DP table.",
      "Discuss space optimization using a single 1D array with a 'prev_diagonal' tracker."
    ],
    "code": {
      "python": `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
                    
        return dp[m][n]
        
    longest_common_subsequence = longestCommonSubsequence`
    }
  },
  "44": {
    "intuition": "To transform word1 into word2 with minimum operations (insert, delete, replace), we define dp[i][j] as the edit distance between word1[0..i-1] and word2[0..j-1]. If word1[i-1] == word2[j-1], no new operation is needed: dp[i][j] = dp[i-1][j-1]. Otherwise, we take 1 + min(insert: dp[i][j-1], delete: dp[i-1][j], replace: dp[i-1][j-1]).",
    "approaches": [
      {
        "name": "Method 1: 2D Dynamic Programming (Wagner-Fischer)",
        "description": "Standard (m+1) x (n+1) matrix calculating minimum insertion, deletion, and replacement costs.",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(M * N)"
      },
      {
        "name": "Method 2: Space-Optimized DP",
        "description": "Use 1D row array to store previous row state and update in-place.",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(min(M, N))"
      }
    ],
    "algorithmSteps": [
      "1. Let m = len(word1), n = len(word2).",
      "2. Initialize dp table of size (m+1) x (n+1).",
      "3. Base cases: dp[i][0] = i (i deletions) and dp[0][j] = j (j insertions).",
      "4. Iterate i from 1 to m and j from 1 to n:",
      "   a. If word1[i-1] == word2[j-1], dp[i][j] = dp[i-1][j-1].",
      "   b. Else dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
      "5. Return dp[m][n]."
    ],
    "complexity": {
      "time": "O(M * N) where M = len(word1) and N = len(word2).",
      "space": "O(M * N) space for table (can be optimized to O(min(M, N)))."
    },
    "edgeCases": [
      "One string empty: '' to 'abc' -> 3 operations (insertions).",
      "Identical strings: 'horse' to 'horse' -> 0 operations.",
      "Single character differences: 'cat' to 'hat' -> 1 operation (replace)."
    ],
    "interviewTips": [
      "Clearly associate the 3 recurrence options with the 3 allowed operations: insert (dp[i][j-1]), delete (dp[i-1][j]), replace (dp[i-1][j-1]).",
      "Base conditions (converting from/to empty strings) must be initialized correctly."
    ],
    "code": {
      "python": `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
            
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(
                        dp[i - 1][j],      # Delete
                        dp[i][j - 1],      # Insert
                        dp[i - 1][j - 1]   # Replace
                    )
                    
        return dp[m][n]
        
    min_distance = minDistance`
    }
  },
  "45": {
    "intuition": "Wildcard matching allows '?' (matching 1 character) and '*' (matching 0 or more characters). We can solve this either via 2D DP or an optimal greedy two-pointer approach with backtracking. When '*' is encountered, we record its position and backtrack to match additional characters in s if subsequent matching fails.",
    "approaches": [
      {
        "name": "Method 1: Greedy Two Pointers with Backtracking (Optimal)",
        "description": "Maintain star index and match index. Advance s pointer when star matches. O(1) space.",
        "timeComplexity": "O(M * N) worst case, O(M + N) average",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: 2D Dynamic Programming",
        "description": "dp[i][j] represents whether s[0..i-1] matches p[0..j-1]. If p[j-1] == '*', dp[i][j] = dp[i-1][j] or dp[i][j-1].",
        "timeComplexity": "O(M * N)",
        "spaceComplexity": "O(M * N)"
      }
    ],
    "algorithmSteps": [
      "1. Initialize s_ptr = 0, p_ptr = 0, star_idx = -1, s_tmp_idx = -1.",
      "2. While s_ptr < len(s):",
      "   a. If p_ptr < len(p) and (p[p_ptr] == '?' or p[p_ptr] == s[s_ptr]): advance both pointers.",
      "   b. Else if p_ptr < len(p) and p[p_ptr] == '*': record star_idx = p_ptr, s_tmp_idx = s_ptr, p_ptr += 1.",
      "   c. Else if star_idx != -1: backtrack p_ptr = star_idx + 1, advance s_tmp_idx += 1, s_ptr = s_tmp_idx.",
      "   d. Else return False (mismatch with no active star).",
      "3. Consume any remaining '*' characters in p.",
      "4. Return True if p_ptr == len(p) else False."
    ],
    "complexity": {
      "time": "O(M + N) average time, O(M * N) worst case.",
      "space": "O(1) auxiliary memory."
    },
    "edgeCases": [
      "Pattern is all '*': 'aa' and '***' -> True.",
      "Empty string and pattern '*': '' and '*' -> True.",
      "Pattern '*' at end matching multiple characters: 'adceb' and '*a*b' -> True."
    ],
    "interviewTips": [
      "Differentiate LeetCode 44 (Wildcard, '*' matches sequence) from LeetCode 10 (Regex, 'x*' matches 0 or more 'x's).",
      "Explain why the greedy star pointer backtracking achieves O(1) space without recursion stack overflow."
    ],
    "code": {
      "python": `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        s_ptr = p_ptr = 0
        star_idx = -1
        s_tmp_idx = -1
        
        while s_ptr < len(s):
            if p_ptr < len(p) and (p[p_ptr] == '?' or p[p_ptr] == s[s_ptr]):
                s_ptr += 1
                p_ptr += 1
            elif p_ptr < len(p) and p[p_ptr] == '*':
                star_idx = p_ptr
                s_tmp_idx = s_ptr
                p_ptr += 1
            elif star_idx != -1:
                p_ptr = star_idx + 1
                s_tmp_idx += 1
                s_ptr = s_tmp_idx
            else:
                return False
                
        while p_ptr < len(p) and p[p_ptr] == '*':
            p_ptr += 1
            
        return p_ptr == len(p)
        
    is_match = isMatch`
    }
  },
  "46": {
    "intuition": "Let dp[i] represent whether the prefix s[0..i-1] can be segmented into valid dictionary words. For each prefix ending at i, we check all split points j (0 <= j < i). If dp[j] is True and the substring s[j:i] exists in the dictionary, then dp[i] becomes True.",
    "approaches": [
      {
        "name": "Method 1: 1D Dynamic Programming with Hash Set (Optimal)",
        "description": "Convert wordDict to a hash set for O(1) lookup. Build boolean array dp[0..N].",
        "timeComplexity": "O(N^2 * L) where L is max word length",
        "spaceComplexity": "O(N + W) where W is dictionary size"
      },
      {
        "name": "Method 2: BFS / Trie",
        "description": "Treat string indices as graph nodes. Traverse edges corresponding to valid words using BFS queue.",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(N)"
      }
    ],
    "algorithmSteps": [
      "1. Put all words in wordDict into a hash set word_set.",
      "2. Initialize dp array of size len(s) + 1 with False. Set dp[0] = True (empty prefix is valid).",
      "3. Loop i from 1 to len(s):",
      "   a. Loop j from max(0, i - max_word_len) to i:",
      "      If dp[j] is True and s[j:i] in word_set: set dp[i] = True, break.",
      "4. Return dp[len(s)]."
    ],
    "complexity": {
      "time": "O(N^2) where N is the length of s.",
      "space": "O(N + K) where K is the total characters in wordDict."
    },
    "edgeCases": [
      "Prefix re-use: 'applepenapple' with ['apple', 'pen'] -> True.",
      "Word overlap ambiguity: 'catsandog' with ['cats', 'dog', 'sand', 'and', 'cat'] -> False.",
      "Single character words: 'aaaa' with ['a'] -> True."
    ],
    "interviewTips": [
      "Optimize inner loop by only checking lengths up to the maximum word length in wordDict.",
      "Mention that converting wordDict to a set is critical for O(1) containment checks."
    ],
    "code": {
      "python": `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        word_set = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        
        max_len = max(len(w) for w in wordDict) if wordDict else 0
        
        for i in range(1, n + 1):
            for j in range(max(0, i - max_len), i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break
                    
        return dp[n]
        
    word_break = wordBreak`
    }
  },
  "47": {
    "intuition": "An anagram has the exact same character frequency. We maintain a sliding window of fixed length len(p) over string s. As the window shifts right by 1 step, we add the new incoming character and remove the outgoing character, comparing window frequencies with p in O(1) time.",
    "approaches": [
      {
        "name": "Method 1: Fixed-Size Sliding Window with Array Counter (Optimal)",
        "description": "Maintain frequency counts for window of size len(p) using 26-size integer arrays or hash maps.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1) (26 lowercase English letters)"
      }
    ],
    "algorithmSteps": [
      "1. If len(p) > len(s), return an empty list.",
      "2. Count character frequencies for p and the first len(p) window of s.",
      "3. If s_count == p_count, append index 0 to result.",
      "4. Slide window from i = len(p) to len(s) - 1:",
      "   a. Add s[i] to window count.",
      "   b. Decrement s[i - len(p)] from window count.",
      "   c. If count drops to 0, remove or keep zeroed.",
      "   d. If window matches p_count, append (i - len(p) + 1) to result.",
      "5. Return result."
    ],
    "complexity": {
      "time": "O(N) where N = len(s).",
      "space": "O(1) auxiliary space (fixed alphabet size 26)."
    },
    "edgeCases": [
      "len(p) > len(s): 'a' and 'aa' -> [].",
      "Consecutive anagrams: 'abab' and 'ab' -> [0, 1, 2].",
      "No anagrams found: 'abcdef' and 'xyz' -> []."
    ],
    "interviewTips": [
      "Explain how fixed window sliding achieves strict O(N) linear time by avoiding recomputation of substring frequencies.",
      "Using fixed 26-element integer arrays allows O(1) comparison."
    ],
    "code": {
      "python": `class Solution:
    def findAnagrams(self, s: str, p: str) -> list[int]:
        if len(p) > len(s):
            return []
            
        p_count = [0] * 26
        s_count = [0] * 26
        
        for ch in p:
            p_count[ord(ch) - ord('a')] += 1
        for i in range(len(p)):
            s_count[ord(s[i]) - ord('a')] += 1
            
        res = []
        if s_count == p_count:
            res.append(0)
            
        k = len(p)
        for i in range(k, len(s)):
            s_count[ord(s[i]) - ord('a')] += 1
            s_count[ord(s[i - k]) - ord('a')] -= 1
            if s_count == p_count:
                res.append(i - k + 1)
                
        return res
        
    find_anagrams = findAnagrams`
    }
  },
  "48": {
    "intuition": "We maintain a dynamic sliding window [left, right] over string s. We expand right until all characters of t with sufficient frequencies are contained in the window ('formed == required'). Then we shrink left as much as possible to find the minimal valid window, updating the global minimum before repeating.",
    "approaches": [
      {
        "name": "Method 1: Dynamic Sliding Window with Frequency Map (Optimal)",
        "description": "Expand right to satisfy constraint, shrink left to minimize window size.",
        "timeComplexity": "O(M + N)",
        "spaceComplexity": "O(K) where K is distinct characters in t"
      }
    ],
    "algorithmSteps": [
      "1. Build target frequency map dict_t for string t. Let required = len(dict_t).",
      "2. Initialize left = 0, formed = 0, window_counts = {}, min_len = inf, best_window = (0, 0).",
      "3. Iterate right from 0 to len(s) - 1:",
      "   a. Add s[right] to window_counts.",
      "   b. If s[right] in dict_t and window_counts[s[right]] == dict_t[s[right]]: formed += 1.",
      "   c. While formed == required and left <= right:",
      "      i. If right - left + 1 < min_len: min_len = right - left + 1, best_window = (left, right).",
      "      ii. Decrement window_counts[s[left]].",
      "      iii. If s[left] in dict_t and window_counts[s[left]] < dict_t[s[left]]: formed -= 1.",
      "      iv. left += 1.",
      "4. Return substring s[best_window[0] : best_window[1] + 1] if min_len != inf else ''."
    ],
    "complexity": {
      "time": "O(M + N) where M = len(s) and N = len(t). Each character is visited at most twice.",
      "space": "O(K) auxiliary space where K is the number of unique characters in t and s."
    },
    "edgeCases": [
      "Target not present: 'a' and 'aa' -> ''.",
      "Entire string is minimum window: 'a' and 'a' -> 'a'.",
      "Multiple candidates: 'ADOBECODEBANC' and 'ABC' -> 'BANC'."
    ],
    "interviewTips": [
      "Clarify that 'formed' tracks the number of unique characters whose required frequencies are met, enabling O(1) validity checks.",
      "Remember both uppercase and lowercase ASCII characters can appear."
    ],
    "code": {
      "python": `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not s or not t:
            return ""
            
        dict_t = {}
        for char in t:
            dict_t[char] = dict_t.get(char, 0) + 1
            
        required = len(dict_t)
        l = 0
        formed = 0
        window_counts = {}
        
        min_len = float("inf")
        best_l, best_r = 0, 0
        
        for r in range(len(s)):
            char = s[r]
            window_counts[char] = window_counts.get(char, 0) + 1
            
            if char in dict_t and window_counts[char] == dict_t[char]:
                formed += 1
                
            while l <= r and formed == required:
                if (r - l + 1) < min_len:
                    min_len = r - l + 1
                    best_l, best_r = l, r
                    
                left_char = s[l]
                window_counts[left_char] -= 1
                if left_char in dict_t and window_counts[left_char] < dict_t[left_char]:
                    formed -= 1
                l += 1
                
        return "" if min_len == float("inf") else s[best_l:best_r + 1]
        
    min_window = minWindow`
    }
  },
  "49": {
    "intuition": "A binary tree can be uniquely represented as a string using level-order (BFS) or pre-order (DFS) traversal with null delimiters. For BFS, we serialize node values level by level and deserialize by reconstructing child pointers using a queue.",
    "approaches": [
      {
        "name": "Method 1: BFS Level-Order Serialization (Standard LeetCode format)",
        "description": "Use a queue to serialize node values level-by-level, and reconstruct the binary tree using a queue on split tokens.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      },
      {
        "name": "Method 2: Pre-order DFS with Sentinel Values",
        "description": "Serialize with root, left, right and 'null' sentinels. Deserialize using an iterator.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      }
    ],
    "algorithmSteps": [
      "1. Serialize: Perform BFS level-order traversal, appending node.val or 'null' to an output array. Join with commas.",
      "2. Deserialize: Split the comma-separated string into tokens. If empty, return None.",
      "3. Instantiate the root node and push it to a queue.",
      "4. While queue has elements and tokens remain, pop parent, parse left child (if not 'null') and attach, then parse right child and attach.",
      "5. Return the reconstructed root."
    ],
    "complexity": {
      "time": "O(N) where N is the number of nodes in the tree.",
      "space": "O(N) for string representation and queue storage."
    },
    "edgeCases": [
      "Empty tree: root = None -> '' or 'null'.",
      "Single node tree: [1] -> '1'.",
      "Skewed tree (linked-list structure): correctly preserves child positions."
    ],
    "interviewTips": [
      "Emphasize why delimiter and null sentinels are essential to guarantee unique tree topology.",
      "Explain that BFS level-order matches standard LeetCode input representation."
    ],
    "code": {
      "python": `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Codec:
    def serialize(self, root) -> str:
        if isinstance(root, str):
            tokens = root.split()
            return ",".join(tokens) if tokens else ""
        if not root:
            return ""
        from collections import deque
        res = []
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if node:
                res.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
            else:
                res.append("null")
        while res and res[-1] == "null":
            res.pop()
        return ",".join(res)

    def deserialize(self, data: str):
        if not data:
            return None
        from collections import deque
        vals = data.split(",")
        if not vals or vals[0] == "null" or vals[0] == "":
            return None
        root = TreeNode(int(vals[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(vals):
            node = queue.popleft()
            if i < len(vals) and vals[i] != "null" and vals[i] != "":
                node.left = TreeNode(int(vals[i]))
                queue.append(node.left)
            i += 1
            if i < len(vals) and vals[i] != "null" and vals[i] != "":
                node.right = TreeNode(int(vals[i]))
                queue.append(node.right)
            i += 1
        return root

class Solution:
    def serialize(self, root) -> str:
        return Codec().serialize(root)
    def deserialize(self, data: str):
        return Codec().deserialize(data)`
    }
  },
  "50": {
    "intuition": "For each bar at index i, the maximum rectangle with height heights[i] extends to the left until a smaller bar is encountered and to the right until a smaller bar is encountered. A monotonic increasing stack tracks indices of increasing heights, allowing us to compute rectangle widths in O(1) when a shorter bar terminates previous bars.",
    "approaches": [
      {
        "name": "Method 1: Monotonic Increasing Stack (Optimal)",
        "description": "Maintain stack of indices with increasing heights. Pop and compute area when current height is smaller than stack top.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      },
      {
        "name": "Method 2: Previous/Next Smaller Element Arrays",
        "description": "Precompute left and right boundaries using stack in two passes, then compute max(heights[i] * (right[i] - left[i] - 1)).",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      }
    ],
    "algorithmSteps": [
      "1. Append 0 to the heights array (or use a sentinel -1 in stack) to ensure all remaining bars get flushed.",
      "2. Initialize an empty stack storing indices.",
      "3. Iterate through each index i from 0 to len(heights) - 1:",
      "   a. While stack is not empty and heights[i] < heights[stack[-1]]:",
      "      i. h = heights[stack.pop()].",
      "      ii. w = i if not stack else (i - stack[-1] - 1).",
      "      iii. max_area = max(max_area, h * w).",
      "   b. Push index i onto stack.",
      "4. Return max_area."
    ],
    "complexity": {
      "time": "O(N) because each bar index is pushed and popped from stack at most once.",
      "space": "O(N) for the monotonic stack."
    },
    "edgeCases": [
      "All identical heights: [2, 2, 2, 2] -> 8.",
      "Strictly ascending heights: [1, 2, 3, 4, 5] -> 9 (height 3 * width 3).",
      "Strictly descending heights: [5, 4, 3, 2, 1] -> 9."
    ],
    "interviewTips": [
      "Explain the sentinel technique (appending height 0 at the end) to automatically pop remaining elements in one pass.",
      "Monotonic stack is also the core building block for 'Maximal Rectangle' in 2D binary matrices (LeetCode 85)."
    ],
    "code": {
      "python": `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        stack = []
        max_area = 0
        extended = heights + [0]
        
        for i, h in enumerate(extended):
            while stack and extended[stack[-1]] > h:
                height = extended[stack.pop()]
                width = i if not stack else (i - stack[-1] - 1)
                max_area = max(max_area, height * width)
            stack.append(i)
            
        return max_area
        
    largest_rectangle_area = largestRectangleArea`
    }
  },
  "51": {
    "intuition": "A valid palindrome reads identically forward and backward when ignoring non-alphanumeric characters and case. By placing two pointers at the start and end of the string and skipping non-alphanumeric characters, we can verify palindromicity in O(N) time and O(1) extra space.",
    "approaches": [
      {
        "name": "Method 1: Two Pointers In-Place (Optimal)",
        "description": "Left pointer starts at 0, right at len(s)-1. Skip non-alphanumeric characters and compare lowercased characters.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: Filter and Reverse",
        "description": "Filter alphanumeric characters into a list and compare with its reverse.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      }
    ],
    "algorithmSteps": [
      "1. Initialize left = 0, right = len(s) - 1.",
      "2. While left < right:",
      "   a. While left < right and not s[left].isalnum(): left += 1.",
      "   b. While left < right and not s[right].isalnum(): right -= 1.",
      "   c. If s[left].lower() != s[right].lower(): return False.",
      "   d. left += 1, right -= 1.",
      "3. Return True if all matching checks pass."
    ],
    "complexity": {
      "time": "O(N) where N is the length of string s.",
      "space": "O(1) auxiliary space."
    },
    "edgeCases": [
      "Empty or whitespace only string: ' ' -> True.",
      "String with only punctuation: '.,' -> True.",
      "Mixed case with numbers: '0P' -> False, 'A man, a plan...' -> True."
    ],
    "interviewTips": [
      "Mention `isalnum()` and `lower()` character methods.",
      "Highlight the O(1) auxiliary space advantage of two pointers over creating a filtered auxiliary string."
    ],
    "code": {
      "python": `class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        
        while l < r:
            while l < r and not s[l].isalnum():
                l += 1
            while l < r and not s[r].isalnum():
                r -= 1
                
            if s[l].lower() != s[r].lower():
                return False
                
            l += 1
            r -= 1
            
        return True
        
    is_palindrome = isPalindrome`
    }
  },
  "52": {
    "intuition": "Because the array is already sorted, the sum of elements at the extremes (numbers[left] + numbers[right]) guides our search. If the sum is smaller than target, increment left pointer to increase the sum. If larger, decrement right pointer to decrease the sum.",
    "approaches": [
      {
        "name": "Method 1: Two Pointers (Optimal)",
        "description": "Start at opposite ends of sorted array and converge inwards in O(N) time and O(1) space.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: Binary Search",
        "description": "For each element numbers[i], binary search for (target - numbers[i]) in the remaining subarray.",
        "timeComplexity": "O(N log N)",
        "spaceComplexity": "O(1)"
      }
    ],
    "algorithmSteps": [
      "1. Initialize left = 0, right = len(numbers) - 1.",
      "2. While left < right:",
      "   a. current_sum = numbers[left] + numbers[right].",
      "   b. If current_sum == target: return [left + 1, right + 1] (1-indexed).",
      "   c. Else if current_sum < target: left += 1.",
      "   d. Else: right -= 1.",
      "3. Return empty list if no pair found."
    ],
    "complexity": {
      "time": "O(N) single pass through the array.",
      "space": "O(1) auxiliary space."
    },
    "edgeCases": [
      "Negative target: [-1, 0] with target = -1 -> [1, 2].",
      "Duplicate values: [0, 0, 3, 4] with target = 0 -> [1, 2].",
      "Two elements: [2, 3] with target = 5 -> [1, 2]."
    ],
    "interviewTips": [
      "Note the 1-based indexing requirement for indices in the output.",
      "Contrast this O(1) space two-pointer approach with the O(N) space hash map approach in standard Two Sum."
    ],
    "code": {
      "python": `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        l, r = 0, len(numbers) - 1
        
        while l < r:
            cur_sum = numbers[l] + numbers[r]
            if cur_sum == target:
                return [l + 1, r + 1]
            elif cur_sum < target:
                l += 1
            else:
                r -= 1
                
        return []
        
    two_sum = twoSum`
    }
  },
  "53": {
    "intuition": "Sort the array first. For each unique element nums[i], the problem reduces to finding two elements in nums[i+1..n-1] that sum to -nums[i]. We use two pointers and skip duplicates to ensure only unique triplets are generated.",
    "approaches": [
      {
        "name": "Method 1: Sort + Two Pointers (Optimal)",
        "description": "Sort the array in O(N log N). Fix the first element and search with two pointers in O(N). Total O(N^2).",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(1) auxiliary (or O(N) for sorting)"
      },
      {
        "name": "Method 2: Hash Set",
        "description": "Fix first element and use hash set for two sum. Deduplicate using a set of tuples.",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(N)"
      }
    ],
    "algorithmSteps": [
      "1. Sort the input array nums in non-decreasing order.",
      "2. Iterate i from 0 to len(nums) - 3:",
      "   a. If nums[i] > 0, break (remaining elements are positive, sum cannot be 0).",
      "   b. If i > 0 and nums[i] == nums[i-1], continue (skip duplicate first element).",
      "   c. Set left = i + 1, right = len(nums) - 1.",
      "   d. While left < right:",
      "      i. total = nums[i] + nums[left] + nums[right].",
      "      ii. If total == 0: record triplet, increment left, decrement right, and skip adjacent duplicate elements.",
      "      iii. Else if total < 0: left += 1.",
      "      iv. Else: right -= 1.",
      "3. Return list of unique triplets."
    ],
    "complexity": {
      "time": "O(N^2) where N is the length of nums.",
      "space": "O(1) auxiliary space beyond the output list and sort buffer."
    },
    "edgeCases": [
      "All zeros: [0, 0, 0, 0] -> [[0, 0, 0]].",
      "No valid triplets: [0, 1, 1] -> [].",
      "Array with multiple identical solutions: duplicates are safely skipped."
    ],
    "interviewTips": [
      "Pay special attention to skipping duplicates for BOTH the outer loop (i) and inner two pointers (left and right).",
      "Early exit when nums[i] > 0 provides a strong practical speedup."
    ],
    "code": {
      "python": `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res = []
        n = len(nums)
        
        for i in range(n - 2):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue
                
            l, r = i + 1, n - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s < 0:
                    l += 1
                elif s > 0:
                    r -= 1
                else:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1
                    r -= 1
                    
        return res
        
    three_sum = threeSum`
    }
  },
  "54": {
    "intuition": "The amount of water trapped between two lines at left and right is (right - left) * min(height[left], height[right]). Starting with the maximum possible width (left = 0, right = n - 1), the only way to potentially find a larger area with a smaller width is to move the pointer pointing to the shorter line inward.",
    "approaches": [
      {
        "name": "Method 1: Two Pointers (Optimal)",
        "description": "Start at boundaries and greedily shift the shorter line inward in O(N) time.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: Brute Force",
        "description": "Check every pair (i, j) and compute area. Takes O(N^2) time (exceeds time limit).",
        "timeComplexity": "O(N^2)",
        "spaceComplexity": "O(1)"
      }
    ],
    "algorithmSteps": [
      "1. Initialize left = 0, right = len(height) - 1, max_water = 0.",
      "2. While left < right:",
      "   a. width = right - left.",
      "   b. min_h = min(height[left], height[right]).",
      "   c. max_water = max(max_water, width * min_h).",
      "   d. If height[left] < height[right]: left += 1.",
      "   e. Else: right -= 1.",
      "3. Return max_water."
    ],
    "complexity": {
      "time": "O(N) single pass across the array.",
      "space": "O(1) auxiliary space."
    },
    "edgeCases": [
      "Two lines: [1, 1] -> 1.",
      "Strictly increasing heights: [1, 2, 4, 8] -> 4.",
      "Unequal height tall lines far apart: [1, 8, 6, 2, 5, 4, 8, 3, 7] -> 49."
    ],
    "interviewTips": [
      "Prove to the interviewer why moving the taller pointer can NEVER produce a larger area (width decreases, min height cannot increase).",
      "This two-pointer greedy invariant is a favorite interview conceptual proof."
    ],
    "code": {
      "python": `class Solution:
    def maxArea(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        max_water = 0
        
        while l < r:
            w = r - l
            h = min(height[l], height[r])
            area = w * h
            if area > max_water:
                max_water = area
                
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
                
        return max_water
        
    max_area = maxArea`
    }
  },
  "55": {
    "intuition": "4Sum generalizes 3Sum. We sort the array, fix the first two elements with nested loops (i and j), and use two pointers (left and right) to find the remaining two elements such that their sum equals target. We skip duplicates at all 4 pointer levels.",
    "approaches": [
      {
        "name": "Method 1: Sort + Nested Loops + Two Pointers (Optimal)",
        "description": "Fix first two elements and use two pointers for the inner pair in O(N^3) time.",
        "timeComplexity": "O(N^3)",
        "spaceComplexity": "O(1) auxiliary"
      },
      {
        "name": "Method 2: Generalized k-Sum Recursion",
        "description": "Recursive function reducing k-Sum to (k-1)-Sum down to 2-Sum two pointers.",
        "timeComplexity": "O(N^(k-1))",
        "spaceComplexity": "O(k)"
      }
    ],
    "algorithmSteps": [
      "1. Sort the input array nums.",
      "2. Iterate i from 0 to len(nums) - 4 (skip duplicate nums[i]).",
      "3. Iterate j from i + 1 to len(nums) - 3 (skip duplicate nums[j]).",
      "4. Initialize left = j + 1, right = len(nums) - 1.",
      "5. While left < right:",
      "   a. s = nums[i] + nums[j] + nums[left] + nums[right].",
      "   b. If s == target: append quadruplet, increment left, decrement right, skip duplicate nums[left] and nums[right].",
      "   c. Else if s < target: left += 1.",
      "   d. Else: right -= 1.",
      "6. Return list of unique quadruplets."
    ],
    "complexity": {
      "time": "O(N^3) where N is the length of nums.",
      "space": "O(1) auxiliary space (excluding return list)."
    },
    "edgeCases": [
      "Target large positive/negative integers: handle 64-bit integer sum.",
      "Array with identical elements: [2, 2, 2, 2, 2] with target 8 -> [[2, 2, 2, 2]].",
      "No valid quadruplets: returns []."
    ],
    "interviewTips": [
      "Implement pruning checks: if 4 * nums[i] > target or nums[i] + 3 * nums[-1] < target, break/continue early.",
      "Explain how the general k-Sum pattern scales."
    ],
    "code": {
      "python": `class Solution:
    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:
        nums.sort()
        n = len(nums)
        res = []
        
        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            if nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target:
                break
            if nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target:
                continue
                
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                if nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target:
                    break
                if nums[i] + nums[j] + nums[n - 2] + nums[n - 1] < target:
                    continue
                    
                l, r = j + 1, n - 1
                while l < r:
                    s = nums[i] + nums[j] + nums[l] + nums[r]
                    if s == target:
                        res.append([nums[i], nums[j], nums[l], nums[r]])
                        while l < r and nums[l] == nums[l + 1]:
                            l += 1
                        while l < r and nums[r] == nums[r - 1]:
                            r -= 1
                        l += 1
                        r -= 1
                    elif s < target:
                        l += 1
                    else:
                        r -= 1
                        
        return res
        
    four_sum = fourSum`
    }
  },
  "56": {
    "intuition": "Because nums1 has extra space at the end (total size m + n), merging from the back (largest to smallest) avoids overwriting unmerged elements in nums1. We place three pointers: p1 at m - 1, p2 at n - 1, and p at m + n - 1.",
    "approaches": [
      {
        "name": "Method 1: Three Pointers Back-to-Front (Optimal)",
        "description": "Fill nums1 starting from index m + n - 1 by taking the maximum of nums1[p1] and nums2[p2].",
        "timeComplexity": "O(M + N)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: Copy and Sort",
        "description": "Copy nums2 into nums1[m..m+n-1] and sort nums1. Takes O((M+N) log(M+N)) time.",
        "timeComplexity": "O((M + N) log(M + N))",
        "spaceComplexity": "O(1)"
      }
    ],
    "algorithmSteps": [
      "1. Initialize p1 = m - 1, p2 = n - 1, p = m + n - 1.",
      "2. While p2 >= 0:",
      "   a. If p1 >= 0 and nums1[p1] > nums2[p2]:",
      "      nums1[p] = nums1[p1], p1 -= 1.",
      "   b. Else:",
      "      nums1[p] = nums2[p2], p2 -= 1.",
      "   c. p -= 1.",
      "3. If p2 < 0, remaining elements in nums1 are already in correct sorted positions."
    ],
    "complexity": {
      "time": "O(M + N) single linear traversal.",
      "space": "O(1) in-place modification."
    },
    "edgeCases": [
      "nums2 is empty (n = 0): no action needed.",
      "nums1 is empty (m = 0): copy all elements from nums2.",
      "All elements in nums2 smaller than nums1."
    ],
    "interviewTips": [
      "Explain why filling backwards eliminates the need for auxiliary array memory.",
      "Note that once p2 < 0, the merge is complete because nums1's remaining prefix is already sorted."
    ],
    "code": {
      "python": `class Solution:
    def merge(self, nums1: list[int], m: int, nums2: list[int], n: int) -> list[int]:
        p1 = m - 1
        p2 = n - 1
        p = m + n - 1
        
        while p2 >= 0:
            if p1 >= 0 and nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1
            
        return nums1`
    }
  },
  "57": {
    "intuition": "In a sorted array with negative numbers, the largest squares are at the two outer extremes (most negative on the left, largest positive on the right). By using two pointers at the ends and filling the result array from back to front, we achieve linear time without an extra sort step.",
    "approaches": [
      {
        "name": "Method 1: Two Pointers from Ends (Optimal)",
        "description": "Compare squared values at left and right pointers, insert the larger square at the end of the result array.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      },
      {
        "name": "Method 2: Square and Sort",
        "description": "Square every element and sort the result array in O(N log N).",
        "timeComplexity": "O(N log N)",
        "spaceComplexity": "O(1) auxiliary"
      }
    ],
    "algorithmSteps": [
      "1. Initialize res array of size n.",
      "2. Set left = 0, right = n - 1, pos = n - 1.",
      "3. While left <= right:",
      "   a. left_sq = nums[left] ** 2, right_sq = nums[right] ** 2.",
      "   b. If left_sq > right_sq: res[pos] = left_sq, left += 1.",
      "   c. Else: res[pos] = right_sq, right -= 1.",
      "   d. pos -= 1.",
      "4. Return res."
    ],
    "complexity": {
      "time": "O(N) single pass.",
      "space": "O(N) for output array, O(1) auxiliary."
    },
    "edgeCases": [
      "All negative numbers: [-4, -3, -2, -1] -> [1, 4, 9, 16].",
      "All positive numbers: [1, 2, 3, 4] -> [1, 4, 9, 16].",
      "Array with zeros: [-2, 0, 2] -> [0, 4, 4]."
    ],
    "interviewTips": [
      "Clearly explain why the two pointer approach beats the naive O(N log N) square-then-sort approach.",
      "Demonstrate filling from the back (pos = n - 1)."
    ],
    "code": {
      "python": `class Solution:
    def sortedSquares(self, nums: list[int]) -> list[int]:
        n = len(nums)
        res = [0] * n
        l, r = 0, n - 1
        pos = n - 1
        
        while l <= r:
            left_sq = nums[l] * nums[l]
            right_sq = nums[r] * nums[r]
            
            if left_sq > right_sq:
                res[pos] = left_sq
                l += 1
            else:
                res[pos] = right_sq
                r -= 1
            pos -= 1
            
        return res
        
    sorted_squares = sortedSquares`
    }
  },
  "58": {
    "intuition": "To allow at most k duplicates in a sorted array (here k = 2), an incoming element nums[i] is valid to write at write pointer index w if and only if it is different from the element at index w - 2 (nums[i] != nums[w - 2]).",
    "approaches": [
      {
        "name": "Method 1: Two Pointers Read/Write (Optimal)",
        "description": "Maintain write pointer w = 2. For each element from index 2 onward, copy nums[i] to nums[w] if nums[i] != nums[w - 2].",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      }
    ],
    "algorithmSteps": [
      "1. If len(nums) <= 2, return len(nums).",
      "2. Initialize write pointer k = 2.",
      "3. Iterate read pointer i from 2 to len(nums) - 1:",
      "   a. If nums[i] != nums[k - 2]:",
      "      nums[k] = nums[i], k += 1.",
      "4. Return k."
    ],
    "complexity": {
      "time": "O(N) single pass through the array.",
      "space": "O(1) in-place modification."
    },
    "edgeCases": [
      "Array length <= 2: [1, 1] -> 2.",
      "All elements identical: [1, 1, 1, 1, 1] -> 2 (nums prefix [1, 1]).",
      "No duplicates: [1, 2, 3] -> 3."
    ],
    "interviewTips": [
      "Mention that this pattern generalizes to 'at most K duplicates' by comparing nums[i] != nums[w - K].",
      "Highlight the clean O(1) in-place overwrite logic."
    ],
    "code": {
      "python": `class Solution:
    def removeDuplicates(self, nums: list[int]) -> int:
        if len(nums) <= 2:
            return len(nums)
            
        k = 2
        for i in range(2, len(nums)):
            if nums[i] != nums[k - 2]:
                nums[k] = nums[i]
                k += 1
                
        return k
        
    remove_duplicates = removeDuplicates`
    }
  },
  "59": {
    "intuition": "The water trapped above bar i is determined by min(max_left, max_right) - height[i]. By placing two pointers at left and right and maintaining running left_max and right_max, we always process the side with the smaller maximum, because the bottleneck on that side is definitively determined.",
    "approaches": [
      {
        "name": "Method 1: Two Pointers (Optimal)",
        "description": "Maintain left_max and right_max while converging two pointers. O(N) time and O(1) space.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: Prefix and Suffix Max Arrays",
        "description": "Precompute left_max[i] and right_max[i] in two passes, then compute trapped water.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      },
      {
        "name": "Method 3: Monotonic Stack",
        "description": "Stack of decreasing bar indices. When a taller bar is met, pop bottom of valley and compute horizontal trapped layer.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(N)"
      }
    ],
    "algorithmSteps": [
      "1. If height array is empty, return 0.",
      "2. Initialize left = 0, right = len(height) - 1.",
      "3. Initialize left_max = height[left], right_max = height[right], trapped = 0.",
      "4. While left < right:",
      "   a. If left_max < right_max:",
      "      i. left += 1.",
      "      ii. left_max = max(left_max, height[left]).",
      "      iii. trapped += max(0, left_max - height[left]).",
      "   b. Else:",
      "      i. right -= 1.",
      "      ii. right_max = max(right_max, height[right]).",
      "      iii. trapped += max(0, right_max - height[right]).",
      "5. Return trapped."
    ],
    "complexity": {
      "time": "O(N) single pass.",
      "space": "O(1) auxiliary space."
    },
    "edgeCases": [
      "Strictly decreasing or increasing elevations: [5, 4, 3, 2, 1] -> 0.",
      "V-shape canyon: [3, 0, 0, 3] -> 6.",
      "Flat ground: [0, 0, 0] -> 0."
    ],
    "interviewTips": [
      "Explain the key bottleneck property: if left_max < right_max, the amount of water trapped at the left pointer depends ONLY on left_max, regardless of what happens further right.",
      "Two pointers is preferred over DP array because of O(1) space."
    ],
    "code": {
      "python": `class Solution:
    def trap(self, height: list[int]) -> int:
        if not height:
            return 0
            
        l, r = 0, len(height) - 1
        left_max, right_max = height[l], height[r]
        trapped = 0
        
        while l < r:
            if left_max < right_max:
                l += 1
                left_max = max(left_max, height[l])
                trapped += left_max - height[l]
            else:
                r -= 1
                right_max = max(right_max, height[r])
                trapped += right_max - height[r]
                
        return trapped`
    }
  },
  "60": {
    "intuition": "This is Dijkstra's 3-way partitioning (Dutch National Flag problem). We maintain three pointers: low (boundary for 0s), mid (current element being inspected), and high (boundary for 2s). When nums[mid] is 0, swap with nums[low] and advance low and mid. When 1, advance mid. When 2, swap with nums[high] and decrement high (without advancing mid, since the swapped element needs inspection).",
    "approaches": [
      {
        "name": "Method 1: Dutch National Flag Algorithm (Optimal One-Pass)",
        "description": "Three pointers partition array into [0..low-1] for 0s, [low..mid-1] for 1s, and [high+1..n-1] for 2s.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      },
      {
        "name": "Method 2: Counting Sort (Two-Pass)",
        "description": "Count frequencies of 0, 1, and 2, then overwrite nums array.",
        "timeComplexity": "O(N)",
        "spaceComplexity": "O(1)"
      }
    ],
    "algorithmSteps": [
      "1. Initialize low = 0, mid = 0, high = len(nums) - 1.",
      "2. While mid <= high:",
      "   a. If nums[mid] == 0: swap nums[low] and nums[mid], low += 1, mid += 1.",
      "   b. Else if nums[mid] == 1: mid += 1.",
      "   c. Else (nums[mid] == 2): swap nums[mid] and nums[high], high -= 1.",
      "3. Return nums."
    ],
    "complexity": {
      "time": "O(N) strictly one-pass.",
      "space": "O(1) in-place memory."
    },
    "edgeCases": [
      "Array with single element: [0] -> [0].",
      "Array with already sorted colors: [0, 0, 1, 1, 2, 2] -> [0, 0, 1, 1, 2, 2].",
      "Array with reverse sorted colors: [2, 2, 1, 1, 0, 0] -> [0, 0, 1, 1, 2, 2]."
    ],
    "interviewTips": [
      "Crucial interview point: why mid is NOT incremented when swapping with high (because nums[high] has not been inspected yet).",
      "Explain the 4 partition regions: [0..low-1] is 0, [low..mid-1] is 1, [mid..high] is unknown, [high+1..n-1] is 2."
    ],
    "code": {
      "python": `class Solution:
    def sortColors(self, nums: list[int]) -> list[int]:
        low = 0
        mid = 0
        high = len(nums) - 1
        
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
                
        return nums
        
    sort_colors = sortColors`
    }
  }
};

// Update data files
async function run() {
  console.log('Injecting Q41 to Q60 into data files...');

  // 1. problemDescriptionsData.js
  const pDescPath = path.resolve('src/data/problemDescriptionsData.js');
  const pDescModule = await import('../src/data/problemDescriptionsData.js');
  const existingDesc = pDescModule.DETAILED_PROBLEM_DESCRIPTIONS;
  const combinedDesc = { ...existingDesc, ...problemDescriptions };
  fs.writeFileSync(pDescPath, `// Detailed Problem Descriptions (LeetCode / CodeChef Standard)\nexport const DETAILED_PROBLEM_DESCRIPTIONS = ${JSON.stringify(combinedDesc, null, 2)};\n`, 'utf-8');
  console.log('Updated problemDescriptionsData.js');

  // 2. testCasesData.js
  const tCasesPath = path.resolve('src/data/testCasesData.js');
  const tCasesModule = await import('../src/data/testCasesData.js');
  const existingTests = tCasesModule.PROBLEM_TEST_CASES;
  const combinedTests = { ...existingTests, ...problemTestCases };
  fs.writeFileSync(tCasesPath, `// Realistic Test Cases for Competitive Execution (STDIN / STDOUT & Python Method Evaluation)\nexport const PROBLEM_TEST_CASES = ${JSON.stringify(combinedTests, null, 2)};\n`, 'utf-8');
  console.log('Updated testCasesData.js');

  // 3. solutionsData.js
  const solPath = path.resolve('src/data/solutionsData.js');
  const solModule = await import('../src/data/solutionsData.js');
  const existingSol = solModule.DETAILED_SOLUTIONS;
  const combinedSol = { ...existingSol, ...problemSolutions };
  fs.writeFileSync(solPath, `// Curated Detailed Solutions & Editorials for Problems 1 to 60\nexport const DETAILED_SOLUTIONS = ${JSON.stringify(combinedSol, null, 2)};\n`, 'utf-8');
  console.log('Updated solutionsData.js');

  console.log('All files updated successfully with Q41 to Q60 data!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
