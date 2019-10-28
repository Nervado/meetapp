/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, {useEffect, useState, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';
import {Alert, ActivityIndicator, View} from 'react-native';

import {format, subDays, addDays} from 'date-fns';

import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {Container, SelectDate, Time, Back, Forward, List} from './styles';

function Dashboard({isFocused}) {
  const [date, setDate] = useState(new Date());

  const [meetups, setMeetups] = useState([]);

  const [scrol, setScrol] = useState({page: 2, loading: false});

  const queryDate = useMemo(() => format(date, "yyyy'-'MM'-'dd"));

  async function loadMeetups() {
    const response = await api.get(`meetups?date=${queryDate}&page=${1}`);

    setMeetups(response.data);
  }

  async function loadScroll() {
    if (meetups.length === 10) {
      const {page} = scrol;

      setScrol({loading: true, page});

      const response = await api.get(`meetups?date=${queryDate}&page=${page}`);

      setMeetups([...meetups, ...response.data]);

      setScrol({loading: false, page: page + 1});
    }
  }

  useEffect(() => {
    if (date) {
      loadMeetups();
    }
  }, [date]);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", {locale: pt}),
    [date],
  );

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function renderFooter() {
    if (!scrol.loading) return null;
    return (
      <View style>
        <ActivityIndicator />
      </View>
    );
  }

  async function handleSubscription(id) {
    try {
      await api.post(`subscriptions/${id}`);
      setMeetups(
        meetups.map(meet =>
          meet.id === id ? {...meet, subscribed: true} : meet,
        ),
      );
      Alert.alert('Inscrição realizada!');
    } catch (error) {
      Alert.alert(error.response.data.error);
    }
  }

  return (
    <Background>
      <Container>
        <Header />
        <SelectDate>
          <Back>
            <Icon
              onPress={handlePrevDay}
              name="chevron-left"
              size={33}
              color="#fff"
            />
          </Back>
          <Time>{dateFormatted}</Time>
          <Forward>
            <Icon
              onPress={handleNextDay}
              name="chevron-right"
              size={33}
              color="#fff"
            />
          </Forward>
        </SelectDate>

        <List
          onEndReached={loadScroll}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Meetup
              onCancel={() => handleSubscription(item.id)}
              data={item}
              buttonText="Realizar Inscrição"
              red={false}
              subscribed={item.subscribed}
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
