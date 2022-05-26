import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';
import { parseISO, format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';

import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import * as Styled from './styles';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}
export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/schedules_byuser?user_id=1');   
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }

    fetchCars();
  },[]);

  return (
    <Styled.Container>
      <Styled.Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack} 
          color={theme.colors.shape}
        />

        <Styled.Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Styled.Title>

        <Styled.SubTitle>
          Conforto, segurança e praticidade.
        </Styled.SubTitle>
      </Styled.Header>
      { loading ? <LoadAnimation /> : (
        <Styled.Content>
          <Styled.Appointments>
            <Styled.AppointmentsTitle>Agendamentos feitos</Styled.AppointmentsTitle>
            <Styled.AppointmentsQuantity>{cars.length}</Styled.AppointmentsQuantity>
          </Styled.Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <Styled.CarWrapper>
                <Car data={item.car} />
                <Styled.CarFooter>
                  <Styled.CarFooterTitle>Período</Styled.CarFooterTitle>
                  <Styled.CarFooterPeriod>
                    <Styled.CarFooterDate>{item.startDate}</Styled.CarFooterDate>
                    <AntDesign 
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                      />
                    <Styled.CarFooterDate>{item.endDate}</Styled.CarFooterDate>
                  </Styled.CarFooterPeriod>
                </Styled.CarFooter>
              </Styled.CarWrapper>
            )}
            /> 
        </Styled.Content>
      )}
    </Styled.Container>
  );
}