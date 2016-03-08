import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as pageActions from 'actions/page.action';
import * as issueActions from 'actions/issue.action';

import CommentsComponent from 'components/comments/comments';
import AddCommentForm from 'components/comments/add-comment.js';
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

  componentWillUnmount() {
    this.props.clearIssue();
  }

  componentDidmount() {
    window.scrollTo(0, 0);
  }

  page() {
    console.log(this.props.issue.project);
    return (
      <section className="row">
        <IssueStatus {...this.props.issue} pointField={this.props.configs.board.estimation.field.fieldId} />
        <IssueDescription description={this.props.issue.description} />
        { this.props.issue.attachment.length ? <Attachment attachment={this.props.issue.attachment} /> : null }
        <CommentsComponent comments={this.props.issue.comment.comments} />
        <AddCommentForm {...this.props} />
      </section>
    );
  }

  render() {
    console.log(this.props.issue);
    return (
      <PageWrapper state={this.props.issue.status} wrap={this.page.bind(this)} />
    );
  }
}

IssueContainer.propTypes = {
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
