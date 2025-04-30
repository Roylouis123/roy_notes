#* File Handling

File handling allows you to read from and write to files.
Python provides built-in functions like open(), read(), write(), and close() for file handling.

Note:It's important to close files after working with them to free up system resources.


# Opening a file
file = open('filename', 'mode')

# Modes:
# 'r' - read (default)
# 'w' - write (truncate the file)
# 'a' - append
# 'b' - binary mode
# 't' - text mode (default)
# '+' - read and write

# Reading from a file
content = file.read()  # Read the entire file
lines = file.readlines()  # Read all lines into a list

# Writing to a file
file.write('Some text')

# Closing a file
file.close()


# Writing to a text file
with open('example.txt', 'w') as file:
    file.write("Hello, world!\n")
    file.write("This is a new line.")

# Reading from a text file
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
    


# Writing to a text file
with open('example.txt', 'w') as file:
    file.write("Line 1\n")
    file.write("Line 2\n")

# Reading from a text file
with open('example.txt', 'r') as file:
    for line in file:
        print(line.strip())  # strip() removes the newline character






import csv

# Writing to a CSV file
with open('example.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Name', 'Age', 'City'])
    writer.writerow(['Alice', 30, 'New York'])
    writer.writerow(['Bob', 25, 'Los Angeles'])

# Reading from a CSV file
with open('example.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        print(row)
Working with JSON Files






# JSON (JavaScript Object Notation) is a lightweight data-interchange format.
Python's json module provides functions to read from and write to JSON files.


import json

data = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Writing to a JSON file
with open('example.json', 'w') as jsonfile:
    json.dump(data, jsonfile)

# Reading from a JSON file
with open('example.json', 'r') as jsonfile:
    content = json.load(jsonfile)
    print(content)
Comprehensive 

# Reading from a CSV file and writing to a JSON file
import csv
import json

csv_file = 'example.csv'
json_file = 'example.json'

# Reading data from CSV
data = []
with open(csv_file, 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        data.append(row)

# Writing data to JSON
with open(json_file, 'w') as jsonfile:
    json.dump(data, jsonfile, indent=4)
    
    
    
    
# * Exception Handling
Try, Except Blocks

Exception handling allows you to manage errors gracefully without crashing your program.
Use try block to wrap the code that may raise an exception.
Use except block to handle the exception.


try:
    # Code that might raise an exception
    pass
except SomeException as e:
    # Code that runs if the exception occurs
    pass


try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")  # Output: Error: division by zero
    
    
    
Multiple Exceptions


try:
    result = 10 / int("a")
except ZeroDivisionError:
    print("Cannot divide by zero")
except ValueError:
    print("Invalid input")
    
    
    
    # Finally and Else Clauses


finally: A block that will always execute, regardless of whether an exception occurred or not.
else: A block that will execute if no exceptions are raised in the try block.


try:
    # Code that might raise an exception
    pass
except SomeException as e:
    # Code that runs if the exception occurs
    pass
else:
    # Code that runs if no exception occurs
    pass
finally:
    # Code that always runs
    pass


try:
    file = open('example.txt', 'r')
    content = file.read()
except FileNotFoundError as e:
    print(f"Error: {e}")
else:
    print("File read successfully")
finally:
    file.close()
    print("File closed")
    
    
   
   
   
    # Raising Exceptions


Use the raise statement to manually trigger an exception.
You can raise built-in exceptions or custom exceptions.


raise SomeException("Error message")


def check_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    else:
        print("Age is valid")

try:
    check_age(-1)
except ValueError as e:
    print(f"Error: {e}")  # Output: Error: Age cannot be negative
    
    
    
    
# Custom Exceptions


class CustomError(Exception):
    pass

def do_something():
    raise CustomError("Something went wrong")

try:
    do_something()
except CustomError as e:
    print(f"Error: {e}")  # Output: Error: Something went wrong
Comprehensive 

class NegativeNumberError(Exception):
    """Custom exception for negative numbers"""
    pass

def sqrt(number):
    if number < 0:
        raise NegativeNumberError("Cannot calculate square root of a negative number")
    return number ** 0.5

try:
    num = -10
    result = sqrt(num)
except NegativeNumberError as e:
    print(f"Error: {e}")
else:
    print(f"Square root: {result}")
finally:
    print("Execution completed")