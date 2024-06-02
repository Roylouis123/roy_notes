// https://www.youtube.com/watch?v=4tU7d0TTiZQ





//------------------- Linked Lists--------------------------

// what is linked list ?
A Linked List is a linear data structure where elements are stored in nodes,
with each node pointing to the next node via a reference. Unlike arrays,
linked lists do not store elements in contiguous memory locations.



// Types of Linked Lists ?
Singly Linked List ==> Each node points to the next node.
Doubly Linked List ==> Each node points to both the next and the previous node.
Circular Linked List ==> The last node points back to the first node, forming a circle.




// Use Cases
Dynamic Size: Suitable for applications where the size of the list changes frequently.
Frequent Insertions/Deletions: Better performance for frequent 
additions and deletions, especially at the beginning or end.
Queue and Stack Implementations: Efficient for implementing these abstract data types.






// ----------------------------------Singly Linked List---------------------


Node Structure
Each node contains:

data: The value stored in the node.
next: A reference to the next node (or null if its the last node).



// Node class to represent each element in the linked list
class Node {
    constructor(data) {
        this.data = data;  // The value or data contained in the node
        this.next = null;  // The reference to the next node in the list (initially null)
    }
}

// LinkedList class to manage the linked list
class LinkedList {
    constructor() {
        this.head = null;  // The head or first node of the list (initially null)
    }

    // Method to add a node to the end of the list
    append(data) {
        const newNode = new Node(data);  // Create a new node with the given data
        if (!this.head) {  // If the list is empty (head is null)
            this.head = newNode;  // Set the new node as the head
            return;
        }
        let current = this.head;  // Start at the head of the list
        while (current.next) {  // Traverse the list until reaching the last node
            current = current.next;
        }
        current.next = newNode;  // Set the next reference of the last node to the new node
    }

    // Method to add a node to the beginning of the list
    prepend(data) {
        const newNode = new Node(data);  // Create a new node with the given data
        newNode.next = this.head;  // Set the next reference of the new node to the current head
        this.head = newNode;  // Update the head to the new node
    }

    // Method to delete a node with specific data
    deleteWithValue(data) {
        if (!this.head) {  // If the list is empty, do nothing
            return;
        }
        if (this.head.data === data) {  // If the head contains the data to be deleted
            this.head = this.head.next;  // Update the head to the next node
            return;
        }
        let current = this.head;  // Start at the head of the list
        while (current.next && current.next.data !== data) {  // Traverse the list to find the node to delete
            current = current.next;
        }
        if (current.next) {  // If the node to delete is found
            current.next = current.next.next;  // Bypass the node to delete
        }
    }

    // Method to find a node with specific data
    find(data) {
        let current = this.head;  // Start at the head of the list
        while (current && current.data !== data) {  // Traverse the list to find the node
            current = current.next;
        }
        return current;  // Return the node if found, or null if not found
    }

    // Method to print the entire list
    printList() {
        let current = this.head;  // Start at the head of the list
        let list = '';  // Initialize an empty string to build the output
        while (current) {  // Traverse the list
            list += current.data + ' -> ';  // Append the data and an arrow to the string
            current = current.next;  // Move to the next node
        }
        console.log(list + 'null');  // Print the final string with 'null' indicating the end of the list
    }
}

// Usage example
const list = new LinkedList();
list.append(1);  // Add 1 to the end of the list
list.append(2);  // Add 2 to the end of the list
list.prepend(0);  // Add 0 to the beginning of the list
list.printList();  // Output: 0 -> 1 -> 2 -> null
list.deleteWithValue(1);  // Delete the node with data 1
list.printList();  // Output: 0 -> 2 -> null









//-------------------------Double Linked List----------------------------

// Node Structure
Each node in a doubly linked list contains:

