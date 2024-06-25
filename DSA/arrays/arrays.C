


// What is Array?
Array is a special type of object that is used to store multiple values in a single variable. 


// There are majorly three types of arrays:


// 1. One-dimensional array (1-D arrays) 

let fruits = ['Apple', 'Banana', 'Cherry'];

// 2. Two-dimensional (2D) array

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// 3. Three-dimensional array

let threeDimArray = [
    [ // 1st 2D array
        [1, 2, 3],    // 1st row
        [4, 5, 6],    // 2nd row
        [7, 8, 9]     // 3rd row
    ],
    [ // 2nd 2D array
        [10, 11, 12], // 1st row
        [13, 14, 15], // 2nd row
        [16, 17, 18]  // 3rd row
    ],
    [ // 3rd 2D array
        [19, 20, 21], // 1st row
        [22, 23, 24], // 2nd row
        [25, 26, 27]  // 3rd row
    ]
];


// Advantages of array data structure:

// Efficient access to elements:
Arrays provide direct and efficient access to any element in the collection. Accessing an element in an array is an O(1) operation,
 meaning that the time required to access an element is constant and does not depend on the size of the array.

// Fast data retrieval:
Arrays allow for fast data retrieval because the data is stored in contiguous memory locations. This means that the data can be accessed quickly and efficiently without the need for complex data structures or algorithms.

// Memory efficiency:
Arrays are a memory-efficient way of storing data. Because the elements of an array are stored in contiguous memory locations, the size of the array is known at compile time. This means that memory can be allocated for the entire array in one block, reducing memory fragmentation.

// Versatility:
Arrays can be used to store a wide range of data types, including integers, floating-point numbers, characters, and even complex data structures such as objects and pointers.

// Easy to implement:
Arrays are easy to implement and understand, making them an ideal choice for beginners learning computer programming.

// Compatibility with hardware:
The array data structure is compatible with most hardware architectures, making it a versatile tool for programming in a wide range of environments.
Dis



// Disadvantages of array data structure:

// Fixed size:
Arrays have a fixed size that is determined at the time of creation. This means that if the size of the array needs to be increased, 
a new array must be created and the data must be copied from the old array to the new array, 
which can be time-consuming and memory-intensive.

// Memory allocation issues:
Allocating a large array can be problematic, particularly in systems with limited memory. If the size of the array is too large,
 the system may run out of memory, which can cause the program to crash.

// Insertion and deletion issues:
Inserting or deleting an element from an array can be inefficient and time-consuming because all the elements after the insertion or
 deletion point must be shifted to accommodate the change.

// Wasted space:
If an array is not fully populated, there can be wasted space in the memory allocated for the array.
This can be a concern if memory is limited.

// Limited data type support:
Arrays have limited support for complex data types such as objects and structures, as the elements of an array 
must all be of the same data type.

// Lack of flexibility:
The fixed size and limited support for complex data types can make arrays inflexible compared to other data structures
such as linked lists and trees.


Operations on Array
1. Array Traversal:
2. Insertion in Array:
3. Deletion in Array:
4. Searching in Array: