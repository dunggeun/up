/* eslint-disable react/no-array-index-key */
import React, { memo, useState, useEffect, useLayoutEffect } from 'react';
import { Animated, type LayoutChangeEvent } from 'react-native';
import { styled, View } from 'dripsy';
import { USE_NATIVE_DRIVER } from 'src/constants';
import { Text } from '../../designs/Text';

interface AnimatedNumberProps {
  value: number;
  delay?: number;
  size?: 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const DURATION = 1000;

const NumberContainer = styled(View)({
  position: 'relative',
  flexDirection: 'row',
  alignSelf: 'baseline',
});

const NumberWrapper = styled(View)(({ height }: { height: number }) => ({
  height,
  overflow: 'hidden',
}));

export const AnimatedNumber = memo(function AnimatedNumber({
  value,
  delay,
  size = 'md',
  variant = 'primary',
}: AnimatedNumberProps): React.ReactElement {
  const [numbers, setNumbers] = useState<number[]>();
  const [height, setHeight] = useState(0);
  const [animationValues, setAnimationValues] = useState<Animated.Value[]>([]);

  const handleLayout = (event: LayoutChangeEvent): void => {
    setHeight(event.nativeEvent.layout.height);
  };

  useLayoutEffect(() => {
    const numbers = Array.from(value.toString(), Number);
    setNumbers(numbers);
    setAnimationValues((values): Animated.Value[] => {
      const diff = numbers.length - values.length;
      if (values.length === numbers.length) {
        return [...values];
      }

      return [
        ...values,
        ...(diff > 0
          ? new Array<Animated.Value>(diff)
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              .fill(null)
              .map(() => new Animated.Value(0))
          : []),
      ].slice(0, numbers.length);
    });
  }, [value]);

  useEffect(() => {
    animationValues.forEach((animation, index): void => {
      const targetNumber = numbers?.[index];
      if (targetNumber === undefined) return;
      Animated.timing(animation, {
        toValue: -(height * targetNumber),
        duration: DURATION,
        useNativeDriver: USE_NATIVE_DRIVER,
        delay,
      }).start();
    });
  }, [animationValues, numbers, height, delay]);

  return (
    <NumberContainer>
      {animationValues.map((animation, index) => (
        <NumberWrapper height={height} key={index}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: animation,
                },
              ],
            }}
          >
            {NUMBERS.map((number, index) => (
              <NumberWrapper height={height} key={index}>
                <Text
                  sx={{ paddingBottom: 0 }}
                  variants={[size === 'md' ? 'h2' : 'h1', variant]}
                >
                  {number}
                </Text>
              </NumberWrapper>
            ))}
          </Animated.View>
        </NumberWrapper>
      ))}
      <Text onLayout={handleLayout} variant={size === 'md' ? 'h2' : 'h1'}>
        {' '}
      </Text>
    </NumberContainer>
  );
});
