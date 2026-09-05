const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '../src/App.jsx'), 'utf8');
const match = src.match(/const INITIAL_QUESTIONS = (\[[\s\S]*?\n\];)/);
const qs = eval(match[1]);

const topicSchedule = [
  { topic: 'Arrays & Hashing', count: 25, days: [1, 2, 3, 4, 5], perDay: 5 },
  { topic: 'Strings', count: 25, days: [6, 7, 8, 9, 10], perDay: 5 },
  { topic: 'Two Pointers', count: 15, days: [11, 12, 13], perDay: 5 },
  { topic: 'Sliding Window', count: 15, days: [14, 15, 16], perDay: 5 },
  { topic: 'Stack', count: 15, days: [17, 18, 19], perDay: 5 },
  { topic: 'Binary Search', count: 15, days: [20, 21, 22], perDay: 5 },
  { topic: 'Linked List', count: 20, days: [23, 24, 25, 26], perDay: 5 },
  { topic: 'Trees', count: 20, days: [27, 28, 29, 30], perDay: 5 },
  { topic: 'Tries', count: 8, days: [31, 32], perDay: 4 },
  { topic: 'Heap / Priority Queue', count: 15, days: [33, 34, 35], perDay: 5 },
  { topic: 'Backtracking', count: 15, days: [36, 37, 38], perDay: 5 },
  { topic: 'Intervals', count: 10, days: [39, 40], perDay: 5 },
  { topic: 'Greedy', count: 15, days: [41, 42, 43], perDay: 5 },
  { topic: 'Graphs', count: 20, days: [44, 45, 46, 47], perDay: 5 },
  { topic: 'Advanced Graphs', count: 10, days: [48, 49], perDay: 5 },
  { topic: '1-D Dynamic Programming', count: 20, days: [50, 51, 52, 53], perDay: 5 },
  { topic: '2-D Dynamic Programming', count: 15, days: [54, 55, 56], perDay: 5 },
  { topic: 'Bit Manipulation', count: 10, days: [57, 58], perDay: 5 },
  { topic: 'Math & Geometry', count: 10, days: [59, 60], perDay: 5 },
  { topic: 'Sorting Algorithms', count: 7, days: [60], perDay: 7 }
];

const byTopic = {};
topicSchedule.forEach(ts => byTopic[ts.topic] = []);
qs.forEach(q => byTopic[q.topic].push(q));

const newQuestions = [];
topicSchedule.forEach(ts => {
  const list = byTopic[ts.topic];
  if (!list) return;
  list.forEach((q, idx) => {
    let assignedDay;
    if (ts.topic === 'Sorting Algorithms') {
      assignedDay = 60;
    } else {
      const dayIdx = Math.floor(idx / ts.perDay);
      assignedDay = ts.days[Math.min(dayIdx, ts.days.length - 1)];
    }
    newQuestions.push({
      id: q.id,
      day: assignedDay,
      topic: q.topic,
      difficulty: q.difficulty,
      name: q.name,
      link: q.link,
      pattern: q.pattern
    });
  });
});

const TOPICS = topicSchedule.map(ts => ({ name: ts.topic, total: ts.count }));

