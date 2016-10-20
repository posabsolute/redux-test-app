import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';

import BottomBar from 'components/bottombar/bottom-bar.jsx';
import * as bottomBarActions from 'actions/bottom-bar.action';
import * as projectsActions from 'actions/projects.action';
import * as searchActions from 'actions/search.action';


const mapStateToProps = state => ({
  sprint: state.sprint,
  configs: state.configs,
  routing: state.routing,
  bottomBarStore: state.bottomBar,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(projectsActions, dispatch),
    ...bindActionCreators(bottomBarActions, dispatch),
    ...bindActionCreators(searchActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    const projectId = this.props.configs.project.id;
    this.props.pageBack(false);
    this.props.fetchSprint(this.props.params.id);
    this.props.fetchSprintIssues(this.props.params.id);
    this.props.fetchBurndown(this.props.params.id, projectId);
    this.props.fetchSprintReport(this.props.params.id, projectId).then(() => {
      this.props.updatePageTitle(this.props.sprint.name, this.props.sprint.name, this.props.routing.path);
    });
  }

  componentWillUnmount() {
    this.props.hideBottomBar();
    this.props.clearSearchQuery();
  }

  render() {
    return (
      <div>
        {this.props.children}
        <BottomBar page={this.props.params} show={this.props.bottomBarStore.show} buttons={this.props.bottomBarStore.buttons} onClick={this.props.redirectBottomBar} />
      </div>
    );
  }
}

SprintsListContainer.propTypes = {
  children: React.PropTypes.any,
  fetchSprintReport: React.PropTypes.func,
  hideBottomBar: React.PropTypes.func,
  routing: React.PropTypes.object,
  bottomBarStore: React.PropTypes.object,
  configs: React.PropTypes.object,
  pageBack: React.PropTypes.func,
  sprints: React.PropTypes.array,
  stories: React.PropTypes.array,
  fetchBurndown: React.PropTypes.func,
  clearSprint: React.PropTypes.func,
  showSprintBottomBar: React.PropTypes.func,
  fetchSprint: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  sprint: React.PropTypes.object,
  fetchSprintIssues: React.PropTypes.func,
  params: React.PropTypes.object,
};

