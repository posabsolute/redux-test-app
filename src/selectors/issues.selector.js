import { createSelector } from 'reselect';

const issuesSelector = (state) => state.sprint.issues;

export const issuesListSelector = createSelector(
  [ issuesSelector ],
  (issues) => {
    return {
      stories: issues.filter(issue => issue.fields.customfield_10004),
      otherIssues: issues.filter(issue => !issue.fields.customfield_10004),
    };
  }
);
