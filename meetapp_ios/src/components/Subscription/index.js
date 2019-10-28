/* eslint-disable react/prop-types */
import React, {useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {format, parseISO} from 'date-fns';

import pt from 'date-fns/locale/pt';

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

export default function Subscription({
  data,
  onCancel,
  buttonText,
  red,
  subscribed,
}) {
  const {title, local, date, user, banner} = data.meet;

  console.tron.log(data.meet);

  const dateFormatted = useMemo(
    () => format(parseISO(date), "d 'de' MMMM", {locale: pt}),
    [date],
  );
  return (
    <Container>
      <Left>
        <Banner
          source={{
            uri: banner ? banner.url : 'https://picsum.photos/470/150',
          }}
        />
        <Info>
          <Title>{title}</Title>
          <Time>
            <Icon name="event" size={17} color="#999999" />
            <StyledText> {dateFormatted}</StyledText>
          </Time>
          <Local>
            <Icon name="place" size={17} color="#999999" />
            <StyledText> {local}</StyledText>
          </Local>
          <Name>
            <Icon name="person" size={17} color="#999999" />
            <StyledText> {user.name}</StyledText>
          </Name>

          <SubscriptionButton onPress={onCancel} red={red} show={subscribed}>
            {buttonText}
          </SubscriptionButton>
        </Info>
      </Left>
    </Container>
  );
}
