export const replacePlaceholder = (
  string: string,
  ...values: string[]
): string => {
  return values.reduce((prev, curr) => prev.replace('%@', curr), string);
};

export const getLength = (text: string): number => {
  let length = 0;
  for (const c of text) {
    // 한글같은 문자는 2자리를 차지하기에 이를 계산하기 위함
    if (escape(c).length >= 6) {
      length += 1;
    }
    length += 1;
  }
  return length;
};
