import React from 'react';
import { TextInputProps } from 'react-native';

import * as Styled from './styles';

interface Props extends TextInputProps {
  active?: boolean;  
};

export function Input({ active = false, ...rest } : Props){
  return(
    <Styled.Container style={[ {flex: 1}]} active={active} {...rest} />
  );
}