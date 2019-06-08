import React from 'react'
import Select, { components } from 'react-select'
import ReactSVG from 'react-svg'

const DropdownIndicator = props => {
  const { isFocused } = props
  return (
    <components.DropdownIndicator {...props} className='mr-3'>
      {!isFocused && <i className='arrow down'/>}
      {isFocused && <i className='arrow up'/>}
    </components.DropdownIndicator>
  )
}

const Option = props => {
  const { data: { icon, label }} = props
  if (icon) {
    return (
      <components.Option {...props}>
        <div className="d-flex">
          <ReactSVG
            svgStyle={{ width: 50, marginRight: 10 }}
            src={icon}
          />
          <span>{label}</span>
        </div>
      </components.Option>
    )
  } else {
    return (
      <components.Option {...props} />
    )
  }
}

const IndicatorSeparator = ({ innerProps }) => {
  return (
    <span style={{display: 'none'}} {...innerProps} />
  )
}
const colourStyles = errorInfo => {
  const borderColor = errorInfo ? '#fd0944' : '#ced4da'
  const borderWidth = errorInfo ? '2px' : '1px'
  const boxShadow = errorInfo ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none'
  const colourStyles = {
    control: styles => ({ ...styles, borderColor, borderWidth, boxShadow, zIndex: '4', minHeight: '33.5px' }),
    menu: styles => ({ ...styles, marginTop: '0', zIndex: '5' }),
    option: (styles, { isFocused }) => ({
      ...styles,
      color: isFocused ? '#2fa7f9' : 'lightgray'
    })
  }
  return colourStyles
}

function SelectField({ input, options, newValue, errorField, id, label, placeholder }) {
  const errorInfo = errorField ? errorField[id] : false

  return (
    <div>
      {label && <label htmlFor={input.name}>{label}</label>}
      <Select
        {...input}
        components={{ DropdownIndicator, IndicatorSeparator, Option }}
        options={options}
        value={options.filter(option => option.value === input.value)}
        autoFocus={false}
        styles={colourStyles(errorInfo)}
        onChange={value => input.onChange(value.value)}
        maxMenuHeight='180'
        onBlur={value => input.onBlur(value.value)}
        placeholder={placeholder ? placeholder : 'Select...'}
        className={`form-control-select ${errorInfo ? ' is-invalid' : ''}`}
      />
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default SelectField
