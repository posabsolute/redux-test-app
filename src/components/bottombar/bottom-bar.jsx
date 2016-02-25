import React from 'react';
import 'style!./bottom-bar.scss';

export default ({buttons, onClick, page}) => (
  <div className="bottomBar">
    {buttons.map((button, index) =>
      <div key={`bottomBar__buton__${index}`} className={`bottomBar__link ${button.status}`} onClick={ onClick.bind(this, button, page) }>
        <span className={`bottomBar__icon ${button.icon}`}></span>
        <span className="bottomBar__label">{button.label}</span>
      </div>
    )}
  </div>
);
