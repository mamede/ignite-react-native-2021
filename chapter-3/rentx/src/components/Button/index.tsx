import React from 'react';

import * as Styled from './styles';

interface Props {
  title: string;
  color?: string;
}

export function Button({
  title,
  color,
  ...rest
}: Props){

  return (
    <Styled.Container color={color} {...rest}>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Container>
  );
}