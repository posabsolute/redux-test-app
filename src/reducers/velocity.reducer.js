import { VELOCITY_FETCH } from 'actions/types/sprints.types';

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

  default:
    return state;
  }
}
