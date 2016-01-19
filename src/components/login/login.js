import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from './login.jsx';
import { login } from 'actions/user.action';
import userModel from 'models/user.model';
import validate from 'components/validation/props.js';
import * as validateActions from 'actions/validate.action.js';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    validationStore: state.validation,
  };
};

const mapDispatchToProps = (
  dispatch,
) => {
  return {
    ...bindActionCreators(validateActions, dispatch),
    onSubmit: (evt, validate) => {
      const form = evt;
      console.log(form.username.value)
      if (validate.form(form)) {
        dispatch(login({
          username: form.username.value,
          password: form.password.value,
          url: form.url.value,
        }));
      }
    },
  };
};


@connect(mapStateToProps, mapDispatchToProps)
export default class LoginComponent extends React.Component {
  componentWillMount() {
    this.validate = validate(this, userModel);
  }
  componentDidMount() {

   // this.validate.input('cedric@gmail.com', 'username').then(function(v) {
   //   console.log(v);
   // })
   // .catch(function(e) {
   //   console.log(e);
   // });
  }
  render() {
    return <LoginForm {...this.props} validate={this.validate} />;
  }
}
