import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import pt from 'date-fns/locale/pt';
// import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import AvatarInput from '../../components/BannerInput';

// import { updateProfileRequest } from '~/store/modules/user/actions';
// import { signOut } from '~/store/modules/auth/actions';

import { Container, MultilineInput } from './styles';

export default function Manager() {
  const [data, setData] = useState('');
  // const dispatch = useDispatch();

  // const profile = useSelector(state => state.user.profile);

  // function handleSubmit(data) {
  // dispatch(updateProfileRequest(data));
  // }

  // function handleSignOut() {
  // dispatch(signOut());

  // }

  function handleChange(_data) {
    setData(_data);
  }

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

        <div className="select-date">
          <DatePicker
            placeholder="Data do Meetup"
            showTimeSelect
            dateFormat="dd 'de' MMMM', às ' HH:mm'h'"
            // dateFormat="d '/' MM '/' yyyy 'as' hh:mm"
            placeholderText="Data do meetup"
            locale={pt}
            selected={data}
            onChange={date => handleChange(date)}
          />
        </div>
        <Input name="local" type="local" placeholder="Localização" />
        <div className="button">
          <button type="submit">
            <MdAddCircleOutline size={20} color="#FFF" />
            <strong>Salvar meetup</strong>
          </button>
        </div>
      </Form>
    </Container>
  );
}
