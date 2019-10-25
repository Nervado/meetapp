export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupSuccess(Meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: { Meetup },
  };
}

export function updateMeetupFailure() {
  return {
    type: '@meetup/UPDATE_MEETUP_FAILURE',
  };
}

export function cancelMeetupRequest(id) {
  return {
    type: '@meetup/CANCEL_MEETUP_REQUEST',
    payload: { id },
  };
}

export function cancelMeetupSucess() {
  return {
    type: '@meetup/CANCEL_MEETUP_SUCCESS',
  };
}

export function cancelMeetupFailure() {
  return {
    type: '@meetup/CANCEL_MEETUP_FAILURE',
  };
}

export function loadMeetupRequest({ meetup }) {
  return {
    type: '@meetup/LOAD_MEETUP_REQUEST',
    payload: { meetup },
  };
}
