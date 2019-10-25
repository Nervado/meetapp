import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';

import BannerInput from '../../components/BannerInput';

import { updateMeetupRequest } from '~/store/modules/meetup/actions';

import { Container, MultilineInput } from './styles';

export default function Manager() {
  const loadedMeetup = useSelector(state => state.meetup.meetup);

  const _date = loadedMeetup ? loadedMeetup.date : null;

  const [newdate, setNewDate] = useState(parseISO(_date));

  const dispatch = useDispatch();

  function handleSubmit(data) {
    const updatedMeetup = { ...data, newdate };

    dispatch(updateMeetupRequest(updatedMeetup));
  }

  return (
    <Container>
      <Form initialData={loadedMeetup} onSubmit={handleSubmit}>
        <BannerInput name="banner" />
        <Input name="title" placeholder="Titulo do Meetup" />

        <MultilineInput
          multiline
          name="description"
          placeholder="Descrição completa "
        />

        <div className="select-date">
          <DatePicker
            name="formattedDate"
            placeholder="Data do Meetup"
            showTimeSelect
            dateFormat="dd 'de' MMMM', às ' HH:mm'h'"
            placeholderText="Data do meetup"
            locale={pt}
            selected={newdate || ''}
            onChange={date => setNewDate(date)}
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
