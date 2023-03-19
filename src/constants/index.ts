import { Dimensions } from 'react-native';
import { version, dependencies } from '../../package.json';

export const VERSION = version;
export const DEPENDENCIES = dependencies;

export const APP_MINIMUM_LOADING_DURATION = 1000;

export const CONTAINER_MAX_WIDTH = 600;
export const APP_BAR_HEIGHT = 56;

export const LANDING_LOGO_SIZE = 180;
export const LANDING_LOGO_MARGIN = 100;

export const HIT_SLOP = 5;
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

export const RECENT_ACHIEVE_LIMIT = 10;

const window = Dimensions.get('window');
export const WINDOW_WIDTH = window.width;
export const WINDOW_HEIGHT = window.height;

export const DEVELOPER_EMAIL = 'dev.ghlee@gmail.com';
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
