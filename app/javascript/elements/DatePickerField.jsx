
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import moment from 'moment'

const DatePickerField = ({ label, input, placeholder, readOnly = false,  meta: { touched, error } }) => {
  const [date, toggleDate] = useState('')
  const mainClass = classnames({ 'is-invalid': touched && error })

  useEffect(() => {
    if (typeof input.value !== 'object') return
    
    toggleDate(input.value)
  }, [input.value])

  const value = date ? moment(new Date(date)).format('MM/DD/YYYY') : null

  return (
    <div className={mainClass}>
      {label && <label>{label}</label>} 
      <DatePicker
        {...input}
        autoComplete='off'
        dateForm='MM/DD/YYYY'
        className='form-control date-input'
        selected={date}
        value={value || input.value}
        onChange={value => {
          input.onChange(value)
          toggleDate(value)
        }}
        placeholderText={placeholder ? placeholder : ''}
        readOnly={readOnly}
        required
        pattern=".*\S.*"
      />
      {touched && error &&
      <div className='invalid-feedback'>
        {error}
      </div>}
    </div>
  )
}

export default DatePickerField
