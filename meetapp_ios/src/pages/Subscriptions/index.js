/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {Container, List} from './styles';

const meetup = {
  title: 'Meetup de React Native',
  description: 'Vai ficar foda',
  organizer: 'Organizador: O super fodão',
  local: 'Minha casa Porra',
  date: '25 de Maio as 13h',
  banner: {url: 'https://picsum.photos/900/300'},
  cancelable: false,
};

const meetups = [meetup, meetup, meetup, meetup];

function Subscriptions({isFocused}) {
  const [appointments, setAppointments] = useState([]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
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
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup
              onCancel={() => handleCancel(item.id)}
              data={item}
              buttonText="Cancelar Inscrição"
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
