import React from 'react';
import 'style!./header.scss';

export default ({menuLeftClick, title, back, goBack}) => (
  <div>
    <div className="header-bg"></div>
    <div className="header-title">{title}</div>
    <header className="header-fix">
    { back ?
      <a className="header-btn-menu" onClick={ (evt) => { evt.preventDefault(); goBack(); }}>
        <span className="icon ion-ios-arrow-back"></span> <span className="text">Back</span>
      </a>
     :
      <a className="header-btn-menu" onClick={ (evt) => { evt.preventDefault(); menuLeftClick(); }}>
        <span className="icon ion-navicon"></span>
      </a>
    }
    </header>
  </div>
);
