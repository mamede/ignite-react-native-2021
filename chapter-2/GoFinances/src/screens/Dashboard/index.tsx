import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import * as Styled from './styles'

export function Dashboard() {
  return(
    <Styled.Container>
      <Styled.Header>
        <Styled.UserWrapper>
          <Styled.UserInfo>
            <Styled.Photo 
              source={{ uri: 'https://github.com/mamede.png'}} 
            />
            <Styled.User>
              <Styled.UserGreeting>Olá, </Styled.UserGreeting>
              <Styled.UserName>Mamede</Styled.UserName>
            </Styled.User>
          </Styled.UserInfo>
          <Styled.Icon name="power"/>
        </Styled.UserWrapper>
      </Styled.Header>

      <Styled.HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount='R$ 16.000,00'
          lastTransaction='Ultima entrada dia 03 de Abril.'
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount='R$ 16.000,00'
          lastTransaction='Ultima entrada dia 13 de Abril.'
        />
        <HighlightCard
          type="total"
          title="Total"
          amount='R$ 16.000,00'
          lastTransaction='Ultima entrada dia 23 de Abril.'
        />
      </Styled.HighlightCards>

    </Styled.Container>
  )
}
