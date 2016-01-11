import { SPRINTS_LIST_FETCH, SPRINT_ISSUES_FETCH, SPRINT_UPDATE_POINTS } from 'actions/types/sprints.types';

export function sprints(state = [], action) {
  switch (action.type) {

  case SPRINTS_LIST_FETCH:
    return action.data;

  case SPRINT_ISSUES_FETCH:
    return state.map( sprint => {
      if (sprint.id === action.id) {
        const issues = sprint.issues;
        const storyPointsArray = Object.keys(issues).map(issue=>issues[issue].fields.customfield_10004);
        const storyPoints = storyPointsArray.reduce((spa, spb) => parseInt(spa, 10) + parseInt(spb, 10));

        return {
          ...sprint,
          issues: action.issues,
          storyPoints,
        };
      }
      return sprint;
    });

  case SPRINT_UPDATE_POINTS:
    return state.map( sprint => {

      if (sprint.id === action.id) {
        const issues = sprint.issues;
        const storyPointsArray = Object.keys(issues).map(issue=>issues[issue].fields.customfield_10004);
        const storyPoints = storyPointsArray.reduce((spa, spb) => parseInt(spa, 10) + parseInt(spb, 10));
        return {
          ...sprint,
          storyPoints,
        };
      }
      return sprint;
    });

  default:
    return state;
  }
}
