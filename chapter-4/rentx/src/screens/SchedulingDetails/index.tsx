import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import * as Styled from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { format } from 'date-fns';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  
  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    setLoading(true)
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post('schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate:  format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates,
      start_date: new Date(),
      end_date: new Date(),
      total: rentTotal
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
        title: 'Carro alugado!',
        message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
      })
    })
    .catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    })
  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end:  format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  },[])

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
            <Accessory 
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))
        }
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
            <Styled.DateValue>{rentalPeriod.start}</Styled.DateValue>
          </Styled.DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(20)}
            color={theme.colors.text}
          />

          <Styled.DateInfo>
            <Styled.DateTitle>ATÉ</Styled.DateTitle>
            <Styled.DateValue>{rentalPeriod.end}</Styled.DateValue>
          </Styled.DateInfo>
        </Styled.RentalPeriod>

        <Styled.RentalPrice>
          <Styled.RentalPriceLabel>TOTAL</Styled.RentalPriceLabel>
          <Styled.RentalPriceDetails>
            <Styled.RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</Styled.RentalPriceQuota>
            <Styled.RentalPriceTotal>R$ {rentTotal}</Styled.RentalPriceTotal>
          </Styled.RentalPriceDetails>
        </Styled.RentalPrice>
      </Styled.Content>

      <Styled.Footer>
        <Button 
          title="Alugar agora" 
          color={theme.colors.success} 
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Styled.Footer>
    </Styled.Container> 
  );
}