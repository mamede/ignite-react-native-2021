import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as Styled from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export function ConfirmButton({ 
  title, 
  ...rest
}: Props){
  return (
    <Styled.Container {...rest}>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Container>
  );
}