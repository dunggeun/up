import * as Sentry from '@sentry/react';
import { SENTRY_RELEASE, SENTRY_SAMPLE_RATE } from 'src/constants';
import type { CaptureException } from './types';

// react-native-web.config.js 에서 정의하고 있음
declare const WEB_SENTRY_DSN: string;

Sentry.init({
  environment: __DEV__ ? 'development' : 'production',
  release: SENTRY_RELEASE,
  // storybook 환경에서 WEB_SENTRY_DSN 가 정의되지 않은 상태이기에 typeof 로 가드
  dsn: typeof WEB_SENTRY_DSN === 'string' ? WEB_SENTRY_DSN : '',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: SENTRY_SAMPLE_RATE,
});

export const captureSentryException: CaptureException = (error) => {
  Sentry.captureException(error);
};
