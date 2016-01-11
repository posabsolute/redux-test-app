import { CALL_API } from '../middlewares/api';
import sprintModel from '../models/sprint.model';
import {SPRINTS_LIST_REQUEST, SPRINTS_LIST_FETCH, SPRINT_UPDATE_POINTS, SPRINTS_LIST_FAILURE,
       SPRINT_ISSUES_REQUEST, SPRINT_ISSUES_FETCH, SPRINT_ISSUES_FAILURE,
       SPRINT_REQUEST, SPRINT_FETCH, SPRINT_FAILURE} from './types/sprints.types';


export function fetchSprints(projectId) {
  return {
    [CALL_API]: {
      types: [ SPRINTS_LIST_REQUEST, SPRINTS_LIST_FETCH, SPRINTS_LIST_FAILURE ],
      endpoint: sprintModel.endpointCollection(projectId),
      dataProcessor: sprintModel.endpointCollectionProcessor,
      model: sprintModel,
    },
  };
}

export function fetchSprintIssues(id) {
  return {
    [CALL_API]: {
      types: [ SPRINT_ISSUES_REQUEST, SPRINT_ISSUES_FETCH, SPRINT_ISSUES_FAILURE ],
      endpoint: sprintModel.endPointIssues(id),
      dataProcessor: sprintModel.endPointIssuesProcessor,
      model: sprintModel,
    },
  };
}

export function fetchSprint(id) {
  return {
    [CALL_API]: {
      types: [ SPRINT_REQUEST, SPRINT_FETCH, SPRINT_FAILURE ],
      endpoint: sprintModel.endPoint(id),
      model: sprintModel,
    },
  };
}


export function updateSprintPoints(id) {
  return {
    type: SPRINT_UPDATE_POINTS,
    id,
  };
}

