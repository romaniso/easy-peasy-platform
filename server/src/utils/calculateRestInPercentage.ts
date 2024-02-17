export const calculateRestInPercentage = (
  total: number,
  rest: number
): number => {
  return Math.round((rest / total) * 100);
};
