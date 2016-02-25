import { SPRINT_ISSUES_FETCH, SPRINT_FETCH, REPORT_FETCH } from 'actions/types/sprints.types';

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

  case SPRINT_ISSUES_FETCH:
    const issues = action.data;
    const storyPointsArray = issues.map(issue=> issue.fields.customfield_10004 ? issue.fields.customfield_10004 : 0);
    if (storyPointsArray.length) {
      const storyPoints = storyPointsArray.reduce((spa, spb) => parseInt(spa, 10) + parseInt(spb, 10));
      return {
        ...state,
        issues: action.data,
        storyPoints,
      };
    }
    return state;

  default:
    return state;
  }
}
