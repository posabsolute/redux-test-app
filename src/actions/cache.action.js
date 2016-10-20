import { CALL_API } from '../middlewares/api';
import sprintModel from '../models/sprint.model';
import {CACHE_REQUEST, CACHE_FETCH, CACHE_FAILURE, CACHE_CLEAR} from './types/cache.types';

export function fetchCache(type, id, projectId) {
  const model = sprintModel;
  return {
    [CALL_API]: {
      types: [ CACHE_REQUEST, CACHE_FETCH, CACHE_FAILURE ],
      endpoint: sprintModel.endpointCollection(projectId),
      dataProcessor: model.endpointCollectionProcessor,
      data: {type: type},
      model: model,
    },
  };
}

export function clearCache() {
  return {type: CACHE_CLEAR};
}

