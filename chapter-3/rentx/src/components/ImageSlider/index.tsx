import React from 'react';
import { FlatList } from 'react-native';

import * as Styled from './styles';

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({imagesUrl}: Props){ 
  return (
    <Styled.Container>
      <Styled.ImageIndexes>
        <Styled.ImageIndex active={true} />
        <Styled.ImageIndex active={false} />
        <Styled.ImageIndex active={true} />
        <Styled.ImageIndex active={false} />
      </Styled.ImageIndexes>
      
      <Styled.CarImageWrapper>
        <Styled.CarImage 
          source={{ 
            uri: imagesUrl[0]
          }}
          resizeMode="contain"
        />
      </Styled.CarImageWrapper>
    </Styled.Container>
  );
}