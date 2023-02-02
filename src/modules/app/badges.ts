import { t } from 'src/translations';
import dummy from 'src/assets/badges/dummy.png';

export const BADGE_SET = [
  [t('badge.0'), dummy],
  [t('badge.1'), dummy],
  [t('badge.2'), dummy],
  [t('badge.3'), dummy],
  [t('badge.4'), dummy],
  [t('badge.5'), dummy],
  [t('badge.6'), dummy],
  [t('badge.7'), dummy],
  [t('badge.8'), dummy],
  [t('badge.9'), dummy],
] as const;

export const FALLBACK_BADGE = ['', dummy] as const;
