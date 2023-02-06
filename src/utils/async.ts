export const delay = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

// eslint-disable-next-line @typescript-eslint/no-shadow
export const debounce = <T>(callback: (...args: T[]) => void, delay: number): (...args: T[]) => void => {
  let timer: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
