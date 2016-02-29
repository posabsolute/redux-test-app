import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import { user } from './user.reducer';
import { GrowlerReducer } from 'flash-notification-react-redux';
import { projects } from './projects.reducer';
import { sprints } from './sprints.reducer';
import { sprint } from './sprint.reducer';
import { issue } from './issue.reducer';
import { search } from './search.reducer';
import { devs } from './dev.reducer';
import { configs } from './configs.reducer';
import { burndown } from './burndown.reducer';
import { velocity } from './velocity.reducer';
import { bottomBarReducer } from './bottom-bar.reducer';
import { sidebarReducer } from './sidebar.reducer';
import { validateReducer } from 'redux-form-validator';
import { PageReducer } from './page.reducer';

const rootReducer = combineReducers({
  routing: routeReducer,
  page: PageReducer,
  growler: GrowlerReducer,
  sidebar: sidebarReducer,
  validate: validateReducer,
  bottomBar: bottomBarReducer,
  user,
  devs,
  burndown,
  configs,
  velocity,
  projects,
  sprints,
  sprint,
  issue,
  search,
});

export default rootReducer;
