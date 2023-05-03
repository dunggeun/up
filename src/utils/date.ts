import dayjs from 'dayjs';

const DIFF_BEFORE_TODAY_UNIT = 'days';

export const diffBeforeToday = (timestamp: number): number => {
  return dayjs()
    .startOf(DIFF_BEFORE_TODAY_UNIT)
    .diff(
      dayjs(timestamp).startOf(DIFF_BEFORE_TODAY_UNIT),
      DIFF_BEFORE_TODAY_UNIT,
    );
};
