# Module 2 — Algorithms

### Complete Learning Notes

> **Core idea:** An algorithm is a set of steps used to transform **input → result**.

---

# Part 1 — Algorithm Fundamentals

## 1. What is an Algorithm?

### What

A step-by-step method for solving a problem.

### Mental model

Think of a **recipe**:

```text
Ingredients → Steps → Food
```

Programming:

```text
Input → Algorithm → Output
```

### Example

Problem: Find the largest number.

```text
Data: [5, 2, 9, 3]

Start with 5
5 > 2 → keep 5
9 > 5 → keep 9
3 < 9 → keep 9

Result → 9
```

### Real-world

An e-commerce system:

```text
User searches "Nike shoes"
        ↓
Find matching products
        ↓
Filter
        ↓
Rank
        ↓
Show results
```

Each step is part of an algorithm.

### When to use

Whenever you need a **repeatable process to solve a problem**.

### Remember

> **Algorithm = recipe for solving a problem.**

---

# Part 2 — Linear Search

## 2. Linear Search

### What

Searches by checking items **one by one**.

### Mental model

Looking for your friend in a classroom:

```text
Person 1 ❌
Person 2 ❌
Person 3 ❌
Person 4 ✅
```

### Data example

Find `30`:

```text
[10, 20, 30, 40, 50]
 ↑
10 ≠ 30

     ↑
20 ≠ 30

          ↑
        30 ✓
```

### How it works

```python
for number in numbers:
    if number == target:
        return number
```

It starts at the beginning and keeps checking until it finds the target.

### Real-world

Searching a small list of:

```text
Recent notifications
Recent messages
Small list of products
```

### When to use

Use it when:

* Data is unsorted
* Dataset is small
* You only need occasional searching

### Remember

> **Linear search = check one by one.**

---

# Part 3 — Binary Search

## 3. Binary Search

### What

Searches a **sorted** collection by repeatedly cutting the search area roughly in half.

### Mental model

Imagine finding a word in a dictionary.

You don't start from page 1.

You open somewhere in the middle.

```text
A ───────── M ───────── Z
              ↑
           Start here
```

### Data example

Find `70`:

```text
[10, 20, 30, 40, 50, 60, 70]
             ↑
            40
```

`70 > 40`

So ignore:

```text
[10, 20, 30, 40]
```

Search:

```text
[50, 60, 70]
         ↑
        70 ✓
```

### How it works

```text
1. Look at middle
2. Compare target with middle
3. Decide left or right
4. Throw away the other half
5. Repeat
```

### Real-world

* Searching sorted records
* Dictionary lookup
* Finding a version in a sorted list
* Searching within ordered IDs

### When to use

Use when the data is **sorted** and you need efficient repeated searching.

### Remember

> **Binary search = check middle → eliminate half → repeat.**

---

# Part 4 — Sorting

Sorting means putting data into an order.

```text
Before:
[5, 2, 8, 1]

After:
[1, 2, 5, 8]
```

---

# 4.1 Bubble Sort

### What

Repeatedly compares neighboring elements and swaps them if they're in the wrong order.

### Mental model

Large elements slowly **bubble toward the end**.

### Example

```text
[5, 2, 8, 1]

5 > 2
↓
[2, 5, 8, 1]

8 > 1
↓
[2, 5, 1, 8]
```

Continue until everything is ordered.

### Real-world

Mostly useful for **learning sorting**, not production software.

### When to use

Almost never in production.

### Remember

> **Bubble Sort = compare neighbors and swap.**

---

# 4.2 Selection Sort

### What

Find the smallest element and put it in the correct position.

### Example

```text
[5, 2, 8, 1]

Smallest = 1

↓ move 1 to front

[1, 2, 8, 5]
```

Then find the smallest remaining element.

```text
[1, 2, 8, 5]
    ↑
already correct
```

### Mental model

> Find the next correct item and place it.

### Real-world

Rarely used directly.

### When to use

Mainly for learning algorithm fundamentals or very simple situations.

### Remember

> **Selection = select the smallest/best remaining item.**

---

# 4.3 Insertion Sort

### What

Builds a sorted section **one element at a time**.

### Mental model

Think about arranging playing cards in your hand.

```text
Cards:

5

Add 2:
[2, 5]

Add 8:
[2, 5, 8]

Add 1:
[1, 2, 5, 8]
```

### How it works

Take the next element and insert it into the correct place in the already-sorted section.

### Real-world

Useful when data is:

* Small
* Already mostly sorted

### Remember

> **Insertion Sort = take one item and insert it into the correct position.**

