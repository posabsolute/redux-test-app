import { SPRINT_ISSUES_FETCH, SPRINT_FETCH } from 'actions/types/sprints.types';

const initialState = {
  issues: [],
};

export function sprint(state = initialState, action) {
  switch (action.type) {

  case SPRINT_FETCH:
    return {
      issues: [],
      ...state,
      ...action.data,
    };

  case SPRINT_ISSUES_FETCH:
    return {
      ...state,
      issues: action.data,
    };

  default:
    return state;
  }
}
