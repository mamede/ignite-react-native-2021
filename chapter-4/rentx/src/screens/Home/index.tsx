import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import * as Styled from './styles';
import { useAuth } from '../../hooks/auth';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>()
  
  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car })
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }

    fetchCars();
    return () => {
      isMounted = false;
    };
   
  },[]);

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

         {!loading && 
          <Styled.TotalCars>
            Total de {cars.length} carros
          </Styled.TotalCars>
         }
        </Styled.HeaderContent>
      </Styled.Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <Styled.CarList
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => 
          <Car data={item} onPress={() => handleCarDetails(item)} />
          }
        />
      )}

    </Styled.Container>
  );
}