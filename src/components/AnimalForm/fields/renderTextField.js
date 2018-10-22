import React from 'react';
import TextField from 'material-ui/TextField';

export const renderTextField = (
  { input, hint, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={hint}
    floatingLabelText={label}
    errorText={touched && error}
    margin="normal"
    {...input}
    {...custom}
  />
);
