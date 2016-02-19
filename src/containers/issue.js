import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as pageActions from 'actions/page.action';
import * as issueActions from 'actions/issue.action';

import CommentsComponent from 'components/comments/comments';
import AddCommentForm from 'components/comments/add-comment.js';
import IssueStatus from 'components/issue/issue-status';
import IssueDescription from 'components/issue/issue-description';
import PageWrapper from 'components/page-wrapper';

const mapStateToProps = state => ({
  issue: state.issue,
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(issueActions, dispatch),
    ...bindActionCreators(pageActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class IssueContainer extends React.Component {
  componentWillMount() {
    this.props.updatePageTitle(this.props.issue.key, this.props.issue.key);
    this.loadIssue();
  }

  reloadIssue() {
    this.props.clearIssue();
    this.loadIssue();
  }

  loadIssue() {
    this.props.fetchIssue(this.props.params.id).then(()=>{
      this.props.updatePageTitle(this.props.issue.key, this.props.issue.key);
    });
  }

  page() {
    return (
      <section className="row">
        <IssueStatus {...this.props.issue} />
        <IssueDescription description={this.props.issue.description} />
        <CommentsComponent comments={this.props.issue.comment.comments} />
        <AddCommentForm {...this.props} />
      </section>
    );
  }

  render() {
    console.log(PageWrapper);
    return (
      <PageWrapper state={this.props.issue.key} wrap={this.page()} />
    );
  }
}

IssueContainer.propTypes = {
  clearIssue: React.PropTypes.func,
  fetchIssue: React.PropTypes.func,
  params: React.PropTypes.object,
  issue: React.PropTypes.object,
  updatePageTitle: React.PropTypes.func,
};
