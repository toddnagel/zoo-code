import React from 'react';
import moment from 'moment';

import DatePicker from 'material-ui/DatePicker';

export const renderDatepicker = ({ input, label, type, value, initialValue, stateValue, handleDate, meta: { touched, error } }) => (
    
      <DatePicker
        {...input}
        value={stateValue}
        name="dob"
        defaultDate={initialValue || new Date()}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        maxDate={new Date()}
        minDate={new Date(moment().subtract(60, 'years').calendar())}
        autoOk
        className="form-control"
        onChange={(event, date)=> handleDate(date)}
        formatDate={(date) => moment(date).format('MM-DD-YYYY')}
                
      />
  )