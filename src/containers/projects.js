import React from 'react';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';
import { connect } from 'react-redux';
import List from 'components/list/list-container';
import HeaderSection from 'components/header-section/header-section.jsx';
import * as projectsActions from 'actions/projects.action';
import * as pageActions from 'actions/page.action';
import PageWrapper from 'components/page-wrapper';

const mapStateToProps = state => ({projects: state.projects});
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(projectsActions, dispatch),
    loadSprints: (project) => {
      dispatch(updatePath(`/projects/${project.id}/sprints/index`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectListContainer extends React.Component {
  componentWillMount() {
    this.props.fetchProjects();
    this.props.updatePageTitle('Your Projectss', 'Projects');
  }
  page() {
    return (
      <section className="row">
        <HeaderSection title={"Project List"} background={"/images/pjbg.jpg"} />
        <List
          items={this.props.projects}
          onClick={this.props.loadSprints}
          map={{title: 'name', desc: 'type'}} />
      </section>
    );
  }
  render() {
    return (
      <PageWrapper state={this.props.projects} wrap={this.page()} />
    );
  }
}

ProjectListContainer.propTypes = {
  fetchProjects: React.PropTypes.func,
  projects: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
};
