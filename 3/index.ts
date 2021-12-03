// Setup
const text = await Deno.readTextFile("3/input");
const rows = text.split("\n");

// Helpers
const range = (n: number) => [...Array(n).keys()];
const convertBinaryStringToNumber = (n: string) => parseInt(n, 2);

// Part 1
const calculateFrequencyOfOnes = (localRows: string[]) => {
  const counts: Record<number, number> = {};

  localRows.forEach((row) => {
    row.split("").forEach((letter, index) => {
      if (counts[index] === undefined) counts[index] = parseInt(letter);
      else counts[index] += parseInt(letter);
    });
  });

  return counts;
};

const oneCounts = calculateFrequencyOfOnes(rows);

const gammaString = Object.values(oneCounts)
  .map((value) => (value < rows.length / 2 ? 0 : 1))
  .join("");
const epsilonString = Object.values(oneCounts)
  .map((value) => (value > rows.length / 2 ? 0 : 1))
  .join("");

console.log(convertBinaryStringToNumber(gammaString) * convertBinaryStringToNumber(epsilonString)); // 4118544

// Part 2
let oxRows = [...rows];
let co2Rows = [...rows];

let finalOx = "0",
  finalCo2 = "0";

range(rows[0].length).forEach((index) => {
  const oneCountOx = calculateFrequencyOfOnes(oxRows)[index];
  const mostCommonValueOx = oneCountOx >= oxRows.length / 2 ? "1" : "0";
  oxRows = oxRows.filter((row) => row[index] === mostCommonValueOx);
  if (oxRows.length === 1) finalOx = oxRows[0];

  const oneCountCo2 = calculateFrequencyOfOnes(co2Rows)[index];
  const mostCommonValueCo2 = oneCountCo2 < co2Rows.length / 2 ? "1" : "0";
  co2Rows = co2Rows.filter((row) => row[index] === mostCommonValueCo2);
  if (co2Rows.length === 1) finalCo2 = co2Rows[0];
});

console.log(convertBinaryStringToNumber(finalCo2) * convertBinaryStringToNumber(finalOx)); // 3832770

export {};
