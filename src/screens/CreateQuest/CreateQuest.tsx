import React, { useState, useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { styled, Container, View } from 'dripsy';
import { SafeAreaView } from 'src/components';
import { AppBar, Button, Input, H1, H2, Text } from 'src/designs';
import { useUserThemeColor } from 'src/hooks';
import { t } from 'src/translations';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type CreateQuestProps = QuestStackProps<'CreateQuest'>;

enum CreateQuestPhase {
  EnterTitle,
  EnterMemo,
  Accepted
}

const MEMO_INPUT_HEIGHT = 200;
const FADE_DURATION = 250;

const Content = styled(Animated.View)({ flex: 1 });

const Body = styled(View)({
  flex: 1,
  gap: '$04',
});

const Header = styled(View)({
  width: '100%',
  paddingY: '$04',
});

const Footer = styled(View)({
  gap: '$04',
  paddingBottom: '$04',
});

const MemoInput = styled(Input)({
  height: MEMO_INPUT_HEIGHT,
});

const AcceptMessage = styled(Text, {
  defaultVariant: 'text.secondary',
})({ textAlign: 'center' });

export function CreateQuest ({ navigation }: CreateQuestProps): JSX.Element {
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const [phase, setPhase] = useState(CreateQuestPhase.EnterTitle);
  const [questName, setQuestName] = useState('');
  const [questMemo, setQuestMemo] = useState('');
  const transitioning = useRef(false);
  const userColor = useUserThemeColor();

  const handlePressBackButton = (): void => {
    changePhase(CreateQuestPhase.EnterTitle);
  };

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const changePhase = useCallback((targetPhase: CreateQuestPhase) => {
    const fadeOut = (callback: () => void): void => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start(callback);
    };

    const fadeIn = (): void => {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    };

    transitioning.current = true;
    fadeOut(() => {
      setPhase(targetPhase);
      requestAnimationFrame(fadeIn);
    });
  }, [fadeAnimation]);

  const handlePressNextButton = useCallback((): void => {
    switch (phase) {
      case CreateQuestPhase.EnterTitle:
        changePhase(CreateQuestPhase.EnterMemo);
        break;

      case CreateQuestPhase.EnterMemo:
        // @todo 퀘스트 생성 및 저장
        changePhase(CreateQuestPhase.Accepted);
        break;

      case CreateQuestPhase.Accepted:
        navigation.goBack();
        break;

      default:
        break;
    }
  }, [phase, navigation, changePhase]);

  const handlePressShareButton = useCallback((): void => {
    // @todo
  }, []);

  const renderContent = (): JSX.Element => {
    switch (phase) {
      case CreateQuestPhase.EnterTitle:
        return (
          <React.Fragment key={CreateQuestPhase.EnterTitle}>
            <Header>
              <H1 variant="primary">{t('title.new_quest_title')}</H1>
            </Header>
            <Body>
              <Input
                onChangeText={setQuestName}
                placeholder={t('placeholder.enter_name')}
              />
            </Body>
            <Footer>
              <Button
                color={userColor}
                disableLongPress
                disabled={questName.length < 2}
                onPress={handlePressNextButton}
              >
                {t('label.next')}
              </Button>
            </Footer>
          </React.Fragment>
        );

      case CreateQuestPhase.EnterMemo:
        return (
          <React.Fragment key={CreateQuestPhase.EnterMemo}>
            <Header>
              <H1 variant="primary">{t('title.new_quest_memo')}</H1>
            </Header>
            <Body>
              <H2 variant="primary">{questName}</H2>
              <MemoInput
                multiline
                onChangeText={setQuestMemo}
                placeholder={t('placeholder.enter_memo')}
              />
            </Body>
            <Footer>
              <AcceptMessage>{t('message.quest_warning')}</AcceptMessage>
              <Button color={userColor} onLongPress={handlePressNextButton}>
                {t('label.accept_quest')}
              </Button>
            </Footer>
          </React.Fragment>
        );

      case CreateQuestPhase.Accepted:
        return (
          <React.Fragment key={CreateQuestPhase.Accepted}>
            <Header>
              <H1 variant="primary">{t('title.new_quest_accepted')}</H1>
            </Header>
            <Body>
              <H2 variant="primary">{questName}</H2>
              <Text variant="secondary">{questMemo}</Text>
            </Body>
            <Footer>
              <Button
                color="$white"
                disableLongPress
                onPress={handlePressShareButton}
              >
                {t('label.share')}
              </Button>
              <Button
                color={userColor}
                disableLongPress
                onPress={handlePressNextButton}
              >
                {t('label.ok')}
              </Button>
            </Footer>
          </React.Fragment>
        );
    }
  };

  return (
    <SafeAreaView>
      <AppBar
        onBackPress={
          phase === CreateQuestPhase.EnterMemo
            ? handlePressBackButton
            : undefined
        }
        onClosePress={handlePressCloseButton}
      />
      <Container>
        <Content style={{ opacity: fadeAnimation }}>
          {renderContent()}
        </Content>
      </Container>
    </SafeAreaView>
  );
}
