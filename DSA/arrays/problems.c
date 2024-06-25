// 1. To find min and max value

const data = [2, 32, 343, 4, 2, 1,4,5,6,3,3];

console.time("time");

let min = data[0]; // Initialize min with the first element
let max = data[0]; // Initialize max with the first element

for (let i = 1; i < data.length; i++) { // Start loop from index 1
    if (data[i] < min) {
        min = data[i];
    }
    if (data[i] > max) {
        max = data[i];
    }
}

console.timeEnd("time");

console.log(`Minimum: ${min}, Maximum: ${max}`);


