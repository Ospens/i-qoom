
import React, { Fragment, useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import moment from 'moment'
import { feedBackText } from './InputField'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
//
// function range(start, end) {
//   return Array(end - start + 1).fill().map((_, idx) => start + idx)
// }

function Header({
  date,
  // changeYear,
  // changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}) {
  // const years = range(1990, (new Date()).getFullYear() + 1)
  return (
    <div
      className="react-datepicker__header--custom_container"
    >
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="react-datepicker__header--custom_btn-prev"
      >
        <span className="icon-arrow-button-left" />
      </button>

      <div>
        <div className="react-datepicker__header--custom_month">
          {months[date.getMonth()]}
        </div>

        <div className="react-datepicker__header--custom_year">
          {date.getFullYear()}
        </div>
      </div>

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="react-datepicker__header--custom_btn-next"
      >
        <span className="icon-arrow-button-right" />
      </button>
    </div>
  )
}
const DatePickerField = ({
  label,
  input,
  placeholder,
  readOnly = false,
  meta: { touched, error, dirty },
  className,
  isDirty,
  infoFeedback
}) => {
  const [date, toggleDate] = useState('')
  useEffect(() => {
    if (!isDirty) return

    isDirty(dirty)
  }, [dirty])

  useEffect(() => {
    if (typeof input.value !== 'object') return

    toggleDate(input.value)
  }, [input.value])

  const value = date ? moment(new Date(date)).format('MM/DD/YYYY') : null

  return (
    <div className={classnames(className, { 'is-invalid': touched && error })}>
      {label && <label>{label}</label>}
      <DatePicker
        {...input}
        autoComplete="off"
        dateForm="MM/DD/YYYY"
        className={classnames('form-control date-input', { 'is-invalid': touched && error })}
        selected={date}
        value={value || input.value}
        onChange={v => {
          input.onChange(v)
          toggleDate(v)
        }}
        placeholderText={placeholder || ''}
        readOnly={readOnly}
        required
        pattern=".*\S.*"
        renderCustomHeader={props => <Header {...props} />}
      />
      {(() => {
        if (touched) {
          if (error) {
            return feedBackText(error, true)
          } if (infoFeedback) {
            return feedBackText(infoFeedback)
          }
        }
        return <Fragment />
      })()}
    </div>
  )
}

export default DatePickerField
