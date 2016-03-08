import { CALL_API } from '../middlewares/api';
import {SEARCH_REQUEST, SEARCH_FETCH, SEARCH_FAILURE} from './types/search.types';
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
