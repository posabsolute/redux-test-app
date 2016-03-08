import {SIDEBAR__HIDE, SIDEBAR__HIDED, SIDEBAR__SHOW} from '../actions/types/sidebar.types';

const initialState = {
  type: '',
  status: 'hidden',
};

export function sidebarReducer(state = initialState, action) {
  switch (action.type) {
  case SIDEBAR__SHOW:
    return {
      ...state,
      status: 'show',
    };

  case SIDEBAR__HIDE:
    return {
      ...state,
      status: 'hide',
    };

  case SIDEBAR__HIDED:
    return {
      ...state,
      status: 'hidden',
    };

  default:
    return state;
  }
}
