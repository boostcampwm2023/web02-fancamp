export const highlightText = (text: string, keyword: string) => {
  const keywords = keyword.split(' ');
  let highlightedText = text;
  keywords.forEach((k) => {
    highlightedText = highlightedText.replace(
      new RegExp(k, 'gi'),
      (match: string) => `<mark>${match}</mark>`
    );
  });
  return highlightedText;
};
