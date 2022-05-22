import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import * as Styled from './styles';

export function Home() {
  const navigation = useNavigation<any>()
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }

  function handleCarDetails() {
    navigation.navigate('CarDetails')
  }

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
    <Styled.CarList
      data={[1, 2, 3, 4, 5, 6, 7]}
      keyExtractor={item => String(item)}
      renderItem={({ item }) => 
        <Car data={carData} onPress={handleCarDetails} />
      }
    />
      
    </Styled.Container>
  );
}