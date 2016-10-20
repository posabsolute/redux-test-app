/**
 * Create notification
 */
export default store => next => action => {
  const beforeSprints = store.getState().sprints;
  const result = next(action);
  if (action.notification === true) {
    const afterSprint = store.getState().sprints;

    if (window.cordova && beforeSprints.length && afterSprint.length) {
      if (beforeSprints[0].name !== afterSprint[0].name) {
        window.cordova.plugins.notification.local.schedule({
          title: 'New Sprint Closed',
          text: afterSprint[0].name,
        });
      }
    }
  }
  return result;
};
