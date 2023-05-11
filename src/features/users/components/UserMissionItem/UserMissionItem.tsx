import React, { useRef, useMemo, useEffect } from 'react';
import { Animated, InteractionManager } from 'react-native';
import { MotiView } from 'moti';
import { useAddAchieve } from 'src/features/missions/hooks';
import { AppManager } from 'src/modules/app';
import { navigate } from 'src/navigators/helpers';
import { diffBeforeToday } from 'src/utils';
import { USE_NATIVE_DRIVER } from 'src/constants';
import { Button, Tag } from 'src/designs';
import { t } from 'src/translations';
import type { Mission } from 'src/features/missions';
import type { basicColors } from 'src/themes/colors';

export interface UserMissionItemProps {
  data: Mission;
  index: number;
  animate: boolean;
  tagColor: keyof typeof basicColors;
}

const ANIMATION_DURATION = 300;
const DELAY = 80;

export function UserMissionItem({
  data,
  index,
  animate,
  tagColor,
}: UserMissionItemProps): JSX.Element {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { mutate } = useAddAchieve();

  const shouldShowBadge = useMemo(() => {
    if (data.finished_at) return false;
    return data.current_streak > 0 && diffBeforeToday(data.updated_at) <= 1;
  }, [data]);

  useEffect(() => {
    if (!animate) return;
    const delay = index * DELAY;
    Animated.timing(animatedValue, {
      toValue: 1,
      delay,
      duration: ANIMATION_DURATION,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  }, [animatedValue, animate, index]);

  const handlePress = (): void => {
    const isFinished = data.finished_at;
    navigate('Mission', isFinished ? 'MissionFinished' : 'MissionDetail', {
      id: data.id,
    });
  };

  const handleLongPress = (): void => {
    // 버튼 release 애니메이션과 곂칠 경우 퍼포먼스 문제가 발생
    // 이를 해결하기 위해 인터랙션이 끝난 후 액션 처리하도록 함
    InteractionManager.runAfterInteractions(() => {
      const isFinishedMission = Boolean(data.finished_at);
      const alreadyCompletedToday = diffBeforeToday(data.updated_at) === 0;

      switch (true) {
        case isFinishedMission:
          AppManager.showToast(t('message.finished_mission'));
          break;

        case alreadyCompletedToday:
          AppManager.showToast(t('message.already_completed'));
          break;

        default:
          mutate({ missionId: data.id });
          break;
      }
    });
  };

  const renderBadge = (): JSX.Element | null => {
    return shouldShowBadge ? (
      <MotiView animate={{ scale: 1 }} from={{ scale: 0 }}>
        <Tag color={tagColor} label={`x${data.current_streak}`} />
      </MotiView>
    ) : null;
  };

  return (
    <Animated.View
      style={[
        { opacity: animatedValue },
        {
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
            {
              scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Button
        accessibilityHint={data.title}
        accessibilityLabel={data.title}
        color="$white"
        onLongPress={handleLongPress}
        onPress={handlePress}
        rightAdornment={renderBadge()}
      >
        {data.title}
      </Button>
    </Animated.View>
  );
}
