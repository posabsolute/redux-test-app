import React from 'react';
import {LabelError} from 'redux-form-validator';

import 'style!./input.scss';

export default ({validate, classes, name, defaultValue, value, errorLabel, placeholder}) => {
  const Label = (errorLabel === 'true') ? <LabelError field={validate.fieldStore(name)} /> : undefined;
  const cssClasses = validate ? validate.classes(classes, name) : classes;
  const validateProps = validate ? validate : {};

  return (
    <div className="form-group">
      <textarea className={cssClasses} defaultValue={defaultValue} value={value} name={name} placeholder={placeholder} {...validateProps}>
      </textarea>
      {Label}
    </div>
  );
};
