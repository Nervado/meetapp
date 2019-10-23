import React from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
// import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import AvatarInput from '../../components/BannerInput';

// import { updateProfileRequest } from '~/store/modules/user/actions';
// import { signOut } from '~/store/modules/auth/actions';

import { Container, MultilineInput } from './styles';

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
        <AvatarInput name="banner" />
        <Input name="title" placeholder="Titulo do Meetup" />

        <MultilineInput
          multiline
          name="description"
          type="description"
          placeholder="Descrição completa "
        />
        <input
          name="date"
          type="date"
          showTimePicker
          placeholder="Data do Meetup"
        />
        <DatePicker showTimeSelect dateFormat="Pp" />
        <Input name="local" type="local" placeholder="Localização" />
        <div className="button">
          <button type="submit">
            <MdAddCircleOutline size={20} color="#FFF" />
            <strong>Salvar Meetup</strong>
          </button>
        </div>
      </Form>
    </Container>
  );
}
