import { PAGE_CHANGE_TITLE } from 'actions/types/page.types';
import { PROJECT_SELECTED, PROJECT_CONFIG_FETCH } from 'actions/types/projects.types';

const projectStore = localStorage.getItem('project') && JSON.parse(localStorage.getItem('project'));
const boardStore = localStorage.getItem('board') && JSON.parse(localStorage.getItem('board'));

const initialState = {
  pages: {
    last: {},
    current: {},
    last5: [],
  },
  project: projectStore || {},
  board: {
    estimation: {field:{}},
  },
};

export function configs(state = initialState, action) {

  switch (action.type) {

  case PAGE_CHANGE_TITLE:

    const last5 = [...state.pages.last5];
    last5.unshift(action.data);
    if (last5.length > 5) {
      last5.pop();
    }

    return {
      ...state,
      pages: {
        last: {
          ...state.pages.current,
        },
        current: {
          ...action.data,
        },
        last5: last5,
      },
    };

  case PROJECT_SELECTED:
    return {
      ...state,
      project: {
        ...action.data,
      },
    };

  case PROJECT_CONFIG_FETCH:
    return {
      ...state,
      board: {
        ...action.data,
      },
    };

  default:
    return state;
  }
}
