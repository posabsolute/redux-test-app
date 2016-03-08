import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Time from 'react-time';

import PageWrapper from 'components/page-wrapper';
import Burndown from 'components/charts/burndown';
import ListItem from 'components/list/list-item-small';
import List from 'components/list/list-container';

import * as sprintActions from 'actions/sprints.action';
import * as bottomBarActions from 'actions/bottom-bar.action';

import {burndownSelector} from 'selectors/burndown.selector';
// import {getFormatDate} from 'utils/dates';

const mapStateToProps = state => ({
  sprint: state.sprint,
  burndown: state.burndown,
  valuesPerDay: burndownSelector(state).valuesPerDay,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(sprintActions, dispatch),
    ...bindActionCreators(bottomBarActions, dispatch),
    loadIssue: (issue) => {
      dispatch(push(`/issue/${issue.id}`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintBottomBar(2);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  page() {
    return (
      <section className="row pageRow">
        <Burndown dataset={this.props.valuesPerDay} />
        <div className="list-data__row">
          <ListItem label="Start Date" text={<Time value={this.props.burndown.startTime} format="MMMM DD" />} />
          <ListItem label="End Date" text={<Time value={this.props.burndown.completeTime} format="MMMM DD, YYYY" />} />
        </div>
        { this.props.sprint.puntedIssues.length ?
          <List
            title="Removed from sprint"
            items={this.props.sprint.puntedIssues}
            onClick={this.props.loadIssue}
            map={{
              title: ['summary'],
              labels: ['typeName'],
              floatingLabel: ['priorityName'],
            }} />
          : null
        }
      </section>
    );
  }

  render() {
    return (
      <PageWrapper state={this.props.valuesPerDay} wrap={this.page.bind(this)} />
    );
  }
}

SprintsListContainer.propTypes = {
  sprint: React.PropTypes.object,
  burndown: React.PropTypes.object,
  valuesPerDay: React.PropTypes.array,
  loadIssue: React.PropTypes.func,
  fetchSprintReport: React.PropTypes.func,
  fetchBurndown: React.PropTypes.func,
  showSprintBottomBar: React.PropTypes.func,
  params: React.PropTypes.object,
};

