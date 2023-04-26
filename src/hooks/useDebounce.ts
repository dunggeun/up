import { useRef } from 'react';
import { debounce } from 'src/utils';

export function useDebounce<T>(
  callback: (...args: T[]) => void,
  delay: number,
): { trigger: (...args: T[]) => void } {
  const debounceRef = useRef<(...args: T[]) => void>();

  if (!debounceRef.current) {
    debounceRef.current = debounce(callback, delay);
  }

  return { trigger: (...args) => debounceRef.current?.(...args) };
}
