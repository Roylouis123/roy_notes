// different methods in array

// 1. Travering

// 2. Insertion

// 3. Deletion

// 4. Searching

// 5. Sorting

// 6. Merging




// 1. ------------------------------Travering----------------------------------

// It refers to the process of visiting each element in an array exactly once,
// usually to perform some operation on each element.Deletion


// Sample array
// const arr = [1, 2, 3, 4, 5];

// // Using a for loop to traverse the array
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]); // Print each element of the array
// }


// 2. ----------------------------------Insertion----------------------------------

// It typically refers to the process of adding an element into a specific position within an array. 
// This process involves shifting existing elements to make room for the new element.

// function insertIntoArray(array, element, index) {
//     // Check if the index is valid
//     if (index < 0 || index > array.length) {
//         console.log("Invalid index");
//         return;
//     }
    
//     // Shift elements to the right to make room for the new element
//     for (let i = array.length - 1; i >= index; i--) {
//         array[i + 1] = array[i];
//     }
    
//     // Insert the new element at the specified index
//     array[index] = element;
    
//     // Return the updated array
//     return array;
// }

// // Sample array
// let arr = [1, 2, 3, 4, 5];

// // Insert element 10 at index 2
// arr = insertIntoArray(arr, 10, 2);

// // Print the updated array
// console.log("Updated Array:", arr);



function AddAray(arr, value,index){

    if(index < 0 || index > arr.length){
        console.log("Invalid array length:")
        return
    }

    for(let i= arr.length -1; i >=index; i--){
        arr[i-1]=arr[i];
    }

    arr[index]=value;

    return arr;

}


let arr = [1, 2, 3, 4, 5];

const boy = AddAray(arr,22,3)

console.log(boy)