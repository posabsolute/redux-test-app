import { SPRINTS_LIST_FETCH, SPRINTS_CLEAR } from 'actions/types/sprints.types';

export function sprints(state = [], action) {
  switch (action.type) {

  case SPRINTS_LIST_FETCH:
    return [...action.data];

  case SPRINTS_CLEAR:
    return [];

  default:
    return state;
  }
}
