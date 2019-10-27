import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

/* o keyboradAvoidingView é usado para contornar um problema
que ocorre no ios */
export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #e55562;
`;

export const Logout = styled(Button)`
  height: 42px;
  margin-top: 15px;
  background: #d44059;
`;
export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 30px 0 20px;
`;
