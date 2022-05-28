import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { ConfirmButton } from '../../components/ConfirmButton';

import * as Styled from './styles';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation(){
  const { width } = useWindowDimensions();

  const navigation = useNavigation<any>();
  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;
  
  function handleConfirm() {
    navigation.navigate(nextScreenRoute)
  }
  
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
        <Styled.Title>{title}</Styled.Title>

        <Styled.Message>
         {message}
        </Styled.Message>
      </Styled.Content>

      <Styled.Footer>
        <ConfirmButton title="OK" onPress={handleConfirm} />
      </Styled.Footer>
    </Styled.Container>
  );
}