import { SPRINT_FETCH, REPORT_FETCH, SPRINT_CLEAR } from 'actions/types/sprints.types';

const initialState = {
  issues: [],
  puntedIssues: [],
  completedIssues: [],
  issuesNotCompletedInCurrentSprint: [],
};

export function sprint(state = initialState, action) {
  switch (action.type) {

  case REPORT_FETCH:
    let users = getUsers(action.data.contents);
    let statuses = getStatuses(action.data.contents);
    return {
      ...state,
      ...action.data.contents,
      statuses,
      users,
    };

  case SPRINT_FETCH:
    return {
      issues: [],
      ...state,
      ...action.data,
    };

  case SPRINT_CLEAR:
    return initialState;

  default:
    return state;
  }
}

function getIssues(sprint){
  let issues = [];
  if(sprint.issuesNotCompletedInCurrentSprint || sprint.completedIssues){
    issues = sprint.completedIssues.concat(sprint.issuesNotCompletedInCurrentSprint);
  }
  return issues;
}

function getUsers(sprint){
  const issues = getIssues(sprint);
  return issues.map(issue => issue.assigneeName).filter(user => user !== undefined).filter((elem, pos, arr) => arr.indexOf(elem) == pos);
}

function getStatuses(sprint){
  const issues = getIssues(sprint);
  return issues.map(issue => issue.statusName).filter((elem, pos, arr) => arr.indexOf(elem) == pos);
}