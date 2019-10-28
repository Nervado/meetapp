import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  margin-bottom: 20px;

  border-radius: 4px;
  background: #fff;

  justify-content: space-between;
  align-self: stretch;

  height: 345px;
  background: #fff;

  opacity: ${props => (props.past ? 0.6 : 1)};

  overflow: hidden;
`;

export const Left = styled.View`
  display: flex;

  align-items: center;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
`;
export const Info = styled.View`
  margin: 0 20px;
  display: flex;

  align-self: stretch;
`;
export const Name = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const Time = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 9px;
`;

export const Title = styled.Text`
  margin-top: 20px;
  margin-bottom: 14px;
  font-family: Helvetica;
  font-weight: bold;
  font-size: 18px;
  color: #000;
`;

export const Local = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 9px;
`;

export const SubscriptionButton = styled(Button)`
  height: 40px;
  width: auto;
  margin-top: 14px;
  background: ${props => (props.red ? '#D44059' : '#f94d6a')};
  display: ${props => (props.show ? 'none' : 'flex')};
`;

export const StyledText = styled.Text`
  font-family: Helvetica;
  color: #999999;
  font-size: 13px;

  padding-left: 3px;
`;
