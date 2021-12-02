const text = await Deno.readTextFile("2/input");

const lines = text.split("\n");

const entries = lines
  .map((line) => line.split(" "))
  .map(([direction, distance]) => [direction, Number(distance)]) as [
  string,
  number
][];

// Part 1
let totalDistance = 0,
  totalDepth = 0;

entries.forEach(([direction, distance]) => {
  if (direction === "up" || direction === "down")
    totalDepth += direction === "down" ? distance : -distance;
  else totalDistance += distance;
});

console.log(totalDistance * totalDepth);

// Part 2
let aim = 0;
totalDistance = 0;
totalDepth = 0;

for (const [direction, x] of entries) {
  if (direction === "up" || direction === "down") {
    aim += (direction === "down" ? 1 : -1) * x;
  } else {
    totalDistance += x;
    totalDepth += aim * x;
  }
}

console.log(totalDistance * totalDepth);

export {};
