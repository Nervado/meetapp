import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdAddCircleOutline } from 'react-icons/md';

import BannerInput from '../../components/BannerInput';

import {
  updateMeetupRequest,
  createMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, MultilineInput } from './styles';

export default function Manager() {
  const loadedMeetup = useSelector(state => state.meetup.meetup);
  const { id } = loadedMeetup;
  // console.tron.log(loadedMeetup.id);

  const salvedDate =
    loadedMeetup.date === null ? null : parseISO(loadedMeetup.date);

  const [newdate, setNewDate] = useState(salvedDate);

  const dispatch = useDispatch();

  function handleSubmit(data) {
    const updatedMeetup = { ...data, date: newdate };

    console.tron.log(updatedMeetup);

    if (id === null) {
      dispatch(createMeetupRequest(updatedMeetup));
    } else {
      dispatch(updateMeetupRequest({ ...updatedMeetup, id }));
    }
  }

  return (
    <Container>
      <Form initialData={loadedMeetup} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Titulo do Meetup" />

        <MultilineInput
          multiline
          name="description"
          placeholder="Descrição completa "
        />

        <div className="select-date">
          <DatePicker
            name="date"
            placeholder="Data do Meetup"
            showTimeSelect
            dateFormat="dd 'de' MMMM', às ' HH'h'"
            showTime={{ format: 'HH' }}
            placeholderText="Data do meetup"
            minDate={subDays(new Date(), 0)}
            timeIntervals={60}
            locale={pt}
            selected={newdate}
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
