import { PROJECT_LIST_FETCH } from 'actions/types/projects.types';

export function projects(state = [], action) {
  switch (action.type) {

  case PROJECT_LIST_FETCH:
    return action.data;

  default:
    return state;
  }
}
