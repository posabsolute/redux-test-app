import React from 'react';
import { connect } from 'react-redux';
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
