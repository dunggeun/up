import { faker } from '@faker-js/faker';
import { isLight } from '../utils';
import { LIGHT_COLORS, DARK_COLORS } from '../colors';
import type { colors } from '../colors';

describe('themes/utils', () => {
  describe('isLight', () => {
    type Value = keyof typeof colors;

    describe('밝은 색상 키 값이 입력된 경우', () => {
      let color: Value;

      beforeEach(() => {
        color = faker.helpers.arrayElement<Value>(LIGHT_COLORS);
      });

      it('참이 반환되어야 한다', () => {
        expect(isLight(color)).toEqual(true);
      });
    });

    describe('밝은 색상이 아닌 키 값이 입력된 경우', () => {
      let color: Value;

      beforeEach(() => {
        color = faker.helpers.arrayElement<Value>(DARK_COLORS);
      });

      it('거짓이 반환되어야 한다', () => {
        expect(isLight(color)).toEqual(false);
      });
    });
  });
});
