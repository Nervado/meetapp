/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
// import { useDispatch } from 'react-redux';
// import { zonedTimeToUtc } from 'date-fns-tz';

import pt from 'date-fns/locale/pt-BR';

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
// import { loadMeetupRequest } from '~/store/modules/meetup/actions';

import api from '~/services/api';

// import {upda} from '~/store/modules/meetup/actions'

import { Container, Meetup } from './styles';

export default function Dashboard() {
  const [meetups, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      const { data } = await api.get('meets');

      const meets = data.map(meetup => {
        return {
          formattedDate: format(
            parseISO(meetup.date),
            "dd 'de' MMMM', às ' HH:mm'h'",
            {
              locale: pt,
            }
          ),
          id: meetup.id,
          organizer: meetup.organizer_id,
          date: meetup.date,
          past: meetup.past,
          title: meetup.title,
          description: meetup.description,
          local: meetup.local,
          banner: meetup.banner,
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
        <Link to="/manager">
          <button type="button">
            <MdAddCircleOutline size={20} color="#FFF" />
            <strong>Novo meetup</strong>
          </button>
        </Link>
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

/**
 *
 *
 * {schedule.map(time => (
          <Time key={time.time} past={time.past} available={!time.appointment}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.name : 'Em aberto'}
            </span>
          </Time>
        ))}
 */
