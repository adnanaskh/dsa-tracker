import React, { useState, useEffect, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  setDoc,
  deleteDoc
} from 'firebase/firestore';
import { 
  LayoutDashboard, 
  ListTodo, 
  Calendar, 
  RotateCcw, 
  BookOpen, 
  BarChart, 
  Save, 
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  Upload,
  Eye,
  Trash2,
  Copy,
  Check
} from 'lucide-react';

// --- Firebase Configuration & Initialization ---
const firebaseConfig = {
  apiKey: "AIzaSyC6Y6QWQvym7uJvx0OzoWjIw-iRm-l3hrw",
  authDomain: "dsa-tracker-adnan.firebaseapp.com",
  projectId: "dsa-tracker-adnan",
  storageBucket: "dsa-tracker-adnan.firebasestorage.app",
  messagingSenderId: "260699769889",
  appId: "1:260699769889:web:f8e195fe7c334378ec6760"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const appId = "dsa-tracker-adnan";

// --- Static Data (from Excel) ---
const TOPICS = [
  { name: 'Arrays & Hashing', total: 25 },
  { name: 'Two Pointers', total: 15 },
  { name: 'Sliding Window', total: 15 },
  { name: 'Stack', total: 15 },
  { name: 'Binary Search', total: 15 },
  { name: 'Linked List', total: 20 },
  { name: 'Trees', total: 20 },
  { name: 'Tries', total: 8 },
  { name: 'Heap / Priority Queue', total: 15 },
  { name: 'Backtracking', total: 15 },
  { name: 'Graphs', total: 20 },
  { name: 'Advanced Graphs', total: 10 },
  { name: '1-D Dynamic Programming', total: 20 },
  { name: '2-D Dynamic Programming', total: 20 },
  { name: 'Greedy', total: 15 },
  { name: 'Intervals', total: 10 },
  { name: 'Math & Geometry', total: 10 },
  { name: 'Bit Manipulation', total: 10 },
  { name: 'Strings', total: 27 },
];

const INITIAL_QUESTIONS = [
  { id: 1, day: 1, topic: 'Arrays & Hashing', difficulty: 'Easy', name: 'Contains Duplicate', link: 'https://leetcode.com/problems/contains-duplicate/', pattern: 'Hashing' },
  { id: 2, day: 1, topic: 'Arrays & Hashing', difficulty: 'Easy', name: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram/', pattern: 'Hashing' },
  { id: 3, day: 1, topic: 'Arrays & Hashing', difficulty: 'Easy', name: 'Two Sum', link: 'https://leetcode.com/problems/two-sum/', pattern: 'Hash Map' },
  { id: 4, day: 1, topic: 'Arrays & Hashing', difficulty: 'Easy', name: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', pattern: 'Greedy / Kadane' },
  { id: 5, day: 1, topic: 'Arrays & Hashing', difficulty: 'Easy', name: 'Single Number', link: 'https://leetcode.com/problems/single-number/', pattern: 'Bit Manipulation' },
  { id: 6, day: 2, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', pattern: 'Hashing' },
  { id: 7, day: 2, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements/', pattern: 'Heap / Bucket Sort' },
  { id: 8, day: 2, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Product of Array Except Self', link: 'https://leetcode.com/problems/product-of-array-except-self/', pattern: 'Prefix / Suffix' },
  { id: 9, day: 2, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Valid Sudoku', link: 'https://leetcode.com/problems/valid-sudoku/', pattern: 'Hashing' },
  { id: 10, day: 3, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Encode and Decode Strings', link: 'https://leetcode.com/problems/encode-and-decode-strings/', pattern: 'String Manipulation' },
  { id: 11, day: 3, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Longest Consecutive Sequence', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', pattern: 'Hashing' },
  { id: 12, day: 3, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Sort Colors', link: 'https://leetcode.com/problems/sort-colors/', pattern: 'Dutch National Flag' },
  { id: 13, day: 3, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Subarray Sum Equals K', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', pattern: 'Prefix Sum' },
  { id: 14, day: 4, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Find All Anagrams in a String', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', pattern: 'Sliding Window+Hash' },
  { id: 15, day: 4, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray/', pattern: 'Kadane\'s Algorithm' },
  { id: 16, day: 4, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Majority Element', link: 'https://leetcode.com/problems/majority-element/', pattern: 'Boyer-Moore Voting' },
  { id: 17, day: 4, topic: 'Arrays & Hashing', difficulty: 'Easy', name: 'Move Zeroes', link: 'https://leetcode.com/problems/move-zeroes/', pattern: 'Two Pointer' },
  { id: 18, day: 5, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Rotate Array', link: 'https://leetcode.com/problems/rotate-array/', pattern: 'Array Manipulation' },
  { id: 19, day: 5, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Find the Duplicate Number', link: 'https://leetcode.com/problems/find-the-duplicate-number/', pattern: 'Floyd\'s Cycle / Binary Search' },
  { id: 20, day: 5, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Set Matrix Zeroes', link: 'https://leetcode.com/problems/set-matrix-zeroes/', pattern: 'In-place Matrix' },
  { id: 21, day: 5, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Spiral Matrix', link: 'https://leetcode.com/problems/spiral-matrix/', pattern: 'Matrix Traversal' },
  { id: 22, day: 6, topic: 'Arrays & Hashing', difficulty: 'Hard', name: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', pattern: 'Two Pointer / Stack' },
  { id: 23, day: 6, topic: 'Arrays & Hashing', difficulty: 'Hard', name: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', pattern: 'Monotonic Stack' },
  { id: 24, day: 6, topic: 'Arrays & Hashing', difficulty: 'Hard', name: 'First Missing Positive', link: 'https://leetcode.com/problems/first-missing-positive/', pattern: 'Index Hashing' },
  { id: 25, day: 6, topic: 'Arrays & Hashing', difficulty: 'Medium', name: 'Jump Game', link: 'https://leetcode.com/problems/jump-game/', pattern: 'Greedy' },
  { id: 26, day: 7, topic: 'Two Pointers', difficulty: 'Easy', name: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome/', pattern: 'Two Pointer' },
  { id: 27, day: 7, topic: 'Two Pointers', difficulty: 'Medium', name: 'Two Sum II', link: 'https://leetcode.com/problems/two-sum-ii/', pattern: 'Two Pointer' },
  { id: 28, day: 7, topic: 'Two Pointers', difficulty: 'Medium', name: '3Sum', link: 'https://leetcode.com/problems/3sum/', pattern: 'Two Pointer' },
  { id: 29, day: 7, topic: 'Two Pointers', difficulty: 'Medium', name: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water/', pattern: 'Two Pointer' },
  { id: 30, day: 7, topic: 'Two Pointers', difficulty: 'Medium', name: '4Sum', link: 'https://leetcode.com/problems/4sum/', pattern: 'Two Pointer' },
  { id: 31, day: 8, topic: 'Two Pointers', difficulty: 'Easy', name: 'Merge Sorted Array', link: 'https://leetcode.com/problems/merge-sorted-array/', pattern: 'Two Pointer' },
  { id: 32, day: 8, topic: 'Two Pointers', difficulty: 'Easy', name: 'Squares of a Sorted Array', link: 'https://leetcode.com/problems/squares-of-a-sorted-array/', pattern: 'Two Pointer' },
  { id: 33, day: 8, topic: 'Two Pointers', difficulty: 'Medium', name: 'Remove Duplicates from Sorted Array II', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/', pattern: 'Two Pointer' },
  { id: 34, day: 8, topic: 'Two Pointers', difficulty: 'Hard', name: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', pattern: 'Two Pointer' },
  { id: 35, day: 9, topic: 'Two Pointers', difficulty: 'Medium', name: 'Sort Colors', link: 'https://leetcode.com/problems/sort-colors/', pattern: 'Two Pointer' },
  { id: 36, day: 9, topic: 'Two Pointers', difficulty: 'Easy', name: 'Intersection of Two Arrays II', link: 'https://leetcode.com/problems/intersection-of-two-arrays-ii/', pattern: 'Two Pointer / Hash' },
  { id: 37, day: 9, topic: 'Two Pointers', difficulty: 'Medium', name: 'Boats to Save People', link: 'https://leetcode.com/problems/boats-to-save-people/', pattern: 'Two Pointer + Greedy' },
  { id: 38, day: 9, topic: 'Two Pointers', difficulty: 'Medium', name: 'Minimum Size Subarray Sum', link: 'https://leetcode.com/problems/minimum-size-subarray-sum/', pattern: 'Sliding Window' },
  { id: 39, day: 9, topic: 'Two Pointers', difficulty: 'Hard', name: '3Sum Closest', link: 'https://leetcode.com/problems/3sum-closest/', pattern: 'Two Pointer' },
  { id: 40, day: 9, topic: 'Two Pointers', difficulty: 'Hard', name: 'Subarray Product Less Than K', link: 'https://leetcode.com/problems/subarray-product-less-than-k/', pattern: 'Sliding Window' },
  { id: 41, day: 10, topic: 'Sliding Window', difficulty: 'Medium', name: 'Best Time to Buy and Sell Stock', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', pattern: 'Sliding Window' },
  { id: 42, day: 10, topic: 'Sliding Window', difficulty: 'Medium', name: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', pattern: 'Sliding Window' },
  { id: 43, day: 10, topic: 'Sliding Window', difficulty: 'Medium', name: 'Longest Repeating Character Replacement', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', pattern: 'Sliding Window' },
  { id: 44, day: 10, topic: 'Sliding Window', difficulty: 'Medium', name: 'Permutation in String', link: 'https://leetcode.com/problems/permutation-in-string/', pattern: 'Sliding Window' },
  { id: 45, day: 11, topic: 'Sliding Window', difficulty: 'Hard', name: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', pattern: 'Sliding Window' },
  { id: 46, day: 11, topic: 'Sliding Window', difficulty: 'Hard', name: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', pattern: 'Deque / Monotonic Queue' },
  { id: 47, day: 11, topic: 'Sliding Window', difficulty: 'Medium', name: 'Maximum Average Subarray I', link: 'https://leetcode.com/problems/maximum-average-subarray-i/', pattern: 'Sliding Window' },
  { id: 48, day: 11, topic: 'Sliding Window', difficulty: 'Medium', name: 'Fruit Into Baskets', link: 'https://leetcode.com/problems/fruit-into-baskets/', pattern: 'Sliding Window' },
  { id: 49, day: 12, topic: 'Sliding Window', difficulty: 'Medium', name: 'Longest Subarray of 1s After Deleting One Element', link: 'https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/', pattern: 'Sliding Window' },
  { id: 50, day: 12, topic: 'Sliding Window', difficulty: 'Hard', name: 'Subarrays with K Different Integers', link: 'https://leetcode.com/problems/subarrays-with-k-different-integers/', pattern: 'Sliding Window' },
  { id: 51, day: 12, topic: 'Sliding Window', difficulty: 'Medium', name: 'Max Consecutive Ones III', link: 'https://leetcode.com/problems/max-consecutive-ones-iii/', pattern: 'Sliding Window' },
  { id: 52, day: 12, topic: 'Sliding Window', difficulty: 'Medium', name: 'Count Number of Nice Subarrays', link: 'https://leetcode.com/problems/count-number-of-nice-subarrays/', pattern: 'Sliding Window' },
  { id: 53, day: 12, topic: 'Sliding Window', difficulty: 'Medium', name: 'Binary Subarrays With Sum', link: 'https://leetcode.com/problems/binary-subarrays-with-sum/', pattern: 'Sliding Window + Prefix' },
  { id: 54, day: 12, topic: 'Sliding Window', difficulty: 'Medium', name: 'Number of Substrings Containing All Three Characters', link: 'https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/', pattern: 'Sliding Window' },
  { id: 55, day: 12, topic: 'Sliding Window', difficulty: 'Hard', name: 'Minimum Number of K Consecutive Bit Flips', link: 'https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips/', pattern: 'Sliding Window + Greedy' },
  { id: 56, day: 13, topic: 'Stack', difficulty: 'Easy', name: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses/', pattern: 'Stack' },
  { id: 57, day: 13, topic: 'Stack', difficulty: 'Medium', name: 'Min Stack', link: 'https://leetcode.com/problems/min-stack/', pattern: 'Stack' },
  { id: 58, day: 13, topic: 'Stack', difficulty: 'Medium', name: 'Evaluate Reverse Polish Notation', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', pattern: 'Stack' },
  { id: 59, day: 13, topic: 'Stack', difficulty: 'Medium', name: 'Generate Parentheses', link: 'https://leetcode.com/problems/generate-parentheses/', pattern: 'Backtracking / Stack' },
  { id: 60, day: 14, topic: 'Stack', difficulty: 'Medium', name: 'Daily Temperatures', link: 'https://leetcode.com/problems/daily-temperatures/', pattern: 'Monotonic Stack' },
  { id: 61, day: 14, topic: 'Stack', difficulty: 'Medium', name: 'Car Fleet', link: 'https://leetcode.com/problems/car-fleet/', pattern: 'Monotonic Stack' },
  { id: 62, day: 14, topic: 'Stack', difficulty: 'Hard', name: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', pattern: 'Monotonic Stack' },
  { id: 63, day: 14, topic: 'Stack', difficulty: 'Medium', name: 'Decode String', link: 'https://leetcode.com/problems/decode-string/', pattern: 'Stack' },
  { id: 64, day: 15, topic: 'Stack', difficulty: 'Medium', name: 'Asteroid Collision', link: 'https://leetcode.com/problems/asteroid-collision/', pattern: 'Stack' },
  { id: 65, day: 15, topic: 'Stack', difficulty: 'Hard', name: 'Longest Valid Parentheses', link: 'https://leetcode.com/problems/longest-valid-parentheses/', pattern: 'Stack / DP' },
  { id: 66, day: 15, topic: 'Stack', difficulty: 'Medium', name: 'Remove All Adjacent Duplicates In String', link: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/', pattern: 'Stack' },
  { id: 67, day: 15, topic: 'Stack', difficulty: 'Hard', name: 'Basic Calculator II', link: 'https://leetcode.com/problems/basic-calculator-ii/', pattern: 'Stack' },
  { id: 68, day: 15, topic: 'Stack', difficulty: 'Medium', name: 'Next Greater Element I', link: 'https://leetcode.com/problems/next-greater-element-i/', pattern: 'Monotonic Stack' },
  { id: 69, day: 15, topic: 'Stack', difficulty: 'Medium', name: 'Online Stock Span', link: 'https://leetcode.com/problems/online-stock-span/', pattern: 'Monotonic Stack' },
  { id: 70, day: 15, topic: 'Stack', difficulty: 'Hard', name: 'Remove K Digits', link: 'https://leetcode.com/problems/remove-k-digits/', pattern: 'Greedy + Stack' },
  { id: 71, day: 16, topic: 'Binary Search', difficulty: 'Easy', name: 'Binary Search', link: 'https://leetcode.com/problems/binary-search/', pattern: 'Binary Search' },
  { id: 72, day: 16, topic: 'Binary Search', difficulty: 'Easy', name: 'Search Insert Position', link: 'https://leetcode.com/problems/search-insert-position/', pattern: 'Binary Search' },
  { id: 73, day: 16, topic: 'Binary Search', difficulty: 'Medium', name: 'Search a 2D Matrix', link: 'https://leetcode.com/problems/search-a-2d-matrix/', pattern: 'Binary Search' },
  { id: 74, day: 16, topic: 'Binary Search', difficulty: 'Medium', name: 'Koko Eating Bananas', link: 'https://leetcode.com/problems/koko-eating-bananas/', pattern: 'Binary Search on Answer' },
  { id: 75, day: 17, topic: 'Binary Search', difficulty: 'Medium', name: 'Find Minimum in Rotated Sorted Array', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', pattern: 'Binary Search' },
  { id: 76, day: 17, topic: 'Binary Search', difficulty: 'Medium', name: 'Search in Rotated Sorted Array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', pattern: 'Binary Search' },
  { id: 77, day: 17, topic: 'Binary Search', difficulty: 'Hard', name: 'Find Minimum in Rotated Sorted Array II', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/', pattern: 'Binary Search' },
  { id: 78, day: 17, topic: 'Binary Search', difficulty: 'Medium', name: 'Time Based Key-Value Store', link: 'https://leetcode.com/problems/time-based-key-value-store/', pattern: 'Binary Search' },
  { id: 79, day: 18, topic: 'Binary Search', difficulty: 'Hard', name: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', pattern: 'Binary Search' },
  { id: 80, day: 18, topic: 'Binary Search', difficulty: 'Medium', name: 'Capacity To Ship Packages Within D Days', link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', pattern: 'Binary Search on Answer' },
  { id: 81, day: 18, topic: 'Binary Search', difficulty: 'Medium', name: 'Find Peak Element', link: 'https://leetcode.com/problems/find-peak-element/', pattern: 'Binary Search' },
  { id: 82, day: 18, topic: 'Binary Search', difficulty: 'Hard', name: 'Split Array Largest Sum', link: 'https://leetcode.com/problems/split-array-largest-sum/', pattern: 'Binary Search + Greedy' },
  { id: 83, day: 18, topic: 'Binary Search', difficulty: 'Easy', name: 'First Bad Version', link: 'https://leetcode.com/problems/first-bad-version/', pattern: 'Binary Search' },
  { id: 84, day: 18, topic: 'Binary Search', difficulty: 'Medium', name: 'Count of Range Sum', link: 'https://leetcode.com/problems/count-of-range-sum/', pattern: 'Binary Search / Merge Sort' },
  { id: 85, day: 18, topic: 'Binary Search', difficulty: 'Medium', name: 'Peak Index in a Mountain Array', link: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/', pattern: 'Binary Search' },
  { id: 86, day: 19, topic: 'Linked List', difficulty: 'Easy', name: 'Reverse Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/', pattern: 'Iterative / Recursive' },
  { id: 87, day: 19, topic: 'Linked List', difficulty: 'Easy', name: 'Merge Two Sorted Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', pattern: 'Two Pointer' },
  { id: 88, day: 19, topic: 'Linked List', difficulty: 'Easy', name: 'Linked List Cycle', link: 'https://leetcode.com/problems/linked-list-cycle/', pattern: 'Floyd\'s Cycle' },
  { id: 89, day: 19, topic: 'Linked List', difficulty: 'Easy', name: 'Middle of the Linked List', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', pattern: 'Slow-Fast Pointer' },
  { id: 90, day: 20, topic: 'Linked List', difficulty: 'Medium', name: 'Reorder List', link: 'https://leetcode.com/problems/reorder-list/', pattern: 'Slow-Fast + Reverse' },
  { id: 91, day: 20, topic: 'Linked List', difficulty: 'Medium', name: 'Remove Nth Node From End of List', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', pattern: 'Two Pointer' },
  { id: 92, day: 20, topic: 'Linked List', difficulty: 'Medium', name: 'Copy List with Random Pointer', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', pattern: 'Hash Map' },
  { id: 93, day: 20, topic: 'Linked List', difficulty: 'Medium', name: 'Add Two Numbers', link: 'https://leetcode.com/problems/add-two-numbers/', pattern: 'Linked List Math' },
  { id: 94, day: 21, topic: 'Linked List', difficulty: 'Medium', name: 'Find the Duplicate Number', link: 'https://leetcode.com/problems/find-the-duplicate-number/', pattern: 'Floyd\'s Cycle' },
  { id: 95, day: 21, topic: 'Linked List', difficulty: 'Medium', name: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache/', pattern: 'Hash Map + DLL' },
  { id: 96, day: 21, topic: 'Linked List', difficulty: 'Hard', name: 'Merge K Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', pattern: 'Heap / Divide & Conquer' },
  { id: 97, day: 21, topic: 'Linked List', difficulty: 'Hard', name: 'Reverse Nodes in k-Group', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', pattern: 'Recursive' },
  { id: 98, day: 22, topic: 'Linked List', difficulty: 'Medium', name: 'Swap Nodes in Pairs', link: 'https://leetcode.com/problems/swap-nodes-in-pairs/', pattern: 'Linked List' },
  { id: 99, day: 22, topic: 'Linked List', difficulty: 'Medium', name: 'Odd Even Linked List', link: 'https://leetcode.com/problems/odd-even-linked-list/', pattern: 'Linked List' },
  { id: 100, day: 22, topic: 'Linked List', difficulty: 'Easy', name: 'Palindrome Linked List', link: 'https://leetcode.com/problems/palindrome-linked-list/', pattern: 'Stack / Two Pointer' },
  { id: 101, day: 22, topic: 'Linked List', difficulty: 'Medium', name: 'Sort List', link: 'https://leetcode.com/problems/sort-list/', pattern: 'Merge Sort' },
  { id: 102, day: 22, topic: 'Linked List', difficulty: 'Medium', name: 'Linked List Cycle II', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', pattern: 'Floyd\'s Cycle' },
  { id: 103, day: 22, topic: 'Linked List', difficulty: 'Medium', name: 'Rotate List', link: 'https://leetcode.com/problems/rotate-list/', pattern: 'Two Pointer' },
  { id: 104, day: 22, topic: 'Linked List', difficulty: 'Hard', name: 'Reverse Linked List II', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', pattern: 'Linked List' },
  { id: 105, day: 22, topic: 'Linked List', difficulty: 'Hard', name: 'LFU Cache', link: 'https://leetcode.com/problems/lfu-cache/', pattern: 'Linked List + Hash Map' },
  { id: 106, day: 23, topic: 'Trees', difficulty: 'Easy', name: 'Invert Binary Tree', link: 'https://leetcode.com/problems/invert-binary-tree/', pattern: 'BFS / DFS' },
  { id: 107, day: 23, topic: 'Trees', difficulty: 'Easy', name: 'Maximum Depth of Binary Tree', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', pattern: 'DFS / BFS' },
  { id: 108, day: 23, topic: 'Trees', difficulty: 'Easy', name: 'Diameter of Binary Tree', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', pattern: 'DFS' },
  { id: 109, day: 23, topic: 'Trees', difficulty: 'Easy', name: 'Balanced Binary Tree', link: 'https://leetcode.com/problems/balanced-binary-tree/', pattern: 'DFS' },
  { id: 110, day: 24, topic: 'Trees', difficulty: 'Easy', name: 'Same Tree', link: 'https://leetcode.com/problems/same-tree/', pattern: 'DFS' },
  { id: 111, day: 24, topic: 'Trees', difficulty: 'Easy', name: 'Subtree of Another Tree', link: 'https://leetcode.com/problems/subtree-of-another-tree/', pattern: 'DFS' },
  { id: 112, day: 24, topic: 'Trees', difficulty: 'Easy', name: 'Lowest Common Ancestor of BST', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-bst/', pattern: 'BST Property' },
  { id: 113, day: 24, topic: 'Trees', difficulty: 'Medium', name: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', pattern: 'BFS' },
  { id: 114, day: 25, topic: 'Trees', difficulty: 'Medium', name: 'Binary Tree Right Side View', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', pattern: 'BFS' },
  { id: 115, day: 25, topic: 'Trees', difficulty: 'Medium', name: 'Count Good Nodes in Binary Tree', link: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', pattern: 'DFS' },
  { id: 116, day: 25, topic: 'Trees', difficulty: 'Medium', name: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', pattern: 'DFS' },
  { id: 117, day: 25, topic: 'Trees', difficulty: 'Medium', name: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', pattern: 'In-order DFS' },
  { id: 118, day: 26, topic: 'Trees', difficulty: 'Hard', name: 'Construct Binary Tree from Preorder and Inorder', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder/', pattern: 'Recursion' },
  { id: 119, day: 26, topic: 'Trees', difficulty: 'Hard', name: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', pattern: 'DFS' },
  { id: 120, day: 26, topic: 'Trees', difficulty: 'Hard', name: 'Serialize and Deserialize Binary Tree', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', pattern: 'BFS / DFS' },
  { id: 121, day: 26, topic: 'Trees', difficulty: 'Medium', name: 'Path Sum II', link: 'https://leetcode.com/problems/path-sum-ii/', pattern: 'DFS + Backtracking' },
  { id: 122, day: 27, topic: 'Trees', difficulty: 'Medium', name: 'Populating Next Right Pointers', link: 'https://leetcode.com/problems/populating-next-right-pointers/', pattern: 'BFS' },
  { id: 123, day: 27, topic: 'Trees', difficulty: 'Medium', name: 'Flatten Binary Tree to Linked List', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', pattern: 'Morris / Stack' },
  { id: 124, day: 27, topic: 'Trees', difficulty: 'Medium', name: 'Lowest Common Ancestor of Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-binary-tree/', pattern: 'DFS' },
  { id: 125, day: 27, topic: 'Trees', difficulty: 'Hard', name: 'Binary Tree Cameras', link: 'https://leetcode.com/problems/binary-tree-cameras/', pattern: 'Greedy + DFS' },
  { id: 126, day: 28, topic: 'Tries', difficulty: 'Medium', name: 'Implement Trie (Prefix Tree)', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/', pattern: 'Trie' },
  { id: 127, day: 28, topic: 'Tries', difficulty: 'Medium', name: 'Design Add and Search Words Data Structure', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', pattern: 'Trie + DFS' },
  { id: 128, day: 28, topic: 'Tries', difficulty: 'Hard', name: 'Word Search II', link: 'https://leetcode.com/problems/word-search-ii/', pattern: 'Trie + Backtracking' },
  { id: 129, day: 28, topic: 'Tries', difficulty: 'Medium', name: 'Replace Words', link: 'https://leetcode.com/problems/replace-words/', pattern: 'Trie' },
  { id: 130, day: 29, topic: 'Tries', difficulty: 'Medium', name: 'Map Sum Pairs', link: 'https://leetcode.com/problems/map-sum-pairs/', pattern: 'Trie' },
  { id: 131, day: 29, topic: 'Tries', difficulty: 'Medium', name: 'Longest Word in Dictionary', link: 'https://leetcode.com/problems/longest-word-in-dictionary/', pattern: 'Trie' },
  { id: 132, day: 29, topic: 'Tries', difficulty: 'Hard', name: 'Maximum XOR of Two Numbers in an Array', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', pattern: 'Trie + Bit' },
  { id: 133, day: 29, topic: 'Tries', difficulty: 'Medium', name: 'Index Pairs of a String', link: 'https://leetcode.com/problems/index-pairs-of-a-string/', pattern: 'Trie' },
  { id: 134, day: 30, topic: 'Heap / Priority Queue', difficulty: 'Easy', name: 'Kth Largest Element in a Stream', link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', pattern: 'Min Heap' },
  { id: 135, day: 30, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'Last Stone Weight', link: 'https://leetcode.com/problems/last-stone-weight/', pattern: 'Max Heap' },
  { id: 136, day: 30, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'K Closest Points to Origin', link: 'https://leetcode.com/problems/k-closest-points-to-origin/', pattern: 'Min Heap' },
  { id: 137, day: 30, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', pattern: 'QuickSelect / Heap' },
  { id: 138, day: 31, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'Task Scheduler', link: 'https://leetcode.com/problems/task-scheduler/', pattern: 'Heap + Greedy' },
  { id: 139, day: 31, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'Design Twitter', link: 'https://leetcode.com/problems/design-twitter/', pattern: 'Heap + Hash Map' },
  { id: 140, day: 31, topic: 'Heap / Priority Queue', difficulty: 'Hard', name: 'Find Median from Data Stream', link: 'https://leetcode.com/problems/find-median-from-data-stream/', pattern: 'Two Heaps' },
  { id: 141, day: 31, topic: 'Heap / Priority Queue', difficulty: 'Hard', name: 'IPO', link: 'https://leetcode.com/problems/ipo/', pattern: 'Two Heaps + Greedy' },
  { id: 142, day: 32, topic: 'Heap / Priority Queue', difficulty: 'Hard', name: 'Merge K Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', pattern: 'Heap' },
  { id: 143, day: 32, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'Top K Frequent Words', link: 'https://leetcode.com/problems/top-k-frequent-words/', pattern: 'Heap' },
  { id: 144, day: 32, topic: 'Heap / Priority Queue', difficulty: 'Hard', name: 'Smallest Range Covering Elements from K Lists', link: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/', pattern: 'Heap' },
  { id: 145, day: 32, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'Reorganize String', link: 'https://leetcode.com/problems/reorganize-string/', pattern: 'Heap + Greedy' },
  { id: 146, day: 32, topic: 'Heap / Priority Queue', difficulty: 'Hard', name: 'Rearrange String k Distance Apart', link: 'https://leetcode.com/problems/rearrange-string-k-distance-apart/', pattern: 'Heap' },
  { id: 147, day: 32, topic: 'Heap / Priority Queue', difficulty: 'Medium', name: 'Ugly Number II', link: 'https://leetcode.com/problems/ugly-number-ii/', pattern: 'Heap / DP' },
  { id: 148, day: 32, topic: 'Heap / Priority Queue', difficulty: 'Hard', name: 'Maximum Frequency Stack', link: 'https://leetcode.com/problems/maximum-frequency-stack/', pattern: 'Heap / Hash Map' },
  { id: 149, day: 33, topic: 'Backtracking', difficulty: 'Medium', name: 'Subsets', link: 'https://leetcode.com/problems/subsets/', pattern: 'Backtracking' },
  { id: 150, day: 33, topic: 'Backtracking', difficulty: 'Medium', name: 'Combination Sum', link: 'https://leetcode.com/problems/combination-sum/', pattern: 'Backtracking' },
  { id: 151, day: 33, topic: 'Backtracking', difficulty: 'Medium', name: 'Combination Sum II', link: 'https://leetcode.com/problems/combination-sum-ii/', pattern: 'Backtracking' },
  { id: 152, day: 33, topic: 'Backtracking', difficulty: 'Medium', name: 'Permutations', link: 'https://leetcode.com/problems/permutations/', pattern: 'Backtracking' },
  { id: 153, day: 34, topic: 'Backtracking', difficulty: 'Medium', name: 'Subsets II', link: 'https://leetcode.com/problems/subsets-ii/', pattern: 'Backtracking' },
  { id: 154, day: 34, topic: 'Backtracking', difficulty: 'Medium', name: 'Word Search', link: 'https://leetcode.com/problems/word-search/', pattern: 'Backtracking + DFS' },
  { id: 155, day: 34, topic: 'Backtracking', difficulty: 'Hard', name: 'N-Queens', link: 'https://leetcode.com/problems/n-queens/', pattern: 'Backtracking' },
  { id: 156, day: 34, topic: 'Backtracking', difficulty: 'Hard', name: 'Palindrome Partitioning', link: 'https://leetcode.com/problems/palindrome-partitioning/', pattern: 'Backtracking + DP' },
  { id: 157, day: 35, topic: 'Backtracking', difficulty: 'Medium', name: 'Letter Combinations of a Phone Number', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', pattern: 'Backtracking' },
  { id: 158, day: 35, topic: 'Backtracking', difficulty: 'Hard', name: 'Sudoku Solver', link: 'https://leetcode.com/problems/sudoku-solver/', pattern: 'Backtracking' },
  { id: 159, day: 35, topic: 'Backtracking', difficulty: 'Medium', name: 'Restore IP Addresses', link: 'https://leetcode.com/problems/restore-ip-addresses/', pattern: 'Backtracking' },
  { id: 160, day: 35, topic: 'Backtracking', difficulty: 'Medium', name: 'Permutations II', link: 'https://leetcode.com/problems/permutations-ii/', pattern: 'Backtracking' },
  { id: 161, day: 35, topic: 'Backtracking', difficulty: 'Hard', name: 'Expression Add Operators', link: 'https://leetcode.com/problems/expression-add-operators/', pattern: 'Backtracking' },
  { id: 162, day: 35, topic: 'Backtracking', difficulty: 'Hard', name: 'Remove Invalid Parentheses', link: 'https://leetcode.com/problems/remove-invalid-parentheses/', pattern: 'Backtracking / BFS' },
  { id: 163, day: 35, topic: 'Backtracking', difficulty: 'Medium', name: 'Combinations', link: 'https://leetcode.com/problems/combinations/', pattern: 'Backtracking' },
  { id: 164, day: 36, topic: 'Graphs', difficulty: 'Medium', name: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands/', pattern: 'DFS / BFS' },
  { id: 165, day: 36, topic: 'Graphs', difficulty: 'Medium', name: 'Clone Graph', link: 'https://leetcode.com/problems/clone-graph/', pattern: 'DFS / BFS + Hash' },
  { id: 166, day: 36, topic: 'Graphs', difficulty: 'Medium', name: 'Max Area of Island', link: 'https://leetcode.com/problems/max-area-of-island/', pattern: 'DFS' },
  { id: 167, day: 36, topic: 'Graphs', difficulty: 'Medium', name: 'Pacific Atlantic Water Flow', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', pattern: 'DFS / BFS' },
  { id: 168, day: 37, topic: 'Graphs', difficulty: 'Medium', name: 'Surrounded Regions', link: 'https://leetcode.com/problems/surrounded-regions/', pattern: 'DFS / BFS' },
  { id: 169, day: 37, topic: 'Graphs', difficulty: 'Medium', name: 'Rotting Oranges', link: 'https://leetcode.com/problems/rotting-oranges/', pattern: 'BFS' },
  { id: 170, day: 37, topic: 'Graphs', difficulty: 'Hard', name: 'Word Ladder', link: 'https://leetcode.com/problems/word-ladder/', pattern: 'BFS' },
  { id: 171, day: 37, topic: 'Graphs', difficulty: 'Medium', name: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule/', pattern: 'Topological Sort' },
  { id: 172, day: 38, topic: 'Graphs', difficulty: 'Medium', name: 'Course Schedule II', link: 'https://leetcode.com/problems/course-schedule-ii/', pattern: 'Topological Sort' },
  { id: 173, day: 38, topic: 'Graphs', difficulty: 'Medium', name: 'Number of Connected Components in Undirected Graph', link: 'https://leetcode.com/problems/number-of-connected-components-in-undirected-graph/', pattern: 'Union Find / DFS' },
  { id: 174, day: 38, topic: 'Graphs', difficulty: 'Medium', name: 'Graph Valid Tree', link: 'https://leetcode.com/problems/graph-valid-tree/', pattern: 'Union Find / DFS' },
  { id: 175, day: 38, topic: 'Graphs', difficulty: 'Hard', name: 'Word Ladder II', link: 'https://leetcode.com/problems/word-ladder-ii/', pattern: 'BFS + Backtracking' },
  { id: 176, day: 39, topic: 'Graphs', difficulty: 'Medium', name: 'Find Eventual Safe States', link: 'https://leetcode.com/problems/find-eventual-safe-states/', pattern: 'DFS / Topological Sort' },
  { id: 177, day: 39, topic: 'Graphs', difficulty: 'Hard', name: 'Alien Dictionary', link: 'https://leetcode.com/problems/alien-dictionary/', pattern: 'Topological Sort' },
  { id: 178, day: 39, topic: 'Graphs', difficulty: 'Medium', name: 'Redundant Connection', link: 'https://leetcode.com/problems/redundant-connection/', pattern: 'Union Find' },
  { id: 179, day: 39, topic: 'Graphs', difficulty: 'Hard', name: 'Number of Operations to Make Network Connected', link: 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/', pattern: 'Union Find' },
  { id: 180, day: 40, topic: 'Graphs', difficulty: 'Medium', name: 'All Paths From Source to Target', link: 'https://leetcode.com/problems/all-paths-from-source-to-target/', pattern: 'DFS' },
  { id: 181, day: 40, topic: 'Graphs', difficulty: 'Hard', name: 'Critical Connections in a Network', link: 'https://leetcode.com/problems/critical-connections-in-a-network/', pattern: 'Tarjan\'s Algorithm' },
  { id: 182, day: 40, topic: 'Graphs', difficulty: 'Medium', name: 'Is Graph Bipartite?', link: 'https://leetcode.com/problems/is-graph-bipartite?/', pattern: 'BFS / DFS' },
  { id: 183, day: 40, topic: 'Graphs', difficulty: 'Medium', name: 'Evaluate Division', link: 'https://leetcode.com/problems/evaluate-division/', pattern: 'Graph + BFS' },
  { id: 184, day: 41, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Network Delay Time', link: 'https://leetcode.com/problems/network-delay-time/', pattern: 'Dijkstra' },
  { id: 185, day: 41, topic: 'Advanced Graphs', difficulty: 'Medium', name: 'Swim in Rising Water', link: 'https://leetcode.com/problems/swim-in-rising-water/', pattern: 'Dijkstra / Binary Search' },
  { id: 186, day: 41, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Cheapest Flights Within K Stops', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', pattern: 'Bellman-Ford' },
  { id: 187, day: 41, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Reconstruct Itinerary', link: 'https://leetcode.com/problems/reconstruct-itinerary/', pattern: 'Hierholzer\'s Algorithm' },
  { id: 188, day: 42, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Min Cost to Connect All Points', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', pattern: 'Prim\'s / Kruskal\'s' },
  { id: 189, day: 42, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Find Critical and Pseudo-Critical Edges in MST', link: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-mst/', pattern: 'Kruskal\'s' },
  { id: 190, day: 42, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Path With Minimum Effort', link: 'https://leetcode.com/problems/path-with-minimum-effort/', pattern: 'Dijkstra / Binary Search' },
  { id: 191, day: 42, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Longest Increasing Path in a Matrix', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', pattern: 'DFS + Memoization' },
  { id: 192, day: 42, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Frog Jump', link: 'https://leetcode.com/problems/frog-jump/', pattern: 'DP + Graph' },
  { id: 193, day: 42, topic: 'Advanced Graphs', difficulty: 'Hard', name: 'Jump Game IV', link: 'https://leetcode.com/problems/jump-game-iv/', pattern: 'BFS' },
  { id: 194, day: 43, topic: '1-D Dynamic Programming', difficulty: 'Easy', name: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs/', pattern: 'DP' },
  { id: 195, day: 43, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Min Cost Climbing Stairs', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/', pattern: 'DP' },
  { id: 196, day: 43, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'House Robber', link: 'https://leetcode.com/problems/house-robber/', pattern: 'DP' },
  { id: 197, day: 43, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'House Robber II', link: 'https://leetcode.com/problems/house-robber-ii/', pattern: 'DP (Circular)' },
  { id: 198, day: 44, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring/', pattern: 'DP / Expand Around Center' },
  { id: 199, day: 44, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Palindromic Substrings', link: 'https://leetcode.com/problems/palindromic-substrings/', pattern: 'DP' },
  { id: 200, day: 44, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Decode Ways', link: 'https://leetcode.com/problems/decode-ways/', pattern: 'DP' },
  { id: 201, day: 44, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Coin Change', link: 'https://leetcode.com/problems/coin-change/', pattern: 'DP (Unbounded Knapsack)' },
  { id: 202, day: 45, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Maximum Product Subarray', link: 'https://leetcode.com/problems/maximum-product-subarray/', pattern: 'DP' },
  { id: 203, day: 45, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Word Break', link: 'https://leetcode.com/problems/word-break/', pattern: 'DP' },
  { id: 204, day: 45, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Longest Increasing Subsequence', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', pattern: 'DP / Binary Search' },
  { id: 205, day: 45, topic: '1-D Dynamic Programming', difficulty: 'Hard', name: 'Partition Equal Subset Sum', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', pattern: '0/1 Knapsack DP' },
  { id: 206, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Hard', name: 'Jump Game II', link: 'https://leetcode.com/problems/jump-game-ii/', pattern: 'Greedy / DP' },
  { id: 207, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Hard', name: 'Perfect Squares', link: 'https://leetcode.com/problems/perfect-squares/', pattern: 'BFS / DP' },
  { id: 208, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Hard', name: 'Ugly Number II', link: 'https://leetcode.com/problems/ugly-number-ii/', pattern: 'DP' },
  { id: 209, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Counting Bits', link: 'https://leetcode.com/problems/counting-bits/', pattern: 'DP + Bit' },
  { id: 210, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Maximum Alternating Subsequence Length', link: 'https://leetcode.com/problems/maximum-alternating-subsequence-length/', pattern: 'DP' },
  { id: 211, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Wiggle Subsequence', link: 'https://leetcode.com/problems/wiggle-subsequence/', pattern: 'DP / Greedy' },
  { id: 212, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Medium', name: 'Arithmetic Slices', link: 'https://leetcode.com/problems/arithmetic-slices/', pattern: 'DP' },
  { id: 213, day: 46, topic: '1-D Dynamic Programming', difficulty: 'Hard', name: 'Student Attendance Record II', link: 'https://leetcode.com/problems/student-attendance-record-ii/', pattern: 'DP' },
  { id: 214, day: 47, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Unique Paths', link: 'https://leetcode.com/problems/unique-paths/', pattern: '2D DP' },
  { id: 215, day: 47, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Longest Common Subsequence', link: 'https://leetcode.com/problems/longest-common-subsequence/', pattern: '2D DP' },
  { id: 216, day: 47, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Best Time to Buy and Sell Stock with Cooldown', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', pattern: 'DP with States' },
  { id: 217, day: 47, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Coin Change II', link: 'https://leetcode.com/problems/coin-change-ii/', pattern: '2D DP (Knapsack)' },
  { id: 218, day: 48, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Target Sum', link: 'https://leetcode.com/problems/target-sum/', pattern: '2D DP / DFS' },
  { id: 219, day: 48, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Interleaving String', link: 'https://leetcode.com/problems/interleaving-string/', pattern: '2D DP' },
  { id: 220, day: 48, topic: '2-D Dynamic Programming', difficulty: 'Hard', name: 'Longest Increasing Path in a Matrix', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', pattern: 'DP + DFS' },
  { id: 221, day: 48, topic: '2-D Dynamic Programming', difficulty: 'Hard', name: 'Distinct Subsequences', link: 'https://leetcode.com/problems/distinct-subsequences/', pattern: '2D DP' },
  { id: 222, day: 49, topic: '2-D Dynamic Programming', difficulty: 'Hard', name: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance/', pattern: '2D DP' },
  { id: 223, day: 49, topic: '2-D Dynamic Programming', difficulty: 'Hard', name: 'Burst Balloons', link: 'https://leetcode.com/problems/burst-balloons/', pattern: 'Interval DP' },
  { id: 224, day: 49, topic: '2-D Dynamic Programming', difficulty: 'Hard', name: 'Regular Expression Matching', link: 'https://leetcode.com/problems/regular-expression-matching/', pattern: '2D DP' },
  { id: 225, day: 49, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Triangle', link: 'https://leetcode.com/problems/triangle/', pattern: '2D DP' },
  { id: 226, day: 49, topic: '2-D Dynamic Programming', difficulty: 'Medium', name: 'Minimum Path Sum', link: 'https://leetcode.com/problems/minimum-path-sum/', pattern: '2D DP' },
  { id: 227, day: 49, topic: '2-D Dynamic Programming', difficulty: 'Hard', name: 'Wildcard Matching', link: 'https://leetcode.com/problems/wildcard-matching/', pattern: '2D DP' },
  { id: 228, day: 49, topic: '2-D Dynamic Programming', difficulty: 'Hard', name: 'Maximal Rectangle', link: 'https://leetcode.com/problems/maximal-rectangle/', pattern: 'Stack / DP' },
  { id: 229, day: 50, topic: 'Greedy', difficulty: 'Easy', name: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray/', pattern: 'Kadane\'s' },
  { id: 230, day: 50, topic: 'Greedy', difficulty: 'Medium', name: 'Jump Game', link: 'https://leetcode.com/problems/jump-game/', pattern: 'Greedy' },
  { id: 231, day: 50, topic: 'Greedy', difficulty: 'Medium', name: 'Jump Game II', link: 'https://leetcode.com/problems/jump-game-ii/', pattern: 'Greedy' },
  { id: 232, day: 50, topic: 'Greedy', difficulty: 'Medium', name: 'Gas Station', link: 'https://leetcode.com/problems/gas-station/', pattern: 'Greedy' },
  { id: 233, day: 51, topic: 'Greedy', difficulty: 'Medium', name: 'Hand of Straights', link: 'https://leetcode.com/problems/hand-of-straights/', pattern: 'Greedy' },
  { id: 234, day: 51, topic: 'Greedy', difficulty: 'Medium', name: 'Merge Triplets to Form Target Triplet', link: 'https://leetcode.com/problems/merge-triplets-to-form-target-triplet/', pattern: 'Greedy' },
  { id: 235, day: 51, topic: 'Greedy', difficulty: 'Medium', name: 'Partition Labels', link: 'https://leetcode.com/problems/partition-labels/', pattern: 'Greedy' },
  { id: 236, day: 51, topic: 'Greedy', difficulty: 'Medium', name: 'Valid Parenthesis String', link: 'https://leetcode.com/problems/valid-parenthesis-string/', pattern: 'Greedy / DP' },
  { id: 237, day: 52, topic: 'Greedy', difficulty: 'Hard', name: 'Candy', link: 'https://leetcode.com/problems/candy/', pattern: 'Greedy' },
  { id: 238, day: 52, topic: 'Greedy', difficulty: 'Hard', name: 'Task Scheduler', link: 'https://leetcode.com/problems/task-scheduler/', pattern: 'Greedy + Heap' },
  { id: 239, day: 52, topic: 'Greedy', difficulty: 'Hard', name: 'Minimum Number of Arrows to Burst Balloons', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', pattern: 'Greedy + Intervals' },
  { id: 240, day: 52, topic: 'Greedy', difficulty: 'Medium', name: 'Non-overlapping Intervals', link: 'https://leetcode.com/problems/non-overlapping-intervals/', pattern: 'Greedy' },
  { id: 241, day: 52, topic: 'Greedy', difficulty: 'Medium', name: 'Queue Reconstruction by Height', link: 'https://leetcode.com/problems/queue-reconstruction-by-height/', pattern: 'Greedy' },
  { id: 242, day: 52, topic: 'Greedy', difficulty: 'Hard', name: 'IPO', link: 'https://leetcode.com/problems/ipo/', pattern: 'Greedy + Heap' },
  { id: 243, day: 52, topic: 'Greedy', difficulty: 'Medium', name: 'Two City Scheduling', link: 'https://leetcode.com/problems/two-city-scheduling/', pattern: 'Greedy' },
  { id: 244, day: 53, topic: 'Bit Manipulation', difficulty: 'Easy', name: 'Single Number', link: 'https://leetcode.com/problems/single-number/', pattern: 'XOR' },
  { id: 245, day: 53, topic: 'Bit Manipulation', difficulty: 'Easy', name: 'Number of 1 Bits', link: 'https://leetcode.com/problems/number-of-1-bits/', pattern: 'Bit Counting' },
  { id: 246, day: 53, topic: 'Bit Manipulation', difficulty: 'Easy', name: 'Counting Bits', link: 'https://leetcode.com/problems/counting-bits/', pattern: 'DP + Bit' },
  { id: 247, day: 53, topic: 'Bit Manipulation', difficulty: 'Easy', name: 'Reverse Bits', link: 'https://leetcode.com/problems/reverse-bits/', pattern: 'Bit Manipulation' },
  { id: 248, day: 54, topic: 'Bit Manipulation', difficulty: 'Easy', name: 'Missing Number', link: 'https://leetcode.com/problems/missing-number/', pattern: 'XOR / Math' },
  { id: 249, day: 54, topic: 'Bit Manipulation', difficulty: 'Medium', name: 'Sum of Two Integers', link: 'https://leetcode.com/problems/sum-of-two-integers/', pattern: 'Bit Manipulation' },
  { id: 250, day: 54, topic: 'Bit Manipulation', difficulty: 'Medium', name: 'Reverse Integer', link: 'https://leetcode.com/problems/reverse-integer/', pattern: 'Bit / Math' },
  { id: 251, day: 54, topic: 'Bit Manipulation', difficulty: 'Hard', name: 'Reverse Bits', link: 'https://leetcode.com/problems/reverse-bits/', pattern: 'Bit Manipulation' },
  { id: 252, day: 54, topic: 'Bit Manipulation', difficulty: 'Medium', name: 'Single Number II', link: 'https://leetcode.com/problems/single-number-ii/', pattern: 'Bit Manipulation' },
  { id: 253, day: 54, topic: 'Bit Manipulation', difficulty: 'Hard', name: 'Maximum XOR of Two Numbers in an Array', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', pattern: 'Trie / Bit' },
  { id: 254, day: 55, topic: 'Math & Geometry', difficulty: 'Medium', name: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image/', pattern: 'Matrix' },
  { id: 255, day: 55, topic: 'Math & Geometry', difficulty: 'Medium', name: 'Spiral Matrix', link: 'https://leetcode.com/problems/spiral-matrix/', pattern: 'Matrix Traversal' },
  { id: 256, day: 55, topic: 'Math & Geometry', difficulty: 'Medium', name: 'Set Matrix Zeroes', link: 'https://leetcode.com/problems/set-matrix-zeroes/', pattern: 'In-place Matrix' },
  { id: 257, day: 55, topic: 'Math & Geometry', difficulty: 'Easy', name: 'Happy Number', link: 'https://leetcode.com/problems/happy-number/', pattern: 'Fast-Slow Pointer / Math' },
  { id: 258, day: 56, topic: 'Math & Geometry', difficulty: 'Easy', name: 'Plus One', link: 'https://leetcode.com/problems/plus-one/', pattern: 'Math' },
  { id: 259, day: 56, topic: 'Math & Geometry', difficulty: 'Medium', name: 'Pow(x, n)', link: 'https://leetcode.com/problems/powx-n/', pattern: 'Fast Exponentiation' },
  { id: 260, day: 56, topic: 'Math & Geometry', difficulty: 'Medium', name: 'Multiply Strings', link: 'https://leetcode.com/problems/multiply-strings/', pattern: 'String Math' },
  { id: 261, day: 56, topic: 'Math & Geometry', difficulty: 'Hard', name: 'Basic Calculator', link: 'https://leetcode.com/problems/basic-calculator/', pattern: 'Stack' },
  { id: 262, day: 56, topic: 'Math & Geometry', difficulty: 'Medium', name: 'Detect Squares', link: 'https://leetcode.com/problems/detect-squares/', pattern: 'Math + Hash' },
  { id: 263, day: 56, topic: 'Math & Geometry', difficulty: 'Easy', name: 'Palindrome Number', link: 'https://leetcode.com/problems/palindrome-number/', pattern: 'Math' },
  { id: 264, day: 57, topic: 'Intervals', difficulty: 'Easy', name: 'Meeting Rooms', link: 'https://leetcode.com/problems/meeting-rooms/', pattern: 'Sorting' },
  { id: 265, day: 57, topic: 'Intervals', difficulty: 'Medium', name: 'Meeting Rooms II', link: 'https://leetcode.com/problems/meeting-rooms-ii/', pattern: 'Heap / Sorting' },
  { id: 266, day: 57, topic: 'Intervals', difficulty: 'Medium', name: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals/', pattern: 'Sorting' },
  { id: 267, day: 57, topic: 'Intervals', difficulty: 'Medium', name: 'Insert Interval', link: 'https://leetcode.com/problems/insert-interval/', pattern: 'Greedy' },
  { id: 268, day: 58, topic: 'Intervals', difficulty: 'Medium', name: 'Non-overlapping Intervals', link: 'https://leetcode.com/problems/non-overlapping-intervals/', pattern: 'Greedy' },
  { id: 269, day: 58, topic: 'Intervals', difficulty: 'Medium', name: 'Minimum Number of Arrows to Burst Balloons', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', pattern: 'Greedy' },
  { id: 270, day: 58, topic: 'Intervals', difficulty: 'Hard', name: 'Employee Free Time', link: 'https://leetcode.com/problems/employee-free-time/', pattern: 'Heap / Sorting' },
  { id: 271, day: 58, topic: 'Intervals', difficulty: 'Medium', name: 'Interval List Intersections', link: 'https://leetcode.com/problems/interval-list-intersections/', pattern: 'Two Pointer' },
  { id: 272, day: 58, topic: 'Intervals', difficulty: 'Hard', name: 'Minimum Interval to Include Each Query', link: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/', pattern: 'Heap + Sorting' },
  { id: 273, day: 58, topic: 'Intervals', difficulty: 'Medium', name: 'Data Stream as Disjoint Intervals', link: 'https://leetcode.com/problems/data-stream-as-disjoint-intervals/', pattern: 'Intervals / BST' },
  { id: 274, day: 59, topic: 'Sorting Algorithms', difficulty: 'Medium', name: 'Sort an Array', link: 'https://leetcode.com/problems/sort-an-array/', pattern: 'Merge Sort / Quick Sort' },
  { id: 275, day: 59, topic: 'Sorting Algorithms', difficulty: 'Medium', name: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', pattern: 'QuickSelect' },
  { id: 276, day: 59, topic: 'Sorting Algorithms', difficulty: 'Easy', name: 'Merge Sorted Array', link: 'https://leetcode.com/problems/merge-sorted-array/', pattern: 'Two Pointer Merge' },
  { id: 277, day: 59, topic: 'Sorting Algorithms', difficulty: 'Medium', name: 'Find K Pairs with Smallest Sums', link: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/', pattern: 'Heap Sort' },
  { id: 278, day: 60, topic: 'Sorting Algorithms', difficulty: 'Hard', name: 'Count of Smaller Numbers After Self', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', pattern: 'Merge Sort / BIT' },
  { id: 279, day: 60, topic: 'Sorting Algorithms', difficulty: 'Hard', name: 'Reverse Pairs', link: 'https://leetcode.com/problems/reverse-pairs/', pattern: 'Merge Sort' },
  { id: 280, day: 60, topic: 'Sorting Algorithms', difficulty: 'Hard', name: 'Count of Range Sum', link: 'https://leetcode.com/problems/count-of-range-sum/', pattern: 'Merge Sort' },
  { id: 281, day: 61, topic: 'Strings', difficulty: 'Easy', name: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome/', pattern: 'Two Pointer' },
  { id: 282, day: 61, topic: 'Strings', difficulty: 'Easy', name: 'Reverse String', link: 'https://leetcode.com/problems/reverse-string/', pattern: 'Two Pointer' },
  { id: 283, day: 61, topic: 'Strings', difficulty: 'Easy', name: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram/', pattern: 'Hashing' },
  { id: 284, day: 61, topic: 'Strings', difficulty: 'Easy', name: 'First Unique Character in a String', link: 'https://leetcode.com/problems/first-unique-character-in-a-string/', pattern: 'Hash Map' },
  { id: 285, day: 61, topic: 'Strings', difficulty: 'Easy', name: 'Longest Common Prefix', link: 'https://leetcode.com/problems/longest-common-prefix/', pattern: 'String Traversal' },
  { id: 286, day: 62, topic: 'Strings', difficulty: 'Medium', name: 'Longest Substring Without Repeating Chars', link: 'https://leetcode.com/problems/longest-substring-without-repeating-chars/', pattern: 'Sliding Window' },
  { id: 287, day: 62, topic: 'Strings', difficulty: 'Medium', name: 'Longest Repeating Character Replacement', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', pattern: 'Sliding Window' },
  { id: 288, day: 62, topic: 'Strings', difficulty: 'Medium', name: 'Permutation in String', link: 'https://leetcode.com/problems/permutation-in-string/', pattern: 'Sliding Window + Hash' },
  { id: 289, day: 62, topic: 'Strings', difficulty: 'Hard', name: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', pattern: 'Sliding Window' },
  { id: 290, day: 62, topic: 'Strings', difficulty: 'Hard', name: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', pattern: 'Deque / Monotonic Queue' },
  { id: 291, day: 63, topic: 'Strings', difficulty: 'Medium', name: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', pattern: 'Hashing' },
  { id: 292, day: 63, topic: 'Strings', difficulty: 'Medium', name: 'Encode and Decode Strings', link: 'https://leetcode.com/problems/encode-and-decode-strings/', pattern: 'String Design' },
  { id: 293, day: 63, topic: 'Strings', difficulty: 'Medium', name: 'String to Integer (atoi)', link: 'https://leetcode.com/problems/string-to-integer-atoi/', pattern: 'Parsing' },
  { id: 294, day: 63, topic: 'Strings', difficulty: 'Medium', name: 'Decode String', link: 'https://leetcode.com/problems/decode-string/', pattern: 'Stack' },
  { id: 295, day: 63, topic: 'Strings', difficulty: 'Hard', name: 'Regular Expression Matching', link: 'https://leetcode.com/problems/regular-expression-matching/', pattern: 'DP / Recursion' },
  { id: 296, day: 64, topic: 'Strings', difficulty: 'Medium', name: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring/', pattern: 'Expand Around Center / DP' },
  { id: 297, day: 64, topic: 'Strings', difficulty: 'Medium', name: 'Palindromic Substrings', link: 'https://leetcode.com/problems/palindromic-substrings/', pattern: 'Expand Around Center' },
  { id: 298, day: 64, topic: 'Strings', difficulty: 'Medium', name: 'Longest Common Subsequence', link: 'https://leetcode.com/problems/longest-common-subsequence/', pattern: '2D DP' },
  { id: 299, day: 64, topic: 'Strings', difficulty: 'Hard', name: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance/', pattern: '2D DP' },
  { id: 300, day: 64, topic: 'Strings', difficulty: 'Hard', name: 'Wildcard Matching', link: 'https://leetcode.com/problems/wildcard-matching/', pattern: '2D DP' },
  { id: 301, day: 65, topic: 'Strings', difficulty: 'Medium', name: 'Word Break', link: 'https://leetcode.com/problems/word-break/', pattern: 'DP / BFS' },
  { id: 302, day: 65, topic: 'Strings', difficulty: 'Medium', name: 'Find All Anagrams in a String', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', pattern: 'Sliding Window' },
  { id: 303, day: 65, topic: 'Strings', difficulty: 'Hard', name: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', pattern: 'Sliding Window' },
  { id: 304, day: 65, topic: 'Strings', difficulty: 'Hard', name: 'Serialize and Deserialize Binary Tree', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', pattern: 'String + BFS' },
  { id: 305, day: 65, topic: 'Strings', difficulty: 'Hard', name: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', pattern: 'Stack (String parsing variant)' },
];

const PATTERNS = [
  { pattern: 'Two Pointers', usage: 'Use when array/string is sorted or needs pair/triplet finding', problems: '3Sum, Container With Most Water', time: 'O(n)', space: 'O(1)' },
  { pattern: 'Sliding Window', usage: 'Fixed or variable window over sequential data', problems: 'Longest Substring, Min Window Substring', time: 'O(n)', space: 'O(k)' },
  { pattern: 'Fast & Slow Pointers', usage: 'Cycle detection, middle of list', problems: 'Linked List Cycle, Middle of Linked List', time: 'O(n)', space: 'O(1)' },
  { pattern: 'Binary Search', usage: 'Sorted array or monotonic condition', problems: 'Search in Rotated Array, Koko Eating Bananas', time: 'O(log n)', space: 'O(1)' },
  { pattern: 'Hash Map / Set', usage: 'Frequency count, quick lookup', problems: 'Two Sum, Group Anagrams', time: 'O(n)', space: 'O(n)' },
];

// Build smart day->questions map (days 61-65 compressed into day 60)
const DAY_QUESTIONS = {};
INITIAL_QUESTIONS.forEach(q => {
  const mappedDay = q.day > 60 ? 60 : q.day;
  if (!DAY_QUESTIONS[mappedDay]) DAY_QUESTIONS[mappedDay] = [];
  DAY_QUESTIONS[mappedDay].push(q);
});

const DAILY_PLAN = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  const qs = DAY_QUESTIONS[day] || [];
  const topicSet = [...new Set(qs.map(q => q.topic))];
  return { day, topic: topicSet.join(' + '), questions: qs };
});

const WEEKLY_PLAN = Array.from({ length: 9 }, (_, i) => {
  const startDay = i * 7 + 1;
  const endDay = Math.min((i + 1) * 7, 60);
  const weekQs = INITIAL_QUESTIONS.filter(q => {
    const d = q.day > 60 ? 60 : q.day;
    return d >= startDay && d <= endDay;
  });
  const topics = [...new Set(weekQs.map(q => q.topic))];
  return {
    week: `Week ${i + 1}`,
    startDay,
    endDay,
    days: `Day ${startDay}–${endDay}`,
    topics,
    targetCount: weekQs.length,
    questionIds: weekQs.map(q => q.id),
  };
});

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authError, setAuthError] = useState(null);
  
  // Data States
  const [questionsProgress, setQuestionsProgress] = useState({});
  const [plannerProgress, setPlannerProgress] = useState({});
  const [revisionLogs, setRevisionLogs] = useState({});
  const [weeklyReviews, setWeeklyReviews] = useState({});
  const [solutions, setSolutions] = useState({});

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Sign-in error:", err);
      setAuthError("Sign-in failed. Please try again.");
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setQuestionsProgress({});
      setPlannerProgress({});
      setRevisionLogs({});
      setWeeklyReviews({});
      setSolutions({});
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  // Data Fetching
  useEffect(() => {
    if (!user) return;

    const collections = ['questionsProgress', 'plannerProgress', 'revisionLogs', 'weeklyReviews', 'solutions'];
    const setters = {
      questionsProgress: setQuestionsProgress,
      plannerProgress: setPlannerProgress,
      revisionLogs: setRevisionLogs,
      weeklyReviews: setWeeklyReviews,
      solutions: setSolutions
    };

    const unsubscribes = collections.map(colName => {
      const q = collection(db, 'artifacts', appId, 'users', user.uid, colName);
      return onSnapshot(q, (snapshot) => {
        const data = {};
        snapshot.forEach(doc => {
          data[doc.id] = doc.data();
        });
        setters[colName](data);
      }, (err) => {
        console.error(`Error fetching ${colName}:`, err);
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [user]);

  // Save Handlers
  const saveData = async (colName, docId, data) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', user.uid, colName, String(docId));
      await setDoc(docRef, data, { merge: true });
    } catch (err) {
      console.error(`Error saving ${colName}:`, err);
    }
  };

  const deleteData = async (colName, docId) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'artifacts', appId, 'users', user.uid, colName, String(docId));
      await deleteDoc(docRef);
    } catch (err) {
      console.error(`Error deleting ${colName}:`, err);
    }
  };

  // Loading Screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-center border border-gray-400 bg-white p-10 shadow-sm">
          <div className="text-2xl font-bold text-[#2c3e50] mb-2">DSA MASTERY TRACKER</div>
          <div className="text-gray-500 text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-center border-2 border-gray-400 bg-white p-12 shadow-sm w-[420px]">
          <h1 className="text-3xl font-bold text-[#2c3e50] tracking-wider mb-2">DSA MASTERY TRACKER</h1>
          <p className="text-gray-500 text-sm mb-8">FAANG Interview Preparation | 305 Questions | 60 Days</p>
          
          <div className="border-t border-gray-300 pt-8">
            <p className="text-sm font-bold text-gray-700 mb-1 uppercase">Sign in to sync your progress</p>
            <p className="text-xs text-gray-500 mb-6">Your data will be saved online and accessible on any device.</p>
            
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-800 px-6 py-3 font-bold text-gray-800 hover:bg-gray-100 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign in with Google
            </button>

            {authError && (
              <p className="mt-4 text-red-600 text-xs font-bold border border-red-300 bg-red-50 p-2">{authError}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main App (authenticated)
  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans text-gray-900">
      {/* Header - Classic styling, solid colors */}
      <header className="bg-[#2c3e50] text-white border-b-4 border-[#1a252f] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-wider">DSA MASTERY TRACKER</h1>
          <p className="text-sm text-gray-300">FAANG Interview Preparation | 305 Questions | 60 Days</p>
        </div>
        <div className="text-right text-xs flex flex-col items-end gap-2">
          <span className="text-green-400 font-bold"></span>
          <div className="flex items-center gap-2">
            <span className="text-gray-300">{user.displayName || user.email}</span>
            <button
              onClick={handleSignOut}
              className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 text-xs font-bold border border-red-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Classic boxed layout */}
      <nav className="bg-[#34495e] px-4 pt-2 border-b border-gray-400 flex flex-wrap gap-1">
        {[
          { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'questions', icon: ListTodo, label: 'Questions' },
          { id: 'planner', icon: Calendar, label: 'Daily Planner' },
          { id: 'revision', icon: RotateCcw, label: 'Revision Log' },
          { id: 'patterns', icon: BookOpen, label: 'Patterns' },
          { id: 'weekly', icon: BarChart, label: 'Weekly Review' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 text-sm font-bold rounded-t-sm border border-b-0 ${
              activeTab === tab.id 
                ? 'bg-[#ecf0f1] text-[#2c3e50] border-gray-400' 
                : 'bg-[#7f8c8d] text-white border-transparent hover:bg-[#95a5a6]'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="p-6">
        <div className="bg-white border border-gray-400 p-6 min-h-[70vh] shadow-sm">
          {activeTab === 'dashboard' && <DashboardTab questionsProgress={questionsProgress} />}
          {activeTab === 'questions' && <QuestionsTab questionsProgress={questionsProgress} solutions={solutions} onSave={(id, data) => saveData('questionsProgress', id, data)} onRevisionSave={(id, data) => saveData('revisionLogs', id, data)} onSolutionSave={(id, data) => saveData('solutions', id, data)} onSolutionDelete={(id) => deleteData('solutions', id)} user={user} />}
          {activeTab === 'planner' && <PlannerTab plannerProgress={plannerProgress} questionsProgress={questionsProgress} onSave={(id, data) => saveData('plannerProgress', id, data)} />}
          {activeTab === 'revision' && <RevisionTab revisionLogs={revisionLogs} onSave={(id, data) => saveData('revisionLogs', id, data)} onDelete={(id) => deleteData('revisionLogs', id)} />}
          {activeTab === 'patterns' && <PatternsTab />}
          {activeTab === 'weekly' && <WeeklyTab weeklyReviews={weeklyReviews} questionsProgress={questionsProgress} onSave={(id, data) => saveData('weeklyReviews', id, data)} />}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// TABS COMPONENTS (Classic Theme Enforced)
// ==========================================

function DashboardTab({ questionsProgress }) {
  const totalQuestions = 305;
  
  const stats = useMemo(() => {
    let done = 0;
    let revisit = 0;
    
    Object.values(questionsProgress).forEach(q => {
      if (q.status === '✅ Done') done++;
      if (q.revisit === '🔄 Revisit') revisit++;
    });

    return {
      done,
      remaining: totalQuestions - done,
      revisit,
      percent: ((done / totalQuestions) * 100).toFixed(1)
    };
  }, [questionsProgress]);

  return (
    <div>
      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-6 uppercase tracking-wide text-gray-800">Overview & Stats</h2>
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: '📦 TOTAL', value: totalQuestions, color: 'text-blue-700' },
          { label: '✅ DONE', value: stats.done, color: 'text-green-700' },
          { label: '⏳ REMAINING', value: stats.remaining, color: 'text-orange-700' },
          { label: '🔄 REVISIT', value: stats.revisit, color: 'text-red-700' }
        ].map((stat, i) => (
          <div key={i} className="border border-gray-400 bg-gray-50 p-4 text-center">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2">{stat.label}</div>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <div className="w-full bg-gray-200 border border-gray-400 h-6">
          <div 
            className="bg-green-600 h-full text-xs text-white font-bold text-right pr-2 leading-6 transition-all duration-500"
            style={{ width: `${Math.max(stats.percent, 5)}%` }}
          >
            {stats.percent}% Complete
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wide text-gray-800">📊 Topic-Wise Progress</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2 text-left">TOPIC</th>
              <th className="border border-gray-400 p-2 text-center">TOTAL Qs</th>
              <th className="border border-gray-400 p-2 text-center">SOLVED</th>
              <th className="border border-gray-400 p-2 text-center">% DONE</th>
              <th className="border border-gray-400 p-2 text-center">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {TOPICS.map((topic, i) => {
              const solvedInTopic = Object.values(questionsProgress).filter(
                q => q.topic === topic.name && q.status === '✅ Done'
              ).length;
              const percent = ((solvedInTopic / topic.total) * 100).toFixed(0);
              
              let statusLabel = '🔴 Not Started';
              if (solvedInTopic === topic.total) statusLabel = '🟢 Completed';
              else if (solvedInTopic > 0) statusLabel = '🟡 In Progress';

              return (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="border border-gray-400 p-2 font-semibold">{topic.name}</td>
                  <td className="border border-gray-400 p-2 text-center">{topic.total}</td>
                  <td className="border border-gray-400 p-2 text-center font-bold">{solvedInTopic}</td>
                  <td className="border border-gray-400 p-2 text-center">{percent}%</td>
                  <td className="border border-gray-400 p-2 text-center text-xs font-bold">{statusLabel}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuestionsTab({ questionsProgress, solutions, onSave, onRevisionSave, onSolutionSave, onSolutionDelete, user }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [filterTopic, setFilterTopic] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [uploadingQId, setUploadingQId] = useState(null);
  const [viewingQId, setViewingQId] = useState(null);
  const [uploadCode, setUploadCode] = useState('');
  const [uploadLanguage, setUploadLanguage] = useState('java');
  const [copiedId, setCopiedId] = useState(null);

  const handleEdit = (q) => {
    const progress = questionsProgress[q.id] || {};
    setEditingId(q.id);
    setEditingQuestion(q);
    setEditForm({
      status: progress.status || '⬜ Pending',
      revisit: progress.revisit || '',
      attempts: progress.attempts || '',
      notes: progress.notes || '',
      topic: q.topic
    });
  };

  const handleSave = () => {
    onSave(editingId, editForm);
    // Auto-add to revision log when flagged
    if (editForm.revisit === '🔄 Revisit' && editingQuestion) {
      onRevisionSave(`q_${editingId}`, {
        questionName: editingQuestion.name,
        questionId: editingId,
        topic: editingQuestion.topic,
        difficulty: editingQuestion.difficulty,
        link: editingQuestion.link,
        autoAdded: true,
        flaggedAt: new Date().toISOString(),
        attempt1: '', attempt2: '', attempt3: '',
        mastered: 'No', notes: ''
      });
    }
    setEditingId(null);
    setEditingQuestion(null);
  };

  const handleUploadSolution = () => {
    if (!uploadCode.trim()) {
      alert('Please enter some code!');
      return;
    }
    
    const solutionId = `q_${uploadingQId}`;
    const question = INITIAL_QUESTIONS.find(q => q.id === uploadingQId);
    
    onSolutionSave(solutionId, {
      questionId: uploadingQId,
      questionName: question?.name || 'Unknown',
      code: uploadCode,
      language: uploadLanguage,
      uploadedAt: new Date().toISOString(),
      userId: user.uid,
      userEmail: user.email
    });
    
    setUploadingQId(null);
    setUploadCode('');
    setUploadLanguage('java');
    alert('Solution uploaded successfully! 🎉');
  };

  const handleDeleteSolution = (questionId) => {
    if (window.confirm('Are you sure you want to delete this solution? This action cannot be undone.')) {
      const solutionId = `q_${questionId}`;
      onSolutionDelete(solutionId);
      alert('Solution deleted!');
    }
  };

  const getSolution = (questionId) => {
    return solutions[`q_${questionId}`];
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(Date.now());
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allTopics = ['All', ...new Set(INITIAL_QUESTIONS.map(q => q.topic))];
  const filtered = INITIAL_QUESTIONS.filter(q => {
    const topicMatch = filterTopic === 'All' || q.topic === filterTopic;
    const diffMatch = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    return topicMatch && diffMatch;
  });

  return (
    <div>
      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wide text-gray-800">📋 Questions Tracker</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap items-end">
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Topic</label>
          <select className="border border-gray-400 p-2 text-sm bg-white" value={filterTopic} onChange={e => setFilterTopic(e.target.value)}>
            {allTopics.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">Difficulty</label>
          <select className="border border-gray-400 p-2 text-sm bg-white" value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}>
            {['All','Easy','Medium','Hard'].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="text-xs text-gray-500 pb-2">Showing <strong>{filtered.length}</strong> of {INITIAL_QUESTIONS.length} questions</div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-[#2c3e50] text-white">
              <th className="border border-gray-400 p-2 text-center w-10">#</th>
              <th className="border border-gray-400 p-2 text-center w-10">DAY</th>
              <th className="border border-gray-400 p-2 text-left">TOPIC</th>
              <th className="border border-gray-400 p-2 text-left">QUESTION NAME</th>
              <th className="border border-gray-400 p-2 text-center">DIFFICULTY</th>
              <th className="border border-gray-400 p-2 text-left">PATTERN</th>
              <th className="border border-gray-400 p-2 text-center">STATUS</th>
              <th className="border border-gray-400 p-2 text-center">REVISIT</th>
              <th className="border border-gray-400 p-2 text-center">SOLUTIONS</th>
              <th className="border border-gray-400 p-2 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(q => {
              const p = questionsProgress[q.id] || {};
              const isDone = p.status === '✅ Done';
              const needsRevisit = p.revisit === '🔄 Revisit';
              const isMastered = p.revisit === '✔️ Mastered';
              const hasSolution = !!getSolution(q.id);
              return (
                <tr key={q.id} className={`${isDone ? 'bg-green-50' : needsRevisit ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
                  <td className="border border-gray-400 p-2 text-center text-gray-400 text-xs">{q.id}</td>
                  <td className="border border-gray-400 p-2 text-center font-bold text-gray-600">{q.day}</td>
                  <td className="border border-gray-400 p-2 text-xs text-gray-700">{q.topic}</td>
                  <td className="border border-gray-400 p-2">
                    <a href={q.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">{q.name}</a>
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <span className={`px-2 py-1 text-xs font-bold border ${
                      q.difficulty === 'Easy' ? 'border-green-600 text-green-700 bg-green-100' :
                      q.difficulty === 'Medium' ? 'border-yellow-600 text-yellow-700 bg-yellow-100' :
                      'border-red-600 text-red-700 bg-red-100'
                    }`}>{q.difficulty}</span>
                  </td>
                  <td className="border border-gray-400 p-2 text-xs text-gray-500">{q.pattern}</td>
                  <td className="border border-gray-400 p-2 text-center font-bold text-sm">{p.status || '⬜ Pending'}</td>
                  <td className="border border-gray-400 p-2 text-center text-xs font-bold">
                    {needsRevisit ? <span className="text-red-600">🔄 Flagged</span> : isMastered ? <span className="text-green-600">✔️ Mastered</span> : ''}
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <div className="flex gap-1 justify-center flex-wrap">
                      <button 
                        onClick={() => { setUploadingQId(q.id); setUploadCode(''); }}
                        title="Upload/Update Solution"
                        className={`px-2 py-1 text-xs font-bold border rounded transition-colors ${
                          hasSolution 
                            ? 'bg-blue-100 text-blue-700 border-blue-400 hover:bg-blue-200' 
                            : 'bg-gray-100 text-gray-700 border-gray-400 hover:bg-gray-200'
                        }`}
                      >
                        <Upload className="w-3 h-3 inline mr-1" />
                        {hasSolution ? 'Update' : 'Upload'}
                      </button>
                      {hasSolution && (
                        <>
                          <button 
                            onClick={() => setViewingQId(q.id)}
                            title="View Solution"
                            className="px-2 py-1 text-xs font-bold bg-green-100 text-green-700 border border-green-400 hover:bg-green-200 rounded transition-colors"
                          >
                            <Eye className="w-3 h-3 inline mr-1" />
                            View
                          </button>
                          <button 
                            onClick={() => handleDeleteSolution(q.id)}
                            title="Delete Solution"
                            className="px-2 py-1 text-xs font-bold bg-red-100 text-red-700 border border-red-400 hover:bg-red-200 rounded transition-colors"
                          >
                            <Trash2 className="w-3 h-3 inline" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="border border-gray-400 p-2 text-center">
                    <button onClick={() => handleEdit(q)} className="bg-blue-600 text-white px-3 py-1 text-xs font-bold hover:bg-blue-700 border border-blue-800">Update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-gray-800 p-6 w-[520px] shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <h3 className="text-lg font-bold">Update Progress (Q#{editingId})</h3>
                {editingQuestion && <p className="text-xs text-gray-500 mt-0.5">{editingQuestion.name}</p>}
              </div>
              <button onClick={() => { setEditingId(null); setEditingQuestion(null); }} className="text-gray-500 hover:text-black font-bold text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Status</label>
                <select className="w-full border border-gray-400 p-2 bg-gray-50 text-sm" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}>
                  <option>⬜ Pending</option>
                  <option>🟡 In Progress</option>
                  <option>✅ Done</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Revisit Flag</label>
                <select className="w-full border border-gray-400 p-2 bg-gray-50 text-sm" value={editForm.revisit} onChange={(e) => setEditForm({...editForm, revisit: e.target.value})}>
                  <option value="">None</option>
                  <option>🔄 Revisit</option>
                  <option>✔️ Mastered</option>
                </select>
                {editForm.revisit === '🔄 Revisit' && (
                  <p className="text-xs text-orange-600 mt-1 font-bold">⚡ Will be auto-added to Revision Log.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Attempts</label>
                <input type="number" className="w-full border border-gray-400 p-2 bg-gray-50 text-sm" value={editForm.attempts} onChange={(e) => setEditForm({...editForm, attempts: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Notes / Approach</label>
                <textarea className="w-full border border-gray-400 p-2 bg-gray-50 text-sm h-24" value={editForm.notes} onChange={(e) => setEditForm({...editForm, notes: e.target.value})} placeholder="e.g. Use hash map to store complements..."></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => { setEditingId(null); setEditingQuestion(null); }} className="px-4 py-2 text-sm border border-gray-400 hover:bg-gray-100 font-bold">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 text-sm bg-green-600 text-white border border-green-800 hover:bg-green-700 font-bold">Save to Database</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Solution Modal */}
      {uploadingQId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-gray-800 p-6 w-[600px] shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <h3 className="text-lg font-bold">Upload/Update Solution</h3>
                <p className="text-xs text-gray-500 mt-0.5">Q#{uploadingQId}: {INITIAL_QUESTIONS.find(q => q.id === uploadingQId)?.name}</p>
              </div>
              <button onClick={() => { setUploadingQId(null); setUploadCode(''); }} className="text-gray-500 hover:text-black font-bold text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">Programming Language</label>
                <select 
                  value={uploadLanguage} 
                  onChange={(e) => setUploadLanguage(e.target.value)}
                  className="w-full border border-gray-400 p-2 bg-gray-50 text-sm"
                >
                  <option value="java">☕ Java</option>
                  <option value="python">🐍 Python</option>
                  <option value="cpp">⚙️ C++</option>
                  <option value="javascript">📜 JavaScript</option>
                  <option value="csharp">C#</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Your Solution Code</label>
                <textarea 
                  value={uploadCode}
                  onChange={(e) => setUploadCode(e.target.value)}
                  placeholder="Paste your solution code here...&#10;&#10;Example:&#10;class Solution {&#10;  public int[] twoSum(int[] nums, int target) {&#10;    // Your logic here&#10;  }&#10;}"
                  className="w-full border border-gray-400 p-3 bg-gray-50 text-sm font-mono h-64 focus:outline-none focus:bg-yellow-50"
                />
                <p className="text-xs text-gray-500 mt-1">📝 Tip: Include comments explaining your approach for better learning!</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button 
                onClick={() => { setUploadingQId(null); setUploadCode(''); }} 
                className="px-4 py-2 text-sm border border-gray-400 hover:bg-gray-100 font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={handleUploadSolution}
                className="px-4 py-2 text-sm bg-blue-600 text-white border border-blue-800 hover:bg-blue-700 font-bold flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Solution Modal */}
      {viewingQId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {(() => {
            const solution = getSolution(viewingQId);
            const question = INITIAL_QUESTIONS.find(q => q.id === viewingQId);
            return (
              <div className="bg-white border-2 border-gray-800 p-6 w-[700px] shadow-lg max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <div>
                    <h3 className="text-lg font-bold">Your Solution</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Q#{viewingQId}: {question?.name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Language: <span className="font-bold text-gray-600">{solution?.language?.toUpperCase()}</span>
                      {solution?.uploadedAt && ` • Uploaded: ${new Date(solution.uploadedAt).toLocaleDateString()}`}
                    </p>
                  </div>
                  <button onClick={() => setViewingQId(null)} className="text-gray-500 hover:text-black font-bold text-xl">✕</button>
                </div>
                
                <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs mb-4 overflow-x-auto border border-gray-700 max-h-[50vh]">
                  <pre className="whitespace-pre-wrap break-words">{solution?.code}</pre>
                </div>

                <div className="flex gap-2 justify-end">
                  <button 
                    onClick={() => copyToClipboard(solution?.code)}
                    className={`px-4 py-2 text-sm font-bold border rounded transition-colors flex items-center gap-2 ${
                      copiedId ? 'bg-green-100 text-green-700 border-green-400' : 'bg-gray-100 text-gray-700 border-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    {copiedId ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedId ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button 
                    onClick={() => setViewingQId(null)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white border border-blue-800 hover:bg-blue-700 font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function PlannerTab({ plannerProgress, questionsProgress, onSave }) {
  const [expandedDay, setExpandedDay] = useState(null);

  const handleInput = (day, field, value) => {
    const existing = plannerProgress[day] || {};
    onSave(day, { ...existing, [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wide text-gray-800">📅 Complete 60-Day Planner</h2>
      <p className="text-xs text-gray-500 mb-4">Click any row to expand and see the scheduled questions. Progress is auto-tracked from the Questions tab.</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-[#2c3e50] text-white">
              <th className="border border-gray-400 p-2 text-center w-12">DAY</th>
              <th className="border border-gray-400 p-2 text-left">TOPIC FOCUS</th>
              <th className="border border-gray-400 p-2 text-center w-16">TOTAL</th>
              <th className="border border-gray-400 p-2 text-center w-16">DONE</th>
              <th className="border border-gray-400 p-2 text-center w-32">PROGRESS</th>
              <th className="border border-gray-400 p-2 text-center w-20">MOOD</th>
              <th className="border border-gray-400 p-2 text-left">NOTES</th>
            </tr>
          </thead>
          <tbody>
            {DAILY_PLAN.map(plan => {
              const p = plannerProgress[plan.day] || {};
              const totalQs = plan.questions.length;
              const doneQs = plan.questions.filter(q => (questionsProgress[q.id] || {}).status === '✅ Done').length;
              const pct = totalQs > 0 ? Math.round((doneQs / totalQs) * 100) : 0;
              const isExpanded = expandedDay === plan.day;
              const isComplete = doneQs === totalQs && totalQs > 0;
              return (
                <React.Fragment key={plan.day}>
                  <tr
                    className={`cursor-pointer select-none ${isComplete ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                    onClick={() => setExpandedDay(isExpanded ? null : plan.day)}
                  >
                    <td className="border border-gray-400 p-2 text-center font-bold bg-gray-100">{plan.day}</td>
                    <td className="border border-gray-400 p-2 font-semibold text-gray-800">
                      <span className="mr-1 text-gray-400 text-xs">{isExpanded ? '▼' : '▶'}</span>{plan.topic || '—'}
                    </td>
                    <td className="border border-gray-400 p-2 text-center text-gray-600">{totalQs}</td>
                    <td className="border border-gray-400 p-2 text-center font-bold text-green-700">{doneQs}</td>
                    <td className="border border-gray-400 p-2">
                      <div className="w-full bg-gray-200 h-3 border border-gray-300">
                        <div className="bg-green-600 h-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="text-xs text-gray-500 text-center mt-0.5">{pct}%</div>
                    </td>
                    <td className="border border-gray-400 p-0" onClick={e => e.stopPropagation()}>
                      <select className="w-full h-full p-2 bg-transparent border-none focus:outline-none cursor-pointer text-center" value={p.mood || ''} onChange={(e) => handleInput(plan.day, 'mood', e.target.value)}>
                        <option value=""></option>
                        <option value="😊">😊</option>
                        <option value="😐">😐</option>
                        <option value="😫">😫</option>
                      </select>
                    </td>
                    <td className="border border-gray-400 p-0" onClick={e => e.stopPropagation()}>
                      <input type="text" className="w-full h-full p-2 bg-transparent border-none focus:outline-none focus:bg-yellow-50" value={p.notes || ''} placeholder="Any thoughts?" onChange={(e) => handleInput(plan.day, 'notes', e.target.value)} />
                    </td>
                  </tr>
                  {isExpanded && plan.questions.length > 0 && (
                    <tr>
                      <td colSpan="7" className="border border-gray-400 p-0 bg-gray-50">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="p-2 text-left w-8">ID</th>
                              <th className="p-2 text-left">QUESTION</th>
                              <th className="p-2 text-center w-20">DIFFICULTY</th>
                              <th className="p-2 text-left">PATTERN</th>
                              <th className="p-2 text-center w-24">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plan.questions.map(q => {
                              const qp = questionsProgress[q.id] || {};
                              return (
                                <tr key={q.id} className={qp.status === '✅ Done' ? 'bg-green-50' : 'hover:bg-white'}>
                                  <td className="p-2 text-gray-400">{q.id}</td>
                                  <td className="p-2"><a href={q.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-semibold">{q.name}</a></td>
                                  <td className={`p-2 text-center font-bold ${ q.difficulty === 'Easy' ? 'text-green-700' : q.difficulty === 'Medium' ? 'text-yellow-700' : 'text-red-700' }`}>{q.difficulty}</td>
                                  <td className="p-2 text-gray-500">{q.pattern}</td>
                                  <td className="p-2 text-center font-bold">{qp.status || '⬜ Pending'}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RevisionTab({ revisionLogs, onSave, onDelete }) {
  const [newLog, setNewLog] = useState('');

  const handleAdd = () => {
    if (!newLog.trim()) return;
    const id = `manual_${Date.now()}`;
    onSave(id, { questionName: newLog, autoAdded: false, attempt1: '', attempt2: '', attempt3: '', mastered: 'No', notes: '', topic: '', link: '' });
    setNewLog('');
  };

  const handleUpdate = (id, field, value) => {
    const existing = revisionLogs[id] || {};
    onSave(id, { ...existing, [field]: value });
  };

  const autoLogs = Object.entries(revisionLogs).filter(([_, l]) => l.autoAdded);
  const manualLogs = Object.entries(revisionLogs).filter(([_, l]) => !l.autoAdded);

  const renderTable = (entries, title, badge) => (
    <div className="mb-8">
      <h3 className="text-sm font-bold border-b border-gray-400 pb-1 mb-3 text-gray-700 uppercase tracking-wide">
        {badge} {title} <span className="text-xs font-normal text-gray-400 ml-1">({entries.length})</span>
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-[#2c3e50] text-white">
              <th className="border border-gray-400 p-2 text-left">QUESTION NAME</th>
              <th className="border border-gray-400 p-2 text-left w-32">TOPIC</th>
              <th className="border border-gray-400 p-2 text-center w-24">1ST TRY</th>
              <th className="border border-gray-400 p-2 text-center w-24">2ND TRY</th>
              <th className="border border-gray-400 p-2 text-center w-24">3RD TRY</th>
              <th className="border border-gray-400 p-2 text-center w-24">MASTERED?</th>
              <th className="border border-gray-400 p-2 text-left">NOTES</th>
              <th className="border border-gray-400 p-2 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr><td colSpan="8" className="p-4 text-center text-gray-400 italic">No entries yet.</td></tr>
            ) : entries.map(([id, log]) => (
              <tr key={id} className={`hover:bg-gray-50 ${log.mastered === 'Yes' ? 'bg-green-50' : ''}`}>
                <td className="border border-gray-400 p-2 font-semibold">
                  {log.link ? <a href={log.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{log.questionName}</a> : log.questionName}
                </td>
                <td className="border border-gray-400 p-2 text-xs text-gray-600">{log.topic || '—'}</td>
                {['attempt1','attempt2','attempt3'].map(a => (
                  <td key={a} className="border border-gray-400 p-0">
                    <input type="date" className="w-full h-full p-2 bg-transparent border-none text-xs focus:outline-none" value={log[a] || ''} onChange={(e) => handleUpdate(id, a, e.target.value)} />
                  </td>
                ))}
                <td className="border border-gray-400 p-0">
                  <select className="w-full h-full p-2 bg-transparent border-none text-center font-bold focus:outline-none cursor-pointer" value={log.mastered || 'No'} onChange={(e) => handleUpdate(id, 'mastered', e.target.value)}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </td>
                <td className="border border-gray-400 p-0">
                  <input type="text" className="w-full h-full p-2 bg-transparent border-none focus:outline-none" value={log.notes || ''} placeholder="Mistake details..." onChange={(e) => handleUpdate(id, 'notes', e.target.value)} />
                </td>
                <td className="border border-gray-400 p-0 text-center">
                  <button onClick={() => onDelete(id)} className="text-red-600 hover:bg-red-100 w-full h-full p-2 font-bold text-lg leading-none">×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wide text-gray-800">🔄 Revision & Weak Areas Log</h2>
      <div className="mb-6 flex gap-2">
        <input type="text" value={newLog} onChange={(e) => setNewLog(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} placeholder="Manually add question name to track..." className="border border-gray-400 p-2 text-sm w-72 bg-white" />
        <button onClick={handleAdd} className="bg-gray-800 text-white px-4 py-2 text-sm font-bold hover:bg-black border border-black">+ Add Manually</button>
      </div>
      {renderTable(autoLogs, 'Auto-Flagged for Revisit', '⚡')}
      {renderTable(manualLogs, 'Manually Added', '📝')}
    </div>
  );
}

function PatternsTab() {
  return (
    <div>
      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wide text-gray-800">📌 Pattern Cheatsheet (Java)</h2>
      
      <table className="w-full border-collapse border border-gray-400 text-sm">
        <thead>
          <tr className="bg-gray-200 border-b-2 border-gray-400">
            <th className="border border-gray-400 p-2 text-left w-48">PATTERN</th>
            <th className="border border-gray-400 p-2 text-left">WHEN TO USE</th>
            <th className="border border-gray-400 p-2 text-left">KEY PROBLEMS</th>
            <th className="border border-gray-400 p-2 text-center w-24">TIME</th>
            <th className="border border-gray-400 p-2 text-center w-24">SPACE</th>
          </tr>
        </thead>
        <tbody>
          {PATTERNS.map((p, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="border border-gray-400 p-2 font-bold bg-gray-100">{p.pattern}</td>
              <td className="border border-gray-400 p-2 text-gray-700">{p.usage}</td>
              <td className="border border-gray-400 p-2 text-gray-700 italic">{p.problems}</td>
              <td className="border border-gray-400 p-2 text-center font-mono text-xs bg-gray-50">{p.time}</td>
              <td className="border border-gray-400 p-2 text-center font-mono text-xs bg-gray-50">{p.space}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WeeklyTab({ weeklyReviews, questionsProgress, onSave }) {
  const handleUpdate = (week, field, value) => {
    const existing = weeklyReviews[week] || {};
    onSave(week, { ...existing, [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-2 mb-4 uppercase tracking-wide text-gray-800">📊 Weekly Auto-Summary & Review</h2>
      {WEEKLY_PLAN.map(plan => {
        const rev = weeklyReviews[plan.week] || {};
        const solved = plan.questionIds.filter(id => (questionsProgress[id] || {}).status === '✅ Done').length;
        const flagged = plan.questionIds.filter(id => (questionsProgress[id] || {}).revisit === '🔄 Revisit').length;
        const pct = plan.targetCount > 0 ? Math.round((solved / plan.targetCount) * 100) : 0;
        let badge = '🔴 Not Started'; let badgeCls = 'text-red-700 bg-red-100 border border-red-400';
        if (pct === 100) { badge = '🟢 Complete'; badgeCls = 'text-green-700 bg-green-100 border border-green-400'; }
        else if (pct > 0) { badge = '🟡 In Progress'; badgeCls = 'text-yellow-700 bg-yellow-100 border border-yellow-400'; }
        return (
          <div key={plan.week} className="mb-5 border border-gray-400 bg-white">
            <div className="bg-[#2c3e50] text-white px-4 py-2 flex items-center justify-between">
              <div>
                <span className="font-bold text-base">{plan.week}</span>
                <span className="ml-3 text-gray-300 text-sm">{plan.days}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 ${badgeCls}`}>{badge}</span>
            </div>
            {/* Auto stats */}
            <div className="grid grid-cols-5 border-b border-gray-300">
              {[
                { label: 'TARGET',    value: plan.targetCount,              cls: 'text-gray-700' },
                { label: 'SOLVED',    value: solved,                         cls: 'text-green-700 font-bold' },
                { label: 'REMAINING', value: plan.targetCount - solved,      cls: 'text-orange-700' },
                { label: '🔄 FLAGGED', value: flagged,                       cls: 'text-red-700' },
                { label: '% DONE',    value: `${pct}%`,                      cls: pct === 100 ? 'text-green-700 font-bold' : 'text-gray-700' },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 border-r border-gray-200 last:border-r-0">
                  <div className="text-xs text-gray-500 uppercase mb-1">{s.label}</div>
                  <div className={`text-xl ${s.cls}`}>{s.value}</div>
                </div>
              ))}
            </div>
            {/* Topics */}
            <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
              <span className="text-xs font-bold text-gray-500 uppercase mr-2">Topics:</span>
              {plan.topics.map(t => <span key={t} className="text-xs bg-gray-200 border border-gray-300 px-2 py-0.5 mr-1 font-semibold text-gray-700">{t}</span>)}
            </div>
            {/* Progress bar */}
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="w-full bg-gray-200 border border-gray-300 h-4">
                <div className="bg-green-600 h-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
            {/* Manual notes */}
            <div className="px-4 py-3 flex gap-2 items-center">
              <label className="text-xs font-bold text-gray-600 uppercase whitespace-nowrap">Your Notes:</label>
              <input type="text" className="flex-1 border border-gray-400 p-2 text-sm bg-white focus:outline-none focus:bg-yellow-50" value={rev.notes || ''} placeholder="Reflections, weak areas, topics to redo..." onChange={(e) => handleUpdate(plan.week, 'notes', e.target.value)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
