import type { ImageSourcePropType } from 'react-native';
import type { basicColors } from 'src/themes/colors';

export interface Badge {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType | null;
}

export interface Theme {
  id: number;
  key: keyof typeof basicColors;
}
