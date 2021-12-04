import chunk from "https://deno.land/x/lodash@4.17.15-es/chunk.js";

// Setup
const text = await Deno.readTextFile("4/input");
const rows = text.split("\n");

const numbersCalled = rows[0].split(",");
rows.splice(0, 2);

const boards = chunk(rows, 6, null)
  .map((board) => {
    board.splice(5, 1);
    return board;
  })
  .map((board: string[]) =>
    board.map((row: string) => row.split(" ").filter((row) => row))
  );

// Helper
const transpose = (array: string[][]) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

// Part 1
const rowWon = (numbers: string[], row: string[]) =>
  row.every((item) => numbers.includes(item));

const boardIsWinner = (numbers: string[], board: string[][]) =>
  !!board.find((row) => rowWon(numbers, row)) ||
  !!transpose(board).find((col) => rowWon(numbers, col));

const scoreBoard = (allNumbersCalled: string[], board: string[][]) => {
  const unmarkedSum = board
    .map((row) => row.join(","))
    .join(",")
    .split(",")
    .filter((num) => !allNumbersCalled.includes(num))
    .map((num) => Number(num))
    .reduce((prev, current) => prev + current);
  0;
  return parseInt(allNumbersCalled[allNumbersCalled.length - 1]) * unmarkedSum;
};

try {
  numbersCalled.forEach((_, i) => {
    const numbersCalledSoFar = numbersCalled.slice(0, i + 1);
    const BINGO = boards.find((board) =>
      boardIsWinner(numbersCalledSoFar, board)
    );
    if (BINGO) {
      console.log(scoreBoard(numbersCalledSoFar, BINGO)); // 64084
      throw "break"; // to break out of the foreach
    }
  });
} catch {}

// Part 2
const winners: string[][][] = [];
const indexAtWinTime: number[] = [];

numbersCalled.forEach((_, i) => {
  const numbersCalledSoFar = numbersCalled.slice(0, i + 1);
  const BINGOS = boards.filter((board) =>
    boardIsWinner(numbersCalledSoFar, board)
  );
  BINGOS.forEach((bingo) => {
    if (!winners.includes(bingo)) {
      winners.push(bingo);
      indexAtWinTime.push(i);
    }
  });
});

const last = winners.length - 1;
const lastBoard = winners[last];
const lastIndex = indexAtWinTime[last];
const lastNumberCalled = parseInt(numbersCalled[lastIndex]);
const numbersCalledOnLastBoard = numbersCalled.slice(
  0,
  numbersCalled.indexOf(String(lastNumberCalled)) + 1
);

console.log(scoreBoard(numbersCalledOnLastBoard, lastBoard)); // 12833

export {};
