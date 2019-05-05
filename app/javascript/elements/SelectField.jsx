import React from 'react'
import Select, { components } from 'react-select'

const DropdownIndicator = props => {
  const { isFocused } = props
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
  const borderColor = errorInfo ? '#fd0944' : '#ced4da'
  const borderWidth = errorInfo ? '2px' : '1px'
  const boxShadow = errorInfo ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none'
  const colourStyles = {
    control: styles => ({ ...styles, borderColor, borderWidth, boxShadow, zIndex: '5', maxHeight: '25px' }),
    menu: styles => ({ ...styles, marginTop: '-2px', zIndex: '4' }),
    option: (styles, { isFocused }) => ({
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
