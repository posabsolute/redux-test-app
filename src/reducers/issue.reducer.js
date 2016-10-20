import { ISSUE_FETCH, ISSUE_USERS_FETCH, ISSUE_CLEAR, ISSUE_UPDATE_USER, ISSUE_UPDATE_DESCRIPTION, ISSUE_UPDATE_SUMMARY, ISSUE_UPDATE_PRIORITY, ISSUE_UPDATE_STATUS } from 'actions/types/issue.types';

const initialState = {
  priority: {},
  assignee: {
    displayName: 'Unassigned',
  },
  status:{},
  assignable: [],
  assignableNames: [],
  self:'',
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
    var transitions = action.data.transitions || [];
    const transitionsName = transitions.map(transition => transition.to.name);
    return {
      ...state,
      ...action.data,
      transitionsName,
    };

  case ISSUE_USERS_FETCH:
    const assignableNames = action.data.map(user => user.displayName);
    return {
      ...state,
      assignableNames,
      'assignable': [...action.data],
    };

  case ISSUE_CLEAR:
    return initialState;

  case ISSUE_UPDATE_USER:
    return {
      ...state,
      assignee: {...action.data},
    };

  case ISSUE_UPDATE_PRIORITY:
    return {
      ...state,
      priority: {...action.data},
    };

  case ISSUE_UPDATE_STATUS:
    return {
      ...state,
      status: {...action.data},
    };

  case ISSUE_UPDATE_SUMMARY:
    return {
      ...state,
      summary: action.data,
    };

  case ISSUE_UPDATE_DESCRIPTION:
    return {
      ...state,
      description: action.data,
    };

  default:
    return state;
  }
}
