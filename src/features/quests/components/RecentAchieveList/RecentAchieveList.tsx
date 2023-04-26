import React from 'react';
import dayjs from 'dayjs';
import { styled, View } from 'dripsy';
import { ListItem } from 'src/components';
import { t } from 'src/translations';
import { H3 } from 'src/designs';
import { useRecentAchieves } from '../../hooks';

const DELAY = 80;

const AchieveList = styled(View)({
  marginBottom: '$04',
});

const EmptyView = styled(H3, {
  defaultVariant: 'text.secondary',
})({
  width: '100%',
  marginTop: '20%',
  textAlign: 'center',
});

export function RecentAchieveList(): JSX.Element {
  const { data: achieves } = useRecentAchieves({ suspense: true });

  const renderItems = (): JSX.Element | JSX.Element[] => {
    return achieves?.length ? (
      achieves.map(
        ({ id, quest_name: questName, created_at: createdAt }, index) => (
          <ListItem
            animate
            animateDelay={DELAY * index}
            key={id}
            label={questName}
            subLabel={dayjs(createdAt).format(t('format.date'))}
          />
        ),
      )
    ) : (
      <EmptyView>{t('message.empty_achieve')}</EmptyView>
    );
  };

  return <AchieveList>{renderItems()}</AchieveList>;
}
