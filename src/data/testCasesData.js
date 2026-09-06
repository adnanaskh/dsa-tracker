// LeetCode & GeeksforGeeks Test Cases & Starter Templates for all 305 DSA Problems
export const PROBLEM_TEST_CASES = {
  "1": {
    "methodName": "containsDuplicate",
    "starterCode": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3,
            1
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": false
      },
      {
        "input": [
          [
            1,
            1,
            1,
            3,
            3,
            4,
            3,
            2,
            4,
            2
          ]
        ],
        "expected": true
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            99
          ]
        ],
        "expected": false
      },
      {
        "input": [
          [
            0,
            0
          ]
        ],
        "expected": true
      }
    ]
  },
  "2": {
    "methodName": "isAnagram",
    "starterCode": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          "anagram",
          "nagaram"
        ],
        "expected": true
      },
      {
        "input": [
          "rat",
          "car"
        ],
        "expected": false
      }
    ],
    "hiddenCases": [
      {
        "input": [
          "a",
          "a"
        ],
        "expected": true
      },
      {
        "input": [
          "ab",
          "a"
        ],
        "expected": false
      }
    ]
  },
  "3": {
    "methodName": "twoSum",
    "starterCode": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            2,
            7,
            11,
            15
          ],
          9
        ],
        "expected": [
          0,
          1
        ]
      },
      {
        "input": [
          [
            3,
            2,
            4
          ],
          6
        ],
        "expected": [
          1,
          2
        ]
      },
      {
        "input": [
          [
            3,
            3
          ],
          6
        ],
        "expected": [
          0,
          1
        ]
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            -1,
            -2,
            -3,
            -4,
            -5
          ],
          -8
        ],
        "expected": [
          2,
          4
        ]
      }
    ]
  },
  "4": {
    "methodName": "maxProfit",
    "starterCode": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            7,
            1,
            5,
            3,
            6,
            4
          ]
        ],
        "expected": 5
      },
      {
        "input": [
          [
            7,
            6,
            4,
            3,
            1
          ]
        ],
        "expected": 0
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            1,
            2
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            2,
            4,
            1
          ]
        ],
        "expected": 2
      }
    ]
  },
  "5": {
    "methodName": "singleNumber",
    "starterCode": "class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            2,
            2,
            1
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            1,
            2,
            1,
            2
          ]
        ],
        "expected": 4
      },
      {
        "input": [
          [
            1
          ]
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            -1,
            -1,
            -2
          ]
        ],
        "expected": -2
      }
    ]
  },
  "6": {
    "methodName": "groupAnagrams",
    "starterCode": "class Solution:\n    def groupAnagrams(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "7": {
    "methodName": "topKFrequentElements",
    "starterCode": "class Solution:\n    def topKFrequentElements(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "8": {
    "methodName": "productOfArrayExceptSelf",
    "starterCode": "class Solution:\n    def productOfArrayExceptSelf(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "9": {
    "methodName": "validSudoku",
    "starterCode": "class Solution:\n    def validSudoku(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "10": {
    "methodName": "encodeAndDecodeStrings",
    "starterCode": "class Solution:\n    def encodeAndDecodeStrings(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "11": {
    "methodName": "longestConsecutiveSequence",
    "starterCode": "class Solution:\n    def longestConsecutiveSequence(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "12": {
    "methodName": "sortColors",
    "starterCode": "class Solution:\n    def sortColors(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "13": {
    "methodName": "subarraySumEqualsK",
    "starterCode": "class Solution:\n    def subarraySumEqualsK(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "14": {
    "methodName": "findAllAnagramsInAString",
    "starterCode": "class Solution:\n    def findAllAnagramsInAString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "15": {
    "methodName": "maximumSubarray",
    "starterCode": "class Solution:\n    def maximumSubarray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "16": {
    "methodName": "majorityElement",
    "starterCode": "class Solution:\n    def majorityElement(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "17": {
    "methodName": "moveZeroes",
    "starterCode": "class Solution:\n    def moveZeroes(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "18": {
    "methodName": "rotateArray",
    "starterCode": "class Solution:\n    def rotateArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "19": {
    "methodName": "findTheDuplicateNumber",
    "starterCode": "class Solution:\n    def findTheDuplicateNumber(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "20": {
    "methodName": "setMatrixZeroes",
    "starterCode": "class Solution:\n    def setMatrixZeroes(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "21": {
    "methodName": "spiralMatrix",
    "starterCode": "class Solution:\n    def spiralMatrix(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "22": {
    "methodName": "trappingRainWater",
    "starterCode": "class Solution:\n    def trappingRainWater(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "23": {
    "methodName": "largestRectangleInHistogram",
    "starterCode": "class Solution:\n    def largestRectangleInHistogram(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "24": {
    "methodName": "firstMissingPositive",
    "starterCode": "class Solution:\n    def firstMissingPositive(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "25": {
    "methodName": "jumpGame",
    "starterCode": "class Solution:\n    def jumpGame(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "26": {
    "methodName": "isPalindrome",
    "starterCode": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          "A man, a plan, a canal: Panama"
        ],
        "expected": true
      },
      {
        "input": [
          "race a car"
        ],
        "expected": false
      },
      {
        "input": [
          " "
        ],
        "expected": true
      }
    ],
    "hiddenCases": [
      {
        "input": [
          "0P"
        ],
        "expected": false
      },
      {
        "input": [
          "a."
        ],
        "expected": true
      }
    ]
  },
  "27": {
    "methodName": "reverseString",
    "starterCode": "class Solution:\n    def reverseString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "28": {
    "methodName": "validAnagram",
    "starterCode": "class Solution:\n    def validAnagram(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "29": {
    "methodName": "firstUniqueCharacterInAString",
    "starterCode": "class Solution:\n    def firstUniqueCharacterInAString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "30": {
    "methodName": "longestCommonPrefix",
    "starterCode": "class Solution:\n    def longestCommonPrefix(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "31": {
    "methodName": "longestSubstringWithoutRepeatingChars",
    "starterCode": "class Solution:\n    def longestSubstringWithoutRepeatingChars(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "32": {
    "methodName": "longestRepeatingCharacterReplacement",
    "starterCode": "class Solution:\n    def longestRepeatingCharacterReplacement(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "33": {
    "methodName": "permutationInString",
    "starterCode": "class Solution:\n    def permutationInString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "34": {
    "methodName": "minimumWindowSubstring",
    "starterCode": "class Solution:\n    def minimumWindowSubstring(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "35": {
    "methodName": "slidingWindowMaximum",
    "starterCode": "class Solution:\n    def slidingWindowMaximum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "36": {
    "methodName": "groupAnagrams",
    "starterCode": "class Solution:\n    def groupAnagrams(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "37": {
    "methodName": "encodeAndDecodeStrings",
    "starterCode": "class Solution:\n    def encodeAndDecodeStrings(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "38": {
    "methodName": "stringToIntegerAtoi",
    "starterCode": "class Solution:\n    def stringToIntegerAtoi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "39": {
    "methodName": "decodeString",
    "starterCode": "class Solution:\n    def decodeString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "40": {
    "methodName": "regularExpressionMatching",
    "starterCode": "class Solution:\n    def regularExpressionMatching(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "41": {
    "methodName": "longestPalindromicSubstring",
    "starterCode": "class Solution:\n    def longestPalindromicSubstring(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "42": {
    "methodName": "palindromicSubstrings",
    "starterCode": "class Solution:\n    def palindromicSubstrings(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "43": {
    "methodName": "longestCommonSubsequence",
    "starterCode": "class Solution:\n    def longestCommonSubsequence(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "44": {
    "methodName": "editDistance",
    "starterCode": "class Solution:\n    def editDistance(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "45": {
    "methodName": "wildcardMatching",
    "starterCode": "class Solution:\n    def wildcardMatching(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "46": {
    "methodName": "wordBreak",
    "starterCode": "class Solution:\n    def wordBreak(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "47": {
    "methodName": "findAllAnagramsInAString",
    "starterCode": "class Solution:\n    def findAllAnagramsInAString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "48": {
    "methodName": "minimumWindowSubstring",
    "starterCode": "class Solution:\n    def minimumWindowSubstring(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "49": {
    "methodName": "serializeAndDeserializeBinaryTree",
    "starterCode": "class Solution:\n    def serializeAndDeserializeBinaryTree(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "50": {
    "methodName": "largestRectangleInHistogram",
    "starterCode": "class Solution:\n    def largestRectangleInHistogram(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "51": {
    "methodName": "validPalindrome",
    "starterCode": "class Solution:\n    def validPalindrome(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "52": {
    "methodName": "twoSumIi",
    "starterCode": "class Solution:\n    def twoSumIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "53": {
    "methodName": "3sum",
    "starterCode": "class Solution:\n    def 3sum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "54": {
    "methodName": "containerWithMostWater",
    "starterCode": "class Solution:\n    def containerWithMostWater(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "55": {
    "methodName": "4sum",
    "starterCode": "class Solution:\n    def 4sum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "56": {
    "methodName": "mergeSortedArray",
    "starterCode": "class Solution:\n    def mergeSortedArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "57": {
    "methodName": "squaresOfASortedArray",
    "starterCode": "class Solution:\n    def squaresOfASortedArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "58": {
    "methodName": "removeDuplicatesFromSortedArrayIi",
    "starterCode": "class Solution:\n    def removeDuplicatesFromSortedArrayIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "59": {
    "methodName": "trappingRainWater",
    "starterCode": "class Solution:\n    def trappingRainWater(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "60": {
    "methodName": "sortColors",
    "starterCode": "class Solution:\n    def sortColors(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "61": {
    "methodName": "intersectionOfTwoArraysIi",
    "starterCode": "class Solution:\n    def intersectionOfTwoArraysIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "62": {
    "methodName": "boatsToSavePeople",
    "starterCode": "class Solution:\n    def boatsToSavePeople(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "63": {
    "methodName": "minimumSizeSubarraySum",
    "starterCode": "class Solution:\n    def minimumSizeSubarraySum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "64": {
    "methodName": "3sumClosest",
    "starterCode": "class Solution:\n    def 3sumClosest(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "65": {
    "methodName": "subarrayProductLessThanK",
    "starterCode": "class Solution:\n    def subarrayProductLessThanK(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "66": {
    "methodName": "trap",
    "starterCode": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            0,
            1,
            0,
            2,
            1,
            0,
            1,
            3,
            2,
            1,
            2,
            1
          ]
        ],
        "expected": 6
      },
      {
        "input": [
          [
            4,
            2,
            0,
            3,
            2,
            5
          ]
        ],
        "expected": 9
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            2,
            0,
            2
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          [
            3,
            3,
            3
          ]
        ],
        "expected": 0
      }
    ]
  },
  "67": {
    "methodName": "longestSubstringWithoutRepeatingCharacters",
    "starterCode": "class Solution:\n    def longestSubstringWithoutRepeatingCharacters(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "68": {
    "methodName": "longestRepeatingCharacterReplacement",
    "starterCode": "class Solution:\n    def longestRepeatingCharacterReplacement(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "69": {
    "methodName": "permutationInString",
    "starterCode": "class Solution:\n    def permutationInString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "70": {
    "methodName": "minimumWindowSubstring",
    "starterCode": "class Solution:\n    def minimumWindowSubstring(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "71": {
    "methodName": "slidingWindowMaximum",
    "starterCode": "class Solution:\n    def slidingWindowMaximum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "72": {
    "methodName": "maximumAverageSubarrayI",
    "starterCode": "class Solution:\n    def maximumAverageSubarrayI(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "73": {
    "methodName": "fruitIntoBaskets",
    "starterCode": "class Solution:\n    def fruitIntoBaskets(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "74": {
    "methodName": "longestSubarrayOf1sAfterDeletingOneElement",
    "starterCode": "class Solution:\n    def longestSubarrayOf1sAfterDeletingOneElement(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "75": {
    "methodName": "subarraysWithKDifferentIntegers",
    "starterCode": "class Solution:\n    def subarraysWithKDifferentIntegers(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "76": {
    "methodName": "maxConsecutiveOnesIii",
    "starterCode": "class Solution:\n    def maxConsecutiveOnesIii(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "77": {
    "methodName": "countNumberOfNiceSubarrays",
    "starterCode": "class Solution:\n    def countNumberOfNiceSubarrays(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "78": {
    "methodName": "binarySubarraysWithSum",
    "starterCode": "class Solution:\n    def binarySubarraysWithSum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "79": {
    "methodName": "numberOfSubstringsContainingAllThreeCharacters",
    "starterCode": "class Solution:\n    def numberOfSubstringsContainingAllThreeCharacters(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "80": {
    "methodName": "minimumNumberOfKConsecutiveBitFlips",
    "starterCode": "class Solution:\n    def minimumNumberOfKConsecutiveBitFlips(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "81": {
    "methodName": "validParentheses",
    "starterCode": "class Solution:\n    def validParentheses(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "82": {
    "methodName": "minStack",
    "starterCode": "class Solution:\n    def minStack(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "83": {
    "methodName": "evaluateReversePolishNotation",
    "starterCode": "class Solution:\n    def evaluateReversePolishNotation(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "84": {
    "methodName": "generateParentheses",
    "starterCode": "class Solution:\n    def generateParentheses(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "85": {
    "methodName": "dailyTemperatures",
    "starterCode": "class Solution:\n    def dailyTemperatures(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "86": {
    "methodName": "carFleet",
    "starterCode": "class Solution:\n    def carFleet(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "87": {
    "methodName": "largestRectangleInHistogram",
    "starterCode": "class Solution:\n    def largestRectangleInHistogram(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "88": {
    "methodName": "decodeString",
    "starterCode": "class Solution:\n    def decodeString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "89": {
    "methodName": "asteroidCollision",
    "starterCode": "class Solution:\n    def asteroidCollision(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "90": {
    "methodName": "longestValidParentheses",
    "starterCode": "class Solution:\n    def longestValidParentheses(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "91": {
    "methodName": "removeAllAdjacentDuplicatesInString",
    "starterCode": "class Solution:\n    def removeAllAdjacentDuplicatesInString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "92": {
    "methodName": "basicCalculatorIi",
    "starterCode": "class Solution:\n    def basicCalculatorIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "93": {
    "methodName": "nextGreaterElementI",
    "starterCode": "class Solution:\n    def nextGreaterElementI(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "94": {
    "methodName": "onlineStockSpan",
    "starterCode": "class Solution:\n    def onlineStockSpan(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "95": {
    "methodName": "removeKDigits",
    "starterCode": "class Solution:\n    def removeKDigits(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "96": {
    "methodName": "binarySearch",
    "starterCode": "class Solution:\n    def binarySearch(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "97": {
    "methodName": "searchInsertPosition",
    "starterCode": "class Solution:\n    def searchInsertPosition(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "98": {
    "methodName": "searchA2dMatrix",
    "starterCode": "class Solution:\n    def searchA2dMatrix(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "99": {
    "methodName": "kokoEatingBananas",
    "starterCode": "class Solution:\n    def kokoEatingBananas(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "100": {
    "methodName": "findMinimumInRotatedSortedArray",
    "starterCode": "class Solution:\n    def findMinimumInRotatedSortedArray(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "101": {
    "methodName": "searchInRotatedSortedArray",
    "starterCode": "class Solution:\n    def searchInRotatedSortedArray(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "102": {
    "methodName": "findMinimumInRotatedSortedArrayIi",
    "starterCode": "class Solution:\n    def findMinimumInRotatedSortedArrayIi(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "103": {
    "methodName": "timeBasedKeyvalueStore",
    "starterCode": "class Solution:\n    def timeBasedKeyvalueStore(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "104": {
    "methodName": "medianOfTwoSortedArrays",
    "starterCode": "class Solution:\n    def medianOfTwoSortedArrays(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "105": {
    "methodName": "capacityToShipPackagesWithinDDays",
    "starterCode": "class Solution:\n    def capacityToShipPackagesWithinDDays(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "106": {
    "methodName": "findPeakElement",
    "starterCode": "class Solution:\n    def findPeakElement(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "107": {
    "methodName": "splitArrayLargestSum",
    "starterCode": "class Solution:\n    def splitArrayLargestSum(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "108": {
    "methodName": "firstBadVersion",
    "starterCode": "class Solution:\n    def firstBadVersion(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "109": {
    "methodName": "countOfRangeSum",
    "starterCode": "class Solution:\n    def countOfRangeSum(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "110": {
    "methodName": "peakIndexInAMountainArray",
    "starterCode": "class Solution:\n    def peakIndexInAMountainArray(self, nums: list[int], target: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          9
        ],
        "expected": 4
      },
      {
        "input": [
          [
            -1,
            0,
            3,
            5,
            9,
            12
          ],
          2
        ],
        "expected": -1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            5
          ],
          5
        ],
        "expected": 0
      }
    ]
  },
  "111": {
    "methodName": "reverseLinkedList",
    "starterCode": "class Solution:\n    def reverseLinkedList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "112": {
    "methodName": "mergeTwoSortedLists",
    "starterCode": "class Solution:\n    def mergeTwoSortedLists(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "113": {
    "methodName": "linkedListCycle",
    "starterCode": "class Solution:\n    def linkedListCycle(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "114": {
    "methodName": "middleOfTheLinkedList",
    "starterCode": "class Solution:\n    def middleOfTheLinkedList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "115": {
    "methodName": "reorderList",
    "starterCode": "class Solution:\n    def reorderList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "116": {
    "methodName": "removeNthNodeFromEndOfList",
    "starterCode": "class Solution:\n    def removeNthNodeFromEndOfList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "117": {
    "methodName": "copyListWithRandomPointer",
    "starterCode": "class Solution:\n    def copyListWithRandomPointer(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "118": {
    "methodName": "addTwoNumbers",
    "starterCode": "class Solution:\n    def addTwoNumbers(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "119": {
    "methodName": "findTheDuplicateNumber",
    "starterCode": "class Solution:\n    def findTheDuplicateNumber(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "120": {
    "methodName": "lruCache",
    "starterCode": "class Solution:\n    def lruCache(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "121": {
    "methodName": "mergeKSortedLists",
    "starterCode": "class Solution:\n    def mergeKSortedLists(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "122": {
    "methodName": "reverseNodesInKgroup",
    "starterCode": "class Solution:\n    def reverseNodesInKgroup(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "123": {
    "methodName": "swapNodesInPairs",
    "starterCode": "class Solution:\n    def swapNodesInPairs(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "124": {
    "methodName": "oddEvenLinkedList",
    "starterCode": "class Solution:\n    def oddEvenLinkedList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "125": {
    "methodName": "palindromeLinkedList",
    "starterCode": "class Solution:\n    def palindromeLinkedList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "126": {
    "methodName": "sortList",
    "starterCode": "class Solution:\n    def sortList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "127": {
    "methodName": "linkedListCycleIi",
    "starterCode": "class Solution:\n    def linkedListCycleIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "128": {
    "methodName": "rotateList",
    "starterCode": "class Solution:\n    def rotateList(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "129": {
    "methodName": "reverseLinkedListIi",
    "starterCode": "class Solution:\n    def reverseLinkedListIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "130": {
    "methodName": "lfuCache",
    "starterCode": "class Solution:\n    def lfuCache(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "131": {
    "methodName": "invertBinaryTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def invertBinaryTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": 0
      }
    ],
    "hiddenCases": []
  },
  "132": {
    "methodName": "maximumDepthOfBinaryTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def maximumDepthOfBinaryTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": 0
      }
    ],
    "hiddenCases": []
  },
  "133": {
    "methodName": "diameterOfBinaryTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def diameterOfBinaryTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": 0
      }
    ],
    "hiddenCases": []
  },
  "134": {
    "methodName": "balancedBinaryTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def balancedBinaryTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": 0
      }
    ],
    "hiddenCases": []
  },
  "135": {
    "methodName": "sameTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def sameTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": 0
      }
    ],
    "hiddenCases": []
  },
  "136": {
    "methodName": "subtreeOfAnotherTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def subtreeOfAnotherTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": 0
      }
    ],
    "hiddenCases": []
  },
  "137": {
    "methodName": "lowestCommonAncestorOfBst",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def lowestCommonAncestorOfBst(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": 0
      }
    ],
    "hiddenCases": []
  },
  "138": {
    "methodName": "binaryTreeLevelOrderTraversal",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def binaryTreeLevelOrderTraversal(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "139": {
    "methodName": "binaryTreeRightSideView",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def binaryTreeRightSideView(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "140": {
    "methodName": "countGoodNodesInBinaryTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def countGoodNodesInBinaryTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "141": {
    "methodName": "validateBinarySearchTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def validateBinarySearchTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "142": {
    "methodName": "kthSmallestElementInABst",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def kthSmallestElementInABst(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "143": {
    "methodName": "constructBinaryTreeFromPreorderAndInorder",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def constructBinaryTreeFromPreorderAndInorder(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "144": {
    "methodName": "binaryTreeMaximumPathSum",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def binaryTreeMaximumPathSum(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "145": {
    "methodName": "serializeAndDeserializeBinaryTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def serializeAndDeserializeBinaryTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "146": {
    "methodName": "pathSumIi",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def pathSumIi(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "147": {
    "methodName": "populatingNextRightPointers",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def populatingNextRightPointers(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "148": {
    "methodName": "flattenBinaryTreeToLinkedList",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def flattenBinaryTreeToLinkedList(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "149": {
    "methodName": "lowestCommonAncestorOfBinaryTree",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def lowestCommonAncestorOfBinaryTree(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "150": {
    "methodName": "binaryTreeCameras",
    "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\n\nclass Solution:\n    def binaryTreeCameras(self, root: 'Optional[TreeNode]') -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          null
        ],
        "expected": null
      }
    ],
    "hiddenCases": []
  },
  "151": {
    "methodName": "implementTriePrefixTree",
    "starterCode": "class Solution:\n    def implementTriePrefixTree(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "152": {
    "methodName": "designAddAndSearchWordsDataStructure",
    "starterCode": "class Solution:\n    def designAddAndSearchWordsDataStructure(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "153": {
    "methodName": "wordSearchIi",
    "starterCode": "class Solution:\n    def wordSearchIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "154": {
    "methodName": "replaceWords",
    "starterCode": "class Solution:\n    def replaceWords(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "155": {
    "methodName": "mapSumPairs",
    "starterCode": "class Solution:\n    def mapSumPairs(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "156": {
    "methodName": "longestWordInDictionary",
    "starterCode": "class Solution:\n    def longestWordInDictionary(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "157": {
    "methodName": "maximumXorOfTwoNumbersInAnArray",
    "starterCode": "class Solution:\n    def maximumXorOfTwoNumbersInAnArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "158": {
    "methodName": "indexPairsOfAString",
    "starterCode": "class Solution:\n    def indexPairsOfAString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "159": {
    "methodName": "kthLargestElementInAStream",
    "starterCode": "class Solution:\n    def kthLargestElementInAStream(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "160": {
    "methodName": "lastStoneWeight",
    "starterCode": "class Solution:\n    def lastStoneWeight(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "161": {
    "methodName": "kClosestPointsToOrigin",
    "starterCode": "class Solution:\n    def kClosestPointsToOrigin(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "162": {
    "methodName": "kthLargestElementInAnArray",
    "starterCode": "class Solution:\n    def kthLargestElementInAnArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "163": {
    "methodName": "taskScheduler",
    "starterCode": "class Solution:\n    def taskScheduler(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "164": {
    "methodName": "designTwitter",
    "starterCode": "class Solution:\n    def designTwitter(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "165": {
    "methodName": "findMedianFromDataStream",
    "starterCode": "class Solution:\n    def findMedianFromDataStream(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "166": {
    "methodName": "ipo",
    "starterCode": "class Solution:\n    def ipo(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "167": {
    "methodName": "mergeKSortedLists",
    "starterCode": "class Solution:\n    def mergeKSortedLists(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "168": {
    "methodName": "topKFrequentWords",
    "starterCode": "class Solution:\n    def topKFrequentWords(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "169": {
    "methodName": "smallestRangeCoveringElementsFromKLists",
    "starterCode": "class Solution:\n    def smallestRangeCoveringElementsFromKLists(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "170": {
    "methodName": "reorganizeString",
    "starterCode": "class Solution:\n    def reorganizeString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "171": {
    "methodName": "rearrangeStringKDistanceApart",
    "starterCode": "class Solution:\n    def rearrangeStringKDistanceApart(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "172": {
    "methodName": "uglyNumberIi",
    "starterCode": "class Solution:\n    def uglyNumberIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "173": {
    "methodName": "maximumFrequencyStack",
    "starterCode": "class Solution:\n    def maximumFrequencyStack(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "174": {
    "methodName": "subsets",
    "starterCode": "class Solution:\n    def subsets(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "175": {
    "methodName": "combinationSum",
    "starterCode": "class Solution:\n    def combinationSum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "176": {
    "methodName": "combinationSumIi",
    "starterCode": "class Solution:\n    def combinationSumIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "177": {
    "methodName": "permutations",
    "starterCode": "class Solution:\n    def permutations(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "178": {
    "methodName": "subsetsIi",
    "starterCode": "class Solution:\n    def subsetsIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "179": {
    "methodName": "wordSearch",
    "starterCode": "class Solution:\n    def wordSearch(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "180": {
    "methodName": "nqueens",
    "starterCode": "class Solution:\n    def nqueens(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "181": {
    "methodName": "palindromePartitioning",
    "starterCode": "class Solution:\n    def palindromePartitioning(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "182": {
    "methodName": "letterCombinationsOfAPhoneNumber",
    "starterCode": "class Solution:\n    def letterCombinationsOfAPhoneNumber(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "183": {
    "methodName": "sudokuSolver",
    "starterCode": "class Solution:\n    def sudokuSolver(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "184": {
    "methodName": "restoreIpAddresses",
    "starterCode": "class Solution:\n    def restoreIpAddresses(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "185": {
    "methodName": "permutationsIi",
    "starterCode": "class Solution:\n    def permutationsIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "186": {
    "methodName": "expressionAddOperators",
    "starterCode": "class Solution:\n    def expressionAddOperators(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "187": {
    "methodName": "removeInvalidParentheses",
    "starterCode": "class Solution:\n    def removeInvalidParentheses(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "188": {
    "methodName": "combinations",
    "starterCode": "class Solution:\n    def combinations(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "189": {
    "methodName": "meetingRooms",
    "starterCode": "class Solution:\n    def meetingRooms(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "190": {
    "methodName": "meetingRoomsIi",
    "starterCode": "class Solution:\n    def meetingRoomsIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "191": {
    "methodName": "mergeIntervals",
    "starterCode": "class Solution:\n    def mergeIntervals(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "192": {
    "methodName": "insertInterval",
    "starterCode": "class Solution:\n    def insertInterval(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "193": {
    "methodName": "nonoverlappingIntervals",
    "starterCode": "class Solution:\n    def nonoverlappingIntervals(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "194": {
    "methodName": "minimumNumberOfArrowsToBurstBalloons",
    "starterCode": "class Solution:\n    def minimumNumberOfArrowsToBurstBalloons(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "195": {
    "methodName": "employeeFreeTime",
    "starterCode": "class Solution:\n    def employeeFreeTime(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "196": {
    "methodName": "intervalListIntersections",
    "starterCode": "class Solution:\n    def intervalListIntersections(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "197": {
    "methodName": "minimumIntervalToIncludeEachQuery",
    "starterCode": "class Solution:\n    def minimumIntervalToIncludeEachQuery(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "198": {
    "methodName": "dataStreamAsDisjointIntervals",
    "starterCode": "class Solution:\n    def dataStreamAsDisjointIntervals(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "199": {
    "methodName": "maximumSubarray",
    "starterCode": "class Solution:\n    def maximumSubarray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "200": {
    "methodName": "jumpGame",
    "starterCode": "class Solution:\n    def jumpGame(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "201": {
    "methodName": "jumpGameIi",
    "starterCode": "class Solution:\n    def jumpGameIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "202": {
    "methodName": "gasStation",
    "starterCode": "class Solution:\n    def gasStation(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "203": {
    "methodName": "handOfStraights",
    "starterCode": "class Solution:\n    def handOfStraights(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "204": {
    "methodName": "mergeTripletsToFormTargetTriplet",
    "starterCode": "class Solution:\n    def mergeTripletsToFormTargetTriplet(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "205": {
    "methodName": "partitionLabels",
    "starterCode": "class Solution:\n    def partitionLabels(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "206": {
    "methodName": "validParenthesisString",
    "starterCode": "class Solution:\n    def validParenthesisString(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "207": {
    "methodName": "candy",
    "starterCode": "class Solution:\n    def candy(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "208": {
    "methodName": "taskScheduler",
    "starterCode": "class Solution:\n    def taskScheduler(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "209": {
    "methodName": "minimumNumberOfArrowsToBurstBalloons",
    "starterCode": "class Solution:\n    def minimumNumberOfArrowsToBurstBalloons(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "210": {
    "methodName": "nonoverlappingIntervals",
    "starterCode": "class Solution:\n    def nonoverlappingIntervals(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "211": {
    "methodName": "queueReconstructionByHeight",
    "starterCode": "class Solution:\n    def queueReconstructionByHeight(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "212": {
    "methodName": "ipo",
    "starterCode": "class Solution:\n    def ipo(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "213": {
    "methodName": "twoCityScheduling",
    "starterCode": "class Solution:\n    def twoCityScheduling(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "214": {
    "methodName": "numberOfIslands",
    "starterCode": "class Solution:\n    def numberOfIslands(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "215": {
    "methodName": "cloneGraph",
    "starterCode": "class Solution:\n    def cloneGraph(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "216": {
    "methodName": "maxAreaOfIsland",
    "starterCode": "class Solution:\n    def maxAreaOfIsland(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "217": {
    "methodName": "pacificAtlanticWaterFlow",
    "starterCode": "class Solution:\n    def pacificAtlanticWaterFlow(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "218": {
    "methodName": "surroundedRegions",
    "starterCode": "class Solution:\n    def surroundedRegions(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "219": {
    "methodName": "rottingOranges",
    "starterCode": "class Solution:\n    def rottingOranges(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "220": {
    "methodName": "wordLadder",
    "starterCode": "class Solution:\n    def wordLadder(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "221": {
    "methodName": "courseSchedule",
    "starterCode": "class Solution:\n    def courseSchedule(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "222": {
    "methodName": "courseScheduleIi",
    "starterCode": "class Solution:\n    def courseScheduleIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "223": {
    "methodName": "numberOfConnectedComponentsInUndirectedGraph",
    "starterCode": "class Solution:\n    def numberOfConnectedComponentsInUndirectedGraph(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "224": {
    "methodName": "graphValidTree",
    "starterCode": "class Solution:\n    def graphValidTree(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "225": {
    "methodName": "wordLadderIi",
    "starterCode": "class Solution:\n    def wordLadderIi(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "226": {
    "methodName": "findEventualSafeStates",
    "starterCode": "class Solution:\n    def findEventualSafeStates(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "227": {
    "methodName": "alienDictionary",
    "starterCode": "class Solution:\n    def alienDictionary(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "228": {
    "methodName": "redundantConnection",
    "starterCode": "class Solution:\n    def redundantConnection(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "229": {
    "methodName": "numberOfOperationsToMakeNetworkConnected",
    "starterCode": "class Solution:\n    def numberOfOperationsToMakeNetworkConnected(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "230": {
    "methodName": "allPathsFromSourceToTarget",
    "starterCode": "class Solution:\n    def allPathsFromSourceToTarget(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "231": {
    "methodName": "criticalConnectionsInANetwork",
    "starterCode": "class Solution:\n    def criticalConnectionsInANetwork(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "232": {
    "methodName": "isGraphBipartite",
    "starterCode": "class Solution:\n    def isGraphBipartite(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "233": {
    "methodName": "evaluateDivision",
    "starterCode": "class Solution:\n    def evaluateDivision(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "234": {
    "methodName": "networkDelayTime",
    "starterCode": "class Solution:\n    def networkDelayTime(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "235": {
    "methodName": "swimInRisingWater",
    "starterCode": "class Solution:\n    def swimInRisingWater(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "236": {
    "methodName": "cheapestFlightsWithinKStops",
    "starterCode": "class Solution:\n    def cheapestFlightsWithinKStops(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "237": {
    "methodName": "reconstructItinerary",
    "starterCode": "class Solution:\n    def reconstructItinerary(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "238": {
    "methodName": "minCostToConnectAllPoints",
    "starterCode": "class Solution:\n    def minCostToConnectAllPoints(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "239": {
    "methodName": "findCriticalAndPseudocriticalEdgesInMst",
    "starterCode": "class Solution:\n    def findCriticalAndPseudocriticalEdgesInMst(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "240": {
    "methodName": "pathWithMinimumEffort",
    "starterCode": "class Solution:\n    def pathWithMinimumEffort(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "241": {
    "methodName": "longestIncreasingPathInAMatrix",
    "starterCode": "class Solution:\n    def longestIncreasingPathInAMatrix(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "242": {
    "methodName": "frogJump",
    "starterCode": "class Solution:\n    def frogJump(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "243": {
    "methodName": "jumpGameIv",
    "starterCode": "class Solution:\n    def jumpGameIv(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "244": {
    "methodName": "climbStairs",
    "starterCode": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      },
      {
        "input": [
          4
        ],
        "expected": 5
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      },
      {
        "input": [
          5
        ],
        "expected": 8
      }
    ]
  },
  "245": {
    "methodName": "minCostClimbingStairs",
    "starterCode": "class Solution:\n    def minCostClimbingStairs(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "246": {
    "methodName": "houseRobber",
    "starterCode": "class Solution:\n    def houseRobber(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "247": {
    "methodName": "houseRobberIi",
    "starterCode": "class Solution:\n    def houseRobberIi(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "248": {
    "methodName": "longestPalindromicSubstring",
    "starterCode": "class Solution:\n    def longestPalindromicSubstring(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "249": {
    "methodName": "palindromicSubstrings",
    "starterCode": "class Solution:\n    def palindromicSubstrings(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "250": {
    "methodName": "decodeWays",
    "starterCode": "class Solution:\n    def decodeWays(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "251": {
    "methodName": "coinChange",
    "starterCode": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            5
          ],
          11
        ],
        "expected": 3
      },
      {
        "input": [
          [
            2
          ],
          3
        ],
        "expected": -1
      },
      {
        "input": [
          [
            1
          ],
          0
        ],
        "expected": 0
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            1
          ],
          2
        ],
        "expected": 2
      }
    ]
  },
  "252": {
    "methodName": "maximumProductSubarray",
    "starterCode": "class Solution:\n    def maximumProductSubarray(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "253": {
    "methodName": "wordBreak",
    "starterCode": "class Solution:\n    def wordBreak(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "254": {
    "methodName": "longestIncreasingSubsequence",
    "starterCode": "class Solution:\n    def longestIncreasingSubsequence(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "255": {
    "methodName": "partitionEqualSubsetSum",
    "starterCode": "class Solution:\n    def partitionEqualSubsetSum(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "256": {
    "methodName": "jumpGameIi",
    "starterCode": "class Solution:\n    def jumpGameIi(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "257": {
    "methodName": "perfectSquares",
    "starterCode": "class Solution:\n    def perfectSquares(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "258": {
    "methodName": "uglyNumberIi",
    "starterCode": "class Solution:\n    def uglyNumberIi(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "259": {
    "methodName": "countingBits",
    "starterCode": "class Solution:\n    def countingBits(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "260": {
    "methodName": "maximumAlternatingSubsequenceLength",
    "starterCode": "class Solution:\n    def maximumAlternatingSubsequenceLength(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "261": {
    "methodName": "wiggleSubsequence",
    "starterCode": "class Solution:\n    def wiggleSubsequence(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "262": {
    "methodName": "arithmeticSlices",
    "starterCode": "class Solution:\n    def arithmeticSlices(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "263": {
    "methodName": "studentAttendanceRecordIi",
    "starterCode": "class Solution:\n    def studentAttendanceRecordIi(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "264": {
    "methodName": "uniquePaths",
    "starterCode": "class Solution:\n    def uniquePaths(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "265": {
    "methodName": "longestCommonSubsequence",
    "starterCode": "class Solution:\n    def longestCommonSubsequence(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "266": {
    "methodName": "bestTimeToBuyAndSellStockWithCooldown",
    "starterCode": "class Solution:\n    def bestTimeToBuyAndSellStockWithCooldown(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "267": {
    "methodName": "coinChangeIi",
    "starterCode": "class Solution:\n    def coinChangeIi(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "268": {
    "methodName": "targetSum",
    "starterCode": "class Solution:\n    def targetSum(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "269": {
    "methodName": "interleavingString",
    "starterCode": "class Solution:\n    def interleavingString(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "270": {
    "methodName": "longestIncreasingPathInAMatrix",
    "starterCode": "class Solution:\n    def longestIncreasingPathInAMatrix(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "271": {
    "methodName": "distinctSubsequences",
    "starterCode": "class Solution:\n    def distinctSubsequences(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "272": {
    "methodName": "editDistance",
    "starterCode": "class Solution:\n    def editDistance(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "273": {
    "methodName": "burstBalloons",
    "starterCode": "class Solution:\n    def burstBalloons(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "274": {
    "methodName": "regularExpressionMatching",
    "starterCode": "class Solution:\n    def regularExpressionMatching(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "275": {
    "methodName": "triangle",
    "starterCode": "class Solution:\n    def triangle(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "276": {
    "methodName": "minimumPathSum",
    "starterCode": "class Solution:\n    def minimumPathSum(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "277": {
    "methodName": "wildcardMatching",
    "starterCode": "class Solution:\n    def wildcardMatching(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "278": {
    "methodName": "maximalRectangle",
    "starterCode": "class Solution:\n    def maximalRectangle(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          2
        ],
        "expected": 2
      },
      {
        "input": [
          3
        ],
        "expected": 3
      }
    ],
    "hiddenCases": [
      {
        "input": [
          1
        ],
        "expected": 1
      }
    ]
  },
  "279": {
    "methodName": "singleNumber",
    "starterCode": "class Solution:\n    def singleNumber(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "280": {
    "methodName": "numberOf1Bits",
    "starterCode": "class Solution:\n    def numberOf1Bits(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "281": {
    "methodName": "countingBits",
    "starterCode": "class Solution:\n    def countingBits(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "282": {
    "methodName": "reverseBits",
    "starterCode": "class Solution:\n    def reverseBits(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "283": {
    "methodName": "missingNumber",
    "starterCode": "class Solution:\n    def missingNumber(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "284": {
    "methodName": "sumOfTwoIntegers",
    "starterCode": "class Solution:\n    def sumOfTwoIntegers(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "285": {
    "methodName": "reverseInteger",
    "starterCode": "class Solution:\n    def reverseInteger(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "286": {
    "methodName": "reverseBits",
    "starterCode": "class Solution:\n    def reverseBits(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "287": {
    "methodName": "singleNumberIi",
    "starterCode": "class Solution:\n    def singleNumberIi(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "288": {
    "methodName": "maximumXorOfTwoNumbersInAnArray",
    "starterCode": "class Solution:\n    def maximumXorOfTwoNumbersInAnArray(self, n: int = 0) -> int:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          11
        ],
        "expected": 3
      },
      {
        "input": [
          128
        ],
        "expected": 1
      }
    ],
    "hiddenCases": [
      {
        "input": [
          0
        ],
        "expected": 0
      }
    ]
  },
  "289": {
    "methodName": "rotateImage",
    "starterCode": "class Solution:\n    def rotateImage(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "290": {
    "methodName": "spiralMatrix",
    "starterCode": "class Solution:\n    def spiralMatrix(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "291": {
    "methodName": "setMatrixZeroes",
    "starterCode": "class Solution:\n    def setMatrixZeroes(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "292": {
    "methodName": "happyNumber",
    "starterCode": "class Solution:\n    def happyNumber(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "293": {
    "methodName": "plusOne",
    "starterCode": "class Solution:\n    def plusOne(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "294": {
    "methodName": "powxN",
    "starterCode": "class Solution:\n    def powxN(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "295": {
    "methodName": "multiplyStrings",
    "starterCode": "class Solution:\n    def multiplyStrings(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "296": {
    "methodName": "basicCalculator",
    "starterCode": "class Solution:\n    def basicCalculator(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "297": {
    "methodName": "detectSquares",
    "starterCode": "class Solution:\n    def detectSquares(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "298": {
    "methodName": "palindromeNumber",
    "starterCode": "class Solution:\n    def palindromeNumber(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "299": {
    "methodName": "sortAnArray",
    "starterCode": "class Solution:\n    def sortAnArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "300": {
    "methodName": "kthLargestElementInAnArray",
    "starterCode": "class Solution:\n    def kthLargestElementInAnArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "301": {
    "methodName": "mergeSortedArray",
    "starterCode": "class Solution:\n    def mergeSortedArray(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 6
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "302": {
    "methodName": "findKPairsWithSmallestSums",
    "starterCode": "class Solution:\n    def findKPairsWithSmallestSums(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "303": {
    "methodName": "countOfSmallerNumbersAfterSelf",
    "starterCode": "class Solution:\n    def countOfSmallerNumbersAfterSelf(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "304": {
    "methodName": "reversePairs",
    "starterCode": "class Solution:\n    def reversePairs(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  },
  "305": {
    "methodName": "countOfRangeSum",
    "starterCode": "class Solution:\n    def countOfRangeSum(self, nums: list[int] = None) -> any:\n        # Write your code here\n        pass",
    "sampleCases": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          [
            4,
            5,
            6
          ]
        ],
        "expected": 2
      }
    ],
    "hiddenCases": [
      {
        "input": [
          [
            0
          ]
        ],
        "expected": 0
      }
    ]
  }
};

export function getProblemTestSuite(questionId) {
  const idStr = String(questionId);
  return PROBLEM_TEST_CASES[idStr] || {
    methodName: "solve",
    starterCode: "class Solution:\n    def solve(self, *args):\n        # Write your code here\n        pass",
    sampleCases: [
      { input: [1], expected: 1 }
    ],
    hiddenCases: []
  };
}
