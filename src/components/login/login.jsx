import React from 'react';
import {LabelError} from 'redux-form-validator';

import 'style!./login.scss';
import 'style!../form/input-line.scss';

export default ({validate, onSubmit}) => (
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
          <form className="col-sm-6 col-lg-12 login-bottom-container" onSubmit={ (evt) => { evt.preventDefault(); onSubmit(evt, validate); } }>
            <div className="form-group">
              <input type="text" className={validate.classes('input-line', 'url')} name="url" placeholder="Jira Url (http://company.jira.net)" {...validate} />
              <LabelError field={validate.fieldStore('url')} />
            </div>
            <div className="form-group">
              <input type="text" className={validate.classes('input-line', 'username')} name="username" placeholder="Username" {...validate} />
              <LabelError field={validate.fieldStore('username')} />
            </div>
            <div className="form-group">
              <input type="password" name="password" className={validate.classes('input-line', 'password')} placeholder="Password" {...validate} />
            </div>
            <div className="relative"><button type="submit" className="btn btn-default btn-full" >Sign in</button></div>
          </form>
      </div>
    </div>
  </div>
</div>
);
