import { createSelector } from 'reselect';

const sprintSelector = (state) => state.sprint;
const scopeSelector = (state) => state.burndown;

export const devWorkSelector = createSelector(
  [ sprintSelector, scopeSelector ],
  (sprint, scope) => {
    return {
      devsWorkDataset: getDevsWork(sprint, scope),
    };
  }
);

let dataset = {};
let doneIssues = {};
let reopenedIssues = {};

function getDevsWork(sprint, scope) {
  dataset = {};
  doneIssues = {};
  reopenedIssues = {};

  sprint.completedIssues.map((issue) => {
    addDevPoints(issue);
  });
  trackOtherIssuesPerDev(sprint);
  trackReopenedPerDev(scope);

  const devs = Object.keys(dataset)
    .filter(dev => dataset[dev].completedIssues > 0)
    .sort((first, next) => dataset[next].completedIssues - dataset[first].completedIssues);

  const finalDataset = devs.map(dev => dataset[dev]);
  return finalDataset;
}

function defaultDev(name) {
  return {
    assigneeName: name,
    completedIssues: 0,
    reopenedIssues: 0,
    issues: {},
    storyPoints: 0,
  }
}

function addDevPoints(issue) {
  if (issue.assignee) {
    let dev = dataset[issue.assignee] || defaultDev(issue.assigneeName);
    const points = issue && issue.estimateStatistic && issue.estimateStatistic.statFieldValue.value || 0;

    dataset[issue.assignee] = {
      ...dev,
      completedIssues: dev.completedIssues + 1,
      issues: {
        ...dev.issues,
        [issue.key]: issue,
      },
      storyPoints: dev.storyPoints + points,
    };
  }
}

function trackOtherIssuesPerDev(sprint){
  sprint.puntedIssues.map((issue) => {
    let dev = dataset[issue.assignee] || defaultDev(issue.assigneeName);

    dataset[issue.assignee] = {
      ...dev,
      issues: {
        ...dev.issues,
        [issue.key]: issue,
      },
    };
  });
}

function trackReopenedPerDev(scope) {
  const changes = Object.keys(scope.changes);
  const changesAfterStartDate = changes.filter(el => el > scope.startTime);

  changesAfterStartDate.forEach((changeIssue) => {
    const changeSet = scope.changes[changeIssue][0];
    const changeSetDone = doneIssues[changeSet.key];

    if (isDone(changeSet)) {
      doneIssues[changeSet.key] = changeSet;
    }

    if(changeSetDone && isDone(changeSetDone) && notDone(changeSet)){
      reopenedIssues[changeSet.key] = changeSet.key;
    }

  });

  Object.keys(reopenedIssues).forEach((issue) => {
    Object.keys(dataset).forEach((dev) => {
      if (dataset[dev].issues[issue]) {
        dataset[dev].reopenedIssues += 1;
      }
    });
  });
}

function notDone(obj){
  if (obj.column && (obj.column.done === false || obj.column.notDone === true)) {
    return true;
  }
  return false;
}

function isDone(obj){
  if (obj.column && (obj.column.done === true || obj.column.notDone === false)) {
    return true;
  }
  return false;
}
