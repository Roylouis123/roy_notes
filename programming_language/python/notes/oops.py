

# 🧠 Core Concepts of OOP (Explained Simply)

Imagine you’re building a simple system for a hospital.
 Here’s what the system needs to handle:

Doctors, Nurses, and Patients are all people—but they behave differently.

Each person has common information: name, age, ID

But:

A Doctor can prescribe medicine

A Nurse can check vitals

A Patient can book an appointment

Let’s use OOP to model this.


✅ Step-by-Step Solution Using OOP
1. Create an abstract class called Person → for Abstraction

from abc import ABC, abstractmethod

class Person(ABC):  # Abstract class
    def __init__(self, name, age, id):
        self.name = name
        self.age = age
        self.id = id

    @abstractmethod
    def perform_duty(self):
        pass
2. Create subclasses for Doctor, Nurse, and Patient
Each will inherit from Person → Inheritance

Each will implement perform_duty() differently → Polymorphism




class Doctor(Person):
    def perform_duty(self):
        print(f"Dr. {self.name} is prescribing medicine.")

class Nurse(Person):
    def perform_duty(self):
        print(f"Nurse {self.name} is checking patient vitals.")

class Patient(Person):
    def perform_duty(self):
        print(f"Patient {self.name} is booking an appointment.")


3. Encapsulation is already used
We grouped name, age, id, and behavior (perform_duty) inside each class.

We could also make data private like this:

self.__name = name  # double underscore = private

4. Using all the classes



people = [
    Doctor("John", 45, "D001"),
    Nurse("Emily", 30, "N007"),
    Patient("Alex", 25, "P123")
]

for person in people:
    person.perform_duty()  # Polymorphism in action
💡 OUTPUT
csharp


Dr. John is prescribing medicine.
Nurse Emily is checking patient vitals.
Patient Alex is booking an appointment.
✅ Recap: What You Just Learned
OOP Concept	Where It Was Used
Encapsulation	Data + behavior grouped inside classes (name, age, perform_duty)
Inheritance	Doctor, Nurse, and Patient inherit from Person
Polymorphism	perform_duty() behaves differently for each object
Abstraction	Person is an abstract class that hides the common structure