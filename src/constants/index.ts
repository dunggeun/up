import { Dimensions, Platform } from 'react-native';
import { version, dependencies } from '../../package.json';

export const VERSION = version;
export const DEPENDENCIES = dependencies;

export const APP_MINIMUM_LOADING_DURATION = 1000;

export const CONTAINER_MAX_WIDTH = 600;
export const APP_BAR_HEIGHT = 56;

export const LANDING_LOGO_SIZE = 180;
export const LANDING_LOGO_MARGIN = 100;

export const HIT_SLOP = 10;
export const TOUCHABLE_OPACITY_HIT_SLOP = {
  top: HIT_SLOP,
  bottom: HIT_SLOP,
  left: HIT_SLOP,
  right: HIT_SLOP,
} as const;

export const BORDER_WIDTH = 2;
export const PRESSABLE_DEPTH = 5;

export const TOAST_ANIMATION_DURATION = 500;
export const TOAST_DURATION = 3000;

const window = Dimensions.get('window');
export const WINDOW_WIDTH = window.width;
export const WINDOW_HEIGHT = window.height;

export const MINIMUM_USER_NAME_LENGTH = 2;
export const MINIMUM_MISSION_NAME_LENGTH = 2;
export const MAXIMUM_MISSION_NAME_LENGTH = 25;
export const MAXIMUM_MISSION_MEMO_LENGTH = 120;

export const REMINDER_TIME_FORMAT = 'HH:mm';
export const DEFAULT_REMINDER_TIME = '09:30';

export const DEVELOPER_EMAIL = 'support@geundung.dev';
export const UP_REPOSITORY_URL = 'https://github.com/dunggeun/up';

export const SHARED_CONFIG = {
  navigatorCardStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollableViewProps: {
    onStartShouldSetResponderCapture: () => false,
    onMoveShouldSetResponderCapture: () => false,
  },
} as const;

export const IS_NATIVE = Platform.OS === 'android' || Platform.OS === 'ios';
export const IS_WEB = Platform.OS === 'web';
export const USE_NATIVE_DRIVER = IS_NATIVE;

export const SENTRY_RELEASE = `up@${VERSION}${__DEV__ ? '-dev' : ''}`;
export const SENTRY_SAMPLE_RATE = __DEV__ ? 1.0 : 0.25;

export const ANDROID_NOTIFICATION_CHANNEL_ID = 'up-reminder';
