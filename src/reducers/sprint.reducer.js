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
    const issues = state.issues;
    const storyPointsArray = Object.keys(issues).map(issue=>issues[issue].fields.customfield_10004);
    const storyPoints = storyPointsArray.reduce((spa, spb) => parseInt(spa, 10) + parseInt(spb, 10));
    return {
      ...state,
      issues: action.data,
      storyPoints,
    };

  default:
    return state;
  }
}
