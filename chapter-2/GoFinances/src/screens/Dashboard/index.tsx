import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';

import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import * as Styled from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '13/04/2020'
    },
    {
      id: '2',
      type: 'negative',
      title: 'Hamburguer Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '10/04/2020'
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: '27/03/2020'
    }
  ]
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
          <Styled.LogoutButton onPress={() => {}}>
            <Styled.Icon name="power"/>
          </Styled.LogoutButton>
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


      <Styled.Transactions>
        <Styled.Title>Listagem</Styled.Title>
        <Styled.TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

        
      </Styled.Transactions>

    </Styled.Container>
  )
}
