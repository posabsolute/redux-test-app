import { BURNDOWN_FETCH } from 'actions/types/sprints.types';

const initialState = {
  changes: {},
};

export function burndown(state = initialState, action) {

  switch (action.type) {

  case BURNDOWN_FETCH:
    return {
      ...state,
      ...action.data,
    };

  default:
    return state;
  }
}
