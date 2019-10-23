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

import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Meetup } from './styles';

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
          <strong>Meus meetups</strong>
        </h1>
        <Link to="/manager">
          <button type="button" onClick={hanbleNextDay}>
            <MdAddCircleOutline size={20} color="#FFF" />

            <strong>Novo Meetup</strong>
          </button>
        </Link>
      </header>

      <ul>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de maio, as 20h</strong>
            <Link to="/details">
              <MdChevronRight size={24} color="#FFF" />
            </Link>
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de maio, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de maio, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de maio, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>

        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Outubrro, as 20h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
        <Meetup>
          <strong>Meetup de nao sei o que</strong>
          <div>
            <strong>24 de Setembro, ás 23h</strong>
            <MdChevronRight size={24} color="#FFF" />
          </div>
        </Meetup>
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