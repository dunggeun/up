import React, { memo } from 'react';
import { styled, useSx, View } from 'dripsy';
import { Section } from 'src/components';
import { Button } from 'src/designs';
import { AppManager } from 'src/modules';
import { t } from 'src/translations';

import type { Theme } from 'src/modules/app/types';

export interface ThemeSectionProps {
  onPressBadge: (themeId: number) => void;
}

const THEMES_PER_COUNT = 5;

const Rows = styled(View)({
  gap: '$04',
});

const Row = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '$02',
});

const buttonContainerStyle = {
  width: 50,
  height: 45,
};

export const ThemeSection = memo(function ThemeSection ({
  onPressBadge,
}: ThemeSectionProps): JSX.Element {
  const sx = useSx();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const overridingButtonStyle = sx({
    paddingX: '$01',
    paddingY: '$01',
  });

  const getThemes = (): Theme[][] => {
    let row: Theme[] = [];
    const colors: Theme[][] = [];
    const themeColors = AppManager.getThemeKeys();
  
    for (let i = 0; i < themeColors.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const currentTheme = themeColors[i]!;
      if (i % THEMES_PER_COUNT === 0) {
        row = [currentTheme];
        colors.push(row);
      } else {
        row.push(currentTheme);
      }
    }

    return colors;
  };

  const fillEmpty = (count: number): JSX.Element[] | null => {
    if (count <= 0) return null;
    return new Array(count)
      .fill(null)
      // eslint-disable-next-line react/no-array-index-key
      .map((_, index) => (<View key={`empty${index}`} sx={buttonContainerStyle} />));
  };

  return (
    <Section title={t('label.theme')}>
      <Rows>
        {getThemes().map((themeRow, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Row key={index}>
            {themeRow.map((theme) => (
              <Button
                color={theme.key}
                containerStyle={buttonContainerStyle}
                disableLongPress
                key={theme.id}
                onPress={(): void => onPressBadge(theme.id)}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                style={overridingButtonStyle}
              />
            ))}
            {fillEmpty(THEMES_PER_COUNT - themeRow.length)}
          </Row>
        ))}
      </Rows>
    </Section>
  );
});
