👨‍🏫 What is Object-Oriented Programming (OOP)?
Think of OOP like building with LEGO blocks. Instead of writing long code again and again, you create objects (blocks) that hold data and behavior — and reuse them easily.

🧱 Module 1: Basics of JavaScript and Objects
🧠 Concept: What is an Object?
Imagine a car. A car has:

Properties (data): color, brand, speed

Actions (functions): drive(), stop(), horn()


const car = {
  color: "red",
  brand: "Toyota",
  speed: 120,
  drive: function () {
    console.log("The car is driving");
  }
};

car.drive(); // Output: The car is driving
👉 This is an object.

🏗️ Module 2: What is a Class?
A class is like a blueprint. You don’t build one car — you build a blueprint, then make many cars using that same plan.

js
Copy
Edit
class Car {
  constructor(color, brand) {
    this.color = color;
    this.brand = brand;
  }

  drive() {
    console.log(`${this.brand} car is driving`);
  }
}

const myCar = new Car("red", "Toyota");
myCar.drive(); // Output: Toyota car is driving
📦 Breakdown:
class = blueprint

constructor() = sets up the object with starting data

this = refers to the current object

myCar = actual object made from the class

🤝 Module 3: Four Pillars of OOP
Let’s learn the 4 key concepts with simple, real-life examples.

1. Encapsulation – Hiding details inside the object
📦 Like putting your phone’s complex parts in a case — you only use buttons.


class Phone {
  #batteryLevel = 100; // private (cannot be accessed directly)

  use() {
    this.#batteryLevel -= 10;
    console.log("Used phone");
  }

  getBattery() {
    return this.#batteryLevel;
  }
}

const phone = new Phone();
phone.use();
console.log(phone.getBattery()); // Battery: 90
2. Abstraction – Show only what's necessary
🛵 When you ride a scooter, you don’t see the engine code — just “start” or “stop”.

js
Copy
Edit
class Scooter {
  start() {
    console.log("Scooter started");
  }

  stop() {
    console.log("Scooter stopped");
  }
}

const scooty = new Scooter();
scooty.start(); // No idea how the engine works, but it starts!
3. Inheritance – One class inherits from another
👨‍👦 A child inherits traits from a parent. Same in code.


class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Dog barks");
  }
}

const puppy = new Dog();
puppy.speak(); // Animal speaks
puppy.bark();  // Dog barks
4. Polymorphism – Same action, different results
🖱️ Clicking on a “Start” button in 3 apps — same action, but each app starts differently.



class Animal {
  makeSound() {
    console.log("Some sound");
  }
}

class Cat extends Animal {
  makeSound() {
    console.log("Meow");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof");
  }
}

const animals = [new Cat(), new Dog()];
animals.forEach(animal => animal.makeSound());
🎨 Module 4: OOP Design Concepts (Beginner Level)
🧱 SOLID Principles (Simplified)
S – Single Responsibility: One class should do one thing only.

O – Open/Closed: You can add new features, but don’t touch old code.

L – Liskov Substitution: Child classes should work like parent class.

I – Interface Segregation: Don’t force one class to use things it doesn’t need.

D – Dependency Inversion: Depend on abstractions, not direct things.

🧠 Think of these as “Rules to Keep Code Clean and Easy”.

🔨 Module 5: How OOP Helps in Real Projects
✅ Code is organized
✅ You can reuse objects
✅ Easy to debug and test
✅ Makes big projects manageable

