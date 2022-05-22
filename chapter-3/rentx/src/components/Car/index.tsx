import React from 'react';

import * as Styled from './styles';

import GasolineSvg from '../../assets/gasoline.svg'

interface CarData {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string;
}

interface Props {
  data: CarData
}

export function Car({ data } : Props){
  return (
    <Styled.Container>
      <Styled.Details>
        <Styled.Brand>{data.brand}</Styled.Brand>
        <Styled.Name>{data.name}</Styled.Name>

        <Styled.About>
          <Styled.Rent>
            <Styled.Period>{data.rent.period}</Styled.Period>
            <Styled.Price>{`R$ ${data.rent.price}`}</Styled.Price>
          </Styled.Rent>

          <Styled.Type>
            <GasolineSvg />
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