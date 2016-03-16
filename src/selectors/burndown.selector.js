import { createSelector } from 'reselect';

const dataSelector = (state) => state.burndown;

export const burndownSelector = createSelector(
  [ dataSelector ],
  (issues) => {
    return {
      daysTimestamp: getDates(issues.startTime, issues.completeTime),
      valuesPerDay: getValuesPerDay(issues),
    };
  }
);

function getValuesPerDay(issues) {
  const issuesByDate = {};
  const valuesByDay = [];
  const issuesInSprint = {};
  const issuesList = {};
  const daysInSprint = getDates(issues.startTime, issues.completeTime);

  Object.keys(issues.changes).forEach((issueDate) => {
    let currentDate = new Date(parseInt(issueDate, 10));
    currentDate = Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24));
    issuesByDate[currentDate] = issuesByDate[currentDate] || [];
    issuesByDate[currentDate].push(issues.changes[issueDate]);
  });

  let fullValue = 0;

  Object.keys(issuesByDate).every((issueByDate) => {
    if (parseInt(issueByDate, 10) === parseInt(daysInSprint[0], 10)) {
      return false;
    }
    const issuesDay = issuesByDate[issueByDate];
    issuesDay.map((scope) =>{
      const currentScope = scope && scope[0] || {};
      const issuesListScope = issuesList[currentScope.key] || {};
      const newValue = getNewValue(currentScope);
      const oldValue = getOldValue(currentScope);
      const issueValue = getNewValue(issuesListScope);

      if (oldValue) {
        const value = newValue - oldValue;
        fullValue += value;
      }

      if (!oldValue && newValue) {
        const value = newValue - issueValue;
        fullValue += value;
      }

      if (isDone(currentScope)) {
        fullValue = fullValue - issueValue;
      }

      if (isRemoved(currentScope)) {
        fullValue = fullValue - issueValue;
      }

      if (isDone(issuesListScope) && !isDone(currentScope)) {
        fullValue = fullValue + issueValue;
      }

      issuesList[currentScope.key] = {
        ...issuesList[currentScope.key],
        ...currentScope,
      };
    });

    if (parseInt(issueByDate, 10) !== parseInt(daysInSprint[0], 10)) {
      return true;
    }
  });

  daysInSprint.map((day) => {
    const issuesDay = issuesByDate[day] || [];

    issuesDay.map((scope) =>{
      const currentScope = scope && scope[0] || {};
      const issuesListScope = issuesList[currentScope.key] || {};
      const newValue = getNewValue(currentScope);
      const oldValue = getOldValue(currentScope);
      const issueValue = getNewValue(issuesListScope);

      if (oldValue) {
        const value = newValue - issueValue;
        fullValue += value;
      }

      if (!oldValue && newValue) {
        console.log(issuesListScope);
        const value = newValue - issueValue;
        fullValue += value;
      }

      if (isDone(currentScope)) {

        fullValue = fullValue - issueValue;
      }

      if (isRemoved(currentScope)) {
        fullValue = fullValue - issueValue;
      }

      if (isDone(issuesListScope) && !isDone(currentScope)) {
        fullValue = fullValue + issueValue;
      }

      issuesList[currentScope.key] = {
        ...issuesList[currentScope.key],
        ...currentScope,
      };
    });
    fullValue = fullValue < 0 ? 0 : fullValue;
    valuesByDay.push(fullValue);
  });
  console.log(valuesByDay);
  return valuesByDay;
}

function getNewValue(obj){
  if (obj && obj.statC && obj.statC.newValue) {
    return obj.statC.newValue;
  }
  return 0;
}

function getOldValue(obj){
  if (obj && obj.statC && obj.statC.oldValue) {
    return obj.statC.oldValue;
  }
  return 0;
}

function isDone(obj){
  if (obj.column && (obj.column.done === true || obj.column.notDone === false)) {
    return true;
  }
  return false;
}

function isRemoved(obj){
  if (obj.added === false) {
    return true;
  }
  return false;
}


function getDates(startDate, stopDate) {
  let dateArray = [];

  let currentDate = new Date(startDate);
  while (currentDate <= stopDate) {
    dateArray.push(Math.floor(currentDate.getTime() / (1000 * 60 * 60 * 24)));
    currentDate = addDays(currentDate, 1);
  }
  return dateArray;
}

function removeDays(currentDate, days) {
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate;
}

function addDays(currentDate, days) {
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate;
}
