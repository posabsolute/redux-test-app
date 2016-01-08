import React from 'react';
import 'style!./login.scss';
import 'style!../form/input-line.scss';

const LoginFormComponent = ({onSubmit}) => (
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
            <form className="col-sm-6 col-lg-12 login-bottom-container" onSubmit={ (evt) => { evt.preventDefault(); onSubmit(evt);} }>
              <div className="form-group">
                <input type="text" name="url" className="input-line" id="url" placeholder="Jira Url (http://company.jira.net)" />
              </div>
              <div className="form-group">
                <input type="text" name="username" className="input-line" id="username" placeholder="Username" />
              </div>
              <div className="form-group">
                <input type="password" name="password" className="input-line" id="password" placeholder="Password" />
              </div>
              <div className="relative"><button type="submit" className="btn btn-default btn-full" >Sign in</button></div>
            </form>
        </div>
      </div>
    </div>
  </div>
);

export default LoginFormComponent;
