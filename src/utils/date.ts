import dayjs from 'dayjs';

export const diffBeforeToday = (timestamp: number): number => {
  return dayjs().diff(timestamp, 'days');
};
