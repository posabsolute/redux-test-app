import { createSelector } from 'reselect';

const issuesSelector = (state) => state.sprint.issues;
const searchIssuesSelector = (state) => state.search.results;

export const issuesListSelector = createSelector(
  [ issuesSelector, searchIssuesSelector ],
  (issues, searchIssues) => {
    return {
      stories: issues.filter(issue => issue.fields.customfield_10004),
      otherIssues: issues.filter(issue => !issue.fields.customfield_10004),
      searchResults: searchIssues.sort((issueA, issueB) => new Date(issueB.created) - new Date(issueA.created)) || [],
    };
  }
);
