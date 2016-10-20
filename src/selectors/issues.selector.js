import { createSelector } from 'reselect';

const issuesSelector = (state) => {
	return state.sprint.completedIssues.concat(state.sprint.issuesNotCompletedInCurrentSprint);
}
const searchQuerySelector = (state) => state.search.query;
const searchFiltersSelector = (state) => state.search.filters
const searchIssuesSelector = (state) => state.search.results;

export const issuesListSelector = createSelector(
  [ issuesSelector, searchIssuesSelector, searchQuerySelector, searchFiltersSelector ],
  (issues, searchIssues, searchQuery, searchFilters) => {
    return {
      stories: getStories(issues, searchQuery, searchFilters),
      otherIssues: issues.length ? issues.filter(issue => !issue.currentEstimateStatistic) : null,
      searchResults: searchIssues.sort((issueA, issueB) => new Date(issueB.created) - new Date(issueA.created)) || [],
    };
  }
);


function getStories(issues, searchQuery, searchFilters){
	let stories = issues.filter(issue => issue.currentEstimateStatistic);
	if(searchQuery){
		stories = stories.filter(story => story.summary.toLowerCase().match(searchQuery));
	}
	if(searchFilters && searchFilters['sprint-status']){
		stories = stories.filter(story => story.statusName === searchFilters['sprint-status']);
	}
	if(searchFilters && searchFilters['sprint-user']){
		stories = stories.filter(story => story.assigneeName === searchFilters['sprint-user']);
	}
	return stories;
}


function getOtherIssues(issues, searchQuery){
	let otherIssues = issues.filter(issue => issue.currentEstimateStatistic);
	if(searchQuery){
		otherIssues = stories.filter(story => story.summary.toLowerCase().match(searchQuery));
	}
	return otherIssues;
}