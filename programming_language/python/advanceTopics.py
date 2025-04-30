# Object-Oriented Programming (OOP)


OOP is a programming paradigm based on the concept of objects, which can contain data and code.
Classes define the blueprint for objects.
Objects are instances of classes.


OOP concepts include encapsulation, inheritance, and polymorphism.


Classes and Objects


A class is a blueprint for creating objects.
An object is an instance of a class.


class ClassName:
    def __init__(self, parameters):
        # Initialize attributes
        self.attribute = parameters

    def method(self):
        # Method definition
        pass

# Creating an object
object_name = ClassName(arguments)


class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} says woof!")

# Creating an object
my_dog = Dog("Buddy", 3)
print(my_dog.name)  # Output: Buddy
print(my_dog.age)  # Output: 3
my_dog.bark()  # Output: Buddy says woof!
Methods



Methods are functions defined inside a class that operate on objects of that class.
Instance methods: Operate on the instance of the class.
Class methods: Use the @classmethod decorator and operate on the class itself.
Static methods: Use the @staticmethod decorator and do not operate on instances or classes directly.


class ClassName:
    def instance_method(self):
        pass

    @classmethod
    def class_method(cls):
        pass

    @staticmethod
    def static_method():
        pass


class MathOperations:
    def __init__(self, number):
        self.number = number

    def square(self):
        return self.number ** 2

    @classmethod
    def multiply(cls, a, b):
        return a * b

    @staticmethod
    def add(a, b):
        return a + b

# Using instance method
obj = MathOperations(4)
print(obj.square())  # Output: 16

# Using class method
print(MathOperations.multiply(3, 5))  # Output: 15

# Using static method
print(MathOperations.add(10, 20))  # Output: 30
Inheritance


Inheritance allows a class to inherit attributes and methods from another class.
Base class (Parent): The class being inherited from.
Derived class (Child): The class that inherits from the base class.


class BaseClass:
    # Base class definition
    pass

class DerivedClass(BaseClass):
    # Derived class definition
    pass


class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} says woof!")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} says meow!")

dog = Dog("Buddy")
cat = Cat("Whiskers")

dog.speak()  # Output: Buddy says woof!
cat.speak()  # Output: Whiskers says meow!





#* Polymorphism


Polymorphism allows methods to be used interchangeably between different classes, as long as they implement the same method.
Achieved through method overriding and method overloading.


# Polymorphism through method overriding
class BaseClass:
    def method(self):
        pass

class DerivedClass1(BaseClass):
    def method(self):
        pass

class DerivedClass2(BaseClass):
    def method(self):
        pass


class Bird:
    def __init__(self, name):
        self.name = name

    def fly(self):
        print(f"{self.name} is flying")

class Penguin(Bird):
    def fly(self):
        print(f"{self.name} cannot fly")

class Sparrow(Bird):
    def fly(self):
        print(f"{self.name} flies high")

def let_it_fly(bird):
    bird.fly()

penguin = Penguin("Pingu")
sparrow = Sparrow("Jack")

let_it_fly(penguin)  # Output: Pingu cannot fly
let_it_fly(sparrow)  # Output: Jack flies high
Encapsulation


#* Encapsulation 

is the concept of wrapping data and methods within a single unit (class) and restricting access to some of the object's components.
Access modifiers: Public, Private, and Protected.


class ClassName:
    def __init__(self):
        self.public_attribute = "I am public"
        self._protected_attribute = "I am protected"
        self.__private_attribute = "I am private"

    def get_private_attribute(self):
        return self.__private_attribute


class Car:
    def __init__(self, brand, model):
        self.brand = brand  # Public
        self._model = model  # Protected
        self.__engine = "V8"  # Private

    def get_engine(self):
        return self.__engine

    def set_engine(self, engine):
        self.__engine = engine

car = Car("Ford", "Mustang")
print(car.brand)  # Output: Ford
print(car._model)  # Output: Mustang
# print(car.__engine)  # AttributeError: 'Car' object has no attribute '__engine'
print(car.get_engine())  # Output: V8
car.set_engine("V6")
print(car.get_engine())  # Output: V6












Collections Module


namedtuple


namedtuple is a factory function for creating tuple subclasses with named fields.
It allows for more readable and self-documenting code by accessing elements by name instead of position.

from collections import namedtuple

# Creating a namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)


from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)

