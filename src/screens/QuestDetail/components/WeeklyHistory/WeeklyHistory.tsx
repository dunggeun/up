import React, { useRef, useMemo, useEffect } from 'react';
import { styled, Text, View } from 'dripsy';
import { Animated } from 'react-native';
import { t } from 'src/translations';

import type { basicColors } from 'src/themes/colors';

type Status = 'active' | 'inactive' | 'empty';

export interface WeeklyHistoryProps {
  color: keyof typeof basicColors;
  history: number[];
}

interface DayProps extends Pick<WeeklyHistoryProps, 'color'> {
  status: Status;
  delay: number;
}

const DAY_CELL_SIZE = 25;
const WEEK_DAYS = 7;
const WEEKS = 4;

const Container = styled(View)({
  gap: '$02',
});

const AnimatedDay = styled(Animated.View)(({
  color,
  status
}: Pick<WeeklyHistoryProps, 'color'> & { status: Status }) => ({
  width: DAY_CELL_SIZE,
  height: DAY_CELL_SIZE,
  borderWidth: 2,
  borderColor: status === 'empty' ? '$text_tertiary' : '$text_primary',
  borderRadius: 4,
  backgroundColor: status === 'active' ? color : 'transparent',
}));

const Week = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Header = styled(Week)({
  paddingX: '$02',
});

const getStatus = (value: number): Status => {
  if (value === 0) {
    return 'inactive';
  } else if (value === -1) {
    return 'empty';
  } 
  return 'active';
};

function Day ({ color, status, delay }: DayProps): JSX.Element {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      delay,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation, delay]);

  return (
    <AnimatedDay
      color={color}
      status={status}
      style={{ opacity: fadeAnimation }}
    />
  );
}

export function WeeklyHistory ({
  color,
  history
}: WeeklyHistoryProps): JSX.Element {
  const computedHistory = useMemo(() => {
    const weeks: number[][] = [];

    for (let i = 0; i < WEEKS; i++) {
      const sliceFrom = i * WEEK_DAYS;
      weeks.push(history.slice(sliceFrom, sliceFrom + WEEK_DAYS));
    }

    return weeks;
  }, [history]);

  return (
    <Container>
      <Header>
        <Text variant="primary">
          {t('label.weekday_0')}
        </Text>
        <Text variant="primary">
          {t('label.weekday_1')}
        </Text>
        <Text variant="primary">
          {t('label.weekday_2')}
        </Text>
        <Text variant="primary">
          {t('label.weekday_3')}
        </Text>
        <Text variant="primary">
          {t('label.weekday_4')}
        </Text>
        <Text variant="primary">
          {t('label.weekday_5')}
        </Text>
        <Text variant="primary">
          {t('label.weekday_6')}
        </Text>
      </Header>
      {computedHistory.map((daysInWeek, weekIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <Week key={weekIndex}>
          {daysInWeek.map((value, dayIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Day color={color} delay={(weekIndex + dayIndex) * 100} key={dayIndex} status={getStatus(value)} />
          ))}
        </Week>
      ))}
    </Container>
  );
}
