export const pxToRem = (px: number) => {
  const rem = px / 16;
  return rem;
};

export const numberToString = (number: number) => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(2)}m`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}k`;
  }
  return number.toString();
};
