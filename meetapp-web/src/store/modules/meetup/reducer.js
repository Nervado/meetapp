import produce from 'immer';

const INITIAL_STATE = {
  formattedDate: '',
  id: null,
  date: null,
  past: false,
  title: '',
  description: '',
  local: '',
  banner: null,
  user: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/LOAD_MEETUP_REQUEST': {
        draft.meetup = action.payload.meetup;

        break;
      }
      case '@meetup/CLEAR_MEETUP_REQUEST': {
        draft.meetup = INITIAL_STATE;

        break;
      }
      case '@meetup/CREATE_MEETUP_REQUEST': {
        draft.meetup = action.payload.meetup;

        break;
      }
      case '@meetup/CREATE_MEETUP_FAILURE': {
        draft.meetup = INITIAL_STATE;

        break;
      }

      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.meetup = INITIAL_STATE;

        break;
      }

      case '@auth/SIGN_OUT': {
        draft.meetup = null;
        break;
      }
      default:
    }
  });
}
