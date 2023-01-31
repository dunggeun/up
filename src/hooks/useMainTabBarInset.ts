import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDripsyTheme } from 'dripsy';
import { TAB_BAR_HEIGHT } from 'src/components';

export function useMainTabBarInset (): { bottomInset: number } {
  const { bottom } = useSafeAreaInsets();
  const { theme } = useDripsyTheme();
  const bottomInset = (bottom || theme.space.$04) + theme.space.$04 + TAB_BAR_HEIGHT;

  return { bottomInset };
}
