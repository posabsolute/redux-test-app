import { CALL_API } from '../middlewares/api';

import {LOGIN_ATTEMPT, LOGGED_SUCCESSFULLY, LOGGED_FAILED} from './types/user.types';
import userModel from '../models/user.model';

export function login(user) {
  return {
    [CALL_API]: {
      types: [ LOGIN_ATTEMPT, LOGGED_SUCCESSFULLY, LOGGED_FAILED ],
      endpoint: userModel.endpoint(),
      dataProcessor: userModel.endpointProcessor,
      validate: userModel.validate,
      callData: user,
    },
  };
}
