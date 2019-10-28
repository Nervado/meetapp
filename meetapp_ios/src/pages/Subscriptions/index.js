/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';
import {Alert} from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Subscription from '~/components/Subscription';

import {Container, List} from './styles';

function Subscriptions({isFocused}) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get(`subscriptions`);

    setSubscriptions(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      setSubscriptions(
        subscriptions.map(subs =>
          subs.id === id ? {...subs, canceled: true} : subs,
        ),
      );
      Alert.alert('Inscrição Cancelada!');
    } catch (error) {
      Alert.alert(error.response.data.error);
    }
  }
  return (
    <Background>
      <Container>
        <Header />

        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Subscription
              onCancel={() => handleCancel(item.id)}
              data={item}
              buttonText="Cancelar Inscrição"
              red
              canceled={item.canceled}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({tintColor}) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
