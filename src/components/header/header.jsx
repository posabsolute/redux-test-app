import React from 'react';
import 'style!./header.scss';

const HeaderSection = ({menuLeftClick, title}) => (
  <div>
    <div className="header-bg"></div>
    <header className="header-fix">
      <a className="header-btn-menu" onClick={ (evt) => { evt.preventDefault(); menuLeftClick(); }}>
        <span className="icon ion-navicon"></span>
      </a>
      <div className="header-title">{title}</div>
    </header>
  </div>
);

export default HeaderSection;
