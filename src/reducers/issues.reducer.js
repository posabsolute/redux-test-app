import {SEARCH_FETCH, SEARCH_CLEAR} from '../actions/types/search.types';

const initialState = [];

export function issues(state = initialState, action) {
  switch (action.type) {

  case SEARCH_FETCH:
    return [
      ...action.data,
    ];

  case SEARCH_CLEAR:
    return initialState;

  default:
    return state;
  }
}
