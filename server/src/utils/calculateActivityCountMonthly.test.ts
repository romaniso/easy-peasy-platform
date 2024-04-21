import { calculateActivityCountMonthly } from "./calculateActivityCountMonthly";

test("calculateActivityCountMonthly returns an array of objects with a number of completed activities within a month and its date with a yyyy-MM-dd format", () => {
  const completedActivitiesArr = [
    {
      date: "2024-04-21",
      result: 70,
    },
    {
      date: "2024-04-21",
      result: 50,
    },
    {
      date: "2024-03-25",
      result: 50,
    },
  ];

  const expectedReturnedValue = [
    {
      date: "2024-03-22",
      value: 0,
    },
    {
      date: "2024-03-23",
      value: 0,
    },
    {
      date: "2024-03-24",
      value: 0,
    },
    {
      date: "2024-03-25",
      value: 1,
    },
    {
      date: "2024-03-26",
      value: 0,
    },
    {
      date: "2024-03-27",
      value: 0,
    },
    {
      date: "2024-03-28",
      value: 0,
    },
    {
      date: "2024-03-29",
      value: 0,
    },
    {
      date: "2024-03-30",
      value: 0,
    },
    {
      date: "2024-03-31",
      value: 0,
    },
    {
      date: "2024-04-01",
      value: 0,
    },
    {
      date: "2024-04-02",
      value: 0,
    },
    {
      date: "2024-04-03",
      value: 0,
    },
    {
      date: "2024-04-04",
      value: 0,
    },
    {
      date: "2024-04-05",
      value: 0,
    },
    {
      date: "2024-04-06",
      value: 0,
    },
    {
      date: "2024-04-07",
      value: 0,
    },
    {
      date: "2024-04-08",
      value: 0,
    },
    {
      date: "2024-04-09",
      value: 0,
    },
    {
      date: "2024-04-10",
      value: 0,
    },
    {
      date: "2024-04-11",
      value: 0,
    },
    {
      date: "2024-04-12",
      value: 0,
    },
    {
      date: "2024-04-13",
      value: 0,
    },
    {
      date: "2024-04-14",
      value: 0,
    },
    {
      date: "2024-04-15",
      value: 0,
    },
    {
      date: "2024-04-16",
      value: 0,
    },
    {
      date: "2024-04-17",
      value: 0,
    },
    {
      date: "2024-04-18",
      value: 0,
    },
    {
      date: "2024-04-19",
      value: 0,
    },
    {
      date: "2024-04-20",
      value: 0,
    },
    { date: "2024-04-21", value: 2 },
  ];
  expect(calculateActivityCountMonthly(completedActivitiesArr)).toStrictEqual(
    expectedReturnedValue
  );
});

test("calculateActivityCountMonthly returns an array of the length not bigger than 31 and not fewer than 28", () => {
  const completedActivitiesArr = [
    {
      date: "2024-02-21",
      result: 70,
    },
    {
      date: "2024-02-21",
      result: 50,
    },
    {
      date: "2024-02-25",
      result: 50,
    },
  ];
  expect(
    calculateActivityCountMonthly(completedActivitiesArr).length
  ).not.toBeGreaterThan(31);

  expect(
    calculateActivityCountMonthly(completedActivitiesArr).length
  ).toBeGreaterThanOrEqual(28);
});
