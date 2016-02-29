import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { bindActionCreators } from 'redux';
import 'bootstrap-webpack';

import {GrowlerContainer} from 'flash-notification-react-redux';
import GrowlerMessages from 'locales/growler.locale.js';
import Header from 'components/header/header.jsx';
import Sidebar from 'components/sidebar/sidebar.js';
import BottomBar from 'components/bottombar/bottom-bar.jsx';

import * as sidebarActions from 'actions/sidebar.action';
import * as projectActions from 'actions/projects.action';
import * as bottomBarActions from 'actions/bottom-bar.action';
import * as pageActions from 'actions/page.action';

/* global styles for app */
import 'style!./styles/app.scss';
const mapStateToProps = (state) => {
  return {
    pageStore: state.page,
    bottomBarStore: state.bottomBar,
    routing: state.routing,
    userStore: state.user,
    configs: state.configs,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(bottomBarActions, dispatch),
    ...bindActionCreators(sidebarActions, dispatch),
    ...bindActionCreators(projectActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    logout() {
      dispatch(updatePath(`/login`));
      this.props.clearProjects();
      this.props.hideSidebar();
    },
    goBack() {
      dispatch(updatePath(this.props.configs.pages.last.path));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }
  componentWillMount() {
    const project = this.props.configs.project;
    if (project.id) {
      this.props.selectProject(project);
      this.props.fetchProjectConfig(project.id);
    }
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        hideSidebar: this.props.hideSidebar,
        showSidebar: this.props.showSidebar,
        routing: this.props.routing,
        configs: this.props.configs,
        hideBottomBar: this.props.hideBottomBar,
        showSprintBottomBar: this.props.showSprintBottomBar,
        showSprintsListBottomBar: this.props.showSprintsListBottomBar,
      });
    });
    return (
      <section>
        <GrowlerContainer messages={GrowlerMessages} showFor={3000} currentLocale="enUS" />
        <Header
          title={this.props.pageStore.titleSmall}
          menuLeftClick={this.props.showSidebar}
          goBack={this.props.goBack.bind(this)}
          back={this.props.pageStore.back}
        />
        <Sidebar {...this.props}/>
        <div className="container">{childrenWithProps}</div>
        { this.props.bottomBarStore.status === 'show' ?
          <BottomBar page={this.props.params} buttons={this.props.bottomBarStore.buttons} onClick={this.props.redirectBottomBar} />
          : null }
      </section>
    );
  }
}

App.propTypes = {
  bottomBarStore: React.PropTypes.object,
  routing: React.PropTypes.object,
  configs: React.PropTypes.object,
  pageStore: React.PropTypes.object,
  selectProject: React.PropTypes.func,
  showSidebar: React.PropTypes.func,
  fetchProjectConfig: React.PropTypes.func,
  goBack: React.PropTypes.func,
  hideBottomBar: React.PropTypes.func,
  logout: React.PropTypes.func,
  redirectBottomBar: React.PropTypes.func,
  showSprintBottomBar: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  params: React.PropTypes.object,
  hideSidebar: React.PropTypes.func,
  userStore: React.PropTypes.object,
  sidebarStore: React.PropTypes.object,
};
