import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {validateProps} from 'redux-form-validator';
import {validateActions} from 'redux-form-validator';
import {GrowlerActions} from 'flash-notification-react-redux';
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
    ...bindActionCreators(GrowlerActions, dispatch),
    loginSubmit(evt, validate, redirect, showGrowlerError) {
      const form = evt.target;
      if (validate.formValidate(form.elements)) {
        let url = form.url.value.replace(/\/(\s+)?$/, '');

        if (/atlassian\.net/.test(url)) {
          url = url.replace('http:', 'https:');
        }

        dispatch(login({
          username: form.username.value,
          password: form.password.value,
          url: url,
        })).then((action) =>{
          if (action && action.data) {
            localStorage.setItem('displayName', action.data.displayName);
            localStorage.setItem('emailAddress', action.data.emailAddress);
            localStorage.setItem('username', form.username.value);
            localStorage.setItem('password', form.password.value);
            localStorage.setItem('avatarUrls', action.data.avatarUrls['48x48']);
            localStorage.setItem('url', url);
            dispatch(push(redirect));
          }else {
            showGrowlerError('Unauthorized');
          }
        });
      }
    },
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends React.Component {
  componentWillMount() {
    console.log(this.props)
    this.validate = validateProps(this, userModel);
  }
  render() {
    return <LoginForm {...this.props} validate={this.validate} />;
  }
}
