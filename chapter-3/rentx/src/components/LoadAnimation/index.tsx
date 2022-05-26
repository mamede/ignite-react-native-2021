import React from 'react';
import LottieView from 'lottie-react-native';

import carAnimated from '../../assets/carAnimated.json';

import * as Styled from './styles';

export function LoadAnimation(){
  return (
    <Styled.Container>
      <LottieView
        source={carAnimated}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Styled.Container>
  );
}