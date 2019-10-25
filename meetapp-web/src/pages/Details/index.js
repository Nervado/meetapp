/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { MdPlace, MdModeEdit, MdDelete, MdToday } from 'react-icons/md';

import banner from '~/assets/meetup.png';

import {
  cancelMeetupRequest,
  loadMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, Content } from './styles';

export default function Details({ location }) {
  const { meetup } = location.state;

  console.tron.log(location);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMeetupRequest({ meetup }));
  }, []);

  function handleCancel() {
    dispatch(cancelMeetupRequest(meetup.id));
  }
  return (
    <Container>
      <header>
        <h1>
          <strong>{meetup.title}</strong>
        </h1>
        <div className="buttons">
          <Link to={{ pathname: '/manager', state: { meetup } }}>
            <button className="edit" type="button">
              <MdModeEdit size={20} color="#FFF" />
              <strong>Editar</strong>
            </button>
          </Link>

          <button type="button" onClick={handleCancel}>
            <MdDelete size={20} color="#FFF" />
            <strong>Cancelar</strong>
          </button>
        </div>
      </header>
      <Content>
        <img src={banner} alt="banner" />
        <div className="description">{meetup.description}</div>
        <footer>
          <div className="data">
            <MdToday size={20} color="#FFF" />
            <small>{meetup.formattedDate}</small>
          </div>
          <div className="local">
            <MdPlace size={20} color="#FFF" />
            <small>{meetup.local}</small>
          </div>
        </footer>
      </Content>
    </Container>
  );
}

Details.propTypes = {
  location: PropTypes.object,
};

Details.defaultProps = {
  location: {},
};
