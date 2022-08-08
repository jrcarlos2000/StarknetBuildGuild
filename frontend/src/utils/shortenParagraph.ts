export const shortenParagraph = (
  paragraph: string,
  shortenToLength: number
) => {
  if (paragraph && paragraph.length > shortenToLength) {
    return paragraph.slice(0, shortenToLength).concat("...");
  }
  return paragraph;
};
