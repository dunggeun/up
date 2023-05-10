import { REACT_NATIVE_SENTRY_DSN, STORYBOOK } from 'react-native-dotenv';
import * as Sentry from '@sentry/react-native';
import { SENTRY_RELEASE, SENTRY_SAMPLE_RATE } from 'src/constants';
import type { CaptureException } from './types';

const isApplication = STORYBOOK !== '1';

Sentry.init({
  enabled: isApplication,
  enableNative: isApplication,
  environment: __DEV__ ? 'development' : 'production',
  release: SENTRY_RELEASE,
  dsn: REACT_NATIVE_SENTRY_DSN,
  tracesSampleRate: SENTRY_SAMPLE_RATE,
});

export const captureSentryException: CaptureException = (error) => {
  Sentry.captureException(error);
};
