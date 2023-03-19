import React from 'react';
import { render as testRender, screen, fireEvent, cleanup } from '@testing-library/react-native';
import { faker } from '@faker-js/faker';
import { withDripsy } from 'tests/utils';
import { noop } from 'src/utils';
import {
  Select,
  type SelectItem,
  type SelectRootProps,
  type SelectItemProps
} from '../Select';

const render = ({
  initialValue,
  onChange,
  items
}: SelectRootProps & { items: SelectItemProps[] }): ReturnType<typeof testRender> => {
  return testRender(
    withDripsy(
      <Select.Root initialValue={initialValue} onChange={onChange}>
        <Select.Trigger />
        <Select.Content>
          {items.map((item) => (
            <Select.Item {...item} key={item.value} />
          ))}
        </Select.Content>
      </Select.Root>
    ),
  );
};

describe('atoms/Select', () => {
  let itemCount: number;
  let items: SelectItem[];
  let onChange: jest.Mock;
  
  beforeAll(() => {
    onChange = jest.fn();
    itemCount = faker.datatype.number({ min: 1, max: 3 });
    items = Array.from({ length: itemCount }).map(() => ({
      value: faker.datatype.uuid(),
      label: faker.random.word(),
    }));
  });

  afterEach(() => {
    cleanup();
  });

  describe('trigger 를 눌렀을 때', () => {
    beforeEach(() => {
      render({ onChange, items });
      fireEvent(screen.getByTestId('select-trigger'), 'press');
    });

    it('선택 항목이 노출되어야 한다', () => {
      expect(screen.getByTestId('select-content')).not.toBeNull();
    });

    it('모든 선택 항목이 정상적으로 렌더링 되어야 한다', () => {
      for (const item of items) {
        expect(screen.getByTestId(`select-item-${item.value}`)).not.toBeNull();
      }
    });

    describe('선택 항목을 눌렀을 때', () => {
      let targetItem: SelectItem;

      beforeEach(() => {
        targetItem = faker.helpers.arrayElement(items);
        fireEvent(screen.getByTestId(`select-item-${targetItem.value}`), 'press');
      });

      it('선택한 항목의 value 가 onChange 핸들러로 전달되어야 한다', () => {
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(targetItem.value);
      });

      it('선택한 항목의 label 이 노출되어야 한다', async () => {
        expect(await screen.findByText(targetItem.label)).not.toBeNull();
      });
    });
  });

  describe('initialValue 가 존재할 때', () => {
    let initialValue: SelectItem;

    beforeEach(() => {
      initialValue = {
        value: faker.datatype.uuid(),
        label: faker.random.word(),
      };
      render({ onChange: noop, items: [], initialValue });
    });

    it('기본 아이템 라벨이 노출되어야 한다', () => {
      expect(screen.getByText(initialValue.label)).not.toBeNull();
    });
  });
});
