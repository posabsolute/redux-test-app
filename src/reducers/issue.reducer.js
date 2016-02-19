import { ISSUE_FETCH } from 'actions/types/issue.types';

const initialState = {
  priority: {},
  assignee: {},
  description: '',
  resolution: {},
  closedSprints: [{}],
  comment: {
    comments: [],
  },
};

export function issue(state = initialState, action) {

  switch (action.type) {

  case ISSUE_FETCH:
    return {
      ...state,
      ...action.data,
    };

  default:
    return state;
  }
}
