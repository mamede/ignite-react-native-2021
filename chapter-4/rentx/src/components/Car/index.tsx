import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg'
import { CarDTO } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import * as Styled from './styles';

interface Props extends RectButtonProps {
  data: CarDTO
}

export function Car({ data, ...rest } : Props){
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  
  return (
    <Styled.Container {...rest}>
      <Styled.Details>
        <Styled.Brand>{data.brand}</Styled.Brand>
        <Styled.Name>{data.name}</Styled.Name>

        <Styled.About>
          <Styled.Rent>
            <Styled.Period>{data.rent.period}</Styled.Period>
            <Styled.Price>{`R$ ${data.rent.price}`}</Styled.Price>
          </Styled.Rent>

          <Styled.Type>
            <MotorIcon />
          </Styled.Type>
        </Styled.About>
      </Styled.Details>

      <Styled.CarImage 
        source={{ uri: data.thumbnail}} 
        resizeMode="contain"
      />
    </Styled.Container>
  );
}