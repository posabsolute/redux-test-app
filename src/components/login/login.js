import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {validateProps} from 'redux-form-validator';
import {validateActions} from 'redux-form-validator';
import { push } from 'react-router-redux';

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
    loginSubmit(evt, validate, redirect) {
      const form = evt.target;
      if (validate.formValidate(form.elements)) {
        const url = form.url.value.replace(/\/(\s+)?$/, '');
        dispatch(login({
          username: form.username.value,
          password: form.password.value,
          url: url,
        })).then((action) =>{
          localStorage.setItem('username', form.username.value);
          localStorage.setItem('password', form.password.value);
          localStorage.setItem('displayName', action.data.displayName);
          localStorage.setItem('emailAddress', action.data.emailAddress);
          localStorage.setItem('avatarUrls', action.data.avatarUrls['48x48']);
          localStorage.setItem('url', url);
          dispatch(push(redirect));
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
