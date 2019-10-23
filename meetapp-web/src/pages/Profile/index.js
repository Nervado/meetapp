import React from 'react';

// import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

// import { updateProfileRequest } from '~/store/modules/user/actions';
// import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Manager() {
  // const dispatch = useDispatch();

  // const profile = useSelector(state => state.user.profile);

  // function handleSubmit(data) {
  // dispatch(updateProfileRequest(data));
  // }

  // function handleSignOut() {
  // dispatch(signOut());
  // }
  return (
    <Container>
      <Form initialData="" onSubmit={() => {}}>
        <Input name="name" placeholder="Nome da pessoa" />

        <Input name="email" type="email" placeholder="Data do Meetup" />
        <hr />
        <Input
          name="oldPassword"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input name="password" type="password" placeholder="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
        />
        <div className="button-area">
          <button type="submit">
            <MdAddCircleOutline size={20} color="#FFF" />
            <strong>Salvar perfil</strong>
          </button>
        </div>
      </Form>
    </Container>
  );
}
