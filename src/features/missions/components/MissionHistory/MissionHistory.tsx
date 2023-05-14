/* eslint-disable react/no-array-index-key */
import React, { memo, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { styled, Text, View } from 'dripsy';
import { t } from 'src/translations';
import type { basicColors } from 'src/themes/colors';

type Status = 'active' | 'inactive' | 'empty';

export interface MissionHistoryProps {
  color: keyof typeof basicColors;
  history: number[];
}

interface DayProps extends Pick<MissionHistoryProps, 'color'> {
  status: Status;
  delay: number;
}

const DAY_CELL_SIZE = 25;
const WEEK_DAYS = 7;
const WEEKS = 4;
const HISTORY_DAYS = WEEK_DAYS * WEEKS;

const Container = styled(View)({
  gap: '$02',
});

const AnimatedDay = styled(Animated.View)(
  ({
    color,
    status,
  }: Pick<MissionHistoryProps, 'color'> & { status: Status }) => ({
    width: DAY_CELL_SIZE,
    height: DAY_CELL_SIZE,
    borderWidth: 2,
    borderColor: status === 'empty' ? '$border_secondary' : '$border',
    borderRadius: 4,
    backgroundColor: status === 'active' ? color : 'transparent',
  }),
);

const Week = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Header = styled(Week)({
  paddingX: '$02',
});

const getStatus = (hasHistory: boolean, dayBefore: number): Status => {
  if (dayBefore < 0) {
    return 'empty';
  }
  return hasHistory ? 'active' : 'inactive';
};

function Day({ color, status, delay }: DayProps): React.ReactElement {
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

const getArrayForRender = (): null[][] => {
  const dummy = Array.from({ length: HISTORY_DAYS }).fill(null) as null[];
  const arr: null[][] = [];

  for (let i = 0; i < WEEKS; i++) {
    const sliceFrom = i * WEEK_DAYS;
    arr.push(dummy.slice(sliceFrom, sliceFrom + WEEK_DAYS));
  }

  return arr;
};

export const MissionHistory = memo(function MissionHistory({
  color,
  history,
}: MissionHistoryProps): React.ReactElement {
  const weekDay = new Date().getDay();

  return (
    <Container>
      <Header>
        <Text variant="primary">{t('label.weekday_0')}</Text>
        <Text variant="primary">{t('label.weekday_1')}</Text>
        <Text variant="primary">{t('label.weekday_2')}</Text>
        <Text variant="primary">{t('label.weekday_3')}</Text>
        <Text variant="primary">{t('label.weekday_4')}</Text>
        <Text variant="primary">{t('label.weekday_5')}</Text>
        <Text variant="primary">{t('label.weekday_6')}</Text>
      </Header>
      {getArrayForRender().map((daysInWeek, weekIndex) => (
        <Week key={weekIndex}>
          {daysInWeek.map((_, dayIndex) => {
            const dayBefore =
              HISTORY_DAYS - (weekIndex * 7 + dayIndex) - (WEEK_DAYS - weekDay);
            return (
              <Day
                color={color}
                delay={(weekIndex + dayIndex) * 100}
                key={dayIndex}
                status={getStatus(history.includes(dayBefore), dayBefore)}
              />
            );
          })}
        </Week>
      ))}
    </Container>
  );
});
