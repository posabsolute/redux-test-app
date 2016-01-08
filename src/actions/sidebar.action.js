import {SIDEBAR__HIDE, SIDEBAR__HIDED, SIDEBAR__SHOW} from './types/sidebar.types';
/*
 * action creators
 */
export function hideSidebar() {
  return dispatch => {
    dispatch({ type: SIDEBAR__HIDE });
    window.setTimeout(() =>{
      dispatch({
        type: SIDEBAR__HIDED,
      });
    }, 500);
  };
}

export function showSidebar() {
  return {type: SIDEBAR__SHOW};
}
