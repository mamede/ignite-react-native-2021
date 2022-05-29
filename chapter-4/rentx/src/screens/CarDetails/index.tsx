import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { api } from '../../services/api';
import * as Styled from './styles';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  carId: string;
}

export function CarDetails() {
  const navigation = useNavigation<any>()
  const route = useRoute();
  const { carId } = route.params as Params;

  const [car, setCar] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car })
  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchOnlineData() {
      const response = await api.get(`cars/${carId}`);
      setCar(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchOnlineData();
    }
  }, [netInfo.isConnected])

  return (
    <Styled.Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary}
        ]}
      >
        <Styled.Header>
          <BackButton onPress={handleBack} />
        </Styled.Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <Styled.CarImages>
            <ImageSlider
              imagesUrl={
                !!car.photos ?
                  car.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </Styled.CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Styled.Details>
          <Styled.Description>
            <Styled.Brand>{car.brand}</Styled.Brand>
            <Styled.Name>{car.name}</Styled.Name>
          </Styled.Description>

          <Styled.Rent>
            <Styled.Period>{car.period}</Styled.Period>
            <Styled.Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Styled.Price>
          </Styled.Rent>
        </Styled.Details>

        {car.accessories &&
          <Styled.Accessories>
            {
              car.accessories.map(accessory => (
                <Accessory
                  key={accessory.id}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Styled.Accessories>
        }

        <Styled.About>
          {car.about}
        </Styled.About>
      </Animated.ScrollView>

      <Styled.Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false &&
          <Styled.OfflineInfo>
            Conecte-se a internet para ver mais detalhes e agendar seu carro.
          </Styled.OfflineInfo>
        }
      </Styled.Footer>
    </Styled.Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})