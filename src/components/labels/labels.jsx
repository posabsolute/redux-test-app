import React from 'react';
import 'style!./labels.scss';

const LabelsComponent = ({labels}) => {
  if (!labels || !labels.length) {
    return (<div/>);
  }
  return (
    <div className="labels-list">
      {labels.map((label, index) =>
        <div key={'label_' + index} className={'labels-item' + ' labels-item--' + label}>{label}</div>
      )}
    </div>
  );
};

export default LabelsComponent;
