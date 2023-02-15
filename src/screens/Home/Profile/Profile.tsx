import React, {
  memo,
  useState,
  useMemo,
  useLayoutEffect
} from 'react';
import { styled, View, Image } from 'dripsy';
import { H1, Text, ProgressBar } from 'src/designs';
import { useUserThemeColor } from 'src/hooks';
import * as AppHelpers from 'src/modules/app/helpers';

import type { User } from 'src/types';

interface ProfileProps {
  user: User;
}

const BADGE_BORDER_WIDTH = 2;

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

export const Profile = memo(function Profile ({ user }: ProfileProps): JSX.Element {
  const userColor = useUserThemeColor();
  const [requiredExp, setRequiredExp] = useState(0);
  const { title: badgeTitle, image: badgeImage } = AppHelpers.getBadge(user.badge);

  useLayoutEffect(() => {
    setRequiredExp(AppHelpers.getExpByLevel(user.level));
  }, [user.level]);

  const percent = useMemo(
    () => (user.currentExp / requiredExp * 100).toFixed(1),
    [user.currentExp, requiredExp]
  );

  return (
    <Container>
      <InformationSection>
        <Badge>
          <BadgeImage source={badgeImage} />
        </Badge>
        <H1 variant="primary">Lv.{user.level} {user.name}</H1>
        <Text variant="secondary">{badgeTitle}</Text>
      </InformationSection>
      <ProgressSection>
        <LevelProgress color={userColor} max={requiredExp} value={user.currentExp} />
        <Text variant="tertiary">{`${percent}% (${user.currentExp}/${requiredExp})`}</Text>
      </ProgressSection>
    </Container>
  );
});
