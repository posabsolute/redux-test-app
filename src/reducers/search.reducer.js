import {SEARCH_REQUEST, SEARCH_FETCH} from '../actions/types/search.types';

const initialState = {
  isLoading: false,
  results: [],
};

export function search(state = initialState, action) {
  switch (action.type) {

  case SEARCH_REQUEST:
    return {
      ...state,
      isLoading: true,
    };

  case SEARCH_FETCH:
    return {
      ...state,
      results: [
        ...action.data,
      ],
      isLoading: false,
    };

  default:
    return state;
  }
}
