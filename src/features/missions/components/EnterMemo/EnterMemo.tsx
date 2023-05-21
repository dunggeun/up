import React from 'react';
import { styled } from 'dripsy';
import { MAXIMUM_MISSION_MEMO_LENGTH } from 'src/constants';
import { CommonLayout, Button, Input, H2, Text } from 'src/designs';
import { PageTitle, PageContent } from 'src/components';
import { t } from 'src/translations';
import type { colors } from 'src/themes/colors';

export interface EnterMemoProps {
  missionName: string;
  userColor: keyof typeof colors;
  onChangeMemo: (text: string) => void;
  onPressAccept: () => void;
}

const MEMO_INPUT_HEIGHT = 200;
const ACCESSIBILITY = {
  ok: t('label.ok'),
};

const MemoInput = styled(Input)({
  height: MEMO_INPUT_HEIGHT,
});

const WarningText = styled(Text, {
  defaultVariant: 'text.secondary',
})({
  padding: '$04',
  textAlign: 'center',
});

export function EnterMemo({
  missionName,
  userColor,
  onChangeMemo,
  onPressAccept,
}: EnterMemoProps): React.ReactElement {
  return (
    <>
      <CommonLayout.Body>
        <PageTitle title={t('title.new_mission_memo')} />
        <PageContent>
          <H2 variant="primary">{missionName}</H2>
          <MemoInput
            maxLength={MAXIMUM_MISSION_MEMO_LENGTH}
            multiline
            onChangeText={onChangeMemo}
            placeholder={t('placeholder.enter_memo')}
          />
        </PageContent>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <WarningText>{t('message.mission_warning')}</WarningText>
        <Button
          accessibilityHint={ACCESSIBILITY.ok}
          accessibilityLabel={ACCESSIBILITY.ok}
          color={userColor}
          onLongPress={onPressAccept}
        >
          {t('label.accept_mission')}
        </Button>
      </CommonLayout.Footer>
    </>
  );
}
