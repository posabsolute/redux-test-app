import {SEARCH_REQUEST, SEARCH_FETCH, SEARCH_FAILURE, SEARCH_QUERY, CLEAR_SEARCH_QUERY, SET_FILTER, CLEAR_FILTER} from '../actions/types/search.types';
const initialState = {
  isLoading: false,
  results: [],
  filters: {},
};

export function search(state = initialState, action) {
  switch (action.type) {

  case SEARCH_REQUEST:
    return {
      ...state,
      isLoading: true,
    };

  case SEARCH_FAILURE:
    return {
      results: [],
      isLoading: false,
    };

  case SEARCH_FETCH:
    return {
      ...state,
      results: [
        ...action.data,
      ],
      isLoading: false,
    };

  case SEARCH_QUERY:
    return {
      ...state,

      query: action.query,
    };


  case SET_FILTER:
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.name]: action.value
      }
    };

  case CLEAR_FILTER:
    return {
      ...state,
      filters: {}
    };

  case CLEAR_SEARCH_QUERY:
    return {
      ...state,
      query: "",
    };

  default:
    return state;
  }
}







