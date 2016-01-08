import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from 'containers/App';
import Login from 'components/login/login.js';
import ProjectList from 'components/projectlist/projectlist.js';
import SprintsList from 'components/sprints/sprints.js';
import Sprint from 'components/sprint/sprint.js';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="projects" component={ProjectList} title="Your Projects" titleSmall="Projects" />
    <Route path="projects/:id/sprints" component={SprintsList} itle="Your Sprints" titleSmall="Sprints" />
    <Route path="sprint/:id" component={Sprint} />
  </Route>
);
