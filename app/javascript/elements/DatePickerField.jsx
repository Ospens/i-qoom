
import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const DatePickerField = ({ label, input, placeholder, readOnly = false,  meta: { touched, error } }) => (
  <div>
    {label && <label>{label}</label>}
    <DatePicker
      {...input}
      dateForm='MM-DD-YYYY'
      className='form-control date-input'
      value={input.value !== '' ? moment(input.value).format('MM-DD-YYYY') : null}
      selected={input.value !== '' ? new Date(input.value): null}
      placeholderText={placeholder ? placeholder : ''}
      readOnly={readOnly}
      />
    {touched && error && <span>{error}</span>}
  </div>
);

export default DatePickerField