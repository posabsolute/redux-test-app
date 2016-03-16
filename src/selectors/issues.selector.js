import { createSelector } from 'reselect';

const issuesSelector = (state) => state.sprint.completedIssues;
const searchIssuesSelector = (state) => state.search.results;

export const issuesListSelector = createSelector(
  [ issuesSelector, searchIssuesSelector ],
  (issues, searchIssues) => {
    return {
      stories: issues.filter(issue => issue.currentEstimateStatistic),
      otherIssues: issues.length ? issues.filter(issue => !issue.currentEstimateStatistic) : null,
      searchResults: searchIssues.sort((issueA, issueB) => new Date(issueB.created) - new Date(issueA.created)) || [],
    };
  }
);