---

# 4.4 Merge Sort

### What

Splits data into smaller pieces, sorts them, then combines them.

### Mental model

> **Divide → Solve → Combine**

### Example

```text
[8, 3, 5, 1]

       ↓ split

[8, 3]   [5, 1]

       ↓ split

[8] [3] [5] [1]

       ↓ sort

[3, 8]   [1, 5]

       ↓ merge

[1, 3, 5, 8]
```

### How it works

1. Divide the data
2. Keep dividing
3. Sort small pieces
4. Merge them back together

### Real-world

Useful concept for sorting large datasets and data that may not fit conveniently into memory at once.

### When to use

When you need predictable sorting behavior and a divide-and-conquer approach.

### Remember

> **Merge Sort = split → sort → merge.**

---

# 4.5 Quick Sort

### What

Chooses a **pivot** and separates smaller and larger values around it.

### Example

```text
[5, 2, 8, 1, 6]

Pivot = 5

Smaller       Pivot       Larger
[2, 1]          5          [8, 6]
```

Then sort each side.

```text
[1, 2]  5  [6, 8]

↓
[1, 2, 5, 6, 8]
```

### Mental model

Imagine a teacher says:

> "Everyone shorter than me stand left. Everyone taller stand right."

Then repeat the same process for each group.

### Real-world

Useful as a general sorting algorithm concept and for partition-based problems.

### When to use

When implementing/customizing sorting or partitioning logic. In normal application code, use the language's optimized sort.

### Remember

> **Quick Sort = choose pivot → partition → repeat.**

---

# Part 5 — Two Pointers

## 5. Two Pointers

### What

Uses two positions to move through data intelligently.

### Mental model

Two people searching from **opposite ends**.

### Example

Find two numbers whose sum is `10`:

```text
[1, 2, 3, 4, 6, 8, 9]
 ↑                 ↑
left              right
```

```text
1 + 9 = 10 ✓
```

Another example:

```text
2 + 9 = 11
```

Too large → move the right pointer left.

```text
2 + 8 = 10 ✓
```

### How it works

For sorted data:

```text
sum < target → move left forward
sum > target → move right backward
sum = target → found
```

### Real-world

* Matching two sorted datasets
* Removing duplicates
* Comparing data from both ends
* Checking if a string is a palindrome

### When to use

When a problem involves:

* Sorted arrays
* Pairs
* Two ends of a sequence

### Remember

> **Two Pointers = two positions moving intelligently.**

---

# Part 6 — Sliding Window

## 6. Sliding Window

### What

Looks at a **continuous section** of data and moves that section.

### Mental model

Imagine looking through a window on a moving train.

You don't rebuild the view every time. You move the window.

### Example

Find the largest sum of 3 consecutive numbers:

```text
[2, 5, 1, 8, 3]

Window:
[2, 5, 1] = 8

Move window:

   [5, 1, 8] = 14

Move again:

      [1, 8, 3] = 12
```

Answer:

```text
14
```

### How it works

When the window moves:

```text
Remove → element leaving
Add    → element entering
```

Instead of calculating the entire window again.

### Real-world

Website traffic:

```text
10:00 → 100 requests
10:01 → 150
10:02 → 300
10:03 → 200
```

You might ask:

> "What was the highest traffic during any 3-minute period?"

Sliding Window is useful.

### When to use

Look for words like:

* consecutive
* continuous
* substring
* subarray
* last N items
* window

### Remember

> **Sliding Window = move a continuous range.**

---

# Part 7 — Prefix Sum

## 7. Prefix Sum

### What

Pre-calculates cumulative totals so later range calculations are easier.

### Example

Original:

```text
[2, 5, 3, 7]
```

Prefix:

```text
[2, 7, 10, 17]
```

Because:

```text
2
2+5 = 7
2+5+3 = 10
2+5+3+7 = 17
```

Want:

```text
5 + 3 + 7
```

Use:

```text
17 - 2 = 15
```

### Mental model

Think of a **running bank balance**.

```text
Day 1 → ₹100
Day 2 → ₹150
Day 3 → ₹180
```

The cumulative value lets you calculate ranges quickly.

### Real-world

* Sales dashboards
* Revenue reports
* Analytics
* Transaction history

### When to use

When you have **many range-sum queries** on the same data.

### Remember

> **Prefix Sum = remember the running total.**

---

# Part 8 — Hashing

## 8. Hashing

### What

Converts a key into a value/location that helps find data quickly.

### Mental model

A hotel receptionist:

```text
Guest name
    ↓
Room number
    ↓
Find guest
```

