import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})``;

export const SelectDate = styled.View`
  display: flex;
  flex-direction: row;
  height: 90px;
  justify-content: center;
  align-self: stretch;
  align-items: center;
  background: #f94d6a;
`;

export const Date = styled.Text`
  font-family: Helvetica;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background: #456788;
`;

export const Back = styled.View``;

export const Forward = styled.View``;
