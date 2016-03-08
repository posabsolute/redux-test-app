import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import SidebarComponent from './sidebar.jsx';

import * as sidebarActions from 'actions/sidebar.action';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    sidebarStore: state.sidebar,
    configs: state.configs,
  };
};

const mapDispatchToProps = (
  dispatch,
) => {
  return {
    ...bindActionCreators(sidebarActions, dispatch),
    redirect(link) {
      dispatch(push(link));
    },
    loadSprints() {
      this.props.redirect(`/projects/${this.props.configs.project.id}/sprints/index`);
      this.props.hideSidebar();
    },
    loadProjects() {
      this.props.redirect(`/projects/`);
      this.props.hideSidebar();
    },
    onSubmit(evt) {
      const searchValue = evt.target.elements[0].value;
      this.props.hideSidebar();
      dispatch(push(`/search/issues/${searchValue}`));
    },
  };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class Sidebar extends React.Component {
  componentWillMount() {

  }
  render() {
    return (
      <SidebarComponent
      onSubmit={this.props.onSubmit.bind(this)}
      loadSprints={this.props.loadSprints.bind(this)}
      loadProjects={this.props.loadProjects.bind(this)}
      status={this.props.sidebarStore.status}
      user={this.props.user}
      last5={this.props.configs.pages.last5}
      configs={this.props.configs}
      hideSidebar={this.props.hideSidebar}
      logout={this.props.logout.bind(this)}
      />
    );
  }
}


Sidebar.propTypes = {
  onSubmit: React.PropTypes.func,
  user: React.PropTypes.object,
  configs: React.PropTypes.object,
  sidebarStore: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  loadProjects: React.PropTypes.func,
  logout: React.PropTypes.func,
  hideSidebar: React.PropTypes.func,
  userStore: React.PropTypes.object,
};

