/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import pt from 'date-fns/locale/pt-BR';

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';

import { clearMeetupRequest } from '~/store/modules/meetup/actions';

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetup] = useState([]);
  const dispatch = useDispatch();

  async function handleNew() {
    await dispatch(clearMeetupRequest());
  }

  useEffect(() => {
    async function loadMeetup() {
      const { data } = await api.get('meets');

      const meets = data.map(meetup => {
        return {
          formattedDate: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às ' HH'h'",
            {
              locale: pt,
            }
          ),
          id: meetup.id,
          date: meetup.date,
          past: meetup.past,
          title: meetup.title,
          description: meetup.description,
          local: meetup.local,
          banner: meetup.banner,
          user: meetup.user,
        };
      });

      setMeetup(meets);
    }
    loadMeetup();
  }, []);

  return (
    <Container>
      <header>
        <h1>
          <strong>Meus meetups</strong>
        </h1>

        <button type="button" onClick={handleNew}>
          <MdAddCircleOutline size={20} color="#FFF" />
          <strong>Novo meetup</strong>
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id} past={meetup.past}>
            <strong>{meetup.title}</strong>
            <div>
              <strong>{meetup.formattedDate}</strong>
              <Link to={{ pathname: '/details', state: { meetup } }}>
                <MdChevronRight size={24} color="#FFF" />
              </Link>
            </div>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
