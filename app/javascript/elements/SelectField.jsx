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
  if (!options) return {}

  if (typeof input.value === 'string' || typeof input.value === 'number') {
    return options.filter(option => input.value === option.value)
  } else if (typeof input.value === 'object' && Object.keys(input.value)) {
    return options.filter(option => input.value.includes(option.value))
  }
}

export const colourStyles = errorInfo => {
  const borderColor = errorInfo ? '#FF0042 !important' : '#E9F3F5 !important'
  const boxShadow = errorInfo ? '0px 0px 15px #FF004280' : 'none'

  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      borderColor,
      borderWidth: '1px',
      boxShadow,
      borderRadius: state.menuIsOpen ? '5px 5px 0 0' : '5px',
      zIndex: '4',
      minHeight: '45px',
      backgroundColor: state.isDisabled ? '#f5f9fa' : state.selectProps.value && state.selectProps.value.length > 0 ? '#fff' : '#FCFFFF'
    }),
    menu: styles => ({
      ...styles,
      marginTop: '0',
      boxShadow: 'none',
      border: '1px solid #E9F3F5',
      borderRadius: '0 0 5px 5px',
      zIndex: '5'
    }),
    menuList: styles => ({
      ...styles,
      borderRadius: '5px',
      borderTopLeftRadius: '0',
      borderTopRightRadius: '0',
      maxHeight: '300px'
    }),
    placeholder: styles => ({
      ...styles,
      color: '#B2CED1',
      fontSize: '17px',
      fontWeight: '400'
    }),
    option: (styles, state) => ({
      ...styles,
      color: state.isFocused ? '#0096FA' : '#475759',
      backgroundColor: state.isFocused ? '#F5FCFC' : '#fff'
    }),
    singleValue: styles => ({
      ...styles,
      color: '#475759',
      lineHeight: 'normal'
    })
  }
  return colourStyles
}

const customFilterOption = (option, rawInput) => {
  const words = rawInput.split(' ')
  return words.reduce(
    (acc, cur) => acc && option.data.title.toLowerCase().includes(cur.toLowerCase()),
    true,
  )
}

export const SelectComponent = props => (
  <Select
    {...props}
    filterOption={customFilterOption}
    components={{ DropdownIndicator, IndicatorSeparator, Option, SingleValue, MultiValueLabel }}
    autoFocus={false}
    styles={colourStyles(props.errorInfo)}
    maxMenuHeight='180'
  />
)

const SelectField = ({
  input,
  options,
  errorField,
  label,
  placeholder,
  className,
  disabled = false,
  isMulti = false,
  meta: { touched, error }
}) => {
  const errorInfo = (touched && error)
    ? [error]
    : errorField
      ? errorField[input.name]
      : false

  return (
    <div className={className}>
      {label && <label htmlFor={input.id}>{label}</label>}
      <SelectComponent
        {...input}
        isMulti={isMulti}
        options={options}
        errorInfo={errorInfo}
        value={checkValue(options, input)}
        onChange={v => { input.onChange(v.value || v.map(val => val.value)) }}
        onBlur={value => input.onBlur(value.value)}
        className={`form-control-select ${errorInfo ? ' is-invalid' : ''}`}
        isDisabled={disabled}
        placeholder={placeholder || 'Select...'}
      />
      <div className='invalid-feedback'>
        {errorInfo ? errorInfo[0] : ''}
      </div>
    </div>
  )
}

export default SelectField
