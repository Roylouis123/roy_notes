Absolutely. From now on, use this format for the notes.

# Module 2 — Algorithms: Full Notes

## 1. Algorithm

**What it does:**
A step-by-step procedure to solve a problem.

**Example:**

```text
Input: [5, 2, 8]
       ↓
Find largest
       ↓
Output: 8
```

**Real-world:** Login validation, payment processing, recommendations.

**When to use:** Every time you need to transform input into a result.

---

# 2. Linear Search

**What it does:**
Checks elements one by one.

**Example:**

```text
[10, 20, 30, 40]
          ↑
        Find 30
```

**Real-world:** Searching a small/unsorted list of users.

**When to use:** Data is unsorted or small.

---

# 3. Binary Search

**What it does:**
Repeatedly cuts a **sorted** search area in half.

**Example:**

```text
[10, 20, 30, 40, 50, 60, 70]
             ↑
           middle
```

Looking for `60` → ignore the left half → continue searching right.

**Real-world:** Searching sorted IDs, dictionaries, version ranges.

**When to use:** Data is sorted and you need repeated searching.

---

# 4. Bubble Sort

**What it does:**
Repeatedly swaps neighboring elements that are in the wrong order.

**Example:**

```text
[5, 2, 1]

5 > 2 → [2, 5, 1]
5 > 1 → [2, 1, 5]
```

**Real-world:** Mostly educational; rarely appropriate in production.

**When to use:** Learning sorting concepts, not production systems.

---

# 5. Selection Sort

**What it does:**
Finds the smallest element and places it in the correct position.

**Example:**

```text
[5, 2, 8, 1]

Smallest = 1
↓
[1, 2, 8, 5]
```

**Real-world:** Rarely used directly.

**When to use:** Learning or very simple small datasets.

---

# 6. Insertion Sort

**What it does:**
Builds a sorted section one element at a time.

**Example:**

```text
[5, 2, 8]

5
↓
2 inserted before 5
↓
[2, 5]
```

**Real-world:** Useful when data is already mostly sorted.

**When to use:** Small or nearly sorted data.

---

# 7. Merge Sort

**What it does:**
Splits data, sorts the pieces, then merges them.

**Example:**

```text
[8, 3, 5, 1]

[8,3] [5,1]
   ↓
[3,8] [1,5]
   ↓
[1,3,5,8]
```

**Real-world:** Large-data sorting and external/file-based sorting concepts.

**When to use:** When predictable sorting performance and stable sorting are important.

---

# 8. Quick Sort

**What it does:**
Chooses a pivot and separates smaller and larger values.

**Example:**

```text
[5, 2, 8, 1, 6]

Pivot = 5

[2,1]  5  [8,6]
```

Then recursively sorts both sides.

**Real-world:** General-purpose sorting concepts and partition-based algorithms.

**When to use:** When implementing/customizing sorting and partitioning logic.

---

# 9. Two Pointers

**What it does:**
Uses two positions to efficiently scan data.

**Example:**

Find two numbers adding to `10`:

```text
[1, 2, 3, 4, 6, 8, 9]
 ↑                 ↑
 L                 R

1 + 9 = 10 ✓
```

**Real-world:** Comparing sorted customer/product data, duplicate removal, matching records.

**When to use:** Usually when working with sorted arrays or when processing from both ends.

---

# 10. Sliding Window

**What it does:**
Maintains a moving section of data.

**Example:**

Maximum sum of 3 consecutive numbers:

```text
[2, 5, 1, 8, 3]

[2, 5, 1] → 8
   [5, 1, 8] → 14 ✓
      [1, 8, 3] → 12
```

**Real-world:** API rate limiting, website traffic monitoring, recent activity analysis.

**When to use:** Continuous/subarray/substring problems involving a moving range.

---

# 11. Prefix Sum

**What it does:**
Pre-calculates cumulative totals so range sums can be answered quickly.

**Example:**

```text
Data:   [2, 5, 3, 7]

Prefix: [2, 7, 10, 17]
```

Sum from index `1` to `3`:

```text
17 - 2 = 15
```

**Real-world:** Sales reports, transaction totals, analytics dashboards.

**When to use:** Many queries ask for sums over different ranges.

---

# 12. Hashing

**What it does:**
Converts a value/key into a location for fast lookup.

**Example:**

```text
"user123"
    ↓
  hash
    ↓
bucket 42
```

**Real-world:** Caches, dictionaries, databases, authentication/session lookups.

**When to use:** You frequently need **fast lookup by a key**.

---

# 13. Fast & Slow Pointers

**What it does:**
Uses two pointers moving at different speeds.

