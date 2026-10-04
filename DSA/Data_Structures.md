# Module 1 — Data Structures

## 1. Arrays

**What:** Ordered collection of elements.

```python
users = ["Roy", "John", "Sam"]
users[1]  # John
```

**How it works:** Elements are stored in an indexed sequence.

**Used for:** Lists of users, products, messages, API data.

**Remember:** Array = numbered boxes.

---

## 2. Linked List

**What:** Collection of nodes connected to each other.

```text
[10] → [20] → [30] → NULL
```

**How it works:** Each node stores data + reference to the next node.

**Used for:** Structures where elements are frequently connected, inserted, or removed.

**Remember:** Linked List = chain of nodes.

---

## 3. Stack

**What:** Last item added is removed first.

```text
C ← remove
B
A
```

**How it works:** `push` adds to the top, `pop` removes from the top.

**Used for:** Undo, browser back, function call stack.

**Remember:** Stack = pile of plates.

---

## 4. Queue

**What:** First item added is removed first.

```text
A → B → C → D
↑           ↑
Front       Back
```

**How it works:** Add at the back, remove from the front.

**Used for:** Job queues, message processing, server requests.

**Remember:** Queue = line of people.

---

## 5. Hash Map

**What:** Stores data as `key → value`.

```python
users = {
    101: "Roy",
    102: "John"
}
```

**How it works:** A hash function converts the key into a storage location.

```text
"user_101"
    ↓
Hash
    ↓
Location
    ↓
Roy
```

**Used for:** User lookup, caching, configuration, databases, APIs.

**Remember:** Hash Map = key → value.

---

## 6. Set

**What:** Collection of unique values.

```python
ids = {101, 102, 103}
```

**How it works:** Uses hashing to store values and prevent duplicates.

**Used for:** Removing duplicates, checking whether something exists.

**Remember:** Set = unique values.

---

## 7. Tree

**What:** Hierarchical data structure.

```text
        A
       / \
      B   C
     / \
    D   E
```

**Used for:** File systems, HTML DOM, organization structures.

**Remember:** Tree = hierarchy.

---

## 8. Binary Tree

**What:** Tree where each node has at most two children.

```text
       10
      /  \
     5    20
```

**Used for:** Searching structures, expression trees, hierarchical data.

**Remember:** Binary = maximum 2 children.

---

## 9. Binary Search Tree

**What:** Ordered binary tree.

```text
        10
       /  \
      5    20
     / \   / \
    3   7 15 25
```

Rule:

```text
Left < Node < Right
```

**How it works:** Compare the target with the current node and choose left or right.

**Used for:** Ordered searching and maintaining sorted data.

**Remember:** BST = ordered binary tree.

---

## 10. Tree Traversals

**What:** Different ways to visit tree nodes.

### Inorder

```text
Left → Root → Right
```

Useful for getting BST values in sorted order.

### Preorder

```text
Root → Left → Right
```

Useful for copying/serializing tree structures.

### Postorder

```text
Left → Right → Root
```

Useful when children must be processed before the parent.

### Level Order

```text
Level 1 → Level 2 → Level 3
```

Uses a queue.

---

## 11. Heap

**What:** Special tree for quickly accessing the smallest or largest element.

### Min Heap

```text
        2
       / \
      5   8
```

Smallest value is at the top.

### Max Heap

```text
        10
       /  \
      7    8
```

Largest value is at the top.

**Used for:** Scheduling, priority queues, top-K problems.

**Remember:** Heap = quickly get min/max.

---

## 12. Priority Queue

**What:** Queue where the most important item is processed first.

```text
Security alert  → High
Payment          → Medium
Report           → Low
```

**Used for:** Cloud jobs, task scheduling, emergency processing.

**Remember:** Normal queue = arrival order. Priority queue = importance.

---

## 13. Graph

**What:** Nodes connected by relationships.

```text
A ─── B
│     │
└── C ┘
```

**How it works:** Nodes represent things; edges represent relationships.

**Used for:** Google Maps, social networks, recommendation systems, dependency systems.

**Remember:** Graph = things + connections.

---

## 14. Directed Graph

Connections have direction.

```text
A ───→ B
```

**Example:** Instagram following.

```text
Roy ───→ Elon
```

Roy follows Elon; it doesn't mean Elon follows Roy.

---

## 15. Undirected Graph

Connection works both ways.

```text
A ─── B
```

**Example:** Two people connected as friends.

---

## 16. BFS

**What:** Explores a graph level by level.

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

**Uses:** Shortest path in unweighted graphs, social networks.

**Uses:** Queue.

**Remember:** BFS = wide first.

---

## 17. DFS

**What:** Goes as deep as possible before backtracking.

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

**Uses:** File traversal, graph exploration, cycle detection.

**Uses:** Stack/recursion.

**Remember:** DFS = deep first.

---

## 18. Trie

**What:** Tree designed for words and prefixes.

```text
        root
         |
         c
         |
         a
       /   \
      t     r
```

Stores:

```text
cat
car
```

**Used for:** Autocomplete, search suggestions, spell checking.

**Remember:** Trie = tree for words.

---

# Final Mental Map

```text
DATA STRUCTURES
│
├── Linear
│   ├── Array
│   ├── Linked List
│   ├── Stack
│   └── Queue
│
├── Hash-based
│   ├── Hash Map
│   └── Set
│
├── Trees
│   ├── Binary Tree
│   ├── BST
│   ├── Heap
│   └── Trie
│
└── Graphs
    ├── Directed
    ├── Undirected
    ├── BFS
    └── DFS
```