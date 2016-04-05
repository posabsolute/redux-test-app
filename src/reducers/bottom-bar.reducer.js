import {BOTTOM_BAR__ACTIONS, BOTTOM_BAR__CLEAR} from '../actions/types/bottom-bar.types';

const initialState = {
  buttons: [],
  status: 'hide',
};

export function bottomBarReducer(state = initialState, action) {
  switch (action.type) {

  case BOTTOM_BAR__ACTIONS:
    let buttons = action.buttons;
    if (action.active) {
      buttons = action.buttons.map((button) => {
        button.status = (action.active === button.id) ? 'active' : '';
        return button;
      });
    }
    return {
      buttons,
      status: 'show',
    };

  case BOTTOM_BAR__CLEAR:
    return {...initialState};

  default:
    return state;
  }
}
