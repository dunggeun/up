import { useSelector } from '@xstate/react';
import { globalMachineService } from 'src/stores/machines';
import * as AppHelpers from 'src/modules/app/helpers';

import type { globalMachine } from 'src/stores/machines';
import type { StateFrom } from 'xstate';
import type { basicColors } from 'src/themes/colors';

const themeSelector = (
  state: StateFrom<typeof globalMachine>,
): number | undefined => state.context.user?.theme;

export const useUserThemeColor = (): keyof typeof basicColors => {
  const currentTheme = useSelector(globalMachineService, themeSelector);

  return AppHelpers.getTheme(currentTheme ?? 0).key;
};
