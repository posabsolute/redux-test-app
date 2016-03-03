import { CALL_API } from '../middlewares/api';
import sprintModel from '../models/sprint.model';
import {SPRINTS_LIST_REQUEST, SPRINTS_LIST_FETCH, SPRINT_UPDATE_POINTS, SPRINTS_LIST_FAILURE,
       SPRINT_ISSUES_REQUEST, SPRINT_ISSUES_FETCH, SPRINT_ISSUES_FAILURE,
       BURNDOWN_REQUEST, BURNDOWN_FETCH, BURNDOWN_FETCH_FAILURE,
       VELOCITY_REQUEST, VELOCITY_FETCH, VELOCITY_FETCH_FAILURE,
       SPRINT_CLEAR, SPRINTS_CLEAR,
       REPORT_REQUEST, REPORT_FETCH, REPORT_FETCH_FAILURE,
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


export function fetchBurndown(id, projectId) {
  return {
    [CALL_API]: {
      types: [ BURNDOWN_REQUEST, BURNDOWN_FETCH, BURNDOWN_FETCH_FAILURE ],
      endpoint: sprintModel.endpointBurndown(id, projectId),
      dataProcessor: sprintModel.endpointProcessor,
      model: sprintModel,
    },
  };
}

export function fetchVelocity(id) {
  return {
    [CALL_API]: {
      types: [ VELOCITY_REQUEST, VELOCITY_FETCH, VELOCITY_FETCH_FAILURE ],
      endpoint: sprintModel.endpointVelocity(id),
      model: sprintModel,
    },
  };
}

export function fetchSprintReport(id, projectId) {
  return {
    [CALL_API]: {
      types: [ REPORT_REQUEST, REPORT_FETCH, REPORT_FETCH_FAILURE ],
      endpoint: sprintModel.endpointReport(id, projectId),
      model: sprintModel,
    },
  };
}

export function clearSprint() {
  return {
    type: SPRINT_CLEAR,
  };
}

export function clearSprints() {
  return {
    type: SPRINTS_CLEAR,
  };
}

export function fetchDevSprintWork(id) {
  return {
    [CALL_API]: {
      types: [ REPORT_REQUEST, REPORT_FETCH, REPORT_FETCH_FAILURE ],
      endpoint: sprintModel.endpointReport(id),
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

