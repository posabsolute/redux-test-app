import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'bootstrap-webpack';

import {GrowlerContainer} from 'flash-notification-react-redux';
import GrowlerMessages from 'locales/growler.locale.js';
import Header from 'components/header/header.jsx';
import Sidebar from 'components/sidebar/sidebar.jsx';

import * as sidebarActions from 'actions/sidebar.action';
import * as pageActions from 'actions/page.action';

/* global styles for app */
import 'style!./styles/app.scss';
const mapStateToProps = (state) => {
  return {
    pageStore: state.page,
    userStore: state.user,
    projectsStore: state.projects,
    sidebarStore: state.sidebar,
    validationStore: state.validation,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(sidebarActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
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
        });
    });
    return (
      <section>
        <GrowlerContainer messages={GrowlerMessages} showFor={3000} currentLocale="enUS" />
        <Header title={this.props.pageStore.titleSmall} menuLeftClick={this.props.showSidebar} />
        <Sidebar list={this.props.projectsStore} status={this.props.sidebarStore.status} user={this.props.userStore} hideSidebar={this.props.hideSidebar} />
        <div className="container">{childrenWithProps}</div>
      </section>
    );
  }
}

App.propTypes = {
  pageStore: {
    titleSmall: React.PropTypes.string,
  },
  showSidebar: React.PropTypes.func,
  hideSidebar: React.PropTypes.func,
  userStore: React.PropTypes.object,
  projectsStore: React.PropTypes.array,
  sidebarStore: {
    status: React.PropTypes.string,
  },
};
