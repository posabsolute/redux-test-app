import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {validateProps} from 'redux-form-validator';
import {validateActions} from 'redux-form-validator';
import { updatePath } from 'redux-simple-router';

import LoginForm from './login.jsx';
import { login } from 'actions/user.action';
import userModel from 'models/user.model';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    validationStore: state.validate,
  };
};

const mapDispatchToProps = (
  dispatch,
) => {
  return {
    ...bindActionCreators(validateActions, dispatch),
    onSubmit: function submit(evt, validate) {
      const form = evt.target;
      if (validate.formValidate(form.elements)) {
        dispatch(login({
          username: form.username.value,
          password: form.password.value,
          url: form.url.value,

        })).then(() =>{
          dispatch(updatePath(this.props.redirect));
        });
      }
    },
  };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends React.Component {
  componentWillMount() {
    this.validate = validateProps(this, userModel);
  }
  render() {
    return <LoginForm {...this.props} validate={this.validate} />;
  }
}
