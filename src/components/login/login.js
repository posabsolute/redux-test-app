import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './login.jsx';
import { login } from 'actions/user.action';


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (
  dispatch,
) => {
  return {
    onSubmit: (evt) => {
      const form = evt.target.elements;
      dispatch(login({
        username: form.username.value,
        password: form.password.value,
        url: form.url.value,
      }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
