import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg'
import accelerationSvg from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

import * as Styled from './styles';

export function SchedulingDetails(){
  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleConfirmRental() {
    navigation.navigate('SchedulingComplete')
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
          imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </Styled.CarImages>

      <Styled.Content>
        <Styled.Details>
          <Styled.Description>
            <Styled.Brand>Lamborghini</Styled.Brand>
            <Styled.Name>Huracan</Styled.Name>
          </Styled.Description>

          <Styled.Rent>
            <Styled.Period>Ao dia</Styled.Period>
            <Styled.Price>R$ 580</Styled.Price>
          </Styled.Rent>
        </Styled.Details>

        <Styled.Accessories>
        <Accessory name="380Km/h" icon={speedSvg} />
            <Accessory name="3.2s" icon={accelerationSvg} />
            <Accessory name="800 HP" icon={forceSvg} />
            <Accessory name="Gasolina" icon={gasolineSvg} />
            <Accessory name="Auto" icon={exchangeSvg} />
            <Accessory name="2 pessoas" icon={peopleSvg} />
        </Styled.Accessories>

        <Styled.RentalPeriod>
          <Styled.CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </Styled.CalendarIcon>

          <Styled.DateInfo>
            <Styled.DateTitle>DE</Styled.DateTitle>
            <Styled.DateValue>22/05/2022</Styled.DateValue>
          </Styled.DateInfo>

          <Feather 
              name="chevron-right"
              size={RFValue(20)}
              color={theme.colors.text}
          />

          <Styled.DateInfo>
            <Styled.DateTitle>ATÉ</Styled.DateTitle>
            <Styled.DateValue>28/05/2022</Styled.DateValue>
          </Styled.DateInfo>
        </Styled.RentalPeriod>

        <Styled.RentalPrice>
          <Styled.RentalPriceLabel>TOTAL</Styled.RentalPriceLabel>
          <Styled.RentalPriceDetails>
            <Styled.RentalPriceQuota>{`R$ 580 x10 diárias`}</Styled.RentalPriceQuota>
            <Styled.RentalPriceTotal>R$ 5.800</Styled.RentalPriceTotal>
          </Styled.RentalPriceDetails>
        </Styled.RentalPrice>
      </Styled.Content>

      <Styled.Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
        />
      </Styled.Footer>
    </Styled.Container> 
  );
}