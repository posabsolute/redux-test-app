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
    onSubmit: function submit(evt, validate, redirect) {
      const form = evt.target;
      if (validate.formValidate(form.elements)) {

        dispatch(login({
          username: form.username.value,
          password: form.password.value,
          url: form.url.value,

        })).then((action) =>{
          localStorage.setItem('username', form.username.value);
          localStorage.setItem('password', form.password.value);
          localStorage.setItem('displayName', action.data.displayName);
          localStorage.setItem('emailAddress', action.data.emailAddress);
          localStorage.setItem('avatarUrls', action.data.avatarUrls['48x48']);
          localStorage.setItem('url', form.url.value);
          dispatch(updatePath(redirect));
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
