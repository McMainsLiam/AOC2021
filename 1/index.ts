const text = await Deno.readTextFile("./input");
const convertInputToNumbersList = (text: string) =>
  text.split("\n").map(Number);
const numbers = convertInputToNumbersList(text);

// Part 1
const result = numbers.reduce((previous, _, index, array) => {
  return previous + (array[index] < (array[index + 1] || -Infinity) ? 1 : 0);
}, 0);

console.log(result);

// Part 2
const secondResult = numbers.reduce((previous, _, index, array) => {
  const isGreater =
    array[index] + (array[index + 1] ?? 0) + (array[index + 2] ?? 0) <
    (array[index + 1] ?? 0) + (array[index + 2] ?? 0) + (array[index + 3] ?? 0);
    
  return previous + (isGreater ? 1 : 0);
}, 0);

console.log(secondResult);
