// --------------------------------------STRINGS --------------------------------

// In JavaScript, strings are used to represent text. Strings are immutable sequences of 
// characters and can be created using single quotes (' '), double quotes (" "), or backticks (` `).

// Creating Strings
// Single Quotes

let singleQuoteString = 'Hello, world!';

// Double Quotes

let doubleQuoteString = "Hello, world!";

// Template Literals

let templateLiteralString = `Hello, world!`;


// --------------------------------------String Properties and Methods-------------------------

// Properties

// length: Returns the length of the string.

let str = "Hello";
let str1 = "Hello";
let str2 = "World";


console.log(str.length); // Output: 5


// Methods

// charAt(): Returns the character at a specified index.
console.log(str.charAt(1)); // Output: 'e'


// charCodeAt(): Returns the Unicode of the character at a specified index.
console.log(str.charCodeAt(1)); // Output: 101



// concat(): Combines two or more strings.
console.log(str1.concat(' ', str2)); // Output: 'Hello World'


// includes(): Checks if a string contains a specified value.
console.log(str.includes("ell")); // Output: true


// indexOf(): Returns the index of the first occurrence of a specified value.
console.log(str.indexOf("e")); // Output: 1


// lastIndexOf(): Returns the index of the last occurrence of a specified value.
console.log(str.lastIndexOf("l")); // Output: 3


// match(): Searches a string for a match against a regular expression and returns the matches.
console.log(str.match(/l/g)); // Output: ['l', 'l']


// replace(): Replaces a specified value with another value in a string.
console.log(str.replace("l", "x")); // Output: 'Hexlo'


// search(): Searches a string for a specified value and returns the position of the match.
console.log(str.search("l")); // Output: 2


// slice(): Extracts a part of a string and returns it as a new string.
console.log(str.slice(1, 4)); // Output: 'ell'


// split(): Splits a string into an array of substrings.
console.log(str.split("")); // Output: ['H', 'e', 'l', 'l', 'o']


// substring(): Extracts characters from a string, between two specified indices.
console.log(str.substring(1, 4)); // Output: 'ell'


// toLowerCase(): Converts a string to lowercase letters.
console.log(str.toLowerCase()); // Output: 'hello'


// toUpperCase(): Converts a string to uppercase letters.
console.log(str.toUpperCase()); // Output: 'HELLO'


// trim(): Removes whitespace from both sides of a string.
let strWithSpaces = "  Hello  ";
console.log(strWithSpaces.trim()); // Output: 'Hello'


// padStart(): Pads the current string with another string until it reaches the given length, starting from the left.
console.log(str.padStart(10, "0")); // Output: '00000Hello'


// padEnd(): Pads the current string with another string until it reaches the given length, starting from the right.
console.log(str.padEnd(10, "0")); // Output: 'Hello00000'


// Template Literals

let name = "John";
let greeting = `Hello, ${name}!`;
console.log(greeting); // Output: 'Hello, John!'


// Multi-line Strings: Strings can span multiple lines.

let multiLineString = `This is
a multi-line
string.`;
console.log(multiLineString);

// Escape Sequences
// Special characters in strings can be escaped using a backslash (\).

// Newline: \n
// Tab: \t
// Backslash: \\
// Single Quote: \'
// Double Quote: \"

let text = "He said, \"Hello!\"";
console.log(text); // Output: He said, "Hello!"