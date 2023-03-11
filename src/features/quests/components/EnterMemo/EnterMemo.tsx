import React from 'react';
import { styled } from 'dripsy';
import { CommonLayout, Button, Input, H2 } from 'src/designs';
import { PageTitle, PageContent } from 'src/components';
import { t } from 'src/translations';
import type { colors } from 'src/themes/colors';

const MEMO_INPUT_HEIGHT = 200;

export interface EnterMemoProps {
  questName: string;
  userColor: keyof typeof colors;
  onChangeMemo: (text: string) => void;
  onPressAccept: () => void;
}

const MemoInput = styled(Input)({
  height: MEMO_INPUT_HEIGHT,
});

export function EnterMemo ({
  questName,
  userColor,
  onChangeMemo,
  onPressAccept
}: EnterMemoProps): JSX.Element {
  return (
    <>
      <CommonLayout.Body>
        <PageTitle title={t('title.new_quest_memo')} />
        <PageContent>
          <H2 variant="primary">{questName}</H2>
          <MemoInput
            multiline
            onChangeText={onChangeMemo}
            placeholder={t('placeholder.enter_memo')}
          />
        </PageContent>
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button color={userColor} onLongPress={onPressAccept}>
          {t('label.accept_quest')}
        </Button>
      </CommonLayout.Footer>
    </>
  );
}