import { CALL_API } from '../middlewares/api';
import devModel from '../models/dev.model';
import {DEV_REQUEST, DEV_FETCH, DEV_FETCH_FAILURE} from './types/dev.types';

export function fetchDevs(id) {
  console.log(DEV_REQUEST);
  return {
    [CALL_API]: {
      types: [ DEV_REQUEST, DEV_FETCH, DEV_FETCH_FAILURE ],
      endpoint: devModel.endpoint(id),
      model: devModel,
    },
  };
}
