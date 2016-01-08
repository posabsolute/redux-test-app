import {PAGE_CHANGE_TITLE} from '../actions/types/page.types';

const initialState = {
  titleSmall: '',
  title: '',
};

export function PageReducer(state = initialState, action) {
  switch (action.type) {
  case PAGE_CHANGE_TITLE:
    return {
      ...state,
      title: action.title,
      titleSmall: action.titleSmall,
    };

  default:
    return state;
  }
}
