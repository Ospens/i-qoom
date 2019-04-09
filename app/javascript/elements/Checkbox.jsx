import React from 'react'

function Checkbox(props) {
  const { text, checkBoxId, inputClass, labelClass, onChange, name } = props
  return (
    <div>
      <input type='checkbox' className={inputClass} id={checkBoxId} onChange={onChange} name={name} />
      <label className={labelClass} htmlFor={checkBoxId}></label>
      <span>{text}</span>
    </div>
  )
}

export default Checkbox
