import React from 'react';
import { CommonLayout, Button, Input } from 'src/designs';
import { PageTitle, PageContent } from 'src/components';
import { t } from 'src/translations';
import type { colors } from 'src/themes/colors';

export interface EnterTitleProps {
  userColor: keyof typeof colors;
  nextButtonDisabled: boolean;
  onChangeTitle: (text: string) => void;
  onPressNext: () => void;
}

export function EnterTitle({
  userColor,
  nextButtonDisabled,
  onChangeTitle,
  onPressNext,
}: EnterTitleProps): JSX.Element {
  return (
    <>
      <CommonLayout.Body>
        <PageTitle title={t('title.new_quest_title')} />
        <PageContent>
          <Input
            onChangeText={onChangeTitle}
            placeholder={t('placeholder.enter_name')}
          />
        </PageContent>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          color={userColor}
          disableLongPress
          disabled={nextButtonDisabled}
          onPress={onPressNext}
        >
          {t('label.next')}
        </Button>
      </CommonLayout.Footer>
    </>
  );
}
