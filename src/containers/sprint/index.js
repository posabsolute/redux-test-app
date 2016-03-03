import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';


const mapStateToProps = state => ({
  sprint: state.sprint,
  configs: state.configs,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    const projectId = this.props.configs.project.id;
    this.props.pageBack(false);
    this.props.fetchSprint(this.props.params.id);
    this.props.fetchBurndown(this.props.params.id, projectId);
    this.props.fetchSprintReport(this.props.params.id, projectId).then(() => {
      this.props.updatePageTitle(this.props.sprint.name, this.props.sprint.name, this.props.routing.path);
    });
  }

  componentWillUnmount() {
    this.props.hideBottomBar();
    this.props.clearSprint();
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        hideSidebar: this.props.hideSidebar,
        showSidebar: this.props.showSidebar,
        hideBottomBar: this.props.hideBottomBar,
        showSprintBottomBar: this.props.showSprintBottomBar,
      });
    });
    return (<div>{childrenWithProps}</div>);
  }
}

SprintsListContainer.propTypes = {
  fetchSprintReport: React.PropTypes.func,
  routing: React.PropTypes.object,
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

