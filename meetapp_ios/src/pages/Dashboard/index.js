/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {Container, SelectDate, Date, Back, Forward, List} from './styles';

const meetup = {
  title: 'Encontro sobre a natureza',
  description: 'Vai ficar foda',
  organizer: 'Organizador: Marcos Paulo',
  local: 'Rua das Orquideas, 189',
  date: '25 de Maio as 13h',
  banner: {url: 'https://picsum.photos/900/300'},
  cancelable: false,
};

const meetups = [meetup, meetup, meetup, meetup];

function Dashboard({isFocused}) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('appointments');

    setAppointments(response.data);
  }
  /*
  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);
  */

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
        <SelectDate>
          <Back>
            <Icon name="chevron-left" size={33} color="#fff" />
          </Back>
          <Date>25 de Maio</Date>
          <Forward>
            <Icon name="chevron-right" size={33} color="#fff" />
          </Forward>
        </SelectDate>

        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup
              onCancel={() => handleCancel(item.id)}
              data={item}
              buttonText="Realizar Inscrição"
              red={false}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',

  tabBarIcon: ({tintColor}) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
