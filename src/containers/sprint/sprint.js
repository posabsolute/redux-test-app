import React from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import List from 'components/list/list-container';
import HeaderSection from 'components/header-section/header-section.jsx';
import PageWrapper from 'components/page-wrapper';
import IssueSearch from 'components/form/search';
import SelectForm from 'components/form/select.jsx';
import ListItem from 'components/list/list-item-small';


import * as actions from 'actions/sprints.action';
import * as pageActions from 'actions/page.action';
import * as bottomBarActions from 'actions/bottom-bar.action';
import * as searchActions from 'actions/search.action';

import {issuesListSelector} from 'selectors/issues.selector';

const mapStateToProps = state => ({
  sprint: state.sprint,
  search: state.search,
  stories: issuesListSelector(state).stories,
  otherIssues: issuesListSelector(state).otherIssues,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(bottomBarActions, dispatch),
    ...bindActionCreators(actions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(searchActions, dispatch),
    loadIssue: (issue) => {
      dispatch(push(`/issue/${issue.key}`));
    },
    onSearch(evt) {
      let searchQuery = evt.target.elements ? evt.target.elements[0].value : evt.target.value;
      this.props.setSearchQuery(searchQuery);
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class SprintContainer extends React.Component {
  componentWillMount() {
    this.props.showSprintBottomBar(1);
  }

  getSubtitle() {
    const fullEstimate = this.props.sprint.completedIssuesEstimateSum.value;
    const completedEstimate = this.props.sprint.allIssuesEstimateSum.value;
    const completedEstimateActiveSprint = this.props.sprint.completedIssuesEstimateSum.value;

    if (fullEstimate) {
      const completedIssuesEstimateSum = parseInt(fullEstimate, 10) || 0;
      const allIssuesEstimateSum = parseInt(completedEstimate, 10) || parseInt(completedEstimateActiveSprint, 10) || 0;
      return (
        <div>
          <span className="header-section__small_text">Story Points: {allIssuesEstimateSum}</span>
          <span className="ion-ios-arrow-thin-right header-section__arrow"></span>
          {completedIssuesEstimateSum}
        </div>
      );
    }
    return null;
  }

  setStatusFilter(evt) {
    this.props.setFilter("sprint-status", evt.target.value);
  }
  setUserFilter(evt) {
    this.props.setFilter("sprint-user", evt.target.value);
  }

  page() {
    return (
      <section className="row  row__row--header row__row--bottom" key="sprintContainer">
        <HeaderSection title={this.props.sprint.name} background={"images/img3.jpg"} subtitle={this.getSubtitle()} />
        <div className="col-xs-12 search-padding">
          <IssueSearch
            onChange={this.props.onSearch.bind(this)}
            onSubmit={this.props.onSearch.bind(this)}
          />
        </div>

        <div className="col-xs-12 list--pad-bottom">
          <ListItem label="Status" text="">
            <SelectForm
              defaultOption="All"
              currentValue={this.props.search.filters['sprint-status']}
              filterValues={this.props.sprint.statuses} 
              onChangeEvent={this.setStatusFilter.bind(this)} />
           </ListItem>

          <ListItem label="Users" text="">
            <SelectForm 
              defaultOption="All"
              currentValue={this.props.search.filters['sprint-user']}
              filterValues={this.props.sprint.users} 
              onChangeEvent={this.setUserFilter.bind(this)} />
          </ListItem>
        </div>

        { this.props.stories.length ?
          (<List
            title="Stories"
            items={this.props.stories}
            baseCSSmod= {function(item) {
              return this === 'active' && item.done === true ? 'item--complete' : 'item--uncomplete'
            }.bind(this.props.sprint.state)}
            floatingLabelMod= {(points) => {
              const data = points || 0;
              return `${data} points`;
            }}
            descMod= {(status, item) => <div>
              {
                item.assigneeName ? `${status} - Assigned to ${item.assigneeName}`: `${status}`
              }
            </div>}
            onClick={this.props.loadIssue.bind(this)}
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
            sprintState={this.props.sprint.state}
            onClick={this.props.loadIssue.bind(this)}
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
      <PageWrapper loaderKey="sprintsLoader" key="sprintsWrapper" stateExist={this.props.otherIssues} wrap={this.page.bind(this)} />
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

