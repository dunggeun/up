import React, { useState } from 'react';
import { styled } from 'dripsy';
import { AnimatePresence, MotiView } from 'moti';
import { getLength } from 'src/utils';
import {
  MAXIMUM_MISSION_NAME_LENGTH,
  MINIMUM_MISSION_NAME_LENGTH,
} from 'src/constants';
import { CommonLayout, Button, Input, Text } from 'src/designs';
import { PageTitle, PageContent } from 'src/components';
import { t } from 'src/translations';
import type { colors } from 'src/themes/colors';

export interface EnterTitleProps {
  userColor: keyof typeof colors;
  onConfirm: (text: string) => void;
  onPressNext: () => void;
}

const ACCESSIBILITY = {
  next: t('label.next'),
};

const ErrorText = styled(Text)({ textAlign: 'center', color: '$danger' });

const DescriptionText = styled(Text, {
  defaultVariant: 'text.secondary',
})({ textAlign: 'center' });

export function EnterTitle({
  userColor,
  onConfirm,
  onPressNext,
}: EnterTitleProps): React.ReactElement {
  const [title, setTitle] = useState('');
  const isValidQuestName =
    title.length >= MINIMUM_MISSION_NAME_LENGTH &&
    getLength(title) <= MAXIMUM_MISSION_NAME_LENGTH;

  const showErrorMessage =
    isValidQuestName || title.length < MINIMUM_MISSION_NAME_LENGTH;

  const handlePressNext = (): void => {
    onConfirm(title);
    onPressNext();
  };

  return (
    <>
      <CommonLayout.Body>
        <PageTitle title={t('title.new_mission_title')} />
        <PageContent>
          <Input
            onChangeText={setTitle}
            placeholder={t('placeholder.enter_name')}
          />
          <AnimatePresence exitBeforeEnter>
            {showErrorMessage ? null : (
              <MotiView
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                exitTransition={{ type: 'timing', duration: 200 }}
                from={{ scale: 0, opacity: 0 }}
              >
                <ErrorText>{t('message.name_too_long')}</ErrorText>
              </MotiView>
            )}
          </AnimatePresence>
          <DescriptionText>
            {t('message.create_mission_description')}
          </DescriptionText>
        </PageContent>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          accessibilityHint={ACCESSIBILITY.next}
          accessibilityLabel={ACCESSIBILITY.next}
          color={userColor}
          disableLongPress
          disabled={!isValidQuestName}
          onPress={handlePressNext}
        >
          {t('label.next')}
        </Button>
      </CommonLayout.Footer>
    </>
  );
}
