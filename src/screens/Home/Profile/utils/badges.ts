import { t } from 'src/translations';
import dummy from 'src/assets/badges/dummy.png';

import type { ImageSourcePropType } from 'react-native';

const BADGE_SET = [[t('badge.0'), dummy]] as const;
const FALLBACK_BADGE = ['', dummy] as const;

export const getBadge = (id: number): { title: string, image: ImageSourcePropType } => {
  const badge = BADGE_SET[id];
  const [title, image] = badge ?? FALLBACK_BADGE;
  return { title, image };
};
