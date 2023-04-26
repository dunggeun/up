import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from 'react';
import { TouchableOpacity } from 'react-native';
import { styled, View } from 'dripsy';
import { useAnimationState, AnimatePresence, MotiView } from 'moti';
import { Icons } from 'src/assets';
import { noop } from 'src/utils';
import { BORDER_WIDTH } from 'src/constants';
import { H2 } from '../H2';

interface SelectContextValue {
  visibility: boolean;
  value: SelectItem | null;
  toggleVisibility: () => void;
  setValue: (value: SelectItem) => void;
}

export interface SelectItem {
  value: string;
  label: string;
}

const SELECT_HEIGHT = 32;
const defaultValue: SelectContextValue = {
  visibility: false,
  value: null,
  toggleVisibility: noop,
  setValue: noop,
};
const SelectContext = createContext<SelectContextValue>(defaultValue);

const RootView = styled(View)({
  position: 'relative',
  height: SELECT_HEIGHT,
});

const TriggerView = styled(TouchableOpacity)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$02',
});

const TriggerSymbol = styled(Icons.ArrowLeft)({
  transform: [{ rotate: '-90deg' }],
});

const ContentView = styled(MotiView)({
  position: 'absolute',
  top: SELECT_HEIGHT + 8,
  left: 0,
  paddingX: '$02',
  borderRadius: '$md',
  borderWidth: BORDER_WIDTH,
  borderColor: '$text_primary',
  backgroundColor: '$white',
});

const ItemView = styled(TouchableOpacity)({
  padding: '$02',
});

export interface SelectRootProps {
  initialValue?: SelectItem;
  onChange: (value: SelectItem['value']) => void;
}

export function Root({
  children,
  initialValue,
  onChange,
}: PropsWithChildren<SelectRootProps>): JSX.Element {
  const [value, setValue] = useState(initialValue ?? defaultValue.value);
  const [visibility, setVisibility] = useState(defaultValue.visibility);

  const handleToggleVisibility = (): void => {
    setVisibility((currentVisibility) => !currentVisibility);
  };

  const handleSetValue = (selectedValue: SelectItem): void => {
    setValue(selectedValue);
    onChange(selectedValue.value);
  };

  return (
    <SelectContext.Provider
      value={{
        ...defaultValue,
        visibility,
        value,
        toggleVisibility: handleToggleVisibility,
        setValue: handleSetValue,
      }}
    >
      <RootView>{children}</RootView>
    </SelectContext.Provider>
  );
}

export function Trigger(): JSX.Element {
  const value = useContext(SelectContext);

  const rotate = useAnimationState({
    close: { rotate: '0deg' },
    open: { rotate: '-180deg' },
  });

  useEffect(() => {
    rotate.transitionTo(value.visibility ? 'open' : 'close');
  }, [rotate, value.visibility]);

  return (
    <TriggerView onPress={value.toggleVisibility} testID="select-trigger">
      <MotiView state={rotate} transition={{ type: 'timing', duration: 250 }}>
        <TriggerSymbol />
      </MotiView>
      <H2 variant="primary">{value.value?.label ?? ''}</H2>
    </TriggerView>
  );
}

export function Content({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const value = useContext(SelectContext);

  return (
    <AnimatePresence>
      {value.visibility ? (
        <ContentView
          animate={{
            opacity: 1,
            scale: 1,
            translateY: -0,
          }}
          exit={{
            opacity: 0,
            scale: 0,
            translateY: -50,
          }}
          exitTransition={{ type: 'timing' }}
          from={{
            opacity: 0,
            scale: 0,
            translateY: -50,
          }}
          testID="select-content"
          transition={{ type: 'timing' }}
        >
          {children}
        </ContentView>
      ) : null}
    </AnimatePresence>
  );
}

export type SelectItemProps = SelectItem;

export function Item(item: SelectItemProps): JSX.Element {
  const context = useContext(SelectContext);

  const handlePressItem = (): void => {
    context.setValue(item);
    context.toggleVisibility();
  };

  return (
    <ItemView
      key={item.value}
      onPress={handlePressItem}
      testID={`select-item-${item.value}`}
    >
      <H2 variant="primary">{item.label}</H2>
    </ItemView>
  );
}

export const Select = { Root, Trigger, Content, Item };
