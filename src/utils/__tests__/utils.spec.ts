import { Platform } from 'react-native';
import * as ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { delay } from '../async';
import { triggerHaptic } from '../common';
import { diffBeforeToday } from '../date';
import { replacePlaceholder } from '../string';

jest.mock('react-native-haptic-feedback', () => ({
  __esModule: true,
  default: { trigger: jest.fn() },
  trigger: jest.fn(),
  HapticFeedbackTypes: {},
}));

describe('utils', () => {
  describe('async', () => {
    describe('delay', () => {
      let duration: number;

      beforeAll(() => {
        jest.useFakeTimers();
      });

      beforeEach(() => {
        duration = faker.datatype.number();
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      it('지정된 시간 이후에 resolve 되어야 한다', async () => {
        const task = delay(duration);
        jest.advanceTimersByTime(duration);
        await expect(task).resolves.toBeUndefined();
      });
    });
  });

  describe('common', () => {
    describe('triggerHaptic', () => {
      let mockedTrigger: jest.Mock;

      beforeEach(() => {
        mockedTrigger = jest.fn();
        (ReactNativeHapticFeedback.trigger as jest.Mock) = mockedTrigger;
      });

      describe('ios 플랫폼인 경우', () => {
        beforeEach(() => {
          Platform.OS = 'ios';
          triggerHaptic();
        });

        it('trigger가 호출되어야 한다', () => {
          expect(mockedTrigger).toHaveBeenCalledTimes(1);
        });
      });

      describe('android 플랫폼인 경우', () => {
        beforeEach(() => {
          Platform.OS = 'android';
          triggerHaptic();
        });

        it('trigger가 호출되지 않아야 한다', () => {
          expect(mockedTrigger).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('date', () => {
    describe('diffBeforeToday', () => {
      let beforeDays: number;
      let date: Date;

      beforeEach(() => {
        beforeDays = faker.datatype.number({ min: 1, max: 10 });
        date = dayjs().subtract(beforeDays, 'days').toDate();
      });

      it('오늘 기준 지난 일수가 반환 되어야 한다', () => {
        expect(diffBeforeToday(date.getTime())).toBe(beforeDays);
      });
    });
  });

  describe('string', () => {
    describe('replacePlaceholder', () => {
      const ARGS = ['hello', 'world'];
      const TEST_CASES = ['hello, world!', '%@, world!', '%@, %@!'] as const;
      const RESULT = 'hello, world!';

      it.each(TEST_CASES)('placeholder 가 치환 되어야 한다', (template) => {
        expect(replacePlaceholder(template, ...ARGS)).toBe(RESULT);
      });
    });
  });
});
