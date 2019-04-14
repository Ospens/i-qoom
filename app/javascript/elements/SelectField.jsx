import React from 'react'
import Select from 'react-select'

function SelectField({input, options, value, errorField, id}) {
  const errorInfo = errorField[id]
  const borderColor = errorInfo ? '#fd0944' : '#ced4da'
  const borderWidth = errorInfo ? '2px' : '1px'
  const colourStyles = {
    control: styles => ({ ...styles, borderColor, borderWidth })
  }
  return (
    <div>
      <Select
         {...input}
         options={options}
         value={value}
         styles={{color: '#26276a'}}
         autoFocus={false}
         styles={colourStyles}
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
