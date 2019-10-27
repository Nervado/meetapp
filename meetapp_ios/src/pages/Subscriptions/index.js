/* eslint-disable react/prop-types */
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
// import { Container } from './styles';

export default function Subscriptions() {
  return (
    <Background>
      <View>
        <Text>Subscriptions</Text>
      </View>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({tintColor}) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
