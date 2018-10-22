import React from 'react';
import SelectField from 'material-ui/SelectField';

export const renderSelectField = (
    { input, label, value, meta: { touched, error }, children, ...custom },
  ) => (
    <SelectField
      floatingLabelText={label}
      required
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );