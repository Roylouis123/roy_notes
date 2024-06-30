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