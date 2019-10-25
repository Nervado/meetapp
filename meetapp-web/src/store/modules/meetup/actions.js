export function createMeetupRequest(meetup) {
  return {
    type: '@meetup/CREATE_MEETUP_REQUEST',
    payload: { meetup },
  };
}

export function createMeetupSuccess() {
  return {
    type: '@meetup/CREATE_MEETUP_SUCCESS',
  };
}

export function createMeetupFailure() {
  return {
    type: '@meetup/CREATE_MEETUP_FAILURE',
  };
}

export function updateMeetupRequest(meetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { meetup },
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

export function cancelMeetupSuccess() {
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

export function clearMeetupRequest() {
  return {
    type: '@meetup/CLEAR_MEETUP_REQUEST',
  };
}
