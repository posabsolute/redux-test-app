import { createSelector } from 'reselect';

const velocitySelector = (state) => state.velocity;

export const sprintsVelocitySelector = createSelector(
  [ velocitySelector ],
  (velocity) => {
    return {
      formattedVelocity: getVelocity(velocity),
    };
  }
);


function getVelocity(velocity){
  const labels = getLabels(velocity);
  const estimatedPoints = getPoints(velocity.velocityStatEntries, 'estimated');
  const actualPoints = getPoints(velocity.velocityStatEntries, 'completed');

  return {
    labels,
    estimatedPoints,
    actualPoints,
  };
}

function getLabels(velocity) {
  let labels = [];
  Object.keys(velocity.sprints).forEach(issue => {
    labels.push(velocity.sprints[issue].name);
  });
  return labels.reverse();
}

function getPoints(velocity, type) {
  let points = [];
  Object.keys(velocity).forEach(issue => {
    points.push(velocity[issue][type].value);
  });
  return points;
}

