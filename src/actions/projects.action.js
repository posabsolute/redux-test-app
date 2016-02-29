import { CALL_API } from '../middlewares/api';
import projectModel from '../models/project.model';
import {PROJECT_LIST_REQUEST, PROJECT_LIST_FETCH, PROJECT_LIST_FAILURE,
        PROJECT_CONFIG_REQUEST, PROJECT_CONFIG_FETCH, PROJECT_CONFIG_FAILURE,
        PROJECT_CLEAR, PROJECT_SELECTED} from './types/projects.types';


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

export function fetchProjectConfig(id) {
  return {
    [CALL_API]: {
      types: [ PROJECT_CONFIG_REQUEST, PROJECT_CONFIG_FETCH, PROJECT_CONFIG_FAILURE ],
      endpoint: projectModel.endpointConfig(id),
      model: projectModel,
    },
  };
}

export function selectProject(project) {
  localStorage.setItem('project', JSON.stringify(project));
  return {
    type: PROJECT_SELECTED,
    data: project,
  };
}


export function clearProjects() {
  return {
    type: PROJECT_CLEAR,
  };
}
