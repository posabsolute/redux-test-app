import { PROJECT_LIST_FETCH, PROJECT_CLEAR } from 'actions/types/projects.types';

export function projects(state = [], action) {
  switch (action.type) {

  case PROJECT_LIST_FETCH:
    return action.data;

  case PROJECT_CLEAR:
    return [];

  default:
    return state;
  }
}
