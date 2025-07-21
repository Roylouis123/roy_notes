# SQL Beginner to Intermediate Notes (Simplified for 15-Year-Old Learners)

## 1. What is a Database?

Imagine a database like a big **digital cupboard** that stores data in an organized way.

- **Database** = Big cupboard.
- **Table** = Shelves inside the cupboard.
- **Row** = A single item stored (like one book).
- **Column** = Details about each item (like the book's name, author).

**Examples of Databases:** MySQL, PostgreSQL, SQLite, Oracle SQL.

---

## 2. Basic SQL Commands (CRUD)

CRUD means:

- **C**reate (make something)
- **R**ead (see it)
- **U**pdate (change it)
- **D**elete (remove it)

**Let’s create a table of students:**

```sql
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT,
  age INTEGER
);
```

This creates a table like this:

| id | name | age |
| -- | ---- | --- |
|    |      |     |

**Let’s add students:**

```sql
INSERT INTO students VALUES (1, 'John', 15);
INSERT INTO students VALUES (2, 'Sara', 14);
INSERT INTO students VALUES (3, 'Mike', 16);
```

Now the table looks like:

| id | name | age |
| -- | ---- | --- |
| 1  | John | 15  |
| 2  | Sara | 14  |
| 3  | Mike | 16  |

**Let’s view (SELECT) all students:**

```sql
SELECT * FROM students;
```

It shows the table above.

**Let’s change John's age:**

```sql
UPDATE students SET age = 17 WHERE id = 1;
```

John’s age becomes 17.

**Let’s delete Mike:**

```sql
DELETE FROM students WHERE name = 'Mike';
```

Mike is removed.

---

## 3. Filtering & Sorting Data

Sometimes you only want specific data or want to see data sorted.

### WHERE – Filtering Data

Use **WHERE** to choose which rows to display.

**Example:**

```sql
SELECT * FROM students
WHERE age > 15;
```

Shows all students older than 15.

### ORDER BY – Sorting Data

Use **ORDER BY** to sort results.

**Example:**

```sql
SELECT * FROM students
ORDER BY name;
```

Shows students sorted alphabetically by name.

### LIMIT – Show Only Few Rows

Use **LIMIT** to restrict the number of results.

**Example:**

```sql
SELECT * FROM students
LIMIT 2;
```

Shows only 2 rows.

You can also combine these:

```sql
SELECT * FROM students
WHERE age > 15
ORDER BY name
LIMIT 2;
```

---

## 4. Functions & Operators

SQL functions help to quickly calculate values from data.

| Function | What it does          |
| -------- | --------------------- |
| COUNT()  | Counts total rows     |
| SUM()    | Adds up numbers       |
| AVG()    | Finds average number  |
| MIN()    | Finds smallest number |
| MAX()    | Finds largest number  |

**Example: Find average age:**

```sql
SELECT AVG(age) FROM students;
```

### Operators in SQL

Operators help you compare data:

- `=` equal
- `<>` not equal
- `>` greater than
- `<` less than
- `BETWEEN` between two values
- `LIKE` for pattern search

**Example:**

```sql
SELECT * FROM students WHERE name LIKE 'S%';
```

Finds students whose names start with "S".

---

## 5. Joins (Combining Tables Together)

Imagine you store students in one table and their marks in another. Joins help you combine them.

### INNER JOIN – Only Matching Rows

```sql
SELECT students.name, marks.subject, marks.marks
FROM students
INNER JOIN marks
ON students.student_id = marks.student_id;
```

Shows only students who have marks.

### LEFT JOIN – All Students, Even Without Marks

```sql
SELECT students.name, marks.subject, marks.marks
FROM students
LEFT JOIN marks
ON students.student_id = marks.student_id;
```

Shows all students. If some don't have marks, marks will show as NULL.

### RIGHT JOIN – All Marks, Even Without Matching Students

(Usually used less than LEFT JOIN.)

---

## 10. Advanced Features

SQL has powerful tools to make work easier:

### Views

A **View** saves a query like a virtual table. **Example:**

```sql
CREATE VIEW student_summary AS
SELECT name, age FROM students;

SELECT * FROM student_summary;
```

Now, you can use `student_summary` just like a table.

### Transactions

Imagine you're updating two tables, but something fails in the middle. **Transactions** help prevent errors by doing **all or nothing**.

**Example:**

```sql
BEGIN;
UPDATE students SET age = 18 WHERE id = 1;
DELETE FROM marks WHERE student_id = 1;
COMMIT;
```

If all statements succeed, COMMIT saves the changes. If anything fails, nothing is saved.

### Triggers

A **Trigger** is like a robot that runs automatically when something happens (like adding or updating data).

**Example:** Automatically log any deletion from students table (advanced feature, not shown in beginner SQL).

### Stored Procedures

A **Stored Procedure** is a saved block of SQL code that you can run anytime without rewriting.

---

## Real-Life Project: Student Report Card

- **Create tables for students and marks**
- **Join both tables to see report card**
- **Calculate total and average marks**
- **Use subqueries to find top students**
- **Use transactions for safe updates**

This project is like creating a mini school management system.

---

# End of SQL Notes (Made Easy for 15-Year-Olds)

🚀 Keep practicing small queries daily! 🚀