**Example:**

```text
Slow → 1 step
Fast → 2 steps

1 → 2 → 3 → 4 → 5
    ↑       ↑
   slow    fast
```

**Real-world:** Detecting loops in linked structures or repeated states.

**When to use:** Linked lists, cycle detection, finding middle elements.

---

# 14. Recursion

**What it does:**
A function solves a problem by calling itself on a smaller version of the problem.

**Example:**

```text
factorial(4)

4 × factorial(3)
      ↓
    3 × factorial(2)
          ↓
        2 × factorial(1)
```

**Real-world:** File/folder traversal, trees, nested JSON, graph algorithms.

**When to use:** When a problem naturally contains **smaller versions of itself**.

---

# 15. Divide & Conquer

**What it does:**
Breaks a large problem into smaller problems, solves them, then combines the results.

**Example:**

```text
Large problem
     ↓
 ┌───┴───┐
Small   Small
 ↓       ↓
Solve   Solve
 └───┬───┘
   Combine
```

**Real-world:** Large-scale searching and sorting.

**When to use:** When a problem can be cleanly divided into independent smaller problems.

---

# 16. Greedy Algorithm

**What it does:**
Makes the best-looking decision **right now**, hoping it leads to the best overall result.

**Example:**

Making change:

```text
Amount = ₹18

Choose ₹10
Choose ₹5
Choose ₹2
Choose ₹1
```

**Real-world:** Scheduling, resource allocation, routing, compression.

**When to use:** When the problem has a proven greedy strategy.

> Don't assume greedy always works. Sometimes a locally best choice produces a globally bad result.

---

# 17. Backtracking

**What it does:**
Tries a choice → continues → if it fails, goes back and tries another.

**Example:**

```text
Choose A
 ↓
Choose B
 ↓
Invalid
 ↓
Backtrack
 ↓
Choose C
```

**Real-world:** Sudoku, maze solving, configuration generation, constraint problems.

**When to use:** When you need to explore many possible combinations and reject invalid paths.

---

# 18. Dynamic Programming

**What it does:**
Solves repeated subproblems once and **remembers their results**.

**Example:**

```text
fib(5)

fib(4)
 ├── fib(3)
 └── fib(2)

Repeated calculations
        ↓
Store results
        ↓
Reuse them
```

**Real-world:** Pricing optimization, resource allocation, route optimization, sequence problems.

**When to use:** When:

1. The same smaller problems appear repeatedly.
2. Their results can be reused.

---

# 19. BFS

**What it does:**
Explores a graph level by level.

**Example:**

```text
      A
     / \
    B   C
   / \
  D   E
```

```text
A → B → C → D → E
```

**Real-world:** Finding the shortest number of connections between people.

**When to use:** Shortest path in an **unweighted graph**, level-by-level exploration.

---

# 20. DFS

**What it does:**
Explores one path deeply before trying another.

**Example:**

```text
      A
     / \
    B   C
   / \
  D   E
```

```text
A → B → D → E → C
```

**Real-world:** File systems, dependency exploration, graph traversal.

**When to use:** Deep exploration, connected components, cycle detection.

---

# 21. Dijkstra's Algorithm

**What it does:**
Finds the shortest path from one node to other nodes when edge weights are non-negative.

**Example:**

```text
A ──5── B
│       │
2       3
│       │
C ──1── D
```

Find shortest route from A → D.

```text
A → C → D
2 + 1 = 3
```

**Real-world:** GPS/navigation, network routing.

**When to use:** Weighted graph + shortest path + non-negative weights.

---

# 22. Topological Sort

**What it does:**
Creates an order where dependencies come before the things that depend on them.

**Example:**

```text
Learn Python
     ↓
Learn FastAPI
     ↓
Build API
```

Correct order:

```text
Python → FastAPI → API
```

**Real-world:** Build systems, package dependencies, course prerequisites.

**When to use:** Directed graphs with dependencies and **no cycles**.

---

# 🧠 Algorithm Selection Cheat Sheet

```text
Need to find something?
    ↓
Unsorted → Linear Search
Sorted → Binary Search

Need to sort?
    ↓
Usually → Built-in sort
Special case → Merge / Quick / etc.

Pair/range problem?
    ↓
Two Pointers
Sliding Window
Prefix Sum

Need fast lookup?
    ↓
Hashing

Repeated subproblems?
    ↓
Dynamic Programming

Explore possibilities?
    ↓
Backtracking

Graph?
    ↓
Level-by-level → BFS
Deep exploration → DFS
Shortest weighted path → Dijkstra
Dependencies → Topological Sort
```
