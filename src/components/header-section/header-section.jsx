import React from 'react';
import 'style!./header-section.scss';

export default ({title, subtitle, background}) => (
  <div className="header-section col-lg-12" style={ {backgroundImage: 'url(' + background + ')'} }>
  	{ subtitle ? <div className="header-section__subtitle">{subtitle}</div> : null }
    { title ? <div className="header-section__title">{title}</div> : null }
  </div>
);