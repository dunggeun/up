import React, { memo, useState } from 'react';
import type { ImageSourcePropType, LayoutChangeEvent } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { View, styled, Image } from 'dripsy';
import { ROOT_FONT_SIZE } from 'src/themes';
import { getCurrentLocale } from 'src/utils';
import { Text, Modal, type ModalProps } from 'src/designs';
import { Images } from 'src/assets';
import { t } from 'src/translations';

export type GuideModalProps = Omit<ModalProps, 'title'>;

interface CarouselItem {
  image: ImageSourcePropType;
  text: string;
}

const Content = styled(View)({
  gap: '$04',
});

const Description = styled(Text, {
  defaultVariant: 'text.primary',
})({ textAlign: 'center', lineHeight: ROOT_FONT_SIZE * 1.25 });

const GuideContent = styled(View)({
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '$02',
  gap: '$02',
});

const GuideImage = styled(Image)({
  flex: 1,
  width: '100%',
  overflow: 'hidden',
});

const isKorean = getCurrentLocale() === 'ko';
const KOREAN_GUIDE_IMAGES = [
  Images.KoGuide01,
  Images.KoGuide02,
  Images.KoGuide03,
  Images.KoGuide04,
  Images.KoGuide05,
  Images.KoGuide06,
  Images.KoGuide07,
];
const GUIDE_DATA = [
  { image: Images.EnGuide01, text: t('message.guide.1') },
  { image: Images.EnGuide02, text: t('message.guide.2') },
  { image: Images.EnGuide03, text: t('message.guide.3') },
  { image: Images.EnGuide04, text: t('message.guide.4') },
  { image: Images.EnGuide05, text: t('message.guide.5') },
  { image: Images.EnGuide06, text: t('message.guide.6') },
  { image: Images.EnGuide07, text: t('message.guide.7') },
].map((data, index) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  isKorean ? { ...data, image: KOREAN_GUIDE_IMAGES[index]! } : data,
);

export const GuideModal = memo(function GuideModal(
  props: GuideModalProps,
): React.ReactElement {
  const [width, setWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent): void => {
    setWidth(event.nativeEvent.layout.width);
  };

  const renderItem = ({
    item,
  }: {
    item: CarouselItem;
    index: number;
  }): React.ReactElement => (
    <GuideContent>
      <GuideImage resizeMode="contain" source={item.image} />
      <Description>{item.text}</Description>
    </GuideContent>
  );

  return (
    <Modal {...props} title={t('title.guide')}>
      <Content onLayout={handleLayout} testID="guide-modal">
        {width === 0 ? null : (
          <Carousel
            data={GUIDE_DATA}
            height={350}
            loop
            renderItem={renderItem}
            scrollAnimationDuration={1000}
            width={width}
          />
        )}
      </Content>
    </Modal>
  );
});
