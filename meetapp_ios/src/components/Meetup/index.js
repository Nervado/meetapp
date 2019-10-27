/* eslint-disable react/prop-types */
import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {TouchableOpacity, Text} from 'react-native';

import {
  Container,
  Left,
  Banner,
  Info,
  Name,
  Time,
  Title,
  Local,
  SubscriptionButton,
  StyledText,
} from './styles';

export default function Meetup({data, onCancel}) {
  /*
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);
*/
  return (
    <Container>
      <Left>
        <Banner
          source={{
            uri: data.banner
              ? data.banner.url
              : 'https://picsum.photos/470/150',
          }}
        />
        <Info>
          <Title>{data.title}</Title>
          <Time>
            <Icon name="event" size={17} color="#999999" />
            <StyledText> {data.date}</StyledText>
          </Time>

          <Local>
            <Icon name="place" size={17} color="#999999" />
            <StyledText> {data.local}</StyledText>
          </Local>
          <Name>
            <Icon name="person" size={17} color="#999999" />
            <StyledText> {data.organizer}</StyledText>
          </Name>
          <SubscriptionButton onPress={onCancel}>
            Realizar Inscrição
          </SubscriptionButton>
        </Info>
      </Left>
    </Container>
  );
}
