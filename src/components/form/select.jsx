import React from 'react';

import 'style!./input.scss';

export default ({classes, label, filterValues, defaultOption, onChangeEvent, currentValue}) => {
  return (
    <div className="select-filter">
      <span className="filterLabel">{label}</span>
      <select className={classes} onChange={onChangeEvent} value={currentValue || ""}>
        { defaultOption ? <option value="">{defaultOption}</option> : null }
        {filterValues.map((item, index) =>
            <option value={item}>{item}</option>
        )}
      </select>
    </div>
  );
};
