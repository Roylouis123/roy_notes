1. //* Add 2 numbers

//----------------Javascript
def add_numbers(arr):
    return sum(arr)
 
arr=[12,32,43]
num=add_numbers(arr)
print(num) // 75

//----------------Python
const arr=[12,323]
const sum=arr.reduce((acc,curr)=>{
    return acc + curr;
})
console.log(sum) // 345


2. //* arrays with highest points for bob and ali

//----------------Javascript
const bob=[12,323]
const ali=[33,343]

let b=0;
let a=0;

for(let i=0; i<3; i++){
    if(bob[i]>ali[i]){
       b++;
    }else if(bob[i]<ali[i]){
       a++;
    }
}

console.log(b,a)

//----------------Python
bob=[1,2,3]
ali=[2,3,1]

def points_to(a,b):
    bob=ali=0
    for i in range(3):
        if a[i]>b[i]:
            bob+=1
        elif a[i]<b[i]:
            ali+=1
    return bob,ali

num=points_to(bob,ali)
print(num)




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
3. calculate absolute right and left of 2d matrix 


//--------------python
function diagonalDifference(arr) {

    left=right=0
    
    n=len(arr)
    
    for i in range(n):
        left+=arr[i][i]
        right+=arr[i][n-i-1]
    return abs(left-right)

}

//--------------javascript
let arr=[[1,2,3],[4,5,6],[7,8,9]]

function diagonalDifference(arr) {
    let left = 0
    let right = 0
    let n = arr.length
    for (let i = 0; i < n; i++) {
        left += arr[i][i]
        right += arr[i][n - i - 1]
    }
    return Math.abs(left - right) // output 15
}
