import React, { Component } from 'react'
import Select from 'react-select'

function SelectField({input, options, value}) {
  return (
    <Select
       {...input}
       options={options}
       value={value}
       styles={{color: '#26276a'}}
       autoFocus={false}
       onChange={value => input.onChange(value.value)}
       onBlur={value => input.onBlur(value.value)}
    />
    )
}

export default SelectField
