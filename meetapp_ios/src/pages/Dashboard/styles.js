import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 0},
})`
  flex: 1;

  align-self: stretch;

  padding: 0 20px;

  display: flex;
`;

export const SelectDate = styled.View`
  display: flex;
  flex-direction: row;
  height: 90px;
  justify-content: center;
  align-self: stretch;
  align-items: center;
`;

export const Time = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;

export const Back = styled.TouchableOpacity`
  padding-right: 10px;
`;

export const Forward = styled.TouchableOpacity`
  margin-left: 10px;
`;
