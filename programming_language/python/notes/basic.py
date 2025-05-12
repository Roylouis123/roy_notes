# Python Basics: A Beginner's Guide
# =================================

# 1. What is Python?
# -----------------
# Python is a simple programming language that's easy to read and write.
# Think of it like giving instructions to a computer in a language that's close to English.

# 2. Variables: Storing Information
# --------------------------------
# Variables are like labeled boxes where you store different types of information.

name = "Roy"        # Text (string) - stores words, letters, sentences
age = 30            # Whole number (integer) - stores numbers without decimal points
height = 5.9        # Decimal number (float) - stores numbers with decimal points
is_student = True   # True/False value (boolean) - stores yes/no information

# Example: How to use variables
print("My name is", name)
print("I am", age, "years old")
print("My height is", height, "feet")
print("Am I a student?", is_student)

# 3. Basic Math Operations
# -----------------------
# Python can be used as a calculator to perform various math operations.

a = 10
b = 3

# Addition: like combining quantities
print("10 + 3 =", a + b)  # Result: 13

# Subtraction: finding the difference 
print("10 - 3 =", a - b)  # Result: 7

# Multiplication: repeated addition
print("10 × 3 =", a * b)  # Result: 30

# Division: splitting into equal parts
print("10 ÷ 3 =", a / b)  # Result: 3.3333...

# Remainder (modulus): what's left after division
print("Remainder of 10 ÷ 3 =", a % b)  # Result: 1

# Power: multiplying a number by itself multiple times
print("10 to the power of 3 =", a ** b)  # Result: 1000

# Floor division: division that rounds down to nearest whole number
print("10 divided by 3 (rounded down) =", a // b)  # Result: 3


# 4. Comparing Values
# ------------------
# Comparing values gives us True or False answers, like yes or no questions.

x = 10
y = 20

# Equal to: Are the values the same?
print("Is 10 equal to 20?", x == y)  # Result: False

# Not equal to: Are the values different?
print("Is 10 different from 20?", x != y)  # Result: True

# Greater than: Is the first value larger?
print("Is 10 greater than 20?", x > y)  # Result: False

# Less than: Is the first value smaller?
print("Is 10 less than 20?", x < y)  # Result: True

# Greater than or equal to
print("Is 10 greater than or equal to 20?", x >= y)  # Result: False

# Less than or equal to
print("Is 10 less than or equal to 20?", x <= y)  # Result: True


# 5. Logical Operations
# --------------------
# Logical operations combine True/False values to make decisions.

sunny = True
warm = False

# AND: Both conditions must be True
print("Is it sunny AND warm?", sunny and warm)  # Result: False (because warm is False)

# OR: At least one condition must be True
print("Is it sunny OR warm?", sunny or warm)  # Result: True (because sunny is True)

# NOT: Reverses True to False and False to True
print("Is it NOT sunny?", not sunny)  # Result: False (because sunny is True)


# 6. Making Decisions with If Statements
# -------------------------------------
# If statements allow the program to make decisions based on conditions.

# Simple if statement
temperature = 25

if temperature > 30:
    print("It's hot outside!")
elif temperature > 20:
    print("It's a nice day!")
elif temperature > 10:
    print("It's a bit chilly!")
else:
    print("It's cold outside!")

# Real-life example: Movie ticket pricing
age = 15
student = True

if age < 12:
    print("Child ticket: $5")
elif age >= 65:
    print("Senior ticket: $7")
elif student:
    print("Student ticket: $8")
else:
    print("Adult ticket: $10")


# 7. Lists: Storing Multiple Items
# -------------------------------
# Lists are like ordered collections of items, similar to a shopping list.

# Creating a list
fruits = ["apple", "banana", "cherry", "orange", "kiwi"]
print("My fruit list:", fruits)

# Accessing items in a list (positions start at 0, not 1)
print("First fruit:", fruits[0])       # Result: apple
print("Third fruit:", fruits[2])       # Result: cherry

# Changing an item
fruits[1] = "blueberry"
print("Updated list:", fruits)         # apple, blueberry, cherry, orange, kiwi

# Adding an item to the end
fruits.append("mango")
print("After adding mango:", fruits)   # apple, blueberry, cherry, orange, kiwi, mango

# Removing an item
fruits.remove("cherry")
print("After removing cherry:", fruits) # apple, blueberry, orange, kiwi, mango

# Finding the number of items
print("Number of fruits:", len(fruits)) # Result: 5


# 8. Tuples: Unchangeable Lists
# ----------------------------
# Tuples are like lists but once created, you cannot change them.

# Creating a tuple
coordinates = (10, 20)
print("Coordinates:", coordinates)  # Results: 

# Accessing tuple items
print("X coordinate:", coordinates[0])  # Result: 10
print("Y coordinate:", coordinates[1])  # Result: 20

# Unpacking tuples
x, y = coordinates
print("X is", x, "and Y is", y)  # Result: X is 10 and Y is 20

# Cannot modify tuples
# coordinates[0] = 15  # This would cause an error!


# 9. Dictionaries: Key-Value Pairs
# -------------------------------
# Dictionaries store information in pairs, like a real dictionary with words and definitions.

# Creating a dictionary
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York",
    "is_student": True
}
print("Person information:", person)

