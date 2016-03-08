import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import List from 'components/list/list-container';
import HeaderSection from 'components/header-section/header-section.jsx';
import * as projectsActions from 'actions/projects.action';
import * as pageActions from 'actions/page.action';
import PageWrapper from 'components/page-wrapper';

const mapStateToProps = state => ({
  projects: state.projects,
  routing: state.routing,
});
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(projectsActions, dispatch),
    loadSprints(project) {
      this.props.selectProject(project);
      this.props.fetchProjectConfig(project.id);
      dispatch(push(`/projects/${project.id}/sprints/index`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectListContainer extends React.Component {
  componentWillMount() {
    this.props.pageBack(false);
    this.props.fetchProjects();
    this.props.updatePageTitle('Your Projects', 'Projects', this.props.routing.path);
  }
  page() {
    return (
      <section className="row">
        <HeaderSection title={"Project List"} background={"images/pjbg.jpg"} />
        <List
          items={this.props.projects}
          onClick={this.props.loadSprints.bind(this)}
          map={{title: 'name', desc: 'type'}} />
      </section>
    );
  }
  render() {
    return (
      <PageWrapper state={this.props.projects} wrap={this.page.bind(this)} />
    );
  }
}

ProjectListContainer.propTypes = {
  fetchProjects: React.PropTypes.func,
  pageBack: React.PropTypes.func,
  routing: React.PropTypes.object,
  projects: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
};
