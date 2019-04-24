import React from 'react'
import Select, { components } from 'react-select'

const DropdownIndicator = props => {
  const { isFocused } = props
  console.log(props)
  return (
    <components.DropdownIndicator {...props} className='mr-3'>
      {!isFocused && <i className='arrow down'/>}
      {isFocused && <i className='arrow up'/>}
    </components.DropdownIndicator>
  )
}

const IndicatorSeparator = ({ innerProps }) => {
  return (
    <span style={{display: 'none'}} {...innerProps} />
  )
}

function SelectField({ input, options, value, defaultValue, errorField, id}) {
  const errorInfo = errorField[id]
  const borderColor = errorInfo ? 'red' : '#ced4da'
  const colourStyles = {
    control: styles => ({ ...styles, borderColor, zIndex: '5' }),
    menu: styles => ({ ...styles, marginTop: '-2px', zIndex: '4' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      color: isFocused ? '#2fa7f9' : 'lightgray'
    })
  }
  return (
    <div>
      <Select
        {...input}
        components={{ DropdownIndicator, IndicatorSeparator }}
        options={options}
        value={value}
        autoFocus={false}
        styles={colourStyles}
        defaultValue={defaultValue}
        onChange={value => input.onChange(value.value)}
        maxMenuHeight='180'
        onBlur={value => input.onBlur(value.value)}
        className={`form-control-select ${errorInfo ? ' is-invalid' : ''}`}
      />
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default SelectField
