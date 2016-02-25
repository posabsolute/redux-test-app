import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePath } from 'redux-simple-router';

import PageWrapper from 'components/page-wrapper';
import Burndown from 'components/charts/burndown';
import ListItem from 'components/list/list-item-small';
import List from 'components/list/list-container';

import * as sprintActions from 'actions/sprints.action';

import {burndownSelector} from 'selectors/burndown.selector';
import {getFormatDate} from 'utils/dates';

const mapStateToProps = state => ({
  sprint: state.sprint,
  burndown: state.burndown,
  valuesPerDay: burndownSelector(state).valuesPerDay,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(sprintActions, dispatch),
    loadIssue: (issue) => {
      dispatch(updatePath(`/issue/${issue.id}`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintsListContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintBottomBar(2);
  }

  page() {
    return (
      <section className="row pageRow">
        <Burndown dataset={this.props.valuesPerDay} />
        <div className="list-data__row">
          <ListItem label="Start Date" text={getFormatDate(this.props.burndown.startTime, true)} />
          <ListItem label="End Date" text={getFormatDate(this.props.burndown.completeTime, true)} />
        </div>
        { this.props.sprint.puntedIssues.length &&
          <List
            title="Removed from sprint"
            items={this.props.sprint.puntedIssues}
            descMod={getFormatDate}
            onClick={this.props.loadIssue}
            map={{
              title: ['summary'],
              labels: ['typeName'],
              floatingLabel: ['priorityName'],
            }} />
        }
      </section>
    );
  }

  render() {
    return (
      <PageWrapper state={this.props.valuesPerDay} wrap={this.page()} />
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

