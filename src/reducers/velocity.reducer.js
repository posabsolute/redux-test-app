import { VELOCITY_FETCH, SPRINT_CLEAR } from 'actions/types/sprints.types';

const initialState = {
  sprints: {},
  velocityStatEntries: {},
};

export function velocity(state = initialState, action) {

  switch (action.type) {

  case VELOCITY_FETCH:
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
