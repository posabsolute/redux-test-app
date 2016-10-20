import { CALL_API } from '../middlewares/api';
import {SEARCH_REQUEST, SEARCH_FETCH, SEARCH_FAILURE, SEARCH_QUERY, CLEAR_SEARCH_QUERY, SET_FILTER, CLEAR_FILTER} from './types/search.types';
import searchModel from '../models/search.model';

export function fetchSearch(query) {
  return {
    [CALL_API]: {
      types: [ SEARCH_REQUEST, SEARCH_FETCH, SEARCH_FAILURE ],
      endpoint: searchModel.endpoint(query),
      dataProcessor: searchModel.endPointProcessor,
      model: searchModel,
    },
  };
}

export function setSearchQuery(query) {
  return {
  	type: SEARCH_QUERY,
  	query
  };
}

export function clearSearchQuery(query) {
  return {
  	type: CLEAR_SEARCH_QUERY
  }
}

export function setFilter(name, value) {
  return {
  	type: SET_FILTER,
  	name,
  	value,
  }
}

export function clearFilter(query) {
  return {
    type: CLEAR_FILTER
  }
}