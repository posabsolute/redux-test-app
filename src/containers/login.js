import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {validateProps} from 'redux-form-validator';
import {validateActions} from 'redux-form-validator';
import LoginForm from 'components/login/login.js';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

@connect(mapStateToProps, null)
export default class LoginComponent extends React.Component {
  render() {
    return <LoginForm {...this.props} redirect={'/projects'} />;
  }
}
