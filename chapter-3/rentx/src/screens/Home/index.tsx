import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';

import * as Styled from './styles';

export function Home(){
  return (
    <Styled.Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Styled.Header>
        <Styled.HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
            />

          <Styled.TotalCars>
            Total de 12 carros
          </Styled.TotalCars>
        </Styled.HeaderContent>
      </Styled.Header>
    </Styled.Container>
  );
}