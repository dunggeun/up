import type { basicColors } from 'src/themes/colors';
import type { ImageSourcePropType } from 'react-native';

export interface Badge {
  id: number;
  title: string;
  image: ImageSourcePropType | null;
};

export interface Theme {
  id: number;
  key: keyof typeof basicColors;
}
