<div align="center">
  <img height="60" src="https://edurev.gumlet.io/AllImages/original/ApplicationImages/CourseImages/944e5d47-8c55-4a89-91e5-22ab5f2798fc_CI.png">
  <h1>MCQ TEST</h1>
</div>

###### 1. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
let greeting;
greetign = {};
console.log(greetign);
```

- A: `{}`
- B: `ReferenceError: greetign is not defined`
- C: `undefined`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: ? A

<i> 1. let greeting;: This line declares a variable named greeting using the let keyword. At this point, greeting has been declared, but it hasn't been assigned a value yet. So, its value is undefined.

2. greeting = {};: Here, we assign an empty object {} to the greeting variable. This means that greeting now holds a reference to an empty JavaScript object.

3. console.log(greeting);: This line uses the console.log() function to print the value of the greeting variable to the console. Since we assigned an empty object to greeting in the previous step, it will log an empty object {} to the console</i>

</p>
</details>

###### 2. Write the `correct answer` from the following options and give an explanation (2-5 lines).


Featcher post 
 Add Event 
 Gallary
 About Us

```javascript
function sum(a, b) {
  return a + b;
}

sum(1, "2");
```

- A: `NaN`
- B: `TypeError`
- C: `"12"`
- D: `3`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: ? C

<i>
Certainly! In the code provided, you have a function called sum that adds two numbers together. However, there's a potential issue in the function call sum(1, "2") because one of the values is a number (1), and the other is a string ("2").

JavaScript can sometimes convert types automatically, but when you add a number to a string, it treats it as a string concatenation instead of numeric addition. So, the result of sum(1, "2") is not 3 (as you might expect), but "12" (a string containing both values combined).</i>

</p>
</details>

###### 3. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
const food = ["🍕", "🍫", "🥑", "🍔"];
const info = { favoriteFood: food[0] };

info.favoriteFood = "🍝";

console.log(food);
```

- A: `['🍕', '🍫', '🥑', '🍔']`
- B: `['🍝', '🍫', '🥑', '🍔']`
- C: `['🍝', '🍕', '🍫', '🥑', '🍔']`
- D: `ReferenceError`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: ? A

<i>In the provided code, an array called food is created, containing four food emojis. Then, an object info is initialized with a property favoriteFood set to the first element of the food array, which is "🍕". Subsequently, changing the favoriteFood property within the info object to "🍝" has no impact on the original food array, which retains its original contents: "🍕", "🍫", "🥑", and "🍔".</i>

</p>
</details>

###### 4. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
function sayHi(name) {
  return `Hi there, ${name}`;
}

console.log(sayHi());
```

- A: `Hi there,`
- B: `Hi there, undefined`
- C: `Hi there, null`
- D: `ReferenceError`

<details><summary><b>Answer</b></summary>
<p>

#### Answer: ? B

<i>In the provided code, calling the sayHi function without passing an argument for the name parameter results in name being undefined. As a result, the function returns a greeting message that includes "Hi there, undefined."</i>

</p>
</details>

###### 5. Write the `correct answer` from the following options and give an explanation (2-5 lines).

```javascript
let count = 0;
const nums = [0, 1, 2, 3];

nums.forEach((num) => {
  if (num) count += 1;
});

console.log(count);
```

- A: 1
- B: 2
- C: 3
- D: 4

<details><summary><b>Answer</b></summary>
<p>

#### Answer: ? C

<i>initialize a count variable to 0 and create an array nums with four numbers. You use the forEach method to iterate through the nums array, incrementing the count variable by 1 for each truthy element encountered. Since nums contains three truthy elements (1, 2, and 3), the count variable ends up with a value of 3. When you log count to the console, it displays 3 as the output, reflecting the count of truthy elements in the array.</i>

</p>
</details>
