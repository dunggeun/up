// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-throw-literal */
import { useEffect } from 'react';

const caches = new Map<string, Cache>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Cache<Result = any> {
  promise: Promise<void>;
  error?: Error;
  result?: Result;
}

export const usePromise = <Result>(
  key: string,
  fetcher: () => Promise<Result>,
): { value: Result } => {
  useEffect(() => {
    // invalidate cache of current key
    return () => void caches.delete(key);
  }, [key]);

  if (caches.has(key)) {
    const cache = caches.get(key);
    if (cache?.result) {
      return { value: cache.result as Result };
    } 
    throw cache?.error ?? cache?.promise;
  }

  const cache: Cache<Result> = {
    promise: fetcher().then((value) => {
      cache.result = value;
    }).catch((error) => {
      cache.error = error as Error;
    }),
    result: undefined,
    error: undefined,
  };
  caches.set(key, cache);

  throw cache.promise;
};
