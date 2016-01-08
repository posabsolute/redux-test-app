import { CALL_API } from '../middlewares/api';
import projectModel from '../models/project.model';
import {PROJECT_LIST_REQUEST, PROJECT_LIST_FETCH, PROJECT_LIST_FAILURE} from './types/projects.types';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function fetchProjects() {
  return {
    [CALL_API]: {
      types: [ PROJECT_LIST_REQUEST, PROJECT_LIST_FETCH, PROJECT_LIST_FAILURE ],
      endpoint: projectModel.endpointCollection(),
      dataProcessor: projectModel.endpointCollectionProcessor,
      model: projectModel,
    },
  };
}
