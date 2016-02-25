import {BOTTOM_BAR__ACTIONS, BOTTOM_BAR__CLEAR} from '../actions/types/bottom-bar.types';

const initialState = {
  buttons:[],
  status: 'show',
};

export function bottomBarReducer(state = initialState, action) {
  switch (action.type) {
  case BOTTOM_BAR__ACTIONS:

    let buttons = [];
    if(action.active){
      action.buttons.map((button) => {
        button.status = (action.active === button.id) ? 'active' : '';
      })
    }

    return {
      buttons: action.buttons,
      status: 'show',
    };

  case BOTTOM_BAR__CLEAR:
    return initialState;

  default:
    return state;
  }
}

/*
  example:
  [
    {
      icon:'icon-settings',
      label:'settings',
      link:'/settings'
    }

  ]



 */