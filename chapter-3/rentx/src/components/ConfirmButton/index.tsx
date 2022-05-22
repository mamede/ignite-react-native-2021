import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as Styled from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
}

export function ConfirmButton({ 
  title, 
  onPress,
}: Props){
  return (
    <Styled.Container onPress={onPress}>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Container>
  );
}