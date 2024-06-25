


// Advantages of Data Structures:

Efficiency: Data structures allow for efficient storage and retrieval of data, which is important in applications where performance is critical.
Flexibility: Data structures provide a flexible way to organize and store data, allowing for easy modification and manipulation.
Reusability: Data structures can be used in multiple programs and applications, reducing the need for redundant code.
Maintainability: Well-designed data structures can make programs easier to understand, modify, and maintain over time.



// Classification of Data Structure: 



// Linear data structure:
Data structure in which data elements are arranged sequentially or linearly,
where each element is attached to its previous and next adjacent elements, is called a linear data structure. 
Examples: array, stack, queue, linked list, etc.

// Static data structure:
Static data structure has a fixed memory size. It is easier to access the elements in a static data structure. 
Example: array.

// Dynamic data structure:
In the dynamic data structure, the size is not fixed. It can be randomly updated during the runtime
which may be considered efficient concerning the memory (space) complexity of the code. 
Examples: queue, stack, etc.



// Non-linear data structure:
Data structures where data elements are not placed sequentially or linearly are called non-linear 
data structures. In a non-linear data structure, we can’t traverse all the elements in a single run only. 
Examples: trees and graphs.






// ----------------------------------------Algorithm------------------------------------------------
The word Algorithm means ” A set of finite rules or instructions to be followed in calculations or 
other problem-solving operations;


Input ========> set of rules =========> output


// Use of the Algorithms:

// Computer Science:
Used in computer programming and are used to solve problems ranging from simple sorting and searching to complex tasks.

// Mathematics:
To solve mathematical problems, such as finding the optimal solution to a system of linear equations or finding the shortest path in a graph.

// Operations Research:
Optimize and make decisions in fields such as transportation, logistics, and resource allocation.

// Artificial Intelligence:
Foundation of artificial intelligence and machine learning, and are used to develop intelligent systems 
that can perform tasks such as image recognition, natural language processing, and decision-making.

// Data Science:
Algorithms are used to analyze, process, and extract insights from large amounts of data in fields such as marketing, finance, and healthcare.


///-============================================Time complexity============================================================

// is a measure of how the runtime of an algorithm or a piece of code grows with the size of its input




// Q. Imagine a classroom of 100 students in which you gave your pen to one person.
//  You have to find that pen without knowing to whom you gave it.

// Here are some ways to find the pen and what the O order is.

// O(n2): You go and ask the first person in the class if he has the pen.
//  Also, you ask this person about the other 99 people in the classroom if they have that pen and so on, 


// O(n): Going and asking each student individually is O(N). 


// O(log n): Now I divide the class into two groups, then ask: “Is it on the left side, or the right side?”
//  Then I take that group and divide it into two and ask again .Repeat the process till left with one student who has your pen. 


//----------------------------------  ? Constant Time - O(1)-------------------------------------
// Code executes in constant time if the runtime doesn't depend on the size of the input.

function constantTimeExample(arr) {
    return arr[0]; // Accessing the first element of an array
}


//----------------------------------Linear Time - O(n)--------------------------------------
// Code executes in linear time if the runtime grows linearly with the size of the input.

function linearTimeExample(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]); // Looping through each element of the array
    }
}


//-----------------------------O(n^2) - Quadratic Time Complexity----------------------------------------
// This example demonstrates quadratic time complexity with nested loops. As the size of the input (n) 
// increases, the time it takes to complete the operation grows quadratically.

function printPairs(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            console.log(array[i], array[j]);
        }
    }
}

printPairs([1, 2, 3]); // Quadratic time complexity O(n^2)
//-----------------------------O(log n) - Logarithmic Time Complexity------------------------------------
// Binary search is a classic example of logarithmic time complexity. Here's an example of finding an element
//  in a sorted array using binary search:

function binarySearch(array, target) {
    let low = 0;
    let high = array.length - 1;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (array[mid] === target) {
            return mid; // Element found
        } else if (array[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return -1; // Element not found
}

const index = binarySearch([1, 3, 5, 7, 9], 5);
console.log(index); // Output: 2










//=======================================Space complexity================================================


//like time complexity, is a measure of an algorithm's efficiency, but it focuses on the amount of memory 
// space that an algorithm uses relative to the size of the input




//----------------------------------O(1) - Constant Space Complexity----------------------------------


function constantSpaceExample(n) {
    let sum = 0; // Uses only a constant amount of memory
    for (let i = 0; i < n; i++) {
        sum += i;
    }
    return sum;
}
This function uses only a fixed amount of memory (sum) regardless of the size of the input n.


//-----------------------------------O(n) - Linear Space Complexity-----------------------------------


function linearSpaceExample(n) {
    let numbers = []; // Uses memory proportional to the input size
    for (let i = 0; i < n; i++) {
        numbers.push(i);
    }
    return numbers;
}
In this function, the numbers array grows linearly with the size of the input n.


//------------------------------------O(n^2) - Quadratic Space Complexity-------------------------------


function quadraticSpaceExample(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = i + j;
        }
    }
    return matrix;
}
This function creates a two-dimensional array (matrix) with dimensions n x n, resulting in quadratic space complexity.