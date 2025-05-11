# Python Advanced Concepts Made Simple
# =================================

# 1. Object-Oriented Programming (OOP): Creating Virtual "Things"
# -------------------------------------------------------------
# OOP lets us model real-world objects in our code, with properties and behaviors.

# Think of it like creating a blueprint (class) for making many similar objects.
# Example: A blueprint for a car would specify it has wheels, an engine, etc.

print("OBJECT-ORIENTED PROGRAMMING (OOP)")
print("=================================")

# Simple class example: Dog
print("\n1. Creating and using a basic class:")

class Dog:
    # Init method - runs when we create a new dog
    def __init__(self, name, age, breed):
        # These are the dog's attributes (properties)
        self.name = name
        self.age = age
        self.breed = breed
        self.is_sitting = False
    
    # These are the dog's methods (behaviors)
    def bark(self):
        return f"{self.name} says Woof!"
    
    def sit(self):
        if not self.is_sitting:
            self.is_sitting = True
            return f"{self.name} sits down"
        else:
            return f"{self.name} is already sitting"
    
    def stand(self):
        if self.is_sitting:
            self.is_sitting = False
            return f"{self.name} stands up"
        else:
            return f"{self.name} is already standing"

# Creating dog objects from our Dog class
buddy = Dog("Buddy", 3, "Golden Retriever")
max = Dog("Max", 2, "German Shepherd")

# Using our dog objects
print(f"We have two dogs: {buddy.name} the {buddy.breed} and {max.name} the {max.breed}")
print(buddy.bark())
print(max.bark())
print(buddy.sit())
print(buddy.sit())  # Already sitting
print(buddy.stand())

# 2. Inheritance: Creating Specialized Classes
# -------------------------------------------
# Inheritance lets us create a new class based on an existing class.
# The new class inherits all the attributes and methods but can also have its own.

print("\n2. Inheritance - creating specialized classes:")

class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
    
    def make_sound(self):
        return "Some generic animal sound"
    
    def info(self):
        return f"{self.name} is a {self.species}"

# Dog class inherits from Animal class
class ImproveDog(Animal):
    def __init__(self, name, breed, favorite_toy):
        # Call the parent class's init method
        super().__init__(name, "dog")  # All dogs are species "dog"
        self.breed = breed
        self.favorite_toy = favorite_toy
    
    # Override the parent's make_sound method
    def make_sound(self):
        return "Woof!"
    
    # Add a new method specific to dogs
    def play(self):
        return f"{self.name} plays with {self.favorite_toy}"

# Cat class also inherits from Animal
class Cat(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "cat")  # All cats are species "cat"
        self.breed = breed
    
    # Override parent's make_sound method
    def make_sound(self):
        return "Meow!"
    
    # Add a cat-specific method
    def purr(self):
        return f"{self.name} purrs contentedly"

# Create animal objects
generic_animal = Animal("Wild Thing", "unknown")
rex = ImproveDog("Rex", "Beagle", "tennis ball")
whiskers = Cat("Whiskers", "Siamese")

# Test the objects
print(generic_animal.info())  # From Animal class
print(generic_animal.make_sound())  # From Animal class

print(rex.info())  # Inherited from Animal
print(rex.make_sound())  # Overridden in Dog
print(rex.play())  # New method in Dog

print(whiskers.info())  # Inherited from Animal
print(whiskers.make_sound())  # Overridden in Cat
print(whiskers.purr())  # New method in Cat


# 3. Special Methods: Customizing Object Behavior
# ---------------------------------------------
# Python classes can implement special methods that let objects work with
# built-in functions and operators.

print("\n3. Special methods in classes:")

class ShoppingCart:
    def __init__(self):
        self.items = {}  # Dictionary to store items and their quantities
    
    # Add an item to the cart
    def add_item(self, item, price, quantity=1):
        if item in self.items:
            self.items[item]['quantity'] += quantity
        else:
            self.items[item] = {'price': price, 'quantity': quantity}
    
    # Special method to get the length
    def __len__(self):
        """Returns the total number of items in the cart"""
        return sum(item['quantity'] for item in self.items.values())
    
    # Special method for string representation
    def __str__(self):
        """Returns a human-readable string describing the cart"""
        item_count = len(self)
        total = self.calculate_total()
        return f"Shopping Cart with {item_count} items, total: ${total:.2f}"
    
    # Calculate the total price
    def calculate_total(self):
        """Calculate the total cost of all items in the cart"""
        return sum(item['price'] * item['quantity'] for item in self.items.values())

# Create a shopping cart
cart = ShoppingCart()
cart.add_item("Apple", 0.99, 5)
cart.add_item("Bread", 3.49, 2)
cart.add_item("Milk", 2.99)  # Default quantity is 1

# Use the special methods
print(f"Number of items in cart: {len(cart)}")  # Uses __len__
print(cart)  # Uses __str__
print(f"Total cost: ${cart.calculate_total():.2f}")


# 4. Data Collections: Tools for Organizing Information
# ---------------------------------------------------
# Python's collections module provides specialized container datatypes that
# extend beyond the built-in types (list, dict, set, tuple).

from collections import namedtuple, Counter, defaultdict, deque
import random

print("\n4. Specialized collections:")

