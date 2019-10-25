import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import history from '~/services/history';

import { cancelMeetupSucess, cancelMeetupFailure } from './actions';

export function* cancelMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `/meets/${id}`);

    toast.success('Meetup cancelado');

    yield put(cancelMeetupSucess());
    history.push('/dashboard');
  } catch (err) {
    toast.error(err.response.data.error);

    yield put(cancelMeetupFailure());
  }
}

export default all([takeLatest('@meetup/CANCEL_MEETUP_REQUEST', cancelMeetup)]);
