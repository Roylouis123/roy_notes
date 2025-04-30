1.
(function(n){
    for(let i=0; i<=n; i++){
        let g="";
        for(let j=0; j<n+1; j++){
           g=g+j;
        }
            console.log(g)
    }
}(10))

output:
// 012345678910
// 012345678910
// 012345678910
// 012345678910
// 012345678910
// 012345678910
// 012345678910
// 012345678910
// 012345678910

2.
(function(n) {
    for (let i = 0; i <= n; i++) {
        let ch = "";
        for (let j = 0; j < n; j++) {
            ch += String.fromCharCode('A'.charCodeAt(0) + j);
        }
        console.log(ch);
    }
})(5);

output:
// ABCDE
// ABCDE
// ABCDE
// ABCDE
// ABCDE


(function(n) {
    let m=0;
    for (let i = 0; i <= n; i++) {
        let ch = "";
        for (let j = 0; j <= n; j++) {
            ch+=j+m;
        }
        m+=n+1;
        console.log(ch);
    }
})(5);


output:
// 012345
// 67891011
// 121314151617
// 181920212223
// 242526272829
// 303132333435


(function(n) {
    for (let i = 0; i <= n; i++) {
       console.log("*".repeat(i))
    }
})(5);

// The syntax is str.repeat(count), where:

// str is the original string to be repeated.
// count is an integer that specifies the number of times to repeat the string. It must be greater than 0 and less than +Infinity.

Output
// *
// **
// ***
// ****
// *****


(function(n) {
    for (let i = 0; i <= n; i++) {
       let s=""
       for (let j = 0; j <= i; j++) {
           s+=i;
    }
       console.log(s)
    }
})(5);

// output
// 0
// 11
// 222
// 3333
// 44444
// 555555



(function(n) {
    for (let i = 0; i <= n; i++) {
       let char =String.fromCharCode("A".charCodeAt(0)+i)
       console.log(char.repeat(i+1))
    }
})(5);

// output
// A
// BB
// CCC
// DDDD
// EEEEE
// FFFFFF


(function(n) {
    for (let i = 1; i <= n; i++) {
      let s=""
      for (let j = i; j >= 1; j--) {
          s+=j;
    }
       console.log(s)
    }
})(5);

// Output
// 1
// 21
// 321
// 4321
// 54321

