import React from 'react';
import { useTheme } from 'styled-components'
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';

import ArrowSvg from '../../assets/arrow.svg'

import * as Styled from './styles';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling(){
  const theme = useTheme();
  return (
    <Styled.Container>
      <Styled.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton 
          onPress={() => {}} 
          color={theme.colors.shape}
        />

        <Styled.Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Styled.Title>

        <Styled.RentalPeriod>
          <Styled.DateInfo>
            <Styled.DateTitle>DE</Styled.DateTitle>
            <Styled.DateValue selected={false}>
            </Styled.DateValue>
          </Styled.DateInfo>

          <ArrowSvg />

          <Styled.DateInfo>
            <Styled.DateTitle>ATÉ</Styled.DateTitle>
            <Styled.DateValue selected={true}>
            22/05/2022
            </Styled.DateValue>
          </Styled.DateInfo>
        </Styled.RentalPeriod>
      </Styled.Header>
      <Styled.Content>
        <Calendar />
      </Styled.Content>
      <Styled.Footer>
        <Button 
          title="Confirmar" 
        />
      </Styled.Footer>
    </Styled.Container>
  );
}