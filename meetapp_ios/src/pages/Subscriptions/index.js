/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {Container, List} from './styles';

function Subscriptions({isFocused}) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get(`meetups?date=${queryDate}&page=1`);

    setSubscriptions(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`subscriptions/${id}`);

    setSubscriptions(
      subscriptions.map(appointment =>
        appointment.id === id
          ? {...appointment, canceled_at: response.data.canceled_at}
          : appointment,
      ),
    );
  }
  return (
    <Background>
      <Container>
        <Header />

        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup
              onCancel={() => handleCancel(item.id)}
              data={item}
              buttonText="Cancelar Inscrição"
              red
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
