
1.
*****
*****
*****
*****
*****


function Max(n) {

    for (let i = 0; i < n+1; i++) {
      let count=""
      for (let j = 0; j < n+1; j++){
        count=j
      }
        console.log('*'.repeat(count))
    }
  }
  
  Max(5)


2.

*
**
***
****
*****

function Max(n) {

    for (let i = 0; i < n; i++) {
      let count=""
      for (let j = 0; j < i; j++){
        count=j
      }
        console.log('*'.repeat(count))
    }
  }
  
  Max(5)


  3.

  1
  12
  123
  1234
  12345


  function Max(n) {

    for (let i = 1; i < n+1; i++) {
      let count="";
      for (let j = 1; j < i+1; j++){
        count +=j
      }
        console.log(count)
    }
  }
  
  Max(5)


  4.

  1
  22
  333
  4444



  function Max(n) {

    for (let i = 1; i < n+1; i++) {
      let count="";
      for (let j = 1; j < i+1; j++){
        count +=i
      }
        console.log(count)
    }
  }
  
  Max(5)


  5.

  ****
  ***
  **
  *


  function printPattern(n) {
    for (let i = n; i >= 1; i--) {
        let line = '';
        for (let j = 1; j <= i; j++) {
            line += '*';  
        }
        console.log(line);  
    }
}

printPattern(4);



6.

1234
123
12
1


function printPattern(n) {
    for (let i = n; i >= 1; i--) {
        let line = '';
        for (let j = 1; j <= i; j++) {
            line += j;  
        }
        console.log(line);  
    }
}

printPattern(4);



7.

  *
 ***
*****

function printPyramid(n) {
    for (let i = 1; i <= n; i++) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
    }
}

printPyramid(3);

8.

*****
 ***
  *

function printPyramid(n) {
    for (let i = n; i >= 1; i--) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
    }
}

printPyramid(3);


9.

  *
 ***
***** 
*****
 ***
  *

function printPyramid(n) {
    const nn=n/2
    for (let i = 1; i <=n; i++) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
    }

         for (let i = n; i >= 1; i--) {
         let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
    }
}

printPyramid(5);

10.

*   
**  
*** 
****
****
*** 
**  
*   

function printPyramid(n) {
    const nn=n/2
    for (let i = 1; i <=n; i++) {
        let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(i - 1);
        console.log( stars+spaces);
    }

         for (let i = n; i >= 1; i--) {
         let spaces = ' '.repeat(n - i);
        let stars = '*'.repeat(i - 1);
        console.log(stars+spaces);
    }
}

printPyramid(5);


11.

1
01
101
0101
10101

function printPyramid(n) {
    const nn=n/2
    for (let i = 1; i <=n; i++) {
        let pat="";
        for(let j=1; j<=i; j++){
            pat +=(i+j)%2 === 0 ? "1":"0";
        }
        console.log(pat)
    }
}

printPyramid(5);


12.

1
23
456
78910

function printNumberPattern(n) {
    let num = 1;
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += num;
            num++;
        }
        console.log(row);
    }
}

printNumberPattern(4);


13.

A 
AB 
ABC 

function printAlphabetPattern(n) {
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j <= i; j++) {
            // This line adds the next uppercase letter to the row string
            // 65 is the ASCII code for 'A', and adding j (0, 1, 2, ...) gives subsequent letters
            row += String.fromCharCode(65 + j);
        }
        console.log(row);
    }
}

printAlphabetPattern(3);

14.

ABCD
ABC
AB
A

function printReverseAlphabetPattern(n) {
    for (let i = n; i > 0; i--) {
        let row = '';
        for (let j = 0; j < i; j++) {
            row += String.fromCharCode(65 + j);
        }
        console.log(row);
    }
}

printReverseAlphabetPattern(4);


15.

A
BB 
CCC 
DDDD 


function printAlphabetPattern(n) {
    let char=0
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j <= i; j++) {
            // This line adds the next uppercase letter to the row string
            // 65 is the ASCII code for 'A', and adding j (0, 1, 2, ...) gives subsequent letters
            row += String.fromCharCode(65 + char);
        }
        char++;
        console.log(row);
    }
}

printAlphabetPattern(3);

16.

   A
  ABA
 ABCBA
ABCDCBA

function printPyramidAlphabetPattern(n) {
    for (let i = 0; i < n; i++) {
        let row = '';
        // Add spaces
        for (let j = 0; j < n - i - 1; j++) {
            row += ' ';
        }
        // Add ascending letters
        for (let j = 0; j <= i; j++) {
            row += String.fromCharCode(65 + j);
        }
        // Add descending letters (excluding the last one)
        for (let j = i - 1; j >= 0; j--) {
            row += String.fromCharCode(65 + j);
        }
        console.log(row);
    }
}

printPyramidAlphabetPattern(4);