import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Alert, Keyboard, KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import * as Styled from './styles';

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const netInfo = useNetInfo();

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
      Alert.alert('Para mudar a senha, conecte-se a Internet');
    } else {
      setOption(optionSelected);
    }
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatória'),
        name: Yup.string()
          .required('Nome é obrigatório')
      });

      const data = { name, driverLicense };
      await schema.validate(data);


      if (password !== confirmPassword) {
        return Alert.alert('A nova senha e a senha de confirmação não são iguais!');
      }

      if (password && oldPassword) {
        api.put('users', {
          password,
          old_password: oldPassword
        }).catch(error => console.log(error))
      }

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Perfil atualizado!');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil');
      }
    }
  }

  useEffect(() => {
    setAvatar(user.avatar);
  }, []);

  async function handleSignOut() {
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
        },
        {
          text: "Sair",
          onPress: () => signOut()
        }
      ]
    );
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Styled.Container>
          <Styled.Header>
            <Styled.HeaderTop>
              <BackButton
                color={theme.colors.shape}
                onPress={handleBack}
              />
              <Styled.HeaderTitle>Editar Perfil</Styled.HeaderTitle>
              <Styled.LogoutButton onPress={handleSignOut}>
                <Feather
                  name="power" size={24}
                  color={theme.colors.shape}
                />
              </Styled.LogoutButton>
            </Styled.HeaderTop>

            <Styled.PhotoContainer>
              {!!avatar && <Styled.Photo source={{ uri: avatar }} />}

              <Styled.PhotoButton onPress={handleAvatarSelect}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </Styled.PhotoButton>
            </Styled.PhotoContainer>
          </Styled.Header>

          <Styled.Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Styled.Options>
              <Styled.Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <Styled.OptionTitle active={option === 'dataEdit'}>
                  Dados
                </Styled.OptionTitle>
              </Styled.Option>
              <Styled.Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <Styled.OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </Styled.OptionTitle>
              </Styled.Option>
            </Styled.Options>
            {
              option === 'dataEdit'
                ?
                <Styled.Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={user.name}
                    onChangeText={setName}
                  />
                  <Input
                    iconName="mail"
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
                  />
                </Styled.Section>
                :
                <Styled.Section>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha atual"
                    onChangeText={setOldPassword}

                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Nova senha"
                    onChangeText={setPassword}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Repetir senha"
                    onChangeText={setConfirmPassword}
                  />
                </Styled.Section>
            }

            <Button
              title="Salvar alterações"
              onPress={handleProfileUpdate}
            />
          </Styled.Content>
        </Styled.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}