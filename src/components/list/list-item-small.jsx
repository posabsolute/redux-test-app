import React from 'react';
import 'style!./list.scss';

export default ({label, text, children}) => (
  <div className="list-data__item">
    <label className="list-data__item__label">{label}</label>
    <div className="list-data__item__text">
    	{text} {text === undefined ? "-" : ""}
    	{children}
    </div>
  </div>
);
