import React from 'react';
import { styled, View, Image } from 'dripsy';
import { H1, Text, ProgressBar } from 'src/designs';
import { getBadge } from './utils';

import type { User } from 'src/types';

interface ProfileProps {
  user: User;
}

const BADGE_BORDER_WIDTH = 2;

// @todo: 삭제 후 실제 데이터로 변경
const MAX = 135;

const Container = styled(View)({
  width: '100%',
  flexDirection: 'column',
  gap: '$02',
});

const InformationSection = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$03',
});

const ProgressSection = styled(View)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-end',
  gap: '$01',
});

const Badge = styled(View)({
  width: 30,
  height: 30,
  padding: '$01',
  borderRadius: '$md',
  borderWidth: BADGE_BORDER_WIDTH,
  borderColor: '$text_primary',
  backgroundColor: '$secondary_2',
});

const BadgeImage = styled(Image)({
  width: '100%',
  height: '100%',
});

const LevelProgress = styled(ProgressBar)({
  width: '100%',
});

export function Profile ({ user }: ProfileProps): JSX.Element {
  const percent = (user.exp / MAX * 100).toFixed(1);
  const { title: badgeTitle, image: badgeImage } = getBadge(user.badge);

  return (
    <Container>
      <InformationSection>
        <Badge>
          <BadgeImage source={badgeImage} />
        </Badge>
        <H1 variant="primary">Lv.30 {user.name}</H1>
        <Text variant="secondary">{badgeTitle}</Text>
      </InformationSection>
      <ProgressSection>
        <LevelProgress color="$brand" max={MAX} value={user.exp} />
        <Text variant="tertiary">{`${percent}% (${user.exp}/${MAX})`}</Text>
      </ProgressSection>
    </Container>
  );
}
