import React from 'react';
import InputText from 'components/form/inputText';
import {LabelError} from 'redux-form-validator';
import 'style!./login.scss';

export default ({validate, onSubmit, redirect}) => (
<div className="">
  <div className="login-bg"></div>
  <div className="row login-top-page">
    <div cassName="col-sm-6 col-lg-12">
      <div className="login-title">Release notes</div>
      <div className="login-icon-container">
        <img className="login-icon" src="/images/logo-login.svg"/>
      </div>
    </div>
  </div>

  <div className=" login-page">
    <div className="container">
      <div className="row">
          <form className="col-sm-6 col-lg-12 login-bottom-container" onSubmit={ (evt) => { evt.preventDefault(); onSubmit(evt, validate, redirect); } }>
            <InputText
              name="url"
              placeholder="Jira Url (http://company.jira.net)"
              defaultValue="https://salesfloor.atlassian.net"
              classes="input-line"
              errorLabel="true"
              validate={validate}
            />
            <InputText
              name="username"
              placeholder="Username"
              defaultValue="posabsolute"
              classes="input-line"
              errorLabel="true"
              validate={validate}
            />
            <InputText
              name="password"
              placeholder="password"
              classes="input-line"
              errorLabel="true"
              isPassword="true"
              validate={validate}
            />
            <div className="relative"><button type="submit" className="btn btn-default btn-full" >Sign in</button></div>
          </form>
      </div>
    </div>
  </div>
</div>
);
