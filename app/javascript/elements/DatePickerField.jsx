
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const DatePickerField = ({ label, input, placeholder, readOnly = false,  meta: { touched, error } }) => {
  const [date, toggleDate] = useState(null)
  return (
    <div>
      {label && <label>{label}</label>} 
      <DatePicker
        {...input}
        autoComplete="off"
        dateForm='MM/DD/YYYY'
        className='form-control date-input'
        selected={date}
        value={date ? moment(new Date(date)).format('MM/DD/YYYY') : null}
        onChange={value => {
          const newDate = new Date(value)
          input.onChange(newDate)
          toggleDate(newDate)
        }}
        placeholderText={placeholder ? placeholder : ''}
        readOnly={readOnly}
        />
      {touched && error && <span>{error}</span>}
    </div>
  )
}

export default DatePickerField
