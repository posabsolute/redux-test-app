import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';
import { bindActionCreators } from 'redux';
import 'bootstrap-webpack';

import {GrowlerContainer} from 'flash-notification-react-redux';
import GrowlerMessages from 'locales/growler.locale.js';
import Header from 'components/header/header.jsx';
import Sidebar from 'components/sidebar/sidebar.jsx';
import BottomBar from 'components/bottombar/bottom-bar.jsx';

import * as sidebarActions from 'actions/sidebar.action';
import * as bottomBarActions from 'actions/bottom-bar.action';
import * as pageActions from 'actions/page.action';

/* global styles for app */
import 'style!./styles/app.scss';
const mapStateToProps = (state) => {
  return {
    pageStore: state.page,
    bottomBarStore: state.bottomBar,
    userStore: state.user,
    projectsStore: state.projects,
    sidebarStore: state.sidebar,
    validationStore: state.validation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(bottomBarActions, dispatch),
    ...bindActionCreators(sidebarActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    logout() {
      dispatch(updatePath(`/login`));
      this.props.hideSidebar();
    },
    loadSprints: (project, hideSidebar) => {
      dispatch(updatePath(`/projects/${project.id}/sprints/index`));
      hideSidebar();
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        hideSidebar: this.props.hideSidebar,
        showSidebar: this.props.showSidebar,
        hideBottomBar: this.props.hideBottomBar,
        showSprintBottomBar: this.props.showSprintBottomBar,
        showSprintsListBottomBar: this.props.showSprintsListBottomBar,
      });
    });

    return (
      <section>
        <GrowlerContainer messages={GrowlerMessages} showFor={3000} currentLocale="enUS" />
        <Header title={this.props.pageStore.titleSmall} menuLeftClick={this.props.showSidebar} />
        <Sidebar
          list={this.props.projectsStore}
          listClick={this.props.loadSprints}
          status={this.props.sidebarStore.status}
          user={this.props.userStore}
          hideSidebar={this.props.hideSidebar}
          logout={this.props.logout.bind(this)}
        />
        <div className="container">{childrenWithProps}</div>
        { this.props.bottomBarStore.status === 'show' &&
          <BottomBar page={this.props.params} buttons={this.props.bottomBarStore.buttons} onClick={this.props.redirectBottomBar} />
        }
      </section>
    );
  }
}

App.propTypes = {
  bottomBarStore: React.PropTypes.object,
  pageStore: React.PropTypes.object,
  showSidebar: React.PropTypes.func,
  hideBottomBar: React.PropTypes.func,
  logout: React.PropTypes.func,
  redirectBottomBar: React.PropTypes.func,
  showSprintBottomBar: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  params: React.PropTypes.object,
  hideSidebar: React.PropTypes.func,
  userStore: React.PropTypes.object,
  projectsStore: React.PropTypes.array,
  sidebarStore: React.PropTypes.object,
};
