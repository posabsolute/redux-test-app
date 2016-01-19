import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import {reducer as formReducer} from 'redux-form';
import { user } from './user.reducer';
import { GrowlerReducer } from 'flash-notification-react-redux';
import { projects } from './projects.reducer';
import { sprints } from './sprints.reducer';
import { sprint } from './sprint.reducer';
import { sidebarReducer } from './sidebar.reducer';
import { validation } from './validation.reducer';
import { PageReducer } from './page.reducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routeReducer,
  /* your reducers */
  user,
  page: PageReducer,
  growler: GrowlerReducer,
  sidebar: sidebarReducer,
  validation,
  projects,
  sprints,
  sprint,
});

export default rootReducer;
