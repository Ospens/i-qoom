
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import moment from 'moment'

const DatePickerField = ({ label, input, placeholder, readOnly = false,  meta: { touched, error } }) => {
  const [date, toggleDate] = useState(null)
  const mainClass = classnames({ 'is-invalid': touched && error })

  useEffect(() => { toggleDate(input.value) }, [])

  return (
    <div className={mainClass}>
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
      {touched && error &&
      <div className='invalid-feedback'>
        {error}
      </div>}
    </div>
  )
}

export default DatePickerField
