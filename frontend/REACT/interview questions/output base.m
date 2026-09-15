function abc(){
    console.log(abc.xyz)
}

abc()             // At this point, abc.xyz is not yet defined, so it logs undefined 
abc.xyz = 100     // In JavaScript, functions are objects, meaning they can have properties. abc.xyz is now set to 100
abc()             // 100

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let a =[1,2,3,4]

a[50]=44;
console.log(a) // [ 1, 2, 3, 4, <46 empty items>, 44 ]


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


console.log(typeof typeof 100) // string

let a = [...'praveen']

console.log(a)  // ['p', 'r', 'a','v', 'e', 'e','n']


console.log(parseInt('7k'))  //7
console.log(parseInt('k')) //NAN
console.log(parseInt('10+2'))  //10


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

console.log([1,2].map(num=>{
    if(num>0) return
    return num +2
}) )             //  [ undefined, undefined ]


function abc(){
    return 
}

console.log(abc())   // undeined

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

{
    function abc(){
    return "ooo"
}
}

console.log(abc())   // 000




'use strict'    // "Use strict" is a directive in JavaScript that enables strict mode, enhancing code quality and preventing common mistakes. It enforces stricter parsing and error handling,

{
    function abc(){
    return "ooo"
}
}

console.log(abc())   // 000
ReferenceError: abc is not defined

++++++++++++++++++++++++++++++++++++++++++++++++++++++++
