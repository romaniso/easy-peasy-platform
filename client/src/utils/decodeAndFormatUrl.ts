export const decodeAndFormatURL = (url: string): string => {
  // Decode URL and replace spaces with hyphens
  return decodeURIComponent(url).replace(/\s+/g, "-").toLowerCase();
};
