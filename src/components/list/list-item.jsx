import React from 'react';
import Labels from 'components/labels/labels.jsx';
import 'style!./list.scss';

export default ({onClick, listItem, title, desc, labels, floatingLabel, baseClass}) => (
  <div
    className={"list-item " + baseClass}
    onClick={onClick.bind(this, listItem)}>
      <div className="list-item__title">{title}</div>
      <div className="list-item__desc">{desc}</div>
      <Labels labels={labels} />
      <div className="floating-label">{floatingLabel}</div>
  </div>
);
