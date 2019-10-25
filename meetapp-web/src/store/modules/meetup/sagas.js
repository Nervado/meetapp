import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import history from '~/services/history';

import {
  cancelMeetupSuccess,
  cancelMeetupFailure,
  createMeetupSuccess,
  createMeetupFailure,
  updateMeetupFailure,
  updateMeetupSuccess,
} from './actions';

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/meets/${id}`);

    toast.success('Meetup cancelado');

    yield put(cancelMeetupSuccess());
    history.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.error);

    yield put(cancelMeetupFailure());
  }
}

export function clearMeetup() {
  history.push('/manager');
}

export function* createMeetup({ payload }) {
  try {
    const { title, description, local, date, banner_id } = payload.meetup;

    const meetup = { title, description, local, date, banner_id };

    yield call(api.post, '/meets', meetup);

    toast.success('Meetup criado com sucesso');

    yield put(createMeetupSuccess());

    history.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.error);

    yield put(createMeetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { id, title, description, local, date, banner_id } = payload.meetup;

    const meetup = { title, description, local, date, banner_id };

    yield call(api.put, `/meets/${id}`, meetup);

    toast.success('Meetup atualizado com sucesso');

    yield put(updateMeetupSuccess());

    history.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.error);

    yield put(updateMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetup),
  takeLatest('@meetup/CLEAR_MEETUP_REQUEST', clearMeetup),
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
