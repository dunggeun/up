import { Dimensions } from 'react-native';
import { version } from '../../package.json';

export const VERSION = version;

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

const window = Dimensions.get('window');
export const WINDOW_WIDTH = window.width;
export const WINDOW_HEIGHT = window.height;

export const BASE_EXP = 3;
