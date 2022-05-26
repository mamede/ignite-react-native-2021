import React from 'react';
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

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import * as Styled from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { useTheme } from 'styled-components';

interface Params {
  car: CarDTO;
}

export function CarDetails(){
  const navigation = useNavigation<any>()
  const route = useRoute();
  const { car } = route.params as Params;

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
              imagesUrl={car.photos}
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

          <Styled.About>
            {car.about}
          </Styled.About>
        </Animated.ScrollView>

      <Styled.Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
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