const PATTERNS = [
  { 
    pattern: 'Arrays & Hash Maps', 
    usage: 'Frequency counting, instant lookups, tracking seen elements in O(1)', 
    problems: 'Two Sum, Group Anagrams, Longest Consecutive Sequence', 
    time: 'O(N)', 
    space: 'O(N)',
    keyTip: 'Use when looking for complements or grouping elements by key.'
  },
  { 
    pattern: 'Two Pointers', 
    usage: 'Searching pairs or triplets in sorted arrays, palindrome checking, reversing', 
    problems: 'Valid Palindrome, Two Sum II, 3Sum, Container With Most Water', 
    time: 'O(N)', 
    space: 'O(1)',
    keyTip: 'Move pointers inward or toward a target condition to eliminate subproblems.'
  },
  { 
    pattern: 'Sliding Window', 
    usage: 'Contiguous subarrays or substrings meeting a criteria (fixed or dynamic size)', 
    problems: 'Longest Substring Without Repeating, Minimum Window Substring, Max Consecutive Ones', 
    time: 'O(N)', 
    space: 'O(K)',
    keyTip: 'Expand right pointer to satisfy constraint, shrink left pointer to find minimum/optimal window.'
  },
  { 
    pattern: 'Monotonic Stack / Stack', 
    usage: 'Next greater/smaller element, nested structures, bracket validation, histogram problems', 
    problems: 'Valid Parentheses, Daily Temperatures, Largest Rectangle in Histogram, Min Stack', 
    time: 'O(N)', 
    space: 'O(N)',
    keyTip: 'Maintain elements in increasing or decreasing order to resolve unresolved items in linear time.'
  },
  { 
    pattern: 'Binary Search', 
    usage: 'Sorted data or monotonic condition (Search on Answer / Capacity search)', 
    problems: 'Binary Search, Search in Rotated Array, Koko Eating Bananas, Time Based Key-Value', 
    time: 'O(log N)', 
    space: 'O(1)',
    keyTip: 'If the search space can be partitioned into true/false halves, you can binary search on the answer.'
  },
  { 
    pattern: 'Fast & Slow Pointers (Floyd)', 
    usage: 'Cycle detection, finding middle of linked list, duplicate numbers', 
    problems: 'Linked List Cycle, Middle of Linked List, Find Duplicate Number', 
    time: 'O(N)', 
    space: 'O(1)',
    keyTip: 'Slow advances 1 step, fast advances 2 steps. If there is a loop, they will meet.'
  },
  { 
    pattern: 'Breadth First Search (BFS)', 
    usage: 'Shortest path in unweighted graphs/grids, level-order traversal', 
    problems: 'Binary Tree Level Order, Word Ladder, Rotting Oranges, Shortest Path in Binary Matrix', 
    time: 'O(V + E)', 
    space: 'O(V)',
    keyTip: 'Use a Queue and visited Set to process layer by layer.'
  },
  { 
    pattern: 'Depth First Search (DFS)', 
    usage: 'Path finding, connected components, tree traversals, cycle detection', 
    problems: 'Number of Islands, Course Schedule, Clone Graph, Pacific Atlantic Water Flow', 
    time: 'O(V + E)', 
    space: 'O(V)',
    keyTip: 'Recurse deep with visited tracking; backtrack if needed.'
  },
  { 
    pattern: 'Backtracking', 
    usage: 'Generate permutations, combinations, subsets, constraint satisfaction (Sudoku, N-Queens)', 
    problems: 'Subsets, Permutations, Combination Sum, Word Search, N-Queens', 
    time: 'O(2^N) or O(N!)', 
    space: 'O(N)',
    keyTip: 'Template: Choose -> Explore (recurse) -> Unchoose (revert state).'
  },
  { 
    pattern: 'Top K Elements (Heaps)', 
    usage: 'Find smallest or largest K elements without fully sorting', 
    problems: 'Kth Largest Element, Top K Frequent, Merge K Sorted Lists, Find Median from Data Stream', 
    time: 'O(N log K)', 
    space: 'O(K)',
    keyTip: 'Min-Heap of size K maintains top K largest elements; Max-Heap of size K maintains top K smallest.'
  },
  { 
    pattern: 'Intervals & Sweeping', 
    usage: 'Overlapping ranges, scheduling, merge or insert intervals', 
    problems: 'Merge Intervals, Insert Interval, Non-overlapping Intervals, Meeting Rooms II', 
    time: 'O(N log N)', 
    space: 'O(N)',
    keyTip: 'Always sort intervals by start time first before checking for overlaps.'
  },
  { 
    pattern: '1D & 2D Dynamic Programming', 
    usage: 'Optimal substructure, overlapping subproblems (Counting ways, Min/Max cost, Decision making)', 
    problems: 'Climbing Stairs, Coin Change, House Robber, Longest Common Subsequence, Edit Distance', 
    time: 'O(N) to O(N*M)', 
    space: 'O(N) or O(1)',
    keyTip: 'Identify the state, write recurrence relation, determine base cases, and optimize space if only prior state is needed.'
  },
  { 
    pattern: 'Trie (Prefix Tree)', 
    usage: 'Prefix search, dictionary lookups, autocomplete, word search', 
    problems: 'Implement Trie, Design Add and Search Words, Word Search II', 
    time: 'O(L) per word', 
    space: 'O(N * L)',
    keyTip: 'Tree structure where each node represents a character and marks end-of-word.'
  },
  { 
    pattern: 'Bit Manipulation', 
    usage: 'XOR tricks, checking set bits, power of two, fast low-level calculations', 
    problems: 'Single Number, Number of 1 Bits, Counting Bits, Reverse Bits', 
    time: 'O(1) to O(log N)', 
    space: 'O(1)',
    keyTip: 'x ^ x = 0, x ^ 0 = x. n & (n - 1) removes the lowest set bit.'
  }
];

const targetDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const code = `// 60-Day Curated DSA Plan (305 Problems)
export const TOPICS = ${JSON.stringify(TOPICS, null, 2)};

export const INITIAL_QUESTIONS = ${JSON.stringify(newQuestions, null, 2)};

export const PATTERNS = ${JSON.stringify(PATTERNS, null, 2)};

// Map questions by day (Day 1 to 60)
export const DAY_QUESTIONS = {};
INITIAL_QUESTIONS.forEach(q => {
  if (!DAY_QUESTIONS[q.day]) DAY_QUESTIONS[q.day] = [];
  DAY_QUESTIONS[q.day].push(q);
});

export const DAILY_PLAN = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  const qs = DAY_QUESTIONS[day] || [];
  const topicSet = [...new Set(qs.map(q => q.topic))];
  return { day, topic: topicSet.join(' + '), questions: qs };
});

export const WEEKLY_PLAN = Array.from({ length: 9 }, (_, i) => {
  const startDay = i * 7 + 1;
  const endDay = Math.min((i + 1) * 7, 60);
  const weekQs = INITIAL_QUESTIONS.filter(q => q.day >= startDay && q.day <= endDay);
  const topics = [...new Set(weekQs.map(q => q.topic))];
  return {
    week: \`Week \${i + 1}\`,
    startDay,
    endDay,
    days: \`Day \${startDay}–\${endDay}\`,
    topics,
    targetCount: weekQs.length,
    questionIds: weekQs.map(q => q.id),
  };
});
`;

fs.writeFileSync(path.join(targetDir, 'questionsData.js'), code, 'utf8');
console.log('Successfully generated src/data/questionsData.js');
