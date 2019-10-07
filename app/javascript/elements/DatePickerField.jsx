
import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import moment from 'moment'

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function Header({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}) {
  const years = range(1990, (new Date()).getFullYear() + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  return (
    <div
      className='react-datepicker__header--custom_container'>
      <button
        type='button'
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className='react-datepicker__header--custom_btn-prev'
      >
        <span className='icon-arrow-button-left' />
      </button>

      <div>
        <div className='react-datepicker__header--custom_month'>
          {months[date.getMonth()]}
        </div>

        <div className='react-datepicker__header--custom_year'>
          {date.getFullYear()}
        </div>
      </div>

      <button
        type='button'
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className='react-datepicker__header--custom_btn-next'
      >
        <span className='icon-arrow-button-right' />
      </button>
    </div>
  )
}
const DatePickerField = ({ label, input, placeholder, readOnly = false,  meta: { touched, error } }) => {
  const [date, toggleDate] = useState('')
  useEffect(() => {
    if (typeof input.value !== 'object') return
    
    toggleDate(input.value)
  }, [input.value])

  const value = date ? moment(new Date(date)).format('MM/DD/YYYY') : null

  return (
    <div className={classnames({ 'is-invalid': touched && error })}>
      {label && <label>{label}</label>} 
      <DatePicker
        {...input}
        autoComplete='off'
        dateForm='MM/DD/YYYY'
        className=''
        className={classnames('form-control date-input', { 'is-invalid': touched && error })}
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
        renderCustomHeader={props => <Header {...props} />}
      />
      {touched && error &&
      <div className='invalid-feedback'>
        {error}
      </div>}
    </div>
  )
}

export default DatePickerField
