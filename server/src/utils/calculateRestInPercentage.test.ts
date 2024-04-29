import { calculateRestInPercentage } from "./calculateRestInPercentage";

it("should calculate rest by total in a rounded percentage", () => {
  const total = 10;
  const rest = 1;

  const result = calculateRestInPercentage(total, rest);

  const expectedValue = Math.round((rest / total) * 100);

  expect(result).toBe(expectedValue);
});

it("should calculate decimal rest by total in a rounded percentage", () => {
  const total = 10;
  const rest = 1.5;

  const result = calculateRestInPercentage(total, rest);

  const expectedValue = Math.round((rest / total) * 100);

  expect(result).toBe(expectedValue);
});

it("should round the percentage out of a decimal output: 9 / 2", () => {
  expect(calculateRestInPercentage(9, 2)).toBe(22);
  expect(calculateRestInPercentage(9, 6)).toBe(67);
});

it("should always returns a defined value", () => {
  const total1 = 10;
  const rest1 = 0;

  const total2 = 0;
  const rest2 = 0;

  expect(calculateRestInPercentage(total1, rest1)).toBeDefined();
  expect(calculateRestInPercentage(total2, rest2)).toBeDefined();
});
