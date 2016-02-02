import React from 'react';
import {LabelError} from 'redux-form-validator';

import 'style!./input.scss';
import 'style!./input-line.scss';

export default ({validate, classes, name, defaultValue, value, errorLabel, placeholder, isPassword}) => {
  const Label = (errorLabel === 'true') ? <LabelError field={validate.fieldStore(name)} /> : undefined;
  const cssClasses = validate ? validate.classes(classes, name) : classes;
  const validateProps = validate ? validate : {};
  const type = isPassword === 'true' ? 'password' : 'text';

  return (
    <div className="form-group">
      <input type={type} className={cssClasses} defaultValue={defaultValue} value={value} name={name} placeholder={placeholder} {...validateProps} />
      {Label}
    </div>
  );
};
