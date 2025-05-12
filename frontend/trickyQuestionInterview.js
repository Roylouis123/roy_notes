console.log(22 ** 2);  // 22 x 22 = 484
__________________________________________________________________________
'use strict'    //  without USE STRICT it will not throw an error
function test(){
salary = 1200,
console.log(salary)

}

test()
__________________________________________________________________________
// Can a function have properties?
function test(){
console.log(test.abc)

}

test()  //undefined ===== At this point, test.abc is undefined because it hasn’t been assigned yet.

test.abc = 400;
test.abc = 600;

test() // 600 Now test.abc holds the value 600

//In JavaScript, functions are objects, so you can attach properties to them just like regular objects.
__________________________________________________________________________

console.log({} == {});  // false, different objects in memory  memory address: 0x1a2b
console.log({} === {}); // false, still different objects  memory address: 0x1a2c
__________________________________________________________________________

let a = {name : "himanshu"}
    
let b = {...a}

b.name = "raja" 

console.log(b) // { name: 'raja' }
__________________________________________________________________________

let a = 10;                // primitive number
let b = new Number(10);    // Number object 
console.log(a==b); // true, type coercion occurs
console.log(a===b);      // false
__________________________________________________________________________
console.log([] == []);          // false
console.log([1,2] == '1,2');    // JavaScript uses type coercion when comparing a non-primitive (like an array) to a string using ==.
console.log([1,2] == [1,2]);    // false, different objects in memory
__________________________________________________________________________
console.log(1 == '1');        // true, type coercion occurs
console.log(1 === '1');       // false, no type coercion occurs
console.log(1 == true);      // true, type coercion occurs
console.log(1 === true);     // false, no type coercion occurs
console.log(0 == false);     // true, type coercion occurs
console.log(0 === false);    // false, no type coercion occurs
console.log(null == undefined); // true, type coercion occurs
console.log(null === undefined); // false, no type coercion occurs
console.log(NaN == NaN);    // false, NaN is not equal to anything, even itself
console.log(NaN === NaN);   // false, NaN is not equal to anything, even itself
console.log(0 == '');       // true, type coercion occurs
console.log(0 === '');      // false, no type coercion occurs
console.log('' == false);   // true, type coercion occurs
console.log('' === false);  // false, no type coercion occurs
console.log('' == 0);      // true, type coercion occurs
console.log('' === 0);     // false, no type coercion occurs
__________________________________________________________________________
console.log(typeof null); // object This is a long-standing bug in JavaScript (from the first version of JS in 1995).
console.log(typeof undefined);        // undefined
console.log(null instanceof Object);  // false

console.log(0 == '');       // '' (empty string) is coerced to 0
console.log(false == '0');  // '0' (string) is coerced to 0 (number)
console.log(false == undefined); // JavaScript does not coerce undefined to a number
__________________________________________________________________________
var a = 1;
function foo() {
  console.log(a); //JavaScript hoists variable declarations (not initializations) to the top of their scope.
  var a = 2; // removed then prints 1
}
foo(); // undefined

__________________________________________________________________________

let obj = {
    name: "Roy",
    123: "number-key",
  };
  
  console.log(obj[123]);    // number-ke
  console.log(obj["123"]);  // number-ke
  
  // In JavaScript, all object keys are automatically converted to strings. This means both 123 (a number) and "123" (a string) are treated as the same key in the object.
  
