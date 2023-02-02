import React, { memo } from 'react';
import { styled, useSx, View, Image } from 'dripsy';
import { Section } from 'src/components';
import { Button } from 'src/designs';
import { AppManager } from 'src/modules';
import { t } from 'src/translations';

import type { Badge } from 'src/modules/app/types';

const BADGES_PER_COUNT = 5;

const Rows = styled(View)({
  gap: '$04',
});

const Row = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '$02',
});

const BadgeImage = styled(Image)({
  width: '100%',
  height: '100%',
});

const buttonContainerStyle = {
  width: 50,
  height: 45,
};

export const BadgeSection = memo(function BadgeSection (): JSX.Element {
  const sx = useSx();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const overridingButtonStyle = sx({
    paddingX: '$01',
    paddingY: '$01',
  });

  const getBadges = (): Badge[][] => {
    let row: Badge[] = [];
    const badges: Badge[][] = [];
    const badgeCount = AppManager.getTotalBadgeCount();
  
    for (let i = 0; i < badgeCount; i++) {
      const currentBadge = AppManager.getBadge(i);
      if (i % BADGES_PER_COUNT === 0) {
        row = [currentBadge];
        badges.push(row);
      } else {
        row.push(currentBadge);
      }
    }

    return badges;
  };

  const fillEmpty = (count: number): JSX.Element[] | null => {
    if (count <= 0) return null;
    return new Array(count)
      .fill(null)
      // eslint-disable-next-line react/no-array-index-key
      .map((_, index) => (<View key={`empty${index}`} sx={buttonContainerStyle} />));
  };

  return (
    <Section title={t('label.badge')}>
      <Rows>
        {getBadges().map((badgeRow, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Row key={index}>
            {badgeRow.map((badge) => (
              <Button
                color="$white"
                containerStyle={buttonContainerStyle}
                key={badge.title}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                style={overridingButtonStyle}
              >
                <BadgeImage source={badge.image} />
              </Button>
            ))}
            {fillEmpty(BADGES_PER_COUNT - badgeRow.length)}
          </Row>
        ))}
      </Rows>
    </Section>
  );
});

