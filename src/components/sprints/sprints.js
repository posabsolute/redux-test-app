import React from 'react';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';
import { connect } from 'react-redux';
import SprintsListComponent from './sprints.jsx';
import * as actions from 'actions/sprints.action';

const mapStateToProps = state => ({
  sprints: state.sprints,
  sprintsOrdered: state.sprints.sort((sprintA, sprintB) => new Date(sprintB.completeDate) - new Date(sprintA.completeDate)),

});
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch),
    loadSprint: (sprint) => {
      dispatch(updatePath(`/sprint/${sprint.id}`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.fetchSprints(this.props.params.id);
    this.props.updatePageTitle('Your Sprints', 'Sprints');
  }
  getFormatDate(startdate, enddate) {
    const longOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const smallOptions = { month: 'long', day: 'numeric' };
    const date1 = new Intl.DateTimeFormat('en-US', smallOptions).format(new Date(startdate));
    const date2 = new Intl.DateTimeFormat('en-US', longOptions).format(new Date(enddate));
    return `${date1} to ${date2}`;
  }
  render() {
    return <SprintsListComponent {...this.props} getFormatDate={this.getFormatDate} />;
  }
}

SprintsListContainer.propTypes = {
  fetchSprints: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  params: React.PropTypes.object,
};