# namedtuple - A tuple with named fields
print("\na) namedtuple - Tuple with named fields:")
Person = namedtuple('Person', ['name', 'age', 'job'])
john = Person('John Doe', 35, 'Software Developer')
print(f"{john.name} is {john.age} years old and works as a {john.job}")

# Counter - Count occurrences of elements
print("\nb) Counter - Counting elements:")
fruits = ['apple', 'orange', 'banana', 'apple', 'banana', 'apple', 'pear']
fruit_count = Counter(fruits)
print(f"Fruit count: {dict(fruit_count)}")
print(f"Most common fruits: {fruit_count.most_common(2)}")  # Top 2 most common

# defaultdict - Dictionary with default values
print("\nc) defaultdict - Dictionary with default values:")
# Regular dict gives KeyError for missing keys
regular_dict = {}
try:
    print(regular_dict['missing'])
except KeyError:
    print("Regular dict raised KeyError for missing key")

# defaultdict provides a default value instead
int_dict = defaultdict(int)  # Default value is 0
print(f"Value for missing key: {int_dict['missing']}")  # Gives 0 instead of error
int_dict['a'] += 1  # No error even though 'a' wasn't defined
print(f"Values in int_dict: {dict(int_dict)}")

# deque - Double-ended queue
print("\nd) deque - Double-ended queue:")
d = deque(['first', 'second', 'third'])
print(f"Initial deque: {d}")
d.append('last')  # Add to right end
d.appendleft('new first')  # Add to left end
print(f"After adding to both ends: {d}")
print(f"Removed from right: {d.pop()}")  # Remove from right
print(f"Removed from left: {d.popleft()}")  # Remove from left
print(f"Final deque: {d}")


# 5. Iterators and Generators: Efficient Data Processing
# ----------------------------------------------------
# Iterators and generators let us process data efficiently, one item at a time,
# without loading everything into memory.

print("\n5. Iterators and Generators:")

# Iterator example
print("\na) Custom iterator - Countdown:")

class Countdown:
    def __init__(self, start):
        self.start = start
    
    # Required for iterator objects
    def __iter__(self):
        return self
    
    # Required for iterator objects
    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1

# Using the iterator
print("Counting down from 5:")
for num in Countdown(5):
    print(num, end=' ')
print()  # Newline

# Generator example (much simpler!)
print("\nb) Generator function - Countdown:")

def countdown_generator(start):
    while start > 0:
        yield start
        start -= 1

# Using the generator
print("Counting down from 5:")
for num in countdown_generator(5):
    print(num, end=' ')
print()  # Newline

# Generator for Fibonacci sequence
print("\nc) Generator for Fibonacci sequence:")

def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

print("Fibonacci numbers up to 100:")
for num in fibonacci(100):
    print(num, end=' ')
print()  # Newline


# 6. Decorators: Adding Functionality to Functions
# ----------------------------------------------
# Decorators are a way to modify or enhance functions without changing their code.
# Think of them like "wrapping" a function with another function.

print("\n6. Decorators - Enhancing functions:")

# A simple decorator to measure execution time
import time

def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.6f} seconds to run")
        return result
    return wrapper

# Apply the decorator to a function
@timer_decorator
def slow_function():
    """This function just wastes time"""
    total = 0
    for i in range(1000000):
        total += i
    return total

# Run the decorated function
print("\nRunning slow_function:")
result = slow_function()
print(f"Result: {result}")

# A decorator that counts function calls
def counter_decorator(func):
    def wrapper(*args, **kwargs):
        wrapper.count += 1
        print(f"This is call #{wrapper.count} to {func.__name__}")
        return func(*args, **kwargs)
    wrapper.count = 0  # Initialize the counter
    return wrapper

# Apply the counter decorator
@counter_decorator
def greet(name):
    return f"Hello, {name}!"

# Test the counter
print("\nTesting counter decorator:")
print(greet("Alice"))
print(greet("Bob"))
print(greet("Charlie"))


# 7. Regular Expressions: Pattern Matching in Text
# ----------------------------------------------
# Regular expressions provide a powerful way to search, match, and manipulate text
# based on patterns.

import re

print("\n7. Regular Expressions - Pattern matching:")

# A simple example: finding email addresses
text = """
Contact information:
- John Doe: john.doe@example.com
- Jane Smith: jane_smith@company.org
- Support Team: support@website.co.uk
"""

print("\nText with email addresses:")
print(text)

# Find all email addresses
email_pattern = r'[\w.+-]+@[\w-]+\.[\w.-]+'
emails = re.findall(email_pattern, text)

print("\nExtracted email addresses:")
for email in emails:
    print(f"- {email}")

# Replace email addresses with a masked version
masked_text = re.sub(email_pattern, '[EMAIL PROTECTED]', text)
print("\nText with masked emails:")
print(masked_text)

# Validating a phone number format
def is_valid_phone(phone):
    pattern = r'^\(\d{3}\) \d{3}-\d{4}$'
    return bool(re.match(pattern, phone))

# Test the phone validator
print("\nValidating phone numbers:")
phones = ['(123) 456-7890', '123-456-7890', '(123)456-7890', '(123) 456-78901']
for phone in phones:
    if is_valid_phone(phone):
        print(f"{phone} is valid")
    else:
        print(f"{phone} is NOT valid")