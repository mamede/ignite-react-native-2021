import React from 'react';

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

export function CarDetails(){
  return (
    <Styled.Container>
      <Styled.Header>
        <BackButton onPress={() => {}} />
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

          <Styled.About>
            Este é um automóvel desportivo. Surgiu do lendário 
            touro de lide indultado na praça Real Mestranza de Sevilla.
            É um belíssimo carro para quem gosta de acelerar.
          </Styled.About>
      </Styled.Content>

      <Styled.Footer>
        <Button title="Confirmar" />
      </Styled.Footer>
    </Styled.Container>
  );
}