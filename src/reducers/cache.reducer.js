import { CACHE_FETCH, CACHE_CLEAR } from 'actions/types/cache.types';

const initialState = {};

export function burndown(state = initialState, action) {

  switch (action.type) {

  case CACHE_FETCH:
    return {
      ...state,
      ...action.data,
    };

  case CACHE_CLEAR:
    return initialState;

  default:
    return state;
  }
}
