import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push, routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import 'bootstrap-webpack';
//import 'react-fastclick';

import {GrowlerContainer} from 'flash-notification-react-redux';
import GrowlerMessages from 'locales/growler.locale.js';
import Header from 'components/header/header.jsx';
import Sidebar from 'components/sidebar/sidebar.js';

import * as sidebarActions from 'actions/sidebar.action';
import * as projectActions from 'actions/projects.action';
import * as pageActions from 'actions/page.action';


function onDeviceReady() {
  window.open = window.cordova.InAppBrowser.open;
}
document.addEventListener('deviceready', onDeviceReady, false);


/* global styles for app */
import 'style!./styles/app.scss';
const mapStateToProps = (state) => {
  return {
    pageStore: state.page,
    configs: state.configs,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(sidebarActions, dispatch),
    ...bindActionCreators(projectActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(routerActions, dispatch),
    logout() {
      dispatch(push(`/login`));
      this.props.clearProjects();
      this.props.hideSidebar();
    },
    goBack() {
      this.props.go(-1);
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any,
  }
  componentWillMount() {
    this.fetchProject();
    this.setupNative();
  }

  setupNative() {
  }

  fetchProject() {
    const project = this.props.configs.project;
    if (project.id) {
      this.props.selectProject(project);
      this.props.fetchProjectConfig(project.id).then((config) => {
        if (config) {
          localStorage.setItem('board', JSON.stringify(config));
        }
      });
    }
  }

  render() {
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
        <div className="container">{this.props.children}</div>
      </section>
    );
  }
}

App.propTypes = {
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
  sidebarStore: React.PropTypes.object,
};
