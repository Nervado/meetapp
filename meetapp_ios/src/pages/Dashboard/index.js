/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';

import Meetup from '~/components/Meetup';

import {Container, SelectDate, Date, Back, Forward, List} from './styles';

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
          <Date>24 de Novembro</Date>
          <Forward>
            <Icon name="chevron-right" size={33} color="#fff" />
          </Forward>
        </SelectDate>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup onCancel={() => handleCancel(item.id)} data={item} />
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
