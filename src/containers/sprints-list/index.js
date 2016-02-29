import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as sprintActions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';

const mapStateToProps = state => ({
  sprints: state.sprints,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(sprintActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.pageBack(false);
    this.props.fetchSprints(this.props.params.id);
    this.props.fetchVelocity();
    this.props.updatePageTitle('Your Sprints', 'Sprints', this.props.routing.path);
  }

  componentWillUnmount() {
    this.props.clearSprints();
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        hideSidebar: this.props.hideSidebar,
        showSidebar: this.props.showSidebar,
        hideBottomBar: this.props.hideBottomBar,
        showSprintsListBottomBar: this.props.showSprintsListBottomBar,
      });
    });
    return (<div>{childrenWithProps}</div>);
  }
}

SprintsListContainer.propTypes = {
  fetchSprints: React.PropTypes.func,
  fetchVelocity: React.PropTypes.func,
  pageBack: React.PropTypes.func,
  showSprintsListBottomBar: React.PropTypes.func,
  sprintsByDate: React.PropTypes.object,
  routing: React.PropTypes.object,
  loadSprints: React.PropTypes.func,
  clearSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  params: React.PropTypes.object,
  showSidebar: React.PropTypes.func,
  hideBottomBar: React.PropTypes.func,
  hideSidebar: React.PropTypes.func,
};
