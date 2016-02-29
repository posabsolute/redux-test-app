import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from 'containers/App';
import Login from 'containers/login.js';
import ProjectList from 'containers/projects.js';

import SprintsContainer from 'containers/sprints-list/index.js';
import SprintsList from 'containers/sprints-list/sprints.js';
import Velocity from 'containers/sprints-list/velocity.js';

import SprintContainer from 'containers/sprint/index.js';
import Sprint from 'containers/sprint/sprint.js';
import Burndown from 'containers/sprint/burndown.js';
import SprintDevWork from 'containers/sprint/developers.js';

import Issue from 'containers/issue.js';
import SearchIssue from 'containers/search.js';


export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="projects" component={ProjectList} title="Your Projects" titleSmall="Projects" />

    <Route path="projects/:id/sprints" component={SprintsContainer}>
      <Route path="index" component={SprintsList} />
      <Route path="velocity" component={Velocity} />
    </Route>

    <Route path="sprint/:id" component={SprintContainer}>
      <Route path="developers" component={SprintDevWork} />
      <Route path="burndown" component={Burndown} />
      <Route path="index" component={Sprint} />
    </Route>

    <Route path="search/issues" component={SearchIssue} />
    <Route path="search/issues/:query" component={SearchIssue} />
    <Route path="issue/:id" component={Issue} />
  </Route>
);

