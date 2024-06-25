// Stacks
// A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. This means the last element added to the stack will be the first one to be removed. Think of it like a stack of plates; you can only take the top plate off the stack.

// Operations on a Stack
// Push: Add an element to the top of the stack.
// Pop: Remove the top element from the stack.
// Peek/Top: Return the top element without removing it.
// isEmpty: Check if the stack is empty.



class Stack {
    constructor() {
        this.items = [];
    }

    // Add an element to the top of the stack
    push(element) {
        this.items.push(element);
    }

    // Remove and return the top element
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items.pop();
    }

    // Return the top element without removing it
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Return the size of the stack
    size() {
        return this.items.length;
    }

    // Print the stack
    printStack() {
        console.log(this.items.join(' '));
    }
}

// Usage Example
let stack = new Stack();

// Adding elements to the stack
stack.push(10);
stack.push(20);
stack.push(30);

// Printing the stack
stack.printStack(); // Output: 10 20 30

// Removing the top element
console.log(stack.pop()); // Output: 30

// Printing the stack after pop
stack.printStack(); // Output: 10 20

// Getting the top element
console.log(stack.peek()); // Output: 20

// Checking if the stack is empty
console.log(stack.isEmpty()); // Output: false

// Getting the size of the stack
console.log(stack.size()); // Output: 2






// Queues
// A queue is a linear data structure that follows the First In, First Out (FIFO) principle. This means the first element added to the queue will be the first one to be removed. Think of it like a line of people waiting for a service; the first person in line is the first one to be served.

// Operations on a Queue
// Enqueue: Add an element to the end of the queue.
// Dequeue: Remove the front element from the queue.
// Front: Return the front element without removing it.
// isEmpty: Check if the queue is empty.



class Queue {
    constructor() {
        this.items = [];
    }

    // Add an element to the end of the queue
    enqueue(element) {
        this.items.push(element);
    }

    // Remove and return the front element
    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items.shift();
    }

    // Return the front element without removing it
    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Return the size of the queue
    size() {
        return this.items.length;
    }

    // Print the queue
    printQueue() {
        console.log(this.items.join(' '));
    }
}

// Usage Example
let queue = new Queue();

// Adding elements to the queue
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

// Printing the queue
queue.printQueue(); // Output: 10 20 30

// Removing the front element
console.log(queue.dequeue()); // Output: 10

// Printing the queue after dequeue
queue.printQueue(); // Output: 20 30

// Getting the front element
console.log(queue.front()); // Output: 20

// Checking if the queue is empty
console.log(queue.isEmpty()); // Output: false

// Getting the size of the queue
console.log(queue.size()); // Output: 2





// Summary
// Stack: LIFO principle, main operations are push, pop, peek, and isEmpty.
// Queue: FIFO principle, main operations are enqueue, dequeue, front, and isEmpty.