# Phase 1: Introduction to Python

# Example of variable assignment
x = 10         # int
y = 3.14       # float
name = "Roy"   # string
is_student = True # bool

# Arithmetic Operators
Used to perform mathematical operations.

a = 10
b = 3

addition = a + b       # 13
subtraction = a - b    # 7
multiplication = a * b # 30
division = a / b       # 3.3333
modulus = a % b        # 1
exponentiation = a ** b # 1000
floor_division = a // b # 3


# Comparison Operators
Used to compare two values. They return a boolean value (True or False).

x = 10
y = 20

equals = (x == y)        # False
not_equals = (x != y)    # True
greater_than = (x > y)   # False
less_than = (x < y)      # True
greater_than_or_equal = (x >= y) # False
less_than_or_equal = (x <= y)    # True



# Logical Operators
Used to combine conditional statements.

a = True
b = False

and_operator = a and b   # False
or_operator = a or b     # True
not_operator = not a     # False



# Conditional Statements

Basic if statement:

num = 5
if num > 0:
    print("The number is positive")
    
    
    
if-elif-else statement:

temperature = 30

if temperature > 30:
    print("It's a hot day")
elif temperature > 20:
    print("It's a nice day")
elif temperature > 10:
    print("It's a bit chilly")
else:
    print("It's cold")
    
    
    
    
    
# *Lists

Lists are ordered, mutable collections of items.
Items in a list can be of different types.
Lists are defined using square brackets [].



# Creating a list
my_list = [1, 2, 3, 4, 5]

fruits = ["apple", "banana", "cherry"]
print(fruits)  # Output: ['apple', 'banana', 'cherry']



# Accessing elements
first_element = my_list[0]

# Accessing elements
print(fruits[1])  # Output: banana



# Modifying elements
my_list[1] = 20

# Modifying elements
fruits[0] = "avocado"
print(fruits)  # Output: ['avocado', 'banana', 'cherry']



# Adding elements
my_list.append(6)

# Adding elements
fruits.append("date")
print(fruits)  # Output: ['avocado', 'banana', 'cherry', 'date']



# Removing elements
my_list.remove(3)

# Removing elements
fruits.remove("banana")
print(fruits)  # Output: ['avocado', 'cherry', 'date']
    
   


# *Tuples

Tuples are ordered, immutable collections of items.
Items in a tuple can be of different types.
Tuples are defined using parentheses ().

# Creating a tuple
my_tuple = (1, 2, 3, 4, 5)

coordinates = (10, 20)
print(coordinates)  # Output: (10, 20)


# Unpacking tuples
x, y = coordinates
print(x, y)  # Output: 10 20

# Accessing elements
first_element = my_tuple[0]

# Accessing elements
print(coordinates[0])  # Output: 10


# Tuples are immutable; elements cannot be modified
# my_tuple[1] = 20 # This would raise a TypeError

# Tuples are immutable
# coordinates[0] = 15  # This would raise a TypeError


# Tuples can be unpacked
a, b, c = (1, 2, 3)





#* Dictionaries

Dictionaries are unordered, mutable collections of key-value pairs.
Keys must be unique and of an immutable type (e.g., strings, numbers, tuples).
Dictionaries are defined using curly braces {}.


# Creating a dictionary
my_dict = {"name": "John", "age": 30, "city": "New York"}

person = {"name": "Alice", "age": 25, "city": "Paris"}
print(person)  # Output: {'name': 'Alice', 'age': 25, 'city': 'Paris'}


# Accessing values
name = my_dict["name"]

# Accessing values
print(person["name"])  # Output: Alice




# Modifying values
my_dict["age"] = 31

# Modifying values
person["age"] = 26
print(person)  # Output: {'name': 'Alice', 'age': 26, 'city': 'Paris'}


# Adding key-value pairs
my_dict["email"] = "john@example.com"

# Adding key-value pairs
person["email"] = "alice@example.com"
print(person)  # Output: {'name': 'Alice', 'age': 26, 'city': 'Paris', 'email': 'alice@example.com'}


# Removing key-value pairs
del my_dict["city"]



# Removing key-value pairs
del person["city"]
print(person)  # Output: {'name': 'Alice', 'age': 26, 'email': 'alice@example.com'}



#* Sets

Sets are unordered collections of unique items.
Sets are mutable, but items must be immutable.
Sets are defined using curly braces {} or the set() function.


# Creating a set
my_set = {1, 2, 3, 4, 5}

colors = {"red", "green", "blue"}
print(colors)  # Output: {'blue', 'red', 'green'}



# Adding elements
my_set.add(6)

# Adding elements
colors.add("yellow")
print(colors)  # Output: {'blue', 'yellow', 'red', 'green'}



# Removing elements
my_set.remove(3)

# Removing elements
colors.remove("green")
print(colors)  # Output: {'blue', 'yellow', 'red'}


# Sets do not allow duplicate values
my_set.add(2)  # 2 is already in the set, so it won't be added again

# Checking for membership
print("red" in colors)  # Output: True
print("green" in colors)  # Output: False
    
    



 # Loops
 
for Loop

for: Iterates over a sequence (e.g., list, tuple, string) and executes a block of code for each item.

# Example of for loop
numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)
    
    # output
    # 1
    # 2
    # 3
    # 4
    # 5
    
    
    
while Loop
while: Repeatedly executes a block of code as long as a specified condition is true.


# Example of while loop
count = 0
while count < 5:
    print(count)
    count += 1
    
    # output
# 0
# 1
# 2
# 3
# 4
    
    
    
   
   
   
   #* Defining a function
   
   
def function_name(parameters):
    # Function body
    statements
    return value

# Calling a function
function_name(arguments)


# example1
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Output: Hello, Alice!
   
   
# example2

def multiply(x, y):
    return x * y

product = multiply(4, 5)
print(product)  # Output: 20
   
   
    

# Defining a lambda function
lambda parameters: expression

# Example usage
square = lambda x: x ** 2
print(square(5))  # Output: 25


# Lambda function for addition
add = lambda a, b: a + b
print(add(3, 7))  # Output: 10

# Lambda function in sorting
pairs = [(1, 'one'), (2, 'two'), (3, 'three')]
pairs.sort(key=lambda pair: pair[1])
print(pairs)  # Output: [(1, 'one'), (3, 'three'), (2, 'two')]




Scope (Local, Global)
Notes
Local scope: Variables defined inside a function. They are not accessible outside the function.
Global scope: Variables defined outside all functions. They are accessible anywhere in the code.
The global keyword allows you to modify a global variable inside a function.
Syntax
python
Copy code
# Global scope
x = 10

def example():
    # Local scope
    y = 5
    print(x)  # Accessing global variable
    print(y)  # Accessing local variable

example()
print(x)  # Accessing global variable
# print(y)  # This would raise an error because y is not defined in the global scope
Example
python
Copy code
# Global variable
count = 0

def increment():
    # Local variable
    local_count = 0
    global count
    count += 1
    local_count += 1
    print(f"Global count: {count}, Local count: {local_count}")

increment()  # Output: Global count: 1, Local count: 1
increment()  # Output: Global count: 2, Local count: 1

print(count)  # Output: 2
# print


