import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

// import pt from 'date-fns/locale/pt';

import { MdPlace, MdModeEdit, MdDelete, MdToday } from 'react-icons/md';
import api from '~/services/api';

import banner from '~/assets/meetup.png';

import { Container, Content } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

export default function Dashboard() {
  // const [, setSchedule] = useState([]);
  // const [date, setDate] = useState(new Date());

  /*
  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.date), compareDate)
          ),
        };
      });
      setSchedule(data);
    }
    loadSchedule();
  }, [date]);

  */
  function hanbleNextDay() {
    // setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <h1>
          <strong>Titulo do Meetup</strong>
        </h1>
        <div className="buttons">
          <Link to="/manager">
            <button className="edit" type="button" onClick={hanbleNextDay}>
              <MdModeEdit size={20} color="#FFF" />

              <strong>Editar</strong>
            </button>
          </Link>

          <Link to="/dashboard">
            <button type="button" onClick={hanbleNextDay}>
              <MdDelete size={20} color="#FFF" />

              <strong>Cancelar</strong>
            </button>
          </Link>
        </div>
      </header>
      <Content>
        <img src={banner} alt="banner" />
        <div className="description">
          Lorem Ipsum é simplesmente uma simulação de texto da indústria
          tipográfica e de impressos, e vem sendo utilizado desde o século XVI,
          quando um impressor desconhecido pegou uma bandeja de tipos e os
          embaralhou para fazer um livro de modelos de tipos. PageMaker. Lorem
          Ipsum é simplesmente uma simulação de texto da indústria tipográfica e
          de impressos, e vem sendo utilizado desde o século XVI, quando um
          impressor desconhecido pegou uma bandeja de tipos e os embaralhou para
          fazer um livro de modelos de tipos. PageMaker. Lorem Ipsum é
          simplesmente uma simulação de texto da indústria tipográfica e de
          impressos, e vem sendo utilizado desde o século XVI, quando um
          impressor desconhecido pegou uma bandeja de tipos e os embaralhou para
          fazer um livro de modelos de tipos. PageMaker.
        </div>
        <footer>
          <div className="data">
            <MdToday size={20} color="#FFF" />
            <small>dia 25 de maio de 2019</small>
          </div>
          <div className="local">
            <MdPlace size={20} color="#FFF" />
            <small>dia 25 de maio de 2019</small>
          </div>
        </footer>
      </Content>
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
