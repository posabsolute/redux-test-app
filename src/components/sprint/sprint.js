import React from 'react';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';
import { connect } from 'react-redux';
import SprintComponent from './sprint.jsx';
import * as actions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';


const mapStateToProps = state => ({
  sprint: state.sprint,
});
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    loadIssue: (id) => {
      dispatch(updatePath(`/issue/${id}`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.fetchSprint(this.props.params.id);
    this.props.fetchSprintIssues(this.props.params.id);
    this.props.updatePageTitle(this.props.sprint.name, this.props.sprint.name);
  }
  getFormatDate(completedDate) {
    console.log(completedDate);
    const longOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date1 = new Intl.DateTimeFormat('en-US', longOptions).format(new Date(completedDate));
    return `Completed on ${date1}`;
  }
  render() {
    return <SprintComponent {...this.props} getFormatDate={this.getFormatDate} />;
  }
}

SprintsListContainer.propTypes = {
  sprints: React.PropTypes.array,
  fetchSprint: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  sprint: {
    name: React.PropTypes.string,
  },
  fetchSprintIssues: React.PropTypes.func,
  params: React.PropTypes.object,
};

