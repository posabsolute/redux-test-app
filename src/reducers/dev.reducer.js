import { DEV_FETCH } from 'actions/types/dev.types';

const initialState = [];

export function devs(state = initialState, action) {
  switch (action.type) {

  case DEV_FETCH:
    return [
      ...state,
      ...action.data,
    ];

  default:
    return state;
  }
}
