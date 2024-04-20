import { calculateRestInPercentage } from "./calculateRestInPercentage";

test("Calculate 1 / 10 to equal 10 in percentage", () => {
  expect(calculateRestInPercentage(10, 1)).toBe(10);
});

test("Calculate decimal 1.5 / 10 to equal 15 in percentage", () => {
  expect(calculateRestInPercentage(10, 1.5)).toBe(15);
});

test("Round the percentage out of a decimal output: 9 / 2", () => {
  expect(calculateRestInPercentage(9, 2)).toBe(22);
  expect(calculateRestInPercentage(9, 6)).toBe(67);
});

test("Always returns  a defined value", () => {
  expect(calculateRestInPercentage(10, 0)).toBeDefined();
  expect(calculateRestInPercentage(0, 0)).toBeDefined();
});
