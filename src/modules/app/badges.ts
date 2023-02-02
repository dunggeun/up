import { t } from 'src/translations';
import dummy from 'src/assets/badges/dummy.png';

export const BADGE_SET = [
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
  [t('badge.0'), dummy],
] as const;

export const FALLBACK_BADGE = ['', dummy] as const;
