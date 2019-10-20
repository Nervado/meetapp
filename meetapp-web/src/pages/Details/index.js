import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import AvatarInput from '../../components/BannerInput';

import { updateProfileRequest } from '~/store/modules/user/actions';
// import { signOut } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  // function handleSignOut() {
  // dispatch(signOut());
  // }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="banner" />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input
          name="description"
          type="description"
          placeholder="Descrição completa"
        />

        <Input name="date" type="date" placeholder="Data do Meetup" />
        <Input name="local" type="local" placeholder="Localização" />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#FFF" />
          Salvar Meetup
        </button>
      </Form>
    </Container>
  );
}
