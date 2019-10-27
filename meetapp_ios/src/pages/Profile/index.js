/* eslint-disable react/prop-types */
import React, {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  Logout,
} from './styles';

import {updateProfileRequest} from '~/store/modules/user/actions';

import {signOut} from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const emailRef = useRef('');
  const oldPasswordRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  // update the profile cause the field set to be ''
  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      }),
    );
  }
  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Background>
      <Container>
        <Header />
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            onChangeText={setName}
            value={name}
          />
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            returnKeyType="next"
            onChangeText={setEmail}
            value={email}
          />
          <Separator />
          <FormInput
            secureTextEntry
            placeholder="Sua senha atual "
            ref={oldPasswordRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            onChangeText={setOldPassword}
            value={oldPassword}
          />
          <FormInput
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            returnKeyType="next"
            onChangeText={setPassword}
            value={password}
          />
          <FormInput
            secureTextEntry
            placeholder="Confirme sua senha"
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <Logout onPress={handleLogout}>Sair do Meetapp</Logout>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({tintColor}) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
