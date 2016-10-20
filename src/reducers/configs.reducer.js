import { PAGE_CHANGE_TITLE } from 'actions/types/page.types';
import { PROJECT_SELECTED, PROJECT_CONFIG_FETCH, PROJECT_PRIORITIES_FETCH } from 'actions/types/projects.types';
import { CONFIG_CLEAR } from 'actions/types/configs.types';

const projectStore = localStorage.getItem('project') && JSON.parse(localStorage.getItem('project'));

const initialState = {
  pages: {
    last: {},
    current: {},
    last5: [],
  },
  priorities: [],
  prioritiesName: [],
  project: projectStore || {},
  board: {
    estimation: {field: {}},
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

  case PROJECT_PRIORITIES_FETCH:
    const prioritiesName = action.data.map(priority => priority.name);
    return {
      ...state,
      priorities:[...action.data],
      prioritiesName:[...prioritiesName],
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

  case CONFIG_CLEAR:
    return {...initialState};

  default:
    return state;
  }
}
