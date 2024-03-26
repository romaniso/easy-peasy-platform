export const decodeAndFormatURL = (url: string): string => {
  // Decode URL, replace spaces with hyphens, and replace specific signs with hyphens
  let formattedUrl = decodeURIComponent(url)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[/:*().{};"]/g, "-") // Replace specific signs with hyphens  /, :, *, ., {, }, (, ), ;, "
    .toLowerCase();

  // Remove consecutive hyphens and hyphen at the end
  formattedUrl = formattedUrl.replace(/-{2,}/g, "-").replace(/-$/, "");

  return formattedUrl;
};
