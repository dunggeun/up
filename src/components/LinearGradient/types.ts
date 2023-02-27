import { type ViewStyle } from 'react-native';

export interface LinearGradientProps {
  color: string;
  direction: 'to-down' | 'to-up';
  style?: ViewStyle;
}
