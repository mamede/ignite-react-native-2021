import React, { useRef, useState } from 'react';
import { FlatList, ViewToken  } from 'react-native';
import { Bullet } from '../Bullet';

import * as Styled from './styles';

interface Props {
  imagesUrl: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) { 
  const [imageIndex, setImageIndex] = useState<number | null>(0); 

  const indexChanged = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index;
    setImageIndex(index);
  });

  return (
    <Styled.Container>
      <Styled.ImageIndexes>
      {
          imagesUrl.map((item, index) => (
            <Bullet 
              key={String(item)}
              active={index === imageIndex} 
            />
          ))
        }
      </Styled.ImageIndexes>
      
      <Styled.CarImageWrapper>
      <FlatList
        data={imagesUrl}
        keyExtractor={key => key}
        renderItem={({ item }) => (
          <Styled.CarImageWrapper>
            <Styled.CarImage 
              source={{ 
                uri: item
              }}
              resizeMode="contain"
            />
          </Styled.CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
      </Styled.CarImageWrapper>
    </Styled.Container>
  );
}