import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sprintActions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';
import * as bottomBarActions from 'actions/bottom-bar.action';

import BottomBar from 'components/bottombar/bottom-bar.jsx';

const mapStateToProps = state => ({
  sprints: state.sprints,
  routing: state.routing,
  bottomBarStore: state.bottomBar,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(sprintActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(bottomBarActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    const projectId = this.props.params.id;
    this.props.pageBack(false);
    this.props.fetchSprints(projectId);
    this.props.fetchVelocity(projectId);
    this.props.updatePageTitle('Your Sprints', 'Sprints', this.props.routing.path);
  }

  componentWillUnmount() {
    this.props.hideBottomBar();
    this.props.clearSprints();
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
  fetchSprints: React.PropTypes.func,
  fetchVelocity: React.PropTypes.func,
  pageBack: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  sprintsByDate: React.PropTypes.object,
  bottomBarStore: React.PropTypes.object,
  routing: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  clearSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  params: React.PropTypes.object,
  hideBottomBar: React.PropTypes.func,
};
