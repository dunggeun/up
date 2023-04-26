import React, { memo } from 'react';
import { styled, useSx, View, Image } from 'dripsy';
import { Section } from 'src/components';
import { Button } from 'src/designs';
import * as AppHelpers from 'src/modules/app/helpers';
import { t } from 'src/translations';

import type { User } from '../../types';
import type { Badge } from 'src/modules/app/types';

export interface BadgeSectionProps {
  unlockedBadges: User['unlockedBadges'];
  onPressBadge: (badgeId: number) => void;
  onLongPressBadge: (badgeId: number) => void;
}

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

export const BadgeSection = memo(function BadgeSection({
  unlockedBadges,
  onPressBadge,
  onLongPressBadge,
}: BadgeSectionProps): JSX.Element {
  const sx = useSx();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const overridingButtonStyle = sx({
    paddingX: '$01',
    paddingY: '$01',
  });

  const getBadges = (): Badge[][] => {
    let row: Badge[] = [];
    const badges: Badge[][] = [];
    const totalBadges = AppHelpers.getBadges();

    for (let i = 0; i < totalBadges.length; i++) {
      const currentBadge = AppHelpers.getBadge(i);
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

      .map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`empty${index}`} sx={buttonContainerStyle} />
      ));
  };

  const isUnlocked = (id: number): boolean => {
    return Boolean(id === 0 || unlockedBadges[id]);
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
                disabled={!isUnlocked(badge.id)}
                key={badge.id}
                onLongPress={(): void => onLongPressBadge(badge.id)}
                onPress={(): void => onPressBadge(badge.id)}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                style={overridingButtonStyle}
              >
                {badge.image ? <BadgeImage source={badge.image} /> : null}
              </Button>
            ))}
            {fillEmpty(BADGES_PER_COUNT - badgeRow.length)}
          </Row>
        ))}
      </Rows>
    </Section>
  );
});
