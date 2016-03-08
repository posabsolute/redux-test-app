import { createSelector } from 'reselect';

const sprintsSelector = (state) => state.sprints;

export const sprintsListSelector = createSelector(
  [ sprintsSelector ],
  (sprints) => {
    return {
      sprintsByDate: sprints.sort((sprintA, sprintB) => new Date(sprintB.completeDate) - new Date(sprintA.completeDate)) || [],
    };
  }
);
