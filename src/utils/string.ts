export const replacePlaceholder = (string: string, ...values: string[]): string => {
  return values.reduce((prev, curr) => prev.replace('%@', curr), string);
};
