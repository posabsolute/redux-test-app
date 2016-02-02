import React from 'react';
import 'style!./header-section.scss';

export default ({title, background}) => (
  <div className="header-section col-lg-12" style={ {backgroundImage: 'url(' + background + ')'} }>
    <div className="header-section__title">{title}</div>
  </div>
);