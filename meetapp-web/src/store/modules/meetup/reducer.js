import produce from 'immer';

const INITIAL_STATE = {
  meetup: {},
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/LOAD_MEETUP_REQUEST': {
        draft.meetup = action.payload.meetup;

        break;
      }
      default:
    }
  });
}
