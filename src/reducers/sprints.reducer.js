import { SPRINTS_LIST_FETCH, SPRINT_ISSUES_FETCH } from 'actions/types/sprints.types';

export function sprints(state = [], action) {
  switch (action.type) {

  case SPRINTS_LIST_FETCH:
    return action.data;

  case SPRINT_ISSUES_FETCH:
    return state.map( sprint =>
      sprint.id === action.id ? {
        ...sprint,
        issues: action.issues,
      } : sprint
    );

  default:
    return state;
  }
}
