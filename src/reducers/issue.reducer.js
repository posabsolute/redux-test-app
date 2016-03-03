import { ISSUE_FETCH, ISSUE_CLEAR } from 'actions/types/issue.types';

const initialState = {
  priority: {},
  assignee: {
    displayName: 'Unassigned',
  },
  description: '',
  resolution: {},
  attachment: [],
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

  case ISSUE_CLEAR:
    return initialState;

  default:
    return state;
  }
}
