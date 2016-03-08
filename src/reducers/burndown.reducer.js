import { BURNDOWN_FETCH } from 'actions/types/sprints.types';
import { SPRINT_CLEAR } from 'actions/types/sprints.types';

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

  case SPRINT_CLEAR:
    return initialState;

  default:
    return state;
  }
}
