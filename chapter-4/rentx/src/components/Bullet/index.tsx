import React from 'react';
import * as Styled from './styles';

interface Props {
  active?: boolean;
}

export function Bullet({ active = false }: Props){
  return (
    <Styled.Container active={active} />
  );
}