import React, { memo } from 'react';
// eslint-disable-next-line import/no-named-as-default
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import { styled, useSx } from 'dripsy';
import dayjs from 'dayjs';
import { getExpByLevel } from 'src/modules/app/helpers';
import { AppManager } from 'src/modules/app';
import { t } from 'src/translations';
import { Logger } from 'src/modules/logger';
import { useUserThemeColor } from '../../hooks';
import { getPageSource } from './contents';

import type { User } from '../../types';
import type { CoverGenerateConfig, WebViewMessage } from './types';

interface UserCoverWebViewProps {
  user: User;
  onGenerated?: (dataUrl: string) => void;
}

export interface UserCoverRef {
  requestCoverImage: (config: CoverGenerateConfig) => void;
}

const TAG = 'UserCoverWebView';

// 정사각형 이미지 생성을 위해 같은 크기로 지정
const StyledWebView = styled(WebView)({
  width: 1,
  height: 1,
});

export const UserCoverWebView = memo(function UserCover({
  user,
  onGenerated,
}: UserCoverWebViewProps): JSX.Element | null {
  const sx = useSx();
  const userColor = useUserThemeColor();
  const { color } = sx({ color: userColor }) as { color: string };

  const handleMessage = (event: WebViewMessageEvent): void => {
    try {
      Logger.info(TAG, 'handleMessage');
      const response = JSON.parse(event.nativeEvent.data) as WebViewMessage;
      if (response.type === 'success') {
        onGenerated?.(response.data);
        Logger.success(TAG, 'generated!');
      } else {
        throw new Error(response.data || 'unknown');
      }
    } catch (error) {
      AppManager.showToast(t('message.error.common'));
      Logger.error(TAG, `handleMessage - ${(error as Error).message}`);
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
          date: dayjs().format(t('format.date')),
          labels: {
            recentAchieve: t('template.share_status.recent_achieve'),
          },
        }),
      }}
    />
  );
});
