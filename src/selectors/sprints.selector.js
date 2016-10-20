import { createSelector } from 'reselect';

const sprintsSelector = (state) => state.sprints;

export const sprintsListSelector = createSelector(
  [ sprintsSelector ],
  (sprints) => {
  	const sprintsClosed = sprints.filter(sprint => sprint.state === 'closed');
    return {
      sprintsClosed,
      sprintsActive: sprints.filter(sprint => sprint.state === 'active'),
      sprintsClosedByDate: sprintsClosed.sort((sprintA, sprintB) => new Date(sprintB.completeDate) - new Date(sprintA.completeDate)) || [],
    };
  }
);
