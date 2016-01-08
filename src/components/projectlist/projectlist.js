import React from 'react';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';
import { connect } from 'react-redux';
import ProjectListComponent from './projectlist.jsx';
import * as projectsActions from 'actions/projects.action';
import * as pageActions from 'actions/page.action';

const mapStateToProps = state => ({projects: state.projects});
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(projectsActions, dispatch),
    loadSprints: (project) => {
      dispatch(updatePath(`/projects/${project.id}/sprints`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectListContainer extends React.Component {
  componentWillMount() {
    this.props.fetchProjects();
    this.props.updatePageTitle('Your Projects', 'Projects');
  }
  render() {
    return <ProjectListComponent {...this.props} />;
  }
}

ProjectListContainer.propTypes = {
  fetchProjects: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
};
