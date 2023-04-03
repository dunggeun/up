import React, { memo } from 'react';
import { styled, useSx } from 'dripsy';
// eslint-disable-next-line import/no-named-as-default
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import { t } from 'src/translations';
import { useRecentAchieves } from 'src/features/quests/hooks';
import { getExpByLevel } from 'src/modules/app/helpers';
import { AppManager } from 'src/modules';
import { Text } from 'src/designs';
import { useUserThemeColor } from '../../hooks';
import { getPageSource } from './contents';

import type { User } from '../../types';
import type { CoverGenerateConfig, WebViewMessage } from './types';

interface UserCoverProps {
  user: User;
  onGenerated?: (dataUrl: string) => void;
}

export interface UserCoverRef {
  requestCoverImage: (config: CoverGenerateConfig) => void
}

// 정사각형 이미지 생성을 위해 같은 크기로 지정
const StyledWebView = styled(WebView)({
  width: 1,
  height: 1,
});

const ErrorToastContent = <Text variant="primary">{t('message.error.common')}</Text>;

export const UserCover = memo(function UserCover (
  { user, onGenerated }: UserCoverProps,
): JSX.Element | null {
  const { data } = useRecentAchieves({ suspense: true });
  const userColor = useUserThemeColor();
  const sx = useSx();
  const { color } = sx({ color: userColor }) as { color: string };
  const recentQuestTitle = (data ?? [])[0]?.quest_name ?? '-';

  const handleMessage = (event: WebViewMessageEvent): void => {
    try {
      const response = JSON.parse(event.nativeEvent.data) as WebViewMessage;
      if (response.type === 'success') {
        onGenerated?.(response.data);
      } else {
        throw new Error(response.data || 'unknown');
      }
    } catch (_error) {
      AppManager.showToast(ErrorToastContent);
    }
  };

  return (
    <StyledWebView
      automaticallyAdjustContentInsets={false}
      contentMode="mobile"
      onMessage={handleMessage}
      originWhitelist={['*']}
      source={{
        html: getPageSource({
          color,
          user: {
            ...user,
            totalExp: getExpByLevel(user.level),
          },
          recentQuestTitle,
          labels: {
            recentAchieve: t('template.share_status.recent_achieve'),
          },
        }),
      }}
    />
  );
});
