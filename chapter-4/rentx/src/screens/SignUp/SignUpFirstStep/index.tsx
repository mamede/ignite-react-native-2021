import React, { useState } from 'react';
import { 
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import * as Styled from './styles';

export function SignUpFirstStep(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),
        email: Yup.string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
        name: Yup.string()
        .required('Nome é obrigatório')
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);
      
      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        return Alert.alert('Opa', error.message);
      }
    }
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
            <Styled.FormTitle>1. Dados</Styled.FormTitle>
            <Input 
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input 
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Styled.Form>

          <Button 
            title="Próximo"
            onPress={handleNextStep}
          />

        </Styled.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}