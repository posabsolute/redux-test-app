import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {validateProps, validateActions} from 'redux-form-validator';

import AddCommentForm from './add-comment.jsx';
import * as issueActions from 'actions/issue.action';
import commentModel from 'models/comment.model';

const mapStateToProps = (state) => {
  return {
    validationStore: state.validate,
  };
};

const mapDispatchToProps = (
  dispatch,
) => {
  return {
    ...bindActionCreators(issueActions, dispatch),
    ...bindActionCreators(validateActions, dispatch),
    onSubmit(evt) {
      evt.preventDefault();
      if (this.validate.formValidate(evt.target.elements)) {
        const comment = evt.target.elements.comment.value;
        this.props.addComment(comment, this.props.issue.key);
      }
    },
  };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends React.Component {
  componentWillMount() {
    this.validate = validateProps(this, commentModel);
  }
  render() {
    return <AddCommentForm {...this.props} validate={this.validate} onSubmit={this.props.onSubmit.bind(this)} />;
  }
}
