// 1. Introduction
// 🌟 What is TypeScript?
// TypeScript is a superset of JavaScript that adds static typing.

// It compiles to JavaScript and runs in browsers & Node.js.

// Developed by Microsoft for better maintainability and scalability.

// 🎯 Why Use TypeScript?
// ✅ Static Typing – Catches errors early.
// ✅ Modern Features – Supports ES6/ESNext features.
// ✅ Better Tooling – Works well with IDEs.
// ✅ Improved Readability – Self-documenting code.

// ⚙️ Installation


// npm install -g typescript
// tsc --version
// Compile TypeScript to JavaScript:

// tsc file.ts


// 📌 2. Basic Types
// Type	Example
// number	let age: number = 25;
// string	let name: string = "Roy";
// boolean	let isActive: boolean = true;
// null	    let empty: null = null;
// undefined	let notDefined: undefined = undefined;


// 📌 Arrays
// let numbers: number[] = [1, 2, 3];
// let strings: Array<string> = ["a", "b", "c"];


// 📌 Tuples
// let user: [string, number] = ["Alice", 30]; // Fixed-length array


// 📌 Enums
// enum Role { Admin, User, Guest }
// let myRole: Role = Role.Admin; // 0


// 📌 Any & Unknown
// let random: any = "Hello"; 
// random = 42; // No error

// let secureData: unknown = "Hello";
// // secureData.toUpperCase(); // ❌ Error: Need type checking first
// if (typeof secureData === "string") {
//   secureData.toUpperCase(); // ✅ Works fine
// }


// 📌 3. Advanced Types
// 📌 Union & Intersection Types
// let id: number | string; 
// id = 101; 
// id = "ABC101"; // ✅ Allowed

// type Employee = { name: string; age: number };
// type Manager = { department: string };
// type TeamLead = Employee & Manager; // Intersection Type
// let lead: TeamLead = { name: "Bob", age: 30, department: "IT" };


// 📌 Type Aliases
// type ID = string | number;
// let userId: ID = 123;
// let productId: ID = "P001";


// 📌 Literal Types
// let direction: "up" | "down";
// direction = "up"; // ✅ Allowed
// // direction = "left"; // ❌ Error


// 📌 4. Functions
// 📌 Function Type Annotations

// function add(a: number, b: number): number {
//   return a + b;
// }
// 📌 Optional & Default Parameters


// function greet(name: string, greeting: string = "Hello") {
//   console.log(`${greeting}, ${name}`);
// }


// 📌 Rest Parameters
// function sum(...nums: number[]): number {
//   return nums.reduce((total, num) => total + num, 0);
// }
// 📌 Arrow Functions


// const multiply = (x: number, y: number): number => x * y;


// 📌 5. Generics (Superpower of TypeScript)
// 📌 Basic Generics
// function identity<T>(arg: T): T {
//   return arg;
// }
// console.log(identity<number>(10)); // 10
// console.log(identity<string>("Hello")); // "Hello"

// 📌 Generic Types
// type Box<T> = { value: T };
// let numBox: Box<number> = { value: 10 };

// 📌 Generic Constraints


// function lengthCheck<T extends { length: number }>(item: T): number {
//   return item.length;
// }
// console.log(lengthCheck([1, 2, 3])); // 3
// console.log(lengthCheck("Hello")); // 5

// 📌 6. Utility Types (Built-in Type Helpers)
// 📌 Partial (Make All Properties Optional)


// interface User { name: string; age: number; }
// let partialUser: Partial<User> = { name: "Alice" };

// 📌 Pick (Select Specific Properties)
// type PersonName = Pick<User, "name">;


// 📌 Omit (Remove Specific Properties)
// type PersonWithoutAge = Omit<User, "age">;

// 📌 Readonly (Make Properties Immutable)
// const user: Readonly<User> = { name: "Bob", age: 25 };

// // user.age = 30; // ❌ Error
// 📌 Record (Object with Fixed Keys)

// type Roles = Record<string, string>;
// let roleNames: Roles = { admin: "John", user: "Alice" };

// 📌 7. TypeScript with React
// Use .tsx files for React components.

// interface Props {
//   name: string;
// }

// const Greeting: React.FC<Props> = ({ name }) => {
//   return <h1>Hello, {name}</h1>;
// };
// 📌 8. TypeScript Configuration
// 🔹 Initialize TypeScript Project


// tsc --init
// 🔹 Example tsconfig.json


// {
//   "compilerOptions": {
//     "target": "ES6",
//     "module": "CommonJS",
//     "strict": true,
//     "outDir": "./dist"
//   }
// }
// 📌 9. TypeScript with Node.js
// 🔹 Install Dependencies


// npm install -g ts-node
// 🔹 Run TypeScript File


// ts-node app.ts
// 📌 10. Advanced TypeScript Concepts
// 📌 Keyof Operator (Extract Object Keys)


// type Person = { name: string; age: number };
// type PersonKeys = keyof Person; // "name" | "age"
// 📌 Conditional Types


// type IsString<T> = T extends string ? "Yes" : "No";
// type Test1 = IsString<string>; // "Yes"
// type Test2 = IsString<number>; // "No"
// 📌 Infer Keyword (Type Extraction)


// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
