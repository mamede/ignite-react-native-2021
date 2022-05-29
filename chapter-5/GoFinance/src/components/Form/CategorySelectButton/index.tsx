import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as Styled from './styles';

interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress,
  testID
}: Props){
  return(
    <Styled.Container onPress={onPress} testID={testID}>
      <Styled.Category>{title}</Styled.Category>
      <Styled.Icon name="chevron-down"/>
    </Styled.Container>
  )
}