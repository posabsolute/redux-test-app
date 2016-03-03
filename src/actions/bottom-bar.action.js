import {BOTTOM_BAR__ACTIONS, BOTTOM_BAR__CLEAR} from './types/bottom-bar.types';
import {sprintButtons, sprintsListButtons} from './configs/bottom-bar.configs';
import { updatePath } from 'redux-simple-router';


export function showBottomBar(actions) {
  return {
    type: BOTTOM_BAR__ACTIONS,
    buttons: actions,
  };
}


export function redirectBottomBar(button, page) {
  return dispatch => {
    return dispatch(updatePath(button.link(page.id)));
  };
}


export function showSprintBottomBar(activeButtons) {
  return {
    type: BOTTOM_BAR__ACTIONS,
    buttons: sprintButtons,
    active: activeButtons,
  };
}

export function showSprintsListBottomBar(activeButtons) {
  return {
    type: BOTTOM_BAR__ACTIONS,
    buttons: sprintsListButtons,
    active: activeButtons,
  };
}


export function hideBottomBar() {
  return {type: BOTTOM_BAR__CLEAR};
}
