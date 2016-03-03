import React from 'react';
import { bindActionCreators } from 'redux';
import { updatePath } from 'redux-simple-router';
import { connect } from 'react-redux';

import List from 'components/list/list-container';
import PageWrapper from 'components/page-wrapper';
import IssueSearch from 'components/form/search';

import * as pageActions from 'actions/page.action';
import * as searchActions from 'actions/search.action';

import {issuesListSelector} from 'selectors/issues.selector';

import {getFormatDateCreated} from 'utils/dates';

const mapStateToProps = state => ({
  search: state.search,
  issues: issuesListSelector(state).searchResults,
  routing: state.routing,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(pageActions, dispatch),
    ...bindActionCreators(searchActions, dispatch),
    loadIssue: (issue) => {
      dispatch(updatePath(`/issue/${issue.id}`));
    },
    searchIssues(query) {
      if (query) {
        this.fetchSearch(query);
      }
    },
    onSubmit(evt) {
      this.props.searchIssues(evt.target.elements[0].value);
    },
    onChange(evt) {
      this.props.searchIssues(evt.target.value);
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class IssueSearchContainer extends React.Component {
  componentWillMount() {
    this.props.pageBack(false);
    const query = this.props.params.query;
    this.props.updatePageTitle('Search', 'Search', this.props.routing.path);
    if (query) {
      this.props.fetchSearch(query);
    }
  }

  searchList() {
    return (
      <div className="search-list">
        { this.props.issues.length ?
          (<List
            items={this.props.issues}
            descMod={getFormatDateCreated}
            floatingLabelMod= {(points) => `${points} points`}
            onClick={this.props.loadIssue}
            map={{
              title: ['fields', 'summary'],
              desc: ['fields', 'created'],
              labels: ['fields', 'issuetype', 'name'],
            }} />)
          : <h3 className="search-no-found">No issue found</h3>
        }
      </div>
    );
  }

  render() {
    return (
      <section className="row pageRow">
        <div className="pad10">
          <IssueSearch 
            onChange={this.props.onChange.bind(this)}
            onSubmit={this.props.onSubmit.bind(this)}
            defaultValue={this.props.params.query} />
          </div>
        <PageWrapper isLoading={this.props.search.isLoading} wrap={this.searchList()} />
      </section>
    );
  }

}

IssueSearchContainer.propTypes = {
  onChange: React.PropTypes.func,
  pageBack: React.PropTypes.func,
  issues: React.PropTypes.object,
  search: React.PropTypes.object,
  loadIssue: React.PropTypes.func,
  fetchSearch: React.PropTypes.func,
  updatePageTitle: React.PropTypes.func,
  sprint: React.PropTypes.object,
  routing: React.PropTypes.object,
  params: React.PropTypes.object,
};

