export const haveCommonWord = (phrase1: string, phrase2: string): boolean => {
  const words1 = phrase1.split(/\s+/);
  const words2 = phrase2.split(/\s+/);

  const lowerCaseWords1 = words1.map((word) => word.toLowerCase());
  const lowerCaseWords2 = words2.map((word) => word.toLowerCase());

  for (const word of lowerCaseWords1) {
    if (lowerCaseWords2.includes(word)) {
      return true;
    }
  }

  return false;
};
