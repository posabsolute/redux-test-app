import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {GrowlerActions} from 'flash-notification-react-redux';

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
    ...bindActionCreators(GrowlerActions, dispatch),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class IssueContainer extends React.Component {
  componentWillMount() {
    this.props.pageBack(true);
    this.props.fetchIssue(this.props.params.id).then(()=>{
      this.props.fetchIssueUsers(this.props.issue.key);
      this.props.updatePageTitle(this.props.issue.key, this.props.issue.key, this.props.routing.path);
    });
  }

  componentWillUnmount() {
    this.props.clearIssue();
  }

  getLink() {
    return this.props.issue.self.replace(/rest\/api\/2\/issue\/(.*)/, `browse/${this.props.issue.key}`);
  }

  componentDidmount() {
    window.scrollTo(0, 0);
  }


  reload() {
    this.props.clearIssue();
    this.componentWillMount();
  }

  assignUser(event){
    const newAssigneeName = event.target.value;
    const newAssignee = this.props.issue.assignable.find((user => user.displayName === newAssigneeName));
    this.props.assignIssue(newAssignee.name, this.props.issue.key, newAssignee);
  }

  assignStatus(event) {
    const newStatusName = event.target.value;
    const newStatus = this.props.issue.transitions.find((transition => transition.to.name === newStatusName));
    this.props.saveStatusIssue(newStatus.id, this.props.issue.key, newStatus.to);
  }

  assignPriority(event){
    const newPriorityName = event.target.value;
    const newPriority = this.props.configs.priorities.find((priority => priority.name === newPriorityName));
    this.props.savePriorityIssue(newPriority.name, this.props.issue.key, newPriority);
  }

  saveDescription(event){
    this.props.saveDescriptionIssue(event.target.value, this.props.issue.key);
  }

  saveSummary(event){
    var summary = event.target.value.replace(/\n/g, "");
    this.props.saveSummaryIssue(summary, this.props.issue.key);
  }

  openIssue(){
    window.open(this.getLink(), '_system');
  }


  assignPoints(event) {
    const points = event.target.value;
    const field = this.props.configs.board.estimation.field.fieldId;
    this.props.savePointsIssue(points, field, this.props.issue.key).then(function(value) {
    }, function(reason) {
    }).catch( () => this.props.showGrowlerError('Story points cannot be change with your configuration'));
  }

  page() {
    console.log(this.props.configs);
    return (
      <section className="row" key="issueContainer">
        <IssueStatus {...this.props.issue}
          pointField={this.props.configs.board.estimation.field.fieldId}
          prioritiesName={this.props.configs.prioritiesName}
          assignPriority={this.assignPriority.bind(this)}
          assignStatus={this.assignStatus.bind(this)}
          saveSummary={this.saveSummary.bind(this)}
          assignPoints={this.assignPoints.bind(this)}
          assignUser={this.assignUser.bind(this)} />
        <IssueDescription
          description={this.props.issue.description}
          saveDescription={this.saveDescription.bind(this)} />
        { this.props.issue.attachment.length ? <Attachment attachment={this.props.issue.attachment} /> : null }
        <Email
          id={this.props.issue.key}
          subject={this.props.issue.summary}
          link={this.getLink()}
          openIssue={this.openIssue.bind(this)} />
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
