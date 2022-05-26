import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import * as Styled from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation<any>()
  const route = useRoute();
  const { car } = route.params as Params;

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }
  
  function handleBack(){
    navigation.goBack();
  }

  return (
    <Styled.Container>
      <Styled.Header>
        <BackButton onPress={handleBack} />
      </Styled.Header>

      <Styled.CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </Styled.CarImages>

      <Styled.Content>
        <Styled.Details>
            <Styled.Description>
              <Styled.Brand>{car.brand}</Styled.Brand>
              <Styled.Name>{car.name}</Styled.Name>
            </Styled.Description>

            <Styled.Rent>
              <Styled.Period>{car.rent.period}</Styled.Period>
              <Styled.Price>R$ {car.rent.price}</Styled.Price>
            </Styled.Rent>
          </Styled.Details>

          <Styled.Accessories>
            {
              car.accessories.map(accessory => (
                <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
              ))
            }
          </Styled.Accessories>

          <Styled.About>{car.about}</Styled.About>
      </Styled.Content>

      <Styled.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Styled.Footer>
    </Styled.Container>
  );
}