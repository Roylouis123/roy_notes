Notes: Writing More Jest Tests (Matchers & Assertions)

1. Common Matchers
.toBe(value) → Checks exact equality (for numbers, strings, booleans).

expect(2 + 2).toBe(4);
.toEqual(object) → Checks if objects/arrays have the same structure and values.

expect({ a: 1 }).toEqual({ a: 1 });

2. Truthiness Matchers
.toBeNull() → Checks if the value is null.

.toBeDefined() → Checks if the value is not undefined.

.toBeUndefined() → Checks if the value is undefined.

.toBeTruthy() → Checks if the value is truthy (true, non-empty string, non-zero number).

.toBeFalsy() → Checks if the value is falsy (false, 0, null, undefined).

expect(null).toBeNull();
expect("").toBeFalsy(); 

3. Number Matchers
.toBeGreaterThan(num) → Checks if greater than num.

.toBeGreaterThanOrEqual(num) → Checks if greater than or equal to num.

.toBeLessThan(num) → Checks if less than num.

.toBeLessThanOrEqual(num) → Checks if less than or equal to num.

expect(10).toBeGreaterThan(9);
expect(10).toBeLessThan(15);

4. String Matchers
.toMatch(/regex/) → Checks if a string matches a regular expression.


expect("Jest is great").toMatch(/Jest/);

5. Array & Iterable Matchers
.toContain(value) → Checks if an array contains value.


expect(["apple", "banana"]).toContain("banana");

6. Exception Handling (toThrow)
.toThrow(errorMessage) → Checks if a function throws an error.


function throwError() {
  throw new Error("Error occurred");
}
expect(() => throwError()).toThrow("Error occurred");