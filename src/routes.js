import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from 'containers/App';
import Login from 'containers/login.js';
import ProjectList from 'containers/projects.js';
import SprintsList from 'containers/sprints.js';
import Sprint from 'containers/sprint.js';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="projects" component={ProjectList} title="Your Projects" titleSmall="Projects" />
    <Route path="projects/:id/sprints" component={SprintsList} title="Your Sprints" titleSmall="Sprints" />
    <Route path="sprint/:id" component={Sprint} />
  </Route>
);
