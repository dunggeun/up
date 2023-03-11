import React, { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { styled } from 'dripsy';
import type { PropsWithChildren } from 'react';

const ANIMATION_DURATION = 250;

interface TransitionGroup {
  renderIndex: number;
}

const GroupContainer = styled(Animated.View)({ flex: 1 });

export function TransitionGroup ({
  children,
  renderIndex
}: PropsWithChildren<TransitionGroup>): JSX.Element {
  const isFirstRenderRef = useRef(true);
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const [currentViewIndex, setCurrentViewIndex] = useState(renderIndex);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const fadeOut = (callback: () => void): void => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start(callback);
    };

    const fadeIn = (): void => {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    };

    fadeOut(() => {
      setCurrentViewIndex(renderIndex);
      requestAnimationFrame(fadeIn);
    });
  }, [fadeAnimation, renderIndex]);

  // eslint-disable-next-line import/no-named-as-default-member
  const currentView = React.Children.toArray(children)[currentViewIndex];

  return (
    <GroupContainer style={{ opacity: fadeAnimation }}>
      {currentView}
    </GroupContainer>
  );
}