print(p.x)  # Output: 10
print(p.y)  # Output: 20



# deque


deque (double-ended queue) is a list-like container with fast appends and pops on both ends.
Useful for implementing queues and stacks.


from collections import deque

# Creating a deque
d = deque([1, 2, 3, 4])

from collections import deque

d = deque([1, 2, 3, 4])
d.append(5)  # Append to the right
d.appendleft(0)  # Append to the left
print(d)  # Output: deque([0, 1, 2, 3, 4, 5])

d.pop()  # Pop from the right
print(d)  # Output: deque([0, 1, 2, 3, 4])

d.popleft()  # Pop from the left
print(d)  # Output: deque([1, 2, 3, 4])


# Counter

Counter is a dictionary subclass for counting hashable objects.
It is useful for counting occurrences of elements.


from collections import Counter

# Creating a Counter
c = Counter([1, 2, 2, 3, 3, 3])


from collections import Counter

c = Counter([1, 2, 2, 3, 3, 3])
print(c)  # Output: Counter({3: 3, 2: 2, 1: 1})

# Accessing counts
print(c[2])  # Output: 2

# Most common elements
print(c.most_common(2))  # Output: [(3, 3), (2, 2)]







# Iterators


Iterators are objects that can be iterated upon.
Implement __iter__() and __next__() methods.


class MyIterator:
    def __init__(self, limit):
        self.limit = limit
        self.counter = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.counter < self.limit:
            self.counter += 1
            return self.counter
        else:
            raise StopIteration

it = MyIterator(5)
for i in it:
    print(i)


class MyIterator:
    def __init__(self, limit):
        self.limit = limit
        self.counter = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.counter < self.limit:
            self.counter += 1
            return self.counter
        else:
            raise StopIteration

it = MyIterator(5)
for i in it:
    print(i)  # Output: 1 2 3 4 5
    
    
    
# Generators

Generators are a simpler way to create iterators using a function with yield statement.
They allow you to iterate through a set of values lazily.


def my_generator(limit):
    counter = 0
    while counter < limit:
        counter += 1
        yield counter

gen = my_generator(5)
for i in gen:
    print(i)


def countdown(n):
    while n > 0:
        yield n
        n -= 1

for i in countdown(5):
    print(i)  # Output: 5 4 3 2 1
Decorators
Notes
Decorators are functions that modify the behavior of another function.
They are often used for logging, access control, and monitoring.


def my_decorator(func):
    def wrapper(*args, **kwargs):
        # Code to execute before the function call
        result = func(*args, **kwargs)
        # Code to execute after the function call
        return result
    return wrapper

@my_decorator
def my_function():
    pass


def debug(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args} and {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@debug
def add(a, b):
    return a + b

add(2, 3)
# Output:
# Calling add with (2, 3) and {}
# add returned 5







Regular Expressions

Regular expressions (regex) are patterns used to match character combinations in strings.
Python's re module provides functions to work with regex.


re Module Functions

match: Checks for a match only at the beginning of the string.
search: Searches for the first location where the regex pattern produces a match.
findall: Finds all matches of a pattern in a string.
sub: Replaces occurrences of a pattern with a replacement string.


import re

# match
result = re.match(pattern, string)

# search
result = re.search(pattern, string)

# findall
result = re.findall(pattern, string)

# sub
result = re.sub(pattern, repl, string)


import re

text = "The rain in Spain stays mainly in the plain."

# match
result = re.match(r"The", text)
print(result)  # Output: <re.Match object; span=(0, 3), match='The'>

# search
result = re.search(r"Spain", text)
print(result)  # Output: <re.Match object; span=(12, 17), match='Spain'>

# findall
result = re.findall(r"in", text)
print(result)  # Output: ['in', 'in', 'in']

# sub
result = re.sub(r"Spain", "France", text)
print(result)  # Output: The rain in France stays mainly in the plain.



Example with Detailed Patterns

import re

# Define a sample text
text = "Contact us at support@example.com or sales@example.com"

# Pattern to match email addresses
pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

# findall
emails = re.findall(pattern, text)
print(emails)  # Output: ['support@example.com', 'sales@example.com']

# search
first_email = re.search(pattern, text)
print(first_email.group())  # Output: support@example.com

# sub
masked_text = re.sub(pattern, "[email protected]", text)
print(masked_text)  # Output: Contact us at [email protected] or [email protected]