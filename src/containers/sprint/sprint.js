import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import List from 'components/list/list-container';
import HeaderSection from 'components/header-section/header-section.jsx';
import PageWrapper from 'components/page-wrapper';

import * as actions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';
import * as bottomBarActions from 'actions/bottom-bar.action';

import {issuesListSelector} from 'selectors/issues.selector';

const mapStateToProps = state => ({
  sprint: state.sprint,
  stories: issuesListSelector(state).stories,
  otherIssues: issuesListSelector(state).otherIssues,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(bottomBarActions, dispatch),
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    loadIssue: (issue) => {
      dispatch(push(`/issue/${issue.id}`));
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintBottomBar(1);
  }

  getSubtitle() {
    if (this.props.sprint.allIssuesEstimateSum) {
      return (
        <div>
          <span className="header-section__small_text">Story Points: {this.props.sprint.allIssuesEstimateSum.text}</span>
          <span className="ion-ios-arrow-thin-right header-section__arrow"></span>
          {this.props.sprint.completedIssuesEstimateSum.text}
        </div>
      );
    }
    return null;
  }

  page() {
    return (
      <section className="row">
        <HeaderSection title={this.props.sprint.name} background={"images/img3.jpg"} subtitle={this.getSubtitle()} />
        { this.props.stories.length ?
          (<List
            title="Stories"
            items={this.props.stories}
            floatingLabelMod= {(points) => `${points} points`}
            onClick={this.props.loadIssue}
            map={{
              title: ['summary'],
              desc: ['statusName'],
              labels: ['typeName'],
              floatingLabel: ['currentEstimateStatistic', 'statFieldValue', 'value'],
            }} />)
          : null
        }
        { this.props.otherIssues.length ?
          <List
            title="Other Issues"
            items={this.props.otherIssues}
            onClick={this.props.loadIssue}
            map={{
              title: ['summary'],
              desc: ['statusName'],
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
      <PageWrapper state={this.props.sprint.state} wrap={this.page.bind(this)} />
    );
  }
}

SprintContainer.propTypes = {
  otherIssues: React.PropTypes.array,
  sprints: React.PropTypes.array,
  stories: React.PropTypes.array,
  loadIssue: React.PropTypes.func,
  showSprintBottomBar: React.PropTypes.func,
  fetchSprint: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  sprint: React.PropTypes.object,
  fetchSprintIssues: React.PropTypes.func,
  params: React.PropTypes.object,
};

