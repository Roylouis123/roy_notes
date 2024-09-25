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




// 2 . Find the largest three distinct elements in an array


arr=[12,34,65,32,76,32]

first=second=third=float('-inf'); // -ve infinity

for i in arr:
    if i > first:
        third =second
        second = first
        first =i
    elif i > second:
        hird = second
        second = i
    elif i > third:
        third = i
print(first,second,third)


// JS

let arr=[12,34,65,32,76,32]

let first=Number.NEGATIVE_INFINITY;
let second=Number.NEGATIVE_INFINITY;
let third=Number.NEGATIVE_INFINITY;

for(let i=0; i<arr.length; i++){
    if(arr[i]>first){
        third =second
        second =first
        first=arr[i]
    }else if(arr[i]>second){
        third=second
        second = arr[i]
    }else if(arr[i]>third){
        third = arr[i]
    }
}
console.log(first,second,third);


// 3 . Shifting all zeros to end

let arr=[12,0,65,0,76,32]

let filter=arr.filter(a=>a!== 0);

let count =arr.length - filter.length

const final = filter.concat(new Array(count).fill(0))

console.log(final);


// n(1) method


function Boy (arr){
    
    let numarr = 0;
    for(let i=0; i<arr.length; i++){
        if(arr[i] !==0){
  [arr[i], arr[numarr]] = [arr[numarr], arr[i]];
            numarr++;
        }
    }
    return arr;
}

console.log(Boy([2,3,0,50,0,33]));