import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import * as Styled from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function SchedulingComplete(){
  const { width } = useWindowDimensions();

  return (
    <Styled.Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      
      <LogoSvg width={width} />

      <Styled.Content>
        <DoneSvg width={80} height={80}/>
        <Styled.Title>Carro Alugado!</Styled.Title>

        <Styled.Message>
          Agora você só precisa ir {'\n'}
          até a concessionaria da RENTX {'\n'}
          pegar o seu automóvel.
        </Styled.Message>
      </Styled.Content>

      <Styled.Footer>
        <ConfirmButton title="OK" onPress={() => {}} />
      </Styled.Footer>
    </Styled.Container>
  );
}