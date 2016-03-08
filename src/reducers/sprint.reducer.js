import { SPRINT_FETCH, REPORT_FETCH, SPRINT_CLEAR } from 'actions/types/sprints.types';

const initialState = {
  issues: [],
  puntedIssues: [],
  completedIssues: [],
};

export function sprint(state = initialState, action) {
  switch (action.type) {

  case REPORT_FETCH:
    return {
      ...state,
      ...action.data.contents,
    };

  case SPRINT_FETCH:
    return {
      issues: [],
      ...state,
      ...action.data,
    };

  case SPRINT_CLEAR:
    return initialState;

  default:
    return state;
  }
}
