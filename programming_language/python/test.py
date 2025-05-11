# Python Practical Examples
# =======================

# This file contains practical examples that demonstrate Python concepts
# in action. Each example is complete and runnable.

print("Python Practical Examples")
print("========================")

# Example 1: A simple to-do list application
print("\n1. Simple To-Do List Application")
print("---------------------------------")

def todo_list():
    """A simple text-based to-do list manager"""
    tasks = []
    
    while True:
        print("\nYour To-Do List:")
        if not tasks:
            print("  (No tasks yet)")
        else:
            for i, task in enumerate(tasks, 1):
                status = "✓" if task["completed"] else " "
                print(f"  {i}. [{status}] {task['description']}")
        
        print("\nOptions:")
        print("  1. Add a task")
        print("  2. Mark a task as complete")
        print("  3. Remove a task")
        print("  4. Quit")
        
        choice = input("\nWhat would you like to do? (1-4): ")
        
        if choice == "1":
            description = input("Enter task description: ")
            tasks.append({"description": description, "completed": False})
            print(f"Task '{description}' added!")
        
        elif choice == "2":
            if not tasks:
                print("No tasks to mark complete!")
                continue
                
            try:
                task_num = int(input("Enter task number to mark complete: "))
                if 1 <= task_num <= len(tasks):
                    tasks[task_num-1]["completed"] = True
                    print(f"Task {task_num} marked complete!")
                else:
                    print("Invalid task number!")
            except ValueError:
                print("Please enter a valid number!")
        
        elif choice == "3":
            if not tasks:
                print("No tasks to remove!")
                continue
                
            try:
                task_num = int(input("Enter task number to remove: "))
                if 1 <= task_num <= len(tasks):
                    removed = tasks.pop(task_num-1)
                    print(f"Task '{removed['description']}' removed!")
                else:
                    print("Invalid task number!")
            except ValueError:
                print("Please enter a valid number!")
        
        elif choice == "4":
            print("Goodbye!")
            break
        
        else:
            print("Invalid choice. Please enter a number between 1 and 4.")

# Uncomment to run the to-do list application:
# todo_list()


# Example 2: Temperature converter
print("\n2. Temperature Converter")
print("-----------------------")

def temperature_converter():
    """Convert between Celsius and Fahrenheit"""
    
    def celsius_to_fahrenheit(celsius):
        """Convert Celsius to Fahrenheit"""
        return (celsius * 9/5) + 32
    
    def fahrenheit_to_celsius(fahrenheit):
        """Convert Fahrenheit to Celsius"""
        return (fahrenheit - 32) * 5/9
    
    print("Temperature Converter")
    print("1. Celsius to Fahrenheit")
    print("2. Fahrenheit to Celsius")
    
    choice = input("Choose conversion (1 or 2): ")
    
    if choice == "1":
        celsius = float(input("Enter temperature in Celsius: "))
        fahrenheit = celsius_to_fahrenheit(celsius)
        print(f"{celsius}°C is equal to {fahrenheit:.1f}°F")
    
    elif choice == "2":
        fahrenheit = float(input("Enter temperature in Fahrenheit: "))
        celsius = fahrenheit_to_celsius(fahrenheit)
        print(f"{fahrenheit}°F is equal to {celsius:.1f}°C")
    
    else:
        print("Invalid choice!")

# Uncomment to run the temperature converter:
# temperature_converter()


# Example 3: Basic data analysis
print("\n3. Basic Data Analysis")
print("---------------------")

def analyze_numbers():
    """Analyze a list of numbers provided by the user"""
    
    # Get input from user
    input_string = input("Enter a series of numbers separated by spaces: ")
    
    # Convert the input string to a list of numbers
    try:
        numbers = [float(num) for num in input_string.split()]
    except ValueError:
        print("Error: Please enter valid numbers!")
        return
    
    if not numbers:
        print("No numbers to analyze!")
        return
    
    # Perform the analysis
    count = len(numbers)
    total = sum(numbers)
    average = total / count
    minimum = min(numbers)
    maximum = max(numbers)
    
    # Count positive, negative, and zero numbers
    positives = sum(1 for num in numbers if num > 0)
    negatives = sum(1 for num in numbers if num < 0)
    zeros = sum(1 for num in numbers if num == 0)
    
    # Display the results
    print("\nAnalysis Results:")
    print(f"Count: {count} numbers")
    print(f"Sum: {total}")
    print(f"Average: {average:.2f}")
    print(f"Minimum: {minimum}")
    print(f"Maximum: {maximum}")
    print(f"Range: {maximum - minimum}")
    print(f"Positive numbers: {positives}")
    print(f"Negative numbers: {negatives}")
    print(f"Zeros: {zeros}")

# Uncomment to run the number analyzer:
# analyze_numbers()


# Example 4: Word counter
print("\n4. Word Counter")
print("--------------")

def word_counter():
    """Count words in a text and find the most common words"""
    
    text = input("Enter or paste your text: ")
    
    # Count total words
    words = text.lower().split()
    total_words = len(words)
    
    # Count unique words
    unique_words = set(words)
    unique_count = len(unique_words)
    
    # Word frequency
    word_freq = {}
    for word in words:
        # Remove punctuation from the word
        word = word.strip(".,!?:;\"'()[]{}")
        if word:  # Skip empty strings
            if word in word_freq:
                word_freq[word] += 1
            else:
                word_freq[word] = 1
    
    # Find the most common words
    most_common = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)[:5]
    
    # Display results
    print("\nWord Count Results:")
    print(f"Total words: {total_words}")
    print(f"Unique words: {unique_count}")
    
    print("\nMost common words:")
    for word, count in most_common:
        print(f"  '{word}': {count} times")

# Uncomment to run the word counter:
# word_counter()


# Example 5: Simple number guessing game
print("\n5. Number Guessing Game")
print("----------------------")

def guessing_game():
    """A simple number guessing game"""
    import random
    
    # Generate a random number between 1 and 100
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print("Welcome to the Number Guessing Game!")
    print(f"I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts to guess it.")
    
    while attempts < max_attempts:
        try:
            guess = int(input("\nEnter your guess (1-100): "))
            
            if guess < 1 or guess > 100:
                print("Please enter a number between a 1 and 100!")
                continue
                
            attempts += 1
            
            if guess < secret_number:
                print(f"Too low! You have {max_attempts - attempts} attempts left.")
            elif guess > secret_number:
                print(f"Too high! You have {max_attempts - attempts} attempts left.")
            else:
                print(f"Congratulations! You guessed the number in {attempts} attempts!")
                break
                
        except ValueError:
            print("Please enter a valid number!")
    
    if attempts >= max_attempts and guess != secret_number:
        print(f"\nGame over! You've used all {max_attempts} attempts.")
        print(f"The secret number was {secret_number}.")

# Uncomment to play the guessing game:
# guessing_game()


# Example for testing and running:
print("\nQuick Test (Countdown from 5):")
count = 5
while count > 0:
    print(count)
    count -= 1
print("Blast off!")