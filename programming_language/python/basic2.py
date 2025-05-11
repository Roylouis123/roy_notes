# Python Beyond Basics: Practical Skills
# ===================================

# 1. Working with Files: Reading and Writing
# -----------------------------------------
# Files let us store and retrieve information that persists even after our program ends.

# Think of files like documents on your computer - we can open them, read them, write to them, and close them.

# Opening a file in 'write' mode (creates a new file or overwrites an existing one)
print("Creating a file...")
with open('shopping_list.txt', 'w') as file:
    file.write("Apples\n")  # \n means "new line"
    file.write("Bread\n")
    file.write("Cheese\n")
    file.write("Milk\n")
print("File created!")

# Opening a file in 'read' mode (to view its contents)
print("\nReading the complete file:")
with open('shopping_list.txt', 'r') as file:
    content = file.read()
    print(content)

# Reading a file line by line
print("\nReading the file line by line:")
with open('shopping_list.txt', 'r') as file:
    for line in file:
        print("Item:", line.strip())  # strip() removes extra whitespace

# Opening a file in 'append' mode (to add more content without erasing what's there)
print("\nAppending to the file...")
with open('shopping_list.txt', 'a') as file:
    file.write("Eggs\n")
    file.write("Yogurt\n")

# Reading the updated file
print("\nReading the updated file:")
with open('shopping_list.txt', 'r') as file:
    content = file.read()
    print(content)


# 2. Working with CSV Files (Spreadsheet Data)
# ------------------------------------------
# CSV (Comma-Separated Values) files are like simple spreadsheets.
# They store data in rows and columns, separated by commas.

import csv

# Creating a CSV file (like a mini-spreadsheet)
print("\nCreating a CSV file...")
with open('employees.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    # Write the header row
    writer.writerow(['Name', 'Department', 'Salary'])
    # Write data rows
    writer.writerow(['Alice Smith', 'Marketing', 55000])
    writer.writerow(['Bob Johnson', 'Engineering', 70000])
    writer.writerow(['Carol Davis', 'HR', 60000])
print("CSV file created!")

# Reading from a CSV file
print("\nReading from CSV file:")
with open('employees.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        print(row)  # Each row is a list of values


# 3. Working with JSON Data (Web Data Format)
# -----------------------------------------
# JSON is a popular data format used by websites and apps to exchange information.
# It looks similar to Python dictionaries and lists.

import json

# Example person data
person = {
    "name": "John Smith",
    "age": 35,
    "married": True,
    "children": ["Jane", "Bob"],
    "pets": None,
    "cars": [
        {"model": "BMW 230", "year": 2014},
        {"model": "Ford Edge", "year": 2019}
    ]
}

# Saving data to a JSON file
print("\nSaving data to a JSON file...")
with open('person.json', 'w') as jsonfile:
    json.dump(person, jsonfile, indent=4)  # indent makes it pretty and readable
print("JSON file saved!")

# Reading data from a JSON file
print("\nReading from JSON file:")
with open('person.json', 'r') as jsonfile:
    data = json.load(jsonfile)
    print("Name:", data["name"])
    print("Age:", data["age"])
    print("Children:", ", ".join(data["children"]))
    print("First car model:", data["cars"][0]["model"])


# 4. Error Handling: Dealing with Problems
# --------------------------------------
# In the real world, things go wrong! Error handling lets our programs deal with
# problems gracefully instead of crashing.

# Example 1: Division by zero
print("\nHandling division by zero:")
try:
    # This will cause an error
    result = 10 / 0
    print("Result:", result)  # This line won't run
except ZeroDivisionError:
    print("Error: You can't divide by zero!")

# Example 2: Missing file
print("\nHandling a missing file:")
try:
    with open('file_that_doesnt_exist.txt', 'r') as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("Error: The file doesn't exist!")

# Example 3: Multiple possible errors
print("\nHandling multiple error types:")
try:
    number = int(input("Enter a number: "))  # Try entering "abc" or "0"
    result = 100 / number
    print("100 divided by", number, "is", result)
except ValueError:
    print("Error: That's not a valid number!")
except ZeroDivisionError:
    print("Error: You can't divide by zero!")
except:
    print("Some other error occurred!")
finally:
    # This always runs, error or no error
    print("This calculation attempt is complete.")


# 5. Creating Custom Errors
# -----------------------
# Sometimes we need to create our own error types for our specific programs.

class NegativeNumberError(Exception):
    """Error raised when a number is negative but should be positive."""
    pass

def calculate_square_root(number):
    """Calculate the square root of a non-negative number."""
    if number < 0:
        raise NegativeNumberError("Cannot calculate square root of a negative number")
    return number ** 0.5  # ** 0.5 is the same as square root

# Using our custom error
print("\nUsing a custom error:")
try:
    # Try with -9, then try with 9
    result = calculate_square_root(-9)
    print("Square root result:", result)
except NegativeNumberError as e:
    print("Error:", e)

# 6. Context Managers (the 'with' statement)
# ----------------------------------------
# Context managers help us properly set up and clean up resources like files.
# The 'with' statement ensures files are always closed properly, even if errors occur.

print("\nUsing a context manager (with statement):")
try:
    # This ensures the file is properly closed, even if an error occurs
    with open('shopping_list.txt', 'r') as file:
        for line in file:
            print("Shopping item:", line.strip())
except FileNotFoundError:
    print("The file doesn't exist.")