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
  const { data: { icon, title }} = props
  if (icon) {
    return (
      <components.Option {...props}>
        <div className="d-flex">
          <ReactSVG
            svgStyle={{ width: 50, marginRight: 10 }}
            src={icon}
          />
          <span>{title}</span>
        </div>
      </components.Option>
    )
  } else {
    return (
      <components.Option {...props} >
        <span>{props.data.title || props.data.value}</span>
      </ components.Option>
    )
  }
}

const SingleValue = props => {
  return (
    <components.SingleValue {...props}>
      {props.data.title || props.data.value}
    </components.SingleValue>
  )
}

const MultiValueLabel = props => {
  return (
    <components.MultiValueLabel {...props}>
      {props.data.title || props.data.value}
    </components.MultiValueLabel>
  )
}

const IndicatorSeparator = ({ innerProps }) => {
  return (
    <span style={{display: 'none'}} {...innerProps} />
  )
}

const checkValue = (options, input) => {
  if (typeof input.value === 'string' || typeof input.value === 'number') {
    return options.filter(option => input.value === option.value)
  } else if (typeof input.value === 'object' && Object.keys(input.value)) {
    return options.filter(option => input.value.includes(option.value))
  }
}

export const colourStyles = errorInfo => {
  const borderColor = errorInfo ? '#fd0944' : '#ced4da'
  const borderWidth = errorInfo ? '2px' : '1px'
  const boxShadow = errorInfo ? '0 0 10px rgba(0, 0, 0, 0.5)' : 'none'
  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      borderColor,
      borderWidth,
      boxShadow,
      zIndex: '4',
      minHeight: '33.5px',
      backgroundColor: state.isDisabled ? '#e9ecef' : 'inherit'
    }),
    menu: styles => ({
      ...styles,
      marginTop: '0',
      zIndex: '5'
    }),
    placeholder: styles => ({
      ...styles,
      color: '#c8d8da'
    }),
    option: styles => ({
      ...styles,
      color: 'rgba(0, 0, 0, .87)'
    })
  }
  return colourStyles
}
export const SelectComponent = props => (
  <Select
    {...props}
    components={{ DropdownIndicator, IndicatorSeparator, Option, SingleValue, MultiValueLabel }}
    autoFocus={false}
    styles={colourStyles(props.errorInfo)}
    maxMenuHeight='180'
  />
)

const SelectField = ({ input, options, errorField, label, placeholder, isDisabled = false, isMulti = false }) => {
  const errorInfo = errorField ? errorField[input.name] : false

  return (
    <div>
      {label && <label htmlFor={input.id}>{label}</label>}
      <SelectComponent
        {...input}
        isMulti={isMulti}
        options={options}
        value={checkValue(options, input)}
        onChange={v => { input.onChange(v.value || v.map(val => val.value)) }}
        onBlur={value => input.onBlur(value.value)}
        className={`form-control-select ${errorInfo ? ' is-invalid' : ''}`}
        isDisabled={isDisabled}
        placeholder={placeholder ? placeholder : 'Select...'}
      />
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default SelectField
