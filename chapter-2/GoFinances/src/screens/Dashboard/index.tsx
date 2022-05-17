import React, { useState, useEffect, useCallback } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import * as Styled from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);

  async function loadTransactions(){
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const transactionsFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {

      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }

    });

    setData(transactionsFormatted);
  }

  useEffect(() => {
    loadTransactions();
  },[]);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  },[]));

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
