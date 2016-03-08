import {PAGE_CHANGE_TITLE, PAGE_BACK} from '../actions/types/page.types';

const initialState = {
  titleSmall: '',
  title: '',
  back: false,
};

export function PageReducer(state = initialState, action) {
  switch (action.type) {
  case PAGE_CHANGE_TITLE:
    return {
      ...state,
      ...action.data,
    };

  case PAGE_BACK:
    return {
      ...state,
      ...action.data,
    };

  default:
    return state;
  }
}