### Example

```text
"user_101"
     ↓
  hash()
     ↓
 bucket 42
     ↓
 user data
```

### Real-world

A backend:

```python
user = users_by_id[101]
```

The system doesn't normally scan every user.

### Used for

* Hash Maps
* Sets
* Caches
* Database indexes/concepts
* Fast lookup systems

### When to use

When you frequently ask:

> **"Do I have this?"**
> **"Where is the value for this key?"**

### Remember

> **Hashing = convert key → useful lookup location.**

---

# Part 9 — Fast & Slow Pointers

## 9. Fast & Slow Pointers

### What

Two pointers move at different speeds.

```text
Slow → 1 step
Fast → 2 steps
```

### Example

Linked list:

```text
1 → 2 → 3 → 4 → 5
    ↑       ↑
   slow    fast
```

Fast moves twice as quickly.

### Why is this useful?

Suppose a linked list has a loop:

```text
1 → 2 → 3 → 4
        ↑   ↓
        ← ←
```

Eventually:

```text
slow
  ↓
  X
  ↑
fast
```

They meet.

That tells us there is a cycle.

### Real-world

* Detecting loops
* Finding the middle of a linked list
* Detecting repeated states

### When to use

When you see:

* Linked lists
* Cycle detection
* "Find middle"
* Two moving positions

### Remember

> **Fast + Slow = useful for cycles and middle positions.**

---

# Part 10 — Recursion

## 10. Recursion

### What

A function calls **itself** to solve a smaller version of the same problem.

### Mental model

Imagine opening nested boxes:

```text
Box
 ↓
Box
 ↓
Box
 ↓
Empty
```

Then you return outward.

### Example

Factorial:

```text
4! = 4 × 3 × 2 × 1
```

The algorithm thinks:

```text
4! = 4 × 3!
3! = 3 × 2!
2! = 2 × 1!
```

Eventually:

```text
1! = 1
```

Then results return upward.

### Important

Every recursion needs a **base case**.

```python
if n == 1:
    return 1
```

Otherwise it can continue forever.

### Real-world

* File/folder traversal
* Tree traversal
* Nested JSON
* Graph algorithms
* Backtracking

### When to use

When a problem naturally contains **smaller versions of itself**.

### Remember

> **Recursion = solve a smaller version of the same problem.**

---

# Part 11 — Divide & Conquer

## 11. Divide & Conquer

### What

Break a large problem into smaller problems, solve them, then combine the results.

### Mental model

Instead of asking one person to clean a huge room:

```text
Huge room
   ↓
Divide
   ↓
┌───────┬───────┐
Room A  Room B
```

Each gets solved separately.

### Example

Merge Sort:

```text
[8, 3, 5, 1]

↓ divide

[8,3] [5,1]

↓ solve

[3,8] [1,5]

↓ combine

[1,3,5,8]
```

### Real-world

Used in many large-data and distributed processing techniques.

### When to use

When a problem can be broken into **smaller mostly independent problems**.

### Remember

> **Divide → solve → combine.**

---

# Part 12 — Greedy Algorithms

## 12. Greedy

### What

Makes the **best-looking choice right now**.

### Mental model

You're climbing stairs and always choose the step that looks best immediately.

### Example

Suppose you need ₹18:

```text
₹10
₹5
₹2
₹1
```

Greedy chooses:

```text
10 → 5 → 2 → 1
```

### Important

Greedy does **not always produce the globally best answer**.

You need to know that the problem supports a greedy strategy.

### Real-world

* Scheduling
* Resource allocation
* Network routing
* Compression algorithms

### When to use

When you can prove that making the best local choice leads to the optimal final solution.

### Remember

> **Greedy = best choice now.**

---

# Part 13 — Backtracking

## 13. Backtracking

### What

Try a choice → continue → if it fails → **go back and try another choice**.

### Mental model

Solving a maze:

```text
Start
  ↓
Path A
  ↓
Dead end ❌
  ↓
Go back
  ↓
Path B
  ↓
Success ✓
```

### Example

Trying combinations:

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

### Real-world

* Sudoku
* Maze solving
* Password/combination generation
* Configuration problems

### When to use

When you must explore **many possible choices** and reject invalid ones.

### Remember

> **Backtracking = try → fail → undo → try another.**

---

# Part 14 — Dynamic Programming

## 14. Dynamic Programming

### What

Solves repeated subproblems **once** and remembers their answers.

### Mental model

Imagine solving 100 math questions and realizing:

> "I already calculated this answer earlier."

So you save it and reuse it.

