import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components';


import * as Styled from './styles';

interface Props extends TouchableOpacityProps {
  color?: string;
}

export function BackButton({ color }: Props){
  const theme = useTheme();

  return (
    <Styled.Container>
      <MaterialIcons 
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Styled.Container>
  );
}