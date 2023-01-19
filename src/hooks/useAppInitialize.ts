/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-throw-literal */
import { useState, useEffect } from 'react';

export const useAppInitialize = (): {
  isReady: boolean,
  authorized: boolean
} | never => {
  const [task, setTask] = useState<Promise<void>>();
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<Error>();
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'error'>('pending');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/require-await
    const task = (async (): Promise<void> => {
      // @todo: initialize here
      setAuthorized(false);
    })()
      .then(() => setStatus('fulfilled'))
      .catch((error) => {
        setError(error as Error);
        setStatus('error');
      });

    setTask(task);
  }, []);

  if (status === 'pending' && task) throw task;
  if (status === 'error') throw error;
  return { isReady: status === 'fulfilled', authorized };
};
