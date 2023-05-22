import React, { memo, useState } from 'react';
import type { ImageSourcePropType, LayoutChangeEvent } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { View, styled, Image } from 'dripsy';
import EnGuide1 from 'src/assets/images/en_guide_1.jpg';
import EnGuide2 from 'src/assets/images/en_guide_2.jpg';
import EnGuide3 from 'src/assets/images/en_guide_3.jpg';
import EnGuide4 from 'src/assets/images/en_guide_4.jpg';
import EnGuide5 from 'src/assets/images/en_guide_5.jpg';
import EnGuide6 from 'src/assets/images/en_guide_6.jpg';
import EnGuide7 from 'src/assets/images/en_guide_7.jpg';
import KoGuide1 from 'src/assets/images/ko_guide_1.jpg';
import KoGuide2 from 'src/assets/images/ko_guide_2.jpg';
import KoGuide3 from 'src/assets/images/ko_guide_3.jpg';
import KoGuide4 from 'src/assets/images/ko_guide_4.jpg';
import KoGuide5 from 'src/assets/images/ko_guide_5.jpg';
import KoGuide6 from 'src/assets/images/ko_guide_6.jpg';
import KoGuide7 from 'src/assets/images/ko_guide_7.jpg';
import { getCurrentLocale } from 'src/utils';
import { Text } from 'src/designs';
import { Modal, type ModalProps } from 'src/components';
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
})({ textAlign: 'center' });

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
  height: undefined,
  overflow: 'hidden',
});

const isKorean = getCurrentLocale() === 'ko';
const KOREAN_GUIDE_IMAGES = [
  KoGuide1,
  KoGuide2,
  KoGuide3,
  KoGuide4,
  KoGuide5,
  KoGuide6,
  KoGuide7,
];
const GUIDE_DATA = [
  { image: EnGuide1, text: t('message.guide.1') },
  { image: EnGuide2, text: t('message.guide.2') },
  { image: EnGuide3, text: t('message.guide.3') },
  { image: EnGuide4, text: t('message.guide.4') },
  { image: EnGuide5, text: t('message.guide.5') },
  { image: EnGuide6, text: t('message.guide.6') },
  { image: EnGuide7, text: t('message.guide.7') },
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
    <Modal {...props}>
      <Content onLayout={handleLayout} testID="guide-modal">
        {width === 0 ? null : (
          <Carousel
            data={GUIDE_DATA}
            height={300}
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
