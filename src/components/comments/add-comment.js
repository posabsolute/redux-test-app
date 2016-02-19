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
    onSubmit: function submit(evt, validate) {
      if (validate.formValidate(evt.target.elements)) {
        this.props.addComment();
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
    return <AddCommentForm {...this.props} validate={this.validate} />;
  }
}
