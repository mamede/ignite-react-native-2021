import React from 'react';
import {
  Button,
  Text,
  TextInput,
  View
} from 'react-native';

export function Profile() {
  return (
    <View>
      <Text testID="text-title">
        Perfil
      </Text>

      <TextInput 
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Felipe"
      />

      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        value="Mamede"
      />

      <Button 
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  )
}