data: The value stored in the node.
next: A reference to the next node (or null if it's the last node).
prev: A reference to the previous node (or null if it's the first node).


// Node class to represent each element in the doubly linked list
class Node {
    constructor(data) {
        this.data = data;  // The value or data contained in the node
        this.next = null;  // The reference to the next node in the list
        this.prev = null;  // The reference to the previous node in the list
    }
}

// DoublyLinkedList class to manage the doubly linked list
class DoublyLinkedList {
    constructor() {
        this.head = null;  // The head or first node of the list
        this.tail = null;  // The tail or last node of the list
    }

    // Method to add a node to the end of the list
    append(data) {
        const newNode = new Node(data);  // Create a new node with the given data
        if (!this.head) {  // If the list is empty (head is null)
            this.head = newNode;  // Set the new node as the head
            this.tail = newNode;  // Set the new node as the tail
            return;
        }
        newNode.prev = this.tail;  // Set the prev reference of the new node to the current tail
        this.tail.next = newNode;  // Set the next reference of the current tail to the new node
        this.tail = newNode;  // Update the tail to the new node
    }

    // Method to add a node to the beginning of the list
    prepend(data) {
        const newNode = new Node(data);  // Create a new node with the given data
        if (!this.head) {  // If the list is empty (head is null)
            this.head = newNode;  // Set the new node as the head
            this.tail = newNode;  // Set the new node as the tail
            return;
        }
        newNode.next = this.head;  // Set the next reference of the new node to the current head
        this.head.prev = newNode;  // Set the prev reference of the current head to the new node
        this.head = newNode;  // Update the head to the new node
    }

    // Method to delete a node with specific data
    deleteWithValue(data) {
        if (!this.head) {  // If the list is empty, do nothing
            return;
        }
        if (this.head.data === data) {  // If the head contains the data to be deleted
            this.head = this.head.next;  // Update the head to the next node
            if (this.head) {  // If the new head exists, set its prev reference to null
                this.head.prev = null;
            } else {  // If the new head doesn't exist, update the tail to null as well
                this.tail = null;
            }
            return;
        }
        let current = this.head;  // Start at the head of the list
        while (current && current.data !== data) {  // Traverse the list to find the node to delete
            current = current.next;
        }
        if (current) {  // If the node to delete is found
            if (current.next) {  // If the node to delete is not the tail
                current.next.prev = current.prev;  // Set the prev reference of the next node
            } else {  // If the node to delete is the tail
                this.tail = current.prev;  // Update the tail to the previous node
            }
            if (current.prev) {  // If the node to delete is not the head
                current.prev.next = current.next;  // Set the next reference of the previous node
            }
        }
    }

    // Method to find a node with specific data
    find(data) {
        let current = this.head;  // Start at the head of the list
        while (current && current.data !== data) {  // Traverse the list to find the node
            current = current.next;
        }
        return current;  // Return the node if found, or null if not found
    }

    // Method to print the list from head to tail
    printList() {
        let current = this.head;  // Start at the head of the list
        let list = '';  // Initialize an empty string to build the output
        while (current) {  // Traverse the list
            list += current.data + ' <-> ';  // Append the data and a bidirectional arrow to the string
            current = current.next;  // Move to the next node
        }
        console.log(list + 'null');  // Print the final string with 'null' indicating the end of the list
    }
}

// Usage example
const list = new DoublyLinkedList();
list.append(1);  // Add 1 to the end of the list
list.append(2);  // Add 2 to the end of the list
list.prepend(0);  // Add 0 to the beginning of the list
list.printList();  // Output: 0 <-> 1 <-> 2 <-> null
list.deleteWithValue(1);  // Delete the node with data 1
list.printList();  // Output: 0 <-> 2 <-> null











// -----------------------------------Circular linked list --------------------------------


// Node Structure
Each node in a circular linked list contains:

data: The value stored in the node.
next: A reference to the next node (or null if its the only node in the list).


// Node class to represent each element in the circular linked list
class Node {
    constructor(data) {
        this.data = data;  // The value or data contained in the node
        this.next = null;  // The reference to the next node in the list
    }
}

// CircularLinkedList class to manage the circular linked list
class CircularLinkedList {
    constructor() {
        this.head = null;  // The head or first node of the list
    }

    // Method to add a node to the end of the list
    append(data) {
        const newNode = new Node(data);  // Create a new node with the given data
        if (!this.head) {  // If the list is empty (head is null)
            this.head = newNode;  // Set the new node as the head
            newNode.next = this.head;  // Point the new node to itself, making it circular
            return;
        }
        let current = this.head;  // Start at the head of the list
        while (current.next !== this.head) {  // Traverse the list until reaching the last node
            current = current.next;
        }
        current.next = newNode;  // Set the next reference of the last node to the new node
        newNode.next = this.head;  // Point the new node back to the head
    }

    // Method to add a node to the beginning of the list
    prepend(data) {
        const newNode = new Node(data);  // Create a new node with the given data
        if (!this.head) {  // If the list is empty (head is null)
            this.head = newNode;  // Set the new node as the head
            newNode.next = this.head;  // Point the new node to itself, making it circular
            return;
        }
        let current = this.head;  // Start at the head of the list
        while (current.next !== this.head) {  // Traverse the list until reaching the last node
            current = current.next;
        }
        newNode.next = this.head;  // Point the new node to the current head
        current.next = newNode;  // Update the last node to point to the new node
        this.head = newNode;  // Update the head to the new node
    }

    // Method to delete a node with specific data
    deleteWithValue(data) {
        if (!this.head) {  // If the list is empty, do nothing
            return;
        }
        if (this.head.data === data) {  // If the head contains the data to be deleted
            if (this.head.next === this.head) {  // If there's only one node
                this.head = null;  // Set the head to null
                return;
            }
            let current = this.head;  // Start at the head of the list
            while (current.next !== this.head) {  // Traverse the list to find the last node
                current = current.next;
            }
            current.next = this.head.next;  // Point the last node to the second node
            this.head = this.head.next;  // Update the head to the second node
            return;
        }
        let current = this.head;  // Start at the head of the list
        while (current.next !== this.head && current.next.data !== data) {  // Traverse the list to find the node to delete
            current = current.next;
        }
        if (current.next.data === data) {  // If the node to delete is found
            current.next = current.next.next;  // Bypass the node to delete
        }
    }

    // Method to find a node with specific data
    find(data) {
        if (!this.head) {  // If the list is empty, return null
            return null;
        }
        let current = this.head;  // Start at the head of the list
        do {
            if (current.data === data) {  // If the node with the given data is found
                return current;  // Return the node
            }
            current = current.next;  // Move to the next node
        } while (current !== this.head);  // Continue until back at the head
        return null;  // Return null if the node is not found
    }

    // Method to print the entire list
    printList() {
        if (!this.head) {  // If the list is empty, return
            console.log('List is empty');
            return;
        }
        let current = this.head;  // Start at the head of the list
        let list = '';  // Initialize an empty string to build the output
        do {
            list += current.data + ' -> ';  // Append the data and an arrow to the string
            current = current.next;  // Move to the next node
        } while (current !== this.head);  // Continue until back at the head
        console.log(list + '(head)');  // Print the final string with '(head)' indicating the circular link
    }
}

// Usage example
const list = new CircularLinkedList();
list.append(1);  // Add 1 to the end of the list
list.append(2);  // Add 2 to the end of the list
list.prepend(0);  // Add 0 to the beginning of the list
list.printList();  // Output: 0 -> 1 -> 2 -> (head)
list.deleteWithValue(1);  // Delete the node with data 1
list.printList();  // Output: 0 -> 2 -> (head)