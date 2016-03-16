import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as pageActions from 'actions/page.action';
import * as issueActions from 'actions/issue.action';

import CommentsComponent from 'components/comments/comments';
import AddCommentForm from 'components/comments/add-comment.js';
import Email from 'components/comments/sendemail';
import IssueStatus from 'components/issue/issue-status';
import Attachment from 'components/issue/attachment';
import IssueDescription from 'components/issue/issue-description';
import PageWrapper from 'components/page-wrapper';

const mapStateToProps = state => ({
  issue: state.issue,
  configs: state.configs,
  routing: state.routing,
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
    this.props.pageBack(true);
    this.props.fetchIssue(this.props.params.id).then((item)=>{
      this.props.updatePageTitle(this.props.issue.key, this.props.issue.key, this.props.routing.path);
    });
  }

  getLink() {
    return this.props.issue.self.replace(/rest\/agile\/1.0\/issue\/(.*)/, `browse/${this.props.issue.key}`);
  }

  componentWillUnmount() {
    this.props.clearIssue();
  }

  componentDidmount() {
    window.scrollTo(0, 0);
  }

  reload() {
    this.props.clearIssue();
    this.componentWillMount();
  }

  page() {
    return (
      <section className="row" key="issueContainer">
        <IssueStatus {...this.props.issue} pointField={this.props.configs.board.estimation.field.fieldId} />
        <IssueDescription description={this.props.issue.description} />
        { this.props.issue.attachment.length ? <Attachment attachment={this.props.issue.attachment} /> : null }
        <Email id={this.props.issue.key} subject={this.props.issue.summary} link={this.getLink()} />
        <CommentsComponent comments={this.props.issue.comment.comments} />
        <AddCommentForm {...this.props} reload={this.reload.bind(this)} />
      </section>
    );
  }

  render() {
    return (
      <PageWrapper loaderKey="issueLoader" key="issueWrapper" state={this.props.issue.status} wrap={this.page.bind(this)} />
    );
  }
}

IssueContainer.propTypes = {
  self: React.PropTypes.string,
  configs: React.PropTypes.object,
  routing: React.PropTypes.object,
  hideBottomBar: React.PropTypes.func,
  pageBack: React.PropTypes.func,
  clearIssue: React.PropTypes.func,
  fetchIssue: React.PropTypes.func,
  params: React.PropTypes.object,
  issue: React.PropTypes.object,
  updatePageTitle: React.PropTypes.func,
};