# Accessing values
print("Name:", person["name"])        # Result: Alice
print("Age:", person["age"])          # Result: 25

# Changing values
person["age"] = 26
print("Updated age:", person["age"])  # Result: 26

# Adding new key-value pairs
person["email"] = "alice@example.com"
print("Updated person:", person)

# Removing key-value pairs
del person["city"]
print("After removing city:", person)


# 10. Sets: Collections of Unique Items
# -----------------------------------
# Sets are unordered collections where each item appears only once.

# Creating a set
colors = {"red", "green", "blue", "yellow"}
print("Colors:", colors)

# Adding items
colors.add("purple")
print("After adding purple:", colors)

# Adding a duplicate (will be ignored)
colors.add("red")
print("After adding red again:", colors)  # red will not be duplicated

# Removing items
colors.remove("green")
print("After removing green:", colors)

# Checking if an item exists
print("Is blue in the set?", "blue" in colors)  # Result: True
print("Is green in the set?", "green" in colors)  # Result: False


# 11. Loops: Repeating Actions
# --------------------------
# Loops let you repeat actions multiple times without rewriting code.

# For loop: repeating for each item in a collection
print("Counting from 1 to 5:")
for number in [1, 2, 3, 4, 5]:
    print(number)

# For loop with a list
print("\nMy favorite fruits:")
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# While loop: repeating as long as a condition is True
print("\nCounting down from 5:")
count = 5
while count > 0:
    print(count)
    count = count - 1  # decrease count by 1
print("Blast off!")


# 12. Functions: Reusable Blocks of Code
# ------------------------------------
# Functions are like mini-programs you can reuse whenever needed.

# Defining a simple function
def greet(name):
    print("Hello,", name + "!")

# Using the function
greet("Sarah")  # Result: Hello, Sarah!
greet("Michael")  # Result: Hello, Michael!

# Function with a return value
def calculate_area(length, width):
    area = length * width
    return area

# Using the function with a return value
room_area = calculate_area(5, 4)
print("The room area is", room_area, "square meters")  # Result: 20

# Function with default parameters
def make_coffee(type="regular"):
    return "Making " + type + " coffee"

print(make_coffee())  # Result: Making regular coffee
print(make_coffee("espresso"))  # Result: Making espresso coffee


# 13. Simple Lambda Functions
# -------------------------
# Lambda functions are small, anonymous functions defined in a single line.

# Regular function
def double(x):
    return x * 2

# Equivalent lambda function
double_lambda = lambda x: x * 2

print("Double of 5 (regular function):", double(5))  # Result: 10
print("Double of 5 (lambda function):", double_lambda(5))  # Result: 10

# Lambda function for simple calculations
multiply = lambda a, b: a * b
print("5 × 3 =", multiply(5, 3))  # Result: 15