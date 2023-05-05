import React, { memo } from 'react';
import dayjs from 'dayjs';
import { styled, View, Image } from 'dripsy';
import { TouchableOpacity } from 'react-native';
import { AnimatedNumber, Section } from 'src/components';
import { H1, H2 } from 'src/designs';
import { useAchieveCount } from 'src/features/quests/hooks';
import * as AppHelpers from 'src/modules/app/helpers';
import { BORDER_WIDTH } from 'src/constants';
import { t } from 'src/translations';
import { Edit } from 'src/assets/icons';

import type { User } from '../../types';

export interface UserSectionProps {
  user: User;
  onPressEdit: () => void;
}

const ANIMATED_NUMBER_DELAY = 250;

const Row = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$03',
});

const PressableRow = styled(TouchableOpacity)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$03',
});

const Badge = styled(View)({
  width: 30,
  height: 30,
  padding: '$01',
  borderRadius: '$md',
  borderWidth: BORDER_WIDTH,
  borderColor: '$border',
  backgroundColor: '$secondary_2',
});

const BadgeImage = styled(Image)({
  width: '100%',
  height: '100%',
});

const EditIcon = styled(Edit)({
  color: '$text_primary',
});

export const UserSection = memo(function UserSection({
  user,
  onPressEdit,
}: UserSectionProps): JSX.Element {
  const { data: totalAchieveCount = 0 } = useAchieveCount({ suspense: true });
  const badge = AppHelpers.getBadge(user.badge);

  return (
    <Section center>
      <PressableRow accessibilityRole="button" onPress={onPressEdit}>
        <Badge>
          {badge.image ? <BadgeImage source={badge.image} /> : null}
        </Badge>
        <H1 variant="primary">
          Lv.{user.level} {user.name}
        </H1>
        <EditIcon />
      </PressableRow>
      {badge.title ? (
        <Row>
          <H2 variant="secondary">{`(${badge.title})`}</H2>
        </Row>
      ) : null}
      <Row sx={{ marginTop: '$05' }}>
        <H2 variant="primary">{t('label.total_achieve')}</H2>
        <AnimatedNumber
          delay={ANIMATED_NUMBER_DELAY}
          value={totalAchieveCount}
          variant="secondary"
        />
      </Row>
      <Row>
        <H2 variant="primary">{t('label.total_exp')}</H2>
        <AnimatedNumber
          delay={ANIMATED_NUMBER_DELAY}
          value={user.totalExp}
          variant="secondary"
        />
      </Row>
      <Row>
        <H2 variant="primary">{t('label.joined_date')}</H2>
        <H2 variant="secondary">
          {dayjs(user.createdAt).format(t('format.date'))}
        </H2>
      </Row>
    </Section>
  );
});