### Example

Fibonacci:

```text
F(5)
├── F(4)
│   ├── F(3)
│   └── F(2)
└── F(3)
```

Notice `F(3)` gets calculated repeatedly.

Dynamic Programming says:

```text
Calculate F(3) once
       ↓
Save result
       ↓
Reuse it
```

### Two common approaches

**Memoization**

```text
Calculate → Save → Reuse
```

**Tabulation**

```text
Start from small answers
→ build bigger answers
```

### Real-world

* Route optimization
* Pricing
* Resource allocation
* Sequence matching

### When to use

When:

1. Smaller problems repeat.
2. Their answers can be reused.

### Remember

> **Dynamic Programming = don't solve the same subproblem twice.**

---

# Part 15 — BFS

## 15. Breadth-First Search

### What

Explores a graph **level by level**.

### Example

```text
        A
       / \
      B   C
     / \
    D   E
```

BFS:

```text
A
↓
B C
↓
D E
```

Order:

```text
A → B → C → D → E
```

### How it works

Uses a **Queue**.

```text
Put A in queue

A comes out
→ add B, C

B comes out
→ add D, E
```

### Real-world

Social network:

```text
You
 ↓
Friends
 ↓
Friends of friends
 ↓
Friends 3 levels away
```

### When to use

Especially useful for:

* Shortest path in unweighted graphs
* Level-by-level exploration
* Minimum number of connections

### Remember

> **BFS = wide first = Queue.**

---

# Part 16 — DFS

## 16. Depth-First Search

### What

Explores one path **as deeply as possible**, then comes back.

### Example

```text
        A
       / \
      B   C
     / \
    D   E
```

Possible DFS:

```text
A → B → D → E → C
```

### How it works

Uses:

```text
Stack
```

or recursion.

```text
A
 ↓
B
 ↓
D
 ↓
Back
 ↓
E
 ↓
Back
 ↓
C
```

### Real-world

File system:

```text
Project
├── src
│   ├── components
│   └── services
└── tests
```

DFS can enter one folder and explore everything inside before moving to another.

### When to use

* Deep exploration
* File/folder traversal
* Cycle detection
* Connected components

### Remember

> **DFS = deep first = Stack.**

---

# Part 17 — Dijkstra

## 17. Dijkstra's Algorithm

### What

Finds the **shortest path** in a weighted graph when edge weights are non-negative.

### Example

```text
A ──5── B
│       │
2       3
│       │
C ──1── D
```

From A to D:

```text
A → B → D
5 + 3 = 8

A → C → D
2 + 1 = 3 ✓
```

Shortest path:

```text
A → C → D
```

### How it works

It keeps track of the best known distance to each node and repeatedly chooses the closest unprocessed node.

### Real-world

* GPS/navigation
* Network routing
* Delivery route systems

### When to use

When you have:

```text
Weighted graph
+
Need shortest path
+
Weights are non-negative
```

### Remember

> **Dijkstra = shortest path with positive/non-negative weights.**

---

# Part 18 — Topological Sort

## 18. Topological Sort

### What

Creates an order where **dependencies come first**.

### Example

You can't:

```text
Build application
```

before:

```text
Install dependencies
```

So:

```text
Install dependencies
        ↓
Compile
        ↓
Test
        ↓
Deploy
```

### Mental model

> **What must happen before what?**

### Real-world

Software build systems:

```text
Database
   ↓
Backend
   ↓
Frontend
   ↓
Deployment
```

### When to use

When dealing with:

* Dependencies
* Prerequisites
* Build pipelines
* Task ordering

The graph must be a **directed acyclic graph (DAG)**.

### Remember

> **Topological Sort = dependency order.**

---

# 🧠 How to Choose an Algorithm

```text
Need to search?
│
├── Unsorted → Linear Search
└── Sorted → Binary Search


Need to sort?
│
└── Usually use built-in sort


Pair / two ends?
│
└── Two Pointers


Continuous range?
│
└── Sliding Window


Many range sums?
│
└── Prefix Sum


Fast key lookup?
│
└── Hashing


Linked-list cycle?
│
└── Fast + Slow Pointers


Problem contains smaller versions?
│
└── Recursion


Can divide the problem?
│
└── Divide & Conquer


Best local choice works?
│
└── Greedy


Need to try many possibilities?
│
└── Backtracking


Repeated subproblems?
│
└── Dynamic Programming


Graph?
│
├── Level-by-level → BFS
├── Deep exploration → DFS
├── Weighted shortest path → Dijkstra
└── Dependencies → Topological Sort
```

