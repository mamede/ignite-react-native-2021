import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import * as Styled from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}


export function SignUpSecondStep(){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação');
    }

    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais');
    }

    navigation.navigate('Confirmation', {
      nextScreenRoute: 'SignIn',
      title: 'Conta Criada!',
      message: `Agora é só fazer login\ne aproveitar.`
    });
    
    // await api.post('/users', {
    //   name: user.name,
    //   email: user.email,
    //   driver_license: user.driverLicense,
    //   password
    // })
    // .then(() => {
    //   navigation.navigate('Confirmation', {
    //     nextScreenRoute: 'SignIn',
    //     title: 'Conta Criada!',
    //     message: `Agora é só fazer login\ne aproveitar.`
    //   });
    // })
    // .catch(() => {
    //   Alert.alert('Opa', 'Não foi possível cadastrar');
    // });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Styled.Container>
          <Styled.Header>
            <BackButton onPress={handleBack} />
            <Styled.Steps>
              <Bullet active />
              <Bullet />
            </Styled.Steps>
          </Styled.Header>

          <Styled.Title>
            Crie sua{'\n'}conta
          </Styled.Title>
          <Styled.Subtitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </Styled.Subtitle>

          <Styled.Form>
            <Styled.FormTitle>2. Senha</Styled.FormTitle>
            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Styled.Form>

          <Button 
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Styled.